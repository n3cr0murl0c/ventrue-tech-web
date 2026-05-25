# TikTok Developer Portal — `agentic-ai-social-media` submission notes

**Status**: DRAFT. Do NOT click "Submit for review" until the SaaS is demonstrable in TikTok Sandbox mode end-to-end. TikTok rejects submissions that lack a working demo, regardless of how polished the form copy is.

**Last updated**: 2026-05-24

---

## What to paste into each field

### Basic information

| Field | Value |
|-------|-------|
| **App icon** | Upload `public/brand/icon-1024.png` (1024×1024, 56 KB, sRGB) |
| **App name** | `Ventrue Social` (recommended — current `agentic-ai-social-media` is internal-codename-y; rename before going production. TikTok shows this name to end users.) |
| **Category** | Productivity → Content Management (or Social → Content Tools depending on TikTok's current taxonomy) |
| **Description** (≤120 chars) | `Ventrue Social lets creators and teams draft with AI, schedule, and publish content to their own TikTok accounts.` (113 chars) |
| **Terms of Service URL** | `https://ventrue.tech/en/terms` |
| **Privacy Policy URL** | `https://ventrue.tech/en/privacy` |
| **Platform** | Web (start here). Add Android/iOS only when those apps exist in Play/App Store. |
| **Web/Desktop URL** | `https://ventrue.tech` (use the production landing page; once Ventrue Social has its own subdomain like `social.ventrue.tech`, switch to that) |

### Products to add

| Product | Why |
|---------|-----|
| **Login Kit** | Per-user TikTok OAuth so each Ventrue Social user connects their own TikTok account |
| **Content Posting API** | Publish video/image posts the user has composed and approved |
| **Display API** | Show the user their recent posts and basic engagement metrics in our dashboard |

Skip these unless we add features for them: Share Kit, Embed Videos, Data Portability, Green Screen Kit, Commercial Content API, Research API. Leaving products on the form without demonstrating them in the video is the #1 cause of rejection.

### Scopes to request

| Scope | Used by | Reason |
|-------|---------|--------|
| `user.info.basic` | Login Kit | Identify the connecting user (open_id, union_id) so we can associate the TikTok identity to a Ventrue Social account |
| `video.upload` | Content Posting API | Upload video files that the user has approved |
| `video.publish` | Content Posting API | Finalize and publish the upload to the user's account |
| `user.info.profile` | Display API | Show username/avatar in our dashboard so the user knows which account they're managing |

> Drop any scope you cannot demonstrate in the demo video. Each unused scope is a reason for the reviewer to ask for re-submission.

### App review explanation (≤1000 chars)

```
Ventrue Social is a SaaS for creators and content teams who manage multiple TikTok accounts in one dashboard. Each user authorizes their own account via TikTok OAuth (per-user, scoped to granted permissions). We never store passwords; OAuth tokens are revoked immediately when the user disconnects.

- Login Kit: associate a TikTok account with a Ventrue Social account.
- Content Posting API: publish video/image posts that the authenticated user composed and approved. All publishing is user-initiated.
- Display API: show users their recent posts and basic metrics in the dashboard.

AI drafts are suggestions only; users review and approve before posting. The demo video shows: sign-up, TikTok OAuth consent, composing and reviewing a post (with AI assistance), scheduling and posting, seeing the result, then disconnecting and verifying token revocation in TikTok's Manage Apps page.

Privacy: https://ventrue.tech/en/privacy
Terms: https://ventrue.tech/en/terms
```

(~890 chars including line breaks — within the 1000-char limit.)

---

## Demo video — what must be shown

The video is the #1 thing TikTok actually evaluates. Plan for **2–4 minutes**, MP4 or MOV, ≤50 MB. Record the actual Sandbox-mode Ventrue Social app (not mock screens). It is OK and expected to use the Sandbox environment.

Required scenes, in order:

1. **Open `ventrue.tech`** — show the domain in the browser address bar (TikTok specifically checks domain match).
2. **Sign up / log in** to Ventrue Social.
3. **Connect TikTok** — click "Connect TikTok", land on TikTok's OAuth consent screen, show the requested scopes, approve, come back to our dashboard. Confirm the connected username shows.
4. **Compose a post** — write a caption (optionally invoke AI assist). Show the preview.
5. **Approve and publish** (or schedule) — show the moment the user clicks "Post" and the success state.
6. **Verify on TikTok** — open TikTok and show the post live.
7. **Display API** — return to dashboard, show that the post appears in the "Recent posts" view with its public metrics.
8. **Disconnect** — click "Disconnect TikTok" in Ventrue Social, then open TikTok's *Settings → Privacy → Manage app permissions* and show that Ventrue Social is no longer listed (or that the user can confirm revocation).

Narrate with on-screen captions or a voiceover. No music with copyright issues.

---

## Pre-submission checklist

- [ ] Ventrue Social is functional in TikTok Sandbox (Sandbox toggle in top-right of Dev Portal).
- [ ] App is renamed from `agentic-ai-social-media` to `Ventrue Social` (or whatever final name) on the form.
- [ ] App icon uploaded: `public/brand/icon-1024.png`.
- [ ] Terms URL resolves to a published `https://ventrue.tech/en/terms` (not 404). Verify after deploy.
- [ ] Privacy URL resolves to a published `https://ventrue.tech/en/privacy`. Verify after deploy.
- [ ] Description is exactly the copy in this doc.
- [ ] Only the three required Products are added (Login Kit, Content Posting API, Display API). No unused ones.
- [ ] Only the four required Scopes are requested. No unused ones.
- [ ] Review-explanation text is pasted exactly as in this doc.
- [ ] Demo video covers all 8 required scenes. Length 2–4 min, MP4/MOV, ≤50 MB.
- [ ] You re-read the [TikTok App Review Guidelines](https://developers.tiktok.com/doc/app-review-guidelines) the morning of submission (they change quietly).

## Common rejection reasons (read these before submitting)

1. **Domain mismatch** — the URL shown in the video must match the Web/Desktop URL on the form. If you switch to a subdomain, re-record.
2. **Unused scopes/products on the form** — strip anything you don't demo.
3. **Single-account demo for a multi-client product** — TikTok wants to see that a *different* TikTok user can also connect their account, not just the developer's. If feasible, show two users connecting in the demo.
4. **No revocation flow** — the disconnect/revocation scene is non-optional for multi-user posting apps.
5. **Music with takedown risk** in the demo — record silently or use TikTok's own commercial music library.
6. **AI involvement without clear user-in-the-loop** — your demo must show the user *approving* the AI draft before it publishes. Autonomous AI posting is a faster path to rejection.
