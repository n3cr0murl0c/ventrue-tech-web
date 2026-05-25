#!/bin/bash
# Ventrue Tech — Content Generator (cron entry-point)
#
# Calls the dockerized content pipeline (CustomAi/content_gen/) which runs a
# plan -> write -> critique -> revise loop against a local Gemma model
# served by llama.cpp, with RAG over books in content_gen/books/.
#
# The pipeline itself lives in a separate repo (CustomAi) so it can be reused
# across projects. This shim writes its output (markdown blog posts) into
# THIS repo's src/content/blog/ via a bind mount.
#
# Prerequisites (one-time):
#   - Docker 24+ and docker-compose v2 installed
#   - GGUF model file in $CONTENT_GEN_DIR/models/
#   - $CONTENT_GEN_DIR/.env configured (cp .env.example .env)
#   - `docker compose -f $CONTENT_GEN_DIR/docker-compose.yml up -d llm`
#   - Override the pipeline location with: export CONTENT_GEN_DIR=/path/to/content_gen
#
# Usage:
#   bash .automation/scripts/generate-content.sh                # day-of-week topic, Spanish
#   bash .automation/scripts/generate-content.sh ai en          # specific topic + language

set -euo pipefail

# Repo root regardless of where the cron invokes this from.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Location of the dockerized content pipeline. Override via env var if it lives elsewhere.
CONTENT_GEN_DIR="${CONTENT_GEN_DIR:-$HOME/GithubRepos/CustomAi/content_gen}"

if [[ ! -d "$CONTENT_GEN_DIR" ]]; then
    echo "✗ CONTENT_GEN_DIR not found: $CONTENT_GEN_DIR" >&2
    echo "  Set CONTENT_GEN_DIR to the path of the content_gen directory and re-run." >&2
    exit 1
fi

cd "$REPO_ROOT"

TOPIC="${1:-}"
LANG="${2:-es}"

GENERATOR_ARGS=("--lang" "$LANG")
if [[ -n "$TOPIC" ]]; then
    GENERATOR_ARGS+=("--topic" "$TOPIC")
fi

# Confirm the LLM service is up. If not, start it and wait for the healthcheck.
if ! docker compose -f "$CONTENT_GEN_DIR/docker-compose.yml" ps llm --status running --quiet | grep -q .; then
    echo "▶ LLM service not running — starting it..."
    docker compose -f "$CONTENT_GEN_DIR/docker-compose.yml" up -d llm
    # Wait up to ~3 minutes for the healthcheck (model load can take a while).
    for _ in $(seq 1 36); do
        STATUS=$(docker inspect -f '{{.State.Health.Status}}' ventrue-llm 2>/dev/null || echo "missing")
        if [[ "$STATUS" == "healthy" ]]; then
            break
        fi
        sleep 5
    done
    if [[ "$STATUS" != "healthy" ]]; then
        echo "✗ LLM service failed to become healthy. Check: docker compose logs llm" >&2
        exit 1
    fi
fi

echo "▶ Generating post (topic=${TOPIC:-auto}, lang=$LANG)..."

# Capture the list of blog posts before, so we can find what was added.
BLOG_DIR="$REPO_ROOT/src/content/blog"
BEFORE=$(ls "$BLOG_DIR" 2>/dev/null | sort || true)

# Note: --no-commit because we do git ops on the host (the container doesn't have credentials).
docker compose -f "$CONTENT_GEN_DIR/docker-compose.yml" run --rm generator \
    "${GENERATOR_ARGS[@]}" --no-commit

AFTER=$(ls "$BLOG_DIR" 2>/dev/null | sort || true)
NEW_FILES=$(comm -13 <(echo "$BEFORE") <(echo "$AFTER") || true)

if [[ -z "$NEW_FILES" ]]; then
    echo "✗ No new post was produced. Check the generator output above." >&2
    exit 1
fi

echo "▶ New post(s):"
echo "$NEW_FILES" | sed 's/^/  - /'

# Commit + push (host-side, so we use the developer's git config / SSH keys).
echo "$NEW_FILES" | while read -r file; do
    [[ -z "$file" ]] && continue
    git add "$BLOG_DIR/$file"
done

if ! git diff --staged --quiet; then
    FIRST_FILE=$(echo "$NEW_FILES" | head -n1)
    git commit -m "📝 Auto-generate: ${FIRST_FILE%.md}"
    git push origin main 2>/dev/null || echo "(push skipped — no remote or no creds)"
fi

echo "✓ Done."
