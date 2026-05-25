#!/usr/bin/env bash
# postiz-list-integrations.sh — fetch connected channels and their IDs.
# Pipe to jq for readable output:
#   ./postiz-list-integrations.sh | jq '.[] | {id, name, identifier}'

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
[ -f "$SCRIPT_DIR/.env" ] && set -a && . "$SCRIPT_DIR/.env" && set +a

: "${POSTIZ_URL:?POSTIZ_URL not set}"
: "${POSTIZ_API_KEY:?POSTIZ_API_KEY not set}"

curl --fail-with-body -sS \
  -X GET "${POSTIZ_URL%/}/public/v1/integrations" \
  -H "Authorization: ${POSTIZ_API_KEY}"
