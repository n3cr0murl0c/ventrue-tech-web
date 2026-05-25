# Hermes cron jobs & webhook subscriptions

Verified flag syntax from [Hermes docs — webhooks](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/webhooks) and [Hermes docs — automation templates](https://hermes-agent.nousresearch.com/docs/guides/automation-templates).

> `hermes cron create` takes the schedule and prompt as **positional args**, with flags `--name`, `--deliver`, `--skill`, `--script`.
> `hermes webhook subscribe` takes the subscription name as a positional, with `--events`, `--prompt`, `--deliver`, `--deliver-chat-id`, `--description`.

All paths absolute. All examples assume Hermes is installed at `~/.local/bin/hermes` and this folder is at `~/GithubRepos/ventrue-tech-web/.automation/postiz/`.

---

## Track A — Dev brand jobs

### Daily dev-brand post (9 AM Quito = 14 UTC)

```bash
hermes cron create "0 14 * * *" \
  "Eres el equipo editorial de Ventrue Tech (consultoría dev en Ecuador).
   1. Lee ~/GithubRepos/ventrue-tech-web/.automation/postiz/angles.md (Track A)
      y ~/GithubRepos/ventrue-tech-web/CONTENT_STRATEGY.md.
   2. Identifica el día de la semana en Quito (America/Guayaquil).
   3. Toma el topic de ese día (Lun=DevOps, Mar=.NET, etc.) y un sub-tema
      del calendario de 90 días.
   4. Redacta 3 variantes de la misma idea:
      - LinkedIn: 3 párrafos, ES, código real, cierra con pregunta.
      - X: hilo de 4-6 tweets, EN, primer tweet standalone hook.
      - dev.to: extracto largo + link al blog post si existe.
   5. Para cada uno escribe el JSON correcto en /tmp/ventrue-A-<canal>.json
      siguiendo el shape de ~/GithubRepos/ventrue-tech-web/.automation/postiz/postiz-schedule.sh
      (lee el comentario inicial del script para el schema).
   6. Llama a postiz-schedule.sh para cada archivo.
   7. Resume en una línea qué se programó y para qué canal." \
  --name "ventrue-A-dev-daily" \
  --deliver telegram
```

### Weekly roundup (Domingo 10 AM Quito = 15 UTC dom)

```bash
hermes cron create "0 15 * * 0" \
  "Lee ~/GithubRepos/ventrue-tech-web/.automation/postiz/progress.md y
   resume la semana de Ventrue Tech en formato 'envíos / fracasos / lecciones'.
   Programa un post en LinkedIn (ES) y un hilo X (EN) usando postiz-schedule.sh.
   CTA: link al newsletter (ventrue.tech/newsletter)." \
  --name "ventrue-A-roundup" \
  --deliver telegram
```

---

## Track B — WhatsApp-bot product jobs

### Triple daily (8AM/12PM/6PM Quito = 13/17/23 UTC)

```bash
hermes cron create "0 13 * * 1-5" \
  "Track B — slot 8AM. Lee ~/GithubRepos/ventrue-tech-web/.automation/postiz/angles.md
   sección Track B y ~/HermesAgent/ventas/kit-ventas.md.
   Hoy toca 'Problema→Solución'. Genera 1 post para Instagram (caption + 6 hashtags
   sector + ciudad) y 1 para Facebook page. Tono: español-Ecuador vernacular, sin
   jerga técnica, CTA = 'DM demo'. Programa con postiz-schedule.sh." \
  --name "ventrue-B-smb-8am" \
  --deliver telegram

hermes cron create "0 17 * * 1-5" \
  "Track B — slot 12PM. Hoy toca 'Demo 60s'. Si hay un Loom nuevo en
   ~/HermesAgent/ventas/demos/ úsalo; si no, programa un placeholder de carrusel.
   Canales: TikTok + Threads + IG Reels." \
  --name "ventrue-B-smb-12pm" \
  --deliver telegram

hermes cron create "0 23 * * 1-5" \
  "Track B — slot 6PM. Hoy toca 'Cifra incómoda'. Una estadística local sobre
   PYMEs que no contestan, con CTA fuerte. Canales: IG + Facebook + Threads." \
  --name "ventrue-B-smb-6pm" \
  --deliver telegram
```

### Sábado — detrás de escena (10 AM Quito = 15 UTC sáb)

```bash
hermes cron create "0 15 * * 6" \
  "Track B — sábado BTS. Si automatizamos clientes esta semana (chequea
   ~/HermesAgent/ventas/casos-cerrados.md), publica antes/después en IG + FB.
   Pide permiso por DM si el cliente no firmó autorización aún." \
  --name "ventrue-B-bts" \
  --deliver telegram
```

---

## Webhook — Postiz publish events → Hermes

In Postiz UI: **Settings → Webhooks → Add** a webhook pointing at:
`http://<host-where-hermes-gateway-listens>/webhooks/postiz-events`

(For purely local dev, Hermes' webhook gateway listens on a local port — check `hermes status` for the URL. Otherwise expose via Cloudflare Tunnel.)

Then register the route in Hermes:

```bash
hermes webhook subscribe postiz-events \
  --events "post.published,post.failed" \
  --prompt "Postiz event {event_type}:
            id={post.id} state={post.state} channel={post.integration.name}
            url={post.releaseURL}
            Si fue published, añade una línea a
            ~/GithubRepos/ventrue-tech-web/.automation/postiz/progress.md.
            Si failed, alerta y propone fix." \
  --deliver telegram \
  --deliver-chat-id "${HERMES_DELIVER_CHAT_ID}" \
  --description "Log Postiz publish/fail events to progress.md"
```

**Security:** Generic webhooks validate via `X-Webhook-Signature` (raw HMAC-SHA256). Configure a secret in Postiz' webhook UI and in Hermes' route config. `INSECURE_NO_AUTH` only works on loopback.

---

## Management

```bash
hermes cron list                     # see all jobs
hermes cron pause <name>             # temporarily disable
hermes cron run <name>               # trigger immediately (next tick)
hermes cron rm <name>                # delete
hermes webhook list                  # see registered routes
hermes status                        # confirm gateway running
```

For one-off manual runs:

```bash
cd ~/GithubRepos/ventrue-tech-web/.automation/postiz/
./postiz-schedule.sh examples/devops-monday.json
```
