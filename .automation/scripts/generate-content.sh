#!/bin/bash
# Ventrue Tech — commit & push new blog posts written by Hermes Agent.
#
# Previous behaviour (hardcoded bash templates / Docker-based Python pipeline)
# has been retired in favour of Hermes Agent + Holographic memory. The actual
# content generation now happens in Hermes via the `ventrue-blog` skill, which
# writes Markdown directly into src/content/blog/. See:
#   ~/GithubRepos/CustomAi/hermes/README.md
#
# This script's only job is the host-side git layer: detect new / modified blog
# posts, commit them one-per-file with the title from frontmatter, and push.
#
# Schedule it shortly after the Hermes cron job, e.g.:
#   crontab -e
#   30 9 * * 1-5  /home/n3cr0murl0c/GithubRepos/ventrue-tech-web/.automation/scripts/generate-content.sh >> ~/ventrue-publish.log 2>&1
#
# Manual runs work too — handy after testing the skill interactively.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
BLOG_DIR="$REPO_ROOT/src/content/blog"

cd "$REPO_ROOT"

# Collect blog posts that are either untracked or modified.
mapfile -t NEW_FILES < <(
    {
        git ls-files --others --exclude-standard "$BLOG_DIR" 2>/dev/null
        git diff --name-only "$BLOG_DIR" 2>/dev/null
    } | sort -u | grep -E '\.md$' || true
)

if [[ ${#NEW_FILES[@]} -eq 0 ]]; then
    echo "▶ No new or modified blog posts to publish."
    exit 0
fi

echo "▶ Found ${#NEW_FILES[@]} blog post(s) to publish:"
printf '  - %s\n' "${NEW_FILES[@]}"

extract_title() {
    # Parse the `title: "..."` line from YAML frontmatter; fall back to filename.
    local file="$1"
    local title
    title=$(awk '
        /^---[[:space:]]*$/ { fm = !fm; next }
        fm && /^title:/ {
            sub(/^title:[[:space:]]*/, "")
            gsub(/^"|"$/, "")
            gsub(/^\x27|\x27$/, "")
            print
            exit
        }
    ' "$file")
    if [[ -z "$title" ]]; then
        title="$(basename "$file" .md)"
    fi
    printf '%s' "$title"
}

# One commit per file so the log stays useful.
for file in "${NEW_FILES[@]}"; do
    title=$(extract_title "$file")
    git add "$file"
    if git diff --staged --quiet; then
        continue
    fi
    git commit -m "📝 Auto-publish: ${title}"
done

# Single push at the end.
if git log @{u}.. --oneline 2>/dev/null | grep -q .; then
    if git push origin main 2>&1; then
        echo "▶ Push complete."
    else
        echo "✗ Push failed — check credentials." >&2
        exit 1
    fi
else
    echo "▶ Nothing to push."
fi
