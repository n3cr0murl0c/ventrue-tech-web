# Stitch Design — Prompt for Ventrue Tech design system improvements

**Purpose:** paste the prompt below into [Stitch](https://stitch.withgoogle.com) (or any AI design tool that accepts a brief) to generate improved designs for Ventrue Tech's frontend. The prompt is intentionally self-contained — Stitch will not have access to our codebase or design tokens unless we put them in the prompt.

**Tip:** Stitch lets you iterate. Send the master prompt below first, then for each follow-up ask for one specific screen (e.g. "Now design the AI & Automation service detail page using the same system").

---

## Master prompt (copy from the next line onwards)

---

You are designing for **Ventrue Tech** (legal: Ventrue Technologies S.A.S.) — a founder-led engineering practice based in Quito, Ecuador. We deliver software, cloud architecture, DevOps, and AI/automation as a single service. Our tagline is "Software, cloud, and automation — delivered as a service." (Spanish: "Software, cloud y automatización como servicio.")

The site already exists at ventrue.tech, built with Astro 4 + Tailwind CSS. We want you to redesign the visual system to feel more like the engineering practice we are — precise, technically credible, dark-first, with a calm and confident voice — and less like a generic SaaS landing page.

### Audience

- **Primary**: founders, CTOs, and tech leads at growth-stage startups in Latin America and Spain. Spanish is their first language. They evaluate vendors on technical credibility, not on marketing polish. They have seen 50 agency landing pages this month and they are bored of all of them.
- **Secondary**: developers and operators evaluating Ventrue Social (our multi-client TikTok/Instagram/LinkedIn content automation SaaS, separate product).

### Brand voice

- Direct, honest, technical. We say "we own the on-call page at 3 AM," not "we partner with you to deliver excellence."
- Bilingual: Spanish primary, English secondary. Every screen must work in both.
- Founder-led "we": the team is Erick Escobar plus rotating collaborators, but we speak in first-person plural and name the founder on the About page.
- No agency-speak. No "transform your business with cutting-edge solutions." If a sentence could appear on any consulting site, rewrite it.

### Core values (informs tone, not just lists)

- **Ownership** — we own the outcome end-to-end, from architecture to on-call.
- **Quality** — we write code, write tests, *and* write runbooks.
- **Transparency** — honest estimates and tradeoffs, even when it costs us the engagement.
- **Pragmatism** — the simplest architecture that solves the actual problem.

### Design tokens

Use these exact tokens. Do not introduce new colors unless extending the system intentionally.

**Color palette (hex):**

| Token | Hex | Use |
|---|---|---|
| Primary Dark | `#0a0a0f` | Main background |
| Darker | `#050508` | Secondary background, footer |
| Surface | `#1e293b` | Card backgrounds |
| Surface Light | `#334155` | Hover states |
| Border | `#475569` | Dividers |
| Accent Cyan | `#00d4ff` | Primary CTA, highlights, links |
| Primary Blue | `#0ea5e9` | Secondary highlights |
| Secondary Purple | `#7c3aed` | Gradient endpoint, occasional accent |
| Text Primary | `#ffffff` | Main text on dark |
| Text Secondary | `#94a3b8` | Body text on dark |
| Text Muted | `#64748b` | Captions, metadata |

**Signature gradient (use sparingly, never on body text):**
`linear-gradient(135deg, #00d4ff 0%, #0ea5e9 50%, #7c3aed 100%)` — for hero headlines, logo, key CTAs.

**Logo gradient (used on the "V" letter mark):**
`linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #00d4ff 100%)`

**Typography:**

- **Display** (h1, h2 hero): Cal Sans Bold, 700. Tight tracking (letter-spacing -0.02em). Use for headings only.
- **Sans body**: Inter, 400/500/600. Generous line-height (1.6) for body, tighter (1.3) for headings.
- **Mono**: JetBrains Mono — for code blocks, technical labels, key metadata (e.g. "v2.0.0").

**Type scale (desktop / mobile):**
- H1: 64px / 40px, weight 700, line-height 1.1
- H2: 48px / 32px, weight 700, line-height 1.2
- H3: 32px / 24px, weight 600, line-height 1.3
- Body: 16px / 16px, weight 400, line-height 1.6
- Small: 14px / 14px, weight 400, line-height 1.5

**Spacing scale:** Tailwind defaults (0, 1, 2, 4, 6, 8, 12, 16, 24 → multiples of 4px). Prefer wide vertical breathing room: section padding `py-24` (96px) is normal.

### Visual language we want to lean into

- **Dark-first.** Light mode exists but is secondary. Dark backgrounds with high-contrast white text. Glassmorphism cards (`bg-white/5` over the dark background, `backdrop-blur-lg`, `border border-white/10`).
- **Animated diagonal gradients** in the hero (slow, 8s loop, subtle). Floating blurred circles in primary cyan and secondary purple, 50% opacity, blurred 3xl. They should never compete with the text.
- **Grid backgrounds** (1px cyan lines, 50px spacing, 20% opacity) for technical/architectural sections.
- **No stock photography.** We use abstract gradient blobs, schematic diagrams, and code snippets. Avoid laptops-on-desks imagery.
- **Code is decoration.** Where it fits, include real-looking code snippets (Terraform, .NET minimal APIs, Flutter widgets, GitHub Actions YAML) as visual texture in service detail sections.
- **Icons:** thin-line (1.5–2px stroke) outline icons in white. Never colored, never filled.
- **No emojis** in product copy. Emojis are fine in blog post bodies.

### Visual things we want to move AWAY from

- The current homepage uses generic "we transform ideas" lottery-tier hero copy. Replace with technical-sounding direct claims.
- "Most Popular" badges on service cards feel SaaS-y. Replace with something more architectural — e.g. a small `// recommended` code-comment-style tag.
- The current value-cards block uses generic lightbulb / shield / handshake icons. We want something more domain-specific (terminal cursor, git branch, schema diagram, alert bell).
- Avoid drop shadows that look like Material Design defaults. Prefer subtle inner-glow / border-glow effects.

### Screens we want you to design

In this order of priority:

1. **Homepage** (`/`) — Hero, services preview (4 cards: Cloud Architecture, DevOps & SRE, AI & Automation, Mobile Apps), founder snapshot, recent blog posts, contact CTA. Currently dark with cyan gradients, animated floating blobs. Improve the visual hierarchy and replace generic icons.
2. **Services page** (`/servicios`) — 7 service cards in a 2-column grid. Each card: thin-line icon, title, description, feature list (6 bullets), timeline, "Custom quote" subtitle, "Let's talk" CTA. **No prices.** Make the cards feel architectural rather than e-commerce.
3. **Single service detail page** (new — does not exist yet) — pick `AI & Automation` as the example. Should include: hero with one-sentence value claim, "What we deliver" (the 6 bullets expanded into short paragraphs), an architecture/flow diagram, a sample code snippet, a 2–3 customer-style use cases, an inline CTA. This template will be reused for all 7 services.
4. **Blog post page** (`/blog/[slug]`) — long-form technical post, dark theme, reading-optimized typography, code blocks with syntax highlighting, a sticky table-of-contents on desktop, author byline with the founder's name and a tiny circular avatar with the gradient "V" mark.
5. **About page** (`/about`) — founder-led narrative: Erick Escobar as Founder & Principal Engineer, four disciplines (SWE / Cloud / DevOps / AI), short timeline, what it's like to work with us, photo placeholder.
6. **Contact page** (`/contact`) — single column form, generous spacing, asks for: name, email, phone, service of interest, *budget range* (we keep this — it qualifies leads even though we don't publish prices), project description. Right rail with WhatsApp, email, calendar booking link.
7. **Ventrue Social product landing** (new) — a separate page introducing the SaaS product (multi-client AI-driven content automation for TikTok/Instagram/LinkedIn). Should feel like a product page (with a screenshot mockup) rather than a service page. CTA = waitlist signup.

### UX requirements (hard constraints)

- **Bilingual layout.** Spanish text is ~15% longer than English on average. Every layout must accommodate the longer text without breaking. Avoid fixed-width text containers.
- **Dark mode primary, light mode secondary.** Light mode is supported but the brand identity lives in dark. Light-mode shouldn't be a pure inversion — soften the accent colors.
- **WCAG 2.1 AA.** Minimum contrast 4.5:1 for body text; 3:1 for large text. Cyan `#00d4ff` on `#0a0a0f` is OK. Cyan on white needs darkening to `#0284c7`.
- **Mobile-first.** Phone breakpoints are not an afterthought. Hero headlines must remain legible at 360px wide.
- **Performance.** Avoid heavy backdrop filters on the mobile breakpoint. Animations should respect `prefers-reduced-motion`.
- **No carousels.** No auto-rotating hero. No infinite-scroll testimonials. We will not use any of these.

### What we DON'T want

- Pricing on any public screen — every CTA is "Let's talk" / "Conversemos" leading to the contact form. We deliberately do not publish prices.
- Industry buzzwords without substance ("synergy," "next-gen," "cutting-edge").
- "Trusted by" logo walls unless we have at least 6 named, real clients (we don't yet).
- Vanity stat counters that imply more scale than we have ("50+ projects, 98% satisfaction"). If we use stats, they must be defensible.
- Animated number counters. Animations everywhere. Sparkles. AI-illustrated robots. We are not an AI-themed site, we are an engineering practice that uses AI when it fits.

### Deliverables

Generate the screens as fully-realized desktop comps at 1440×900 and mobile comps at 390×844. For each screen include:

1. A primary version (the production-ready proposal).
2. One alternative with a meaningfully different layout (not just a color swap).
3. Annotations explaining any decision that wasn't obvious from the brief.

Output should be ready to hand to a Tailwind-fluent frontend engineer to implement.

---

(End of master prompt.)

---

## Follow-up prompts you can send to Stitch after the master

Use these one at a time to iterate. Each one should include "(continuing the Ventrue Tech design system established earlier)" as the lead so Stitch keeps the tokens.

- "Now design the **AI & Automation service detail page** in the same system. Include the architecture diagram and code snippet. Show a typical flow: TikTok OAuth → content draft → AI assist → schedule → publish → metrics."
- "Now design the **Ventrue Social product landing page**. Hero with screenshot mockup, three feature blocks, waitlist signup, FAQ. Treat it as a product page, not a service page."
- "Now redesign the **footer** to feel less like a sitemap and more like a brand statement. Include the founder's name + a small gradient V mark, the legal links, contact, social, and a one-line manifesto."
- "Now design a **404 page** for ventrue.tech. Should feel on-brand — a terminal-style error message, a single CTA back to home, a small grid background."
- "Now design the **blog index page** — a chronological list with tag filters, search, and a featured article at the top."
- "Generate **6 alternative thin-line icons** to replace the current generic ones: terminal cursor (for DevOps), schema diagram (for Cloud Architecture), bot face (for AI), phone outline (for Mobile), API endpoint glyph (for APIs), advisor / fractional-CTO hat (or compass)."

## Things to update in this prompt over time

- When the founder photo exists, include it in the About-page section.
- When real client logos are available, add a "Trusted by" section to the deliverables.
- When Ventrue Social ships, swap the "screenshot mockup" line for an actual screenshot.
- After Stitch generates the first round, capture what worked and feed it back into the master prompt as additional guidance.
