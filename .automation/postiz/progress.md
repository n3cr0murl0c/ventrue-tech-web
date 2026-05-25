# Postiz Integration — Progress Log

Append-only. Newest at top. Hermes' webhook route writes here on `post.published`.

Format per entry:

```
## YYYY-MM-DD HH:MM (TZ)
- track: A | B
- action: scaffold | schedule | publish | fail | iterate | retire
- summary: one line, what changed or what shipped
- evidence: link, post URL, error excerpt, or file path
- next: optional — what to do next
```

---

## 2026-05-23 (initial scaffold)

- track: meta
- action: scaffold
- summary: Initial Hermes ↔ Postiz integration scaffolded into `.automation/postiz/`. Two-track strategy committed (A = dev brand, B = WhatsApp-bot product).
- evidence: this folder. Compose at `~/GithubRepos/CustomAi/docker-compose.postiz.yml`. Hermes config at `~/HermesAgent/config.yaml`.
- next:
  1. `docker compose -f ~/GithubRepos/CustomAi/docker-compose.postiz.yml up -d`
  2. Generate API key, fill `.env`, run `./postiz-list-integrations.sh` to populate channel IDs.
  3. Register one Track A cron job manually first (the daily dev-brand post). Watch one full run end-to-end before turning on Track B's 3×/day rhythm.
  4. Configure the `postiz-events` webhook only after the first manual schedule succeeds.
