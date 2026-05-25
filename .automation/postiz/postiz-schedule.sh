#!/usr/bin/env bash
# postiz-schedule.sh — POST a JSON file to Postiz' public API.
#
# Usage:
#   ./postiz-schedule.sh path/to/post.json
#
# Verified against docs.postiz.com/public-api/introduction (2026-05-23).
#
# JSON shape expected (full schema in examples/):
#   {
#     "type": "schedule",                         // or "now"
#     "date": "2026-05-24T13:00:00.000Z",         // ISO 8601 UTC
#     "shortLink": false,
#     "tags": [],
#     "posts": [
#       {
#         "integration": {"id": "<channel-id>"},   // get via postiz-list-integrations.sh
#         "value": [{"content": "<caption>", "image": []}],
#         "settings": {
#           "__type": "x",                         // or "linkedin","instagram","facebook"…
#           "who_can_reply_post": "everyone"       // platform-specific fields
#         }
#       }
#     ]
#   }
#
# Auth header is the RAW api key (NOT "Bearer <key>"). OAuth tokens use "pos_<token>".
# Rate limit: 90 req/hour self-hosted; tune Postiz' API_LIMIT env var if you need more.

set -euo pipefail

# Load env from same dir as the script
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
[ -f "$SCRIPT_DIR/.env" ] && set -a && . "$SCRIPT_DIR/.env" && set +a

: "${POSTIZ_URL:?POSTIZ_URL not set (e.g. http://localhost:5000)}"
: "${POSTIZ_API_KEY:?POSTIZ_API_KEY not set — get one from Postiz UI → Settings → API}"

if [ $# -ne 1 ]; then
  echo "usage: $0 <post.json>" >&2
  exit 64
fi

PAYLOAD="$1"
if [ ! -f "$PAYLOAD" ]; then
  echo "file not found: $PAYLOAD" >&2
  exit 66
fi

# --fail-with-body so we see Postiz' error messages on 4xx/5xx
curl --fail-with-body -sS \
  -X POST "${POSTIZ_URL%/}/public/v1/posts" \
  -H "Authorization: ${POSTIZ_API_KEY}" \
  -H "Content-Type: application/json" \
  --data-binary "@${PAYLOAD}" \
  | tee "${PAYLOAD%.json}.response.json"

echo
echo "✓ scheduled. response saved to ${PAYLOAD%.json}.response.json"
