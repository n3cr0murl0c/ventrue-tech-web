# Hermes ↔ Postiz Integration — Ventrue Tech

**Purpose:** Two-track social lead-gen running on a self-hosted Postiz instance, with Hermes Agent as the content brain (local Gemma model, $0/post).

**Compose file lives in:** `~/GithubRepos/CustomAi/docker-compose.postiz.yml`
**Hermes config lives in:** `~/HermesAgent/config.yaml`
**This folder is the persistence layer** for everything Ventrue-side: angles, scripts, cron commands, progress log.

> Verified against [Postiz public API docs](https://docs.postiz.com/public-api/introduction) and [Hermes Agent docs](https://hermes-agent.nousresearch.com/docs/) on 2026-05-23.

---

## The two tracks

| Track | Audience | Channels | Cadence | Source-of-truth file |
|---|---|---|---|---|
| **A — Dev brand (Ventrue Tech)** | LatAm developers | LinkedIn, X, GitHub, dev.to | Mon-Sun by topic (see [CONTENT_STRATEGY.md](../../CONTENT_STRATEGY.md)) | [`angles.md`](angles.md) §A |
| **B — WhatsApp-bot product** | SMB owners in Ecuador | Instagram, Facebook, TikTok, Threads | 3x/day pain-point + demo | [`angles.md`](angles.md) §B |

Same Postiz instance, different channel sets, different cron jobs. Track A drives long-term authority for the consultancy. Track B is short-cycle lead capture for the $15–$39/mes WhatsApp assistant product (sales kit in `~/HermesAgent/ventas/kit-ventas.md`).

---

## Setup, once

```bash
# 1. Bring Postiz up
cd ~/GithubRepos/CustomAi
docker compose -f docker-compose.postiz.yml up -d

# 2. Open http://localhost:5000, register the first user (becomes admin)
# 3. Settings → API → Generate API key → copy it
# 4. Channels → Add → connect LinkedIn, X, IG, FB, Threads, TikTok, Bluesky via OAuth

# 5. Configure this folder
cp .env.example .env
# edit .env: paste POSTIZ_API_KEY, fill channel IDs (use postiz-list-integrations.sh)
chmod +x postiz-schedule.sh postiz-list-integrations.sh

# 6. Smoke test
./postiz-list-integrations.sh        # should print your connected channels with IDs
./postiz-schedule.sh examples/test-post.json   # schedules a dry post
```

---

## How content flows

```
   ┌──────────────────────────────────────────────────────────┐
   │              Hermes cron job (daily, local)              │
   │  → reads angles.md + ../../CONTENT_STRATEGY.md           │
   │  → drafts posts via local Gemma (llama-server :8080)     │
   │  → writes /tmp/ventrue-post-<channel>.json               │
   │  → calls ./postiz-schedule.sh on each                    │
   └────────────────────────────┬─────────────────────────────┘
                                │ HTTPS, Authorization: <api-key>
                                ▼
   ┌──────────────────────────────────────────────────────────┐
   │  Postiz (localhost:5000) — holds OAuth tokens, queues,   │
   │  publishes on schedule, fires webhooks back to Hermes    │
   └──────────────────────────────────────────────────────────┘
```

The exact `hermes cron create` commands are in [`cron-jobs.md`](cron-jobs.md).
The exact Postiz API payload shape is documented inline in [`postiz-schedule.sh`](postiz-schedule.sh).

---

## Lead-back loop

Postiz publishes — it doesn't manage inbox. The DM/comment intake stays on the existing rails:

- **Track B leads** land in WhatsApp via the demo bot (`negocio-demo/recepcionista-prompt.md`). Same product they're selling.
- **Track A leads** land in LinkedIn/X DMs → manual triage for now → consider a Hermes webhook on LinkedIn-DM events later.
- **Post-published events** from Postiz → `hermes webhook subscribe` route → log to [`progress.md`](progress.md) + notify Telegram.

The exact webhook subscribe command is in [`cron-jobs.md`](cron-jobs.md) §Webhooks.

---

## Files in this folder

| File | Purpose |
|---|---|
| [`README.md`](README.md) | This file |
| [`angles.md`](angles.md) | The two-track content matrix; Hermes reads this every run |
| [`cron-jobs.md`](cron-jobs.md) | Exact `hermes cron create` and `hermes webhook subscribe` commands |
| [`postiz-schedule.sh`](postiz-schedule.sh) | Curl helper — accepts a JSON file, posts to `/public/v1/posts` |
| [`postiz-list-integrations.sh`](postiz-list-integrations.sh) | Fetch channel IDs from `/public/v1/integrations` |
| [`.env.example`](.env.example) | Template for API key + channel IDs |
| [`progress.md`](progress.md) | Append-only log: what was launched, what worked, what to change |
| `examples/` | Sample JSON payloads per platform |

---

## Source-of-truth pointers

- **Brand & positioning:** [AGENTS.md](../../AGENTS.md) §Ventrue Technologies - Company Branding
- **90-day content calendar:** [CONTENT_STRATEGY.md](../../CONTENT_STRATEGY.md)
- **Existing automation jobs:** [AUTOMATION_PLAN.md](../../AUTOMATION_PLAN.md)
- **Pre-Postiz social tooling:** [.automation/README_SOCIAL_AUTOMATION.md](../README_SOCIAL_AUTOMATION.md), [.automation/scripts/](../scripts/)
- **WhatsApp-bot sales kit (Track B source):** `~/HermesAgent/ventas/kit-ventas.md`
- **WhatsApp-bot prospect list:** `~/HermesAgent/ventas/lista-objetivo-30.md`
