# Content Angles — Two Tracks

Hermes reads this file every cron run. Each angle has: hook formula, channel preference, CTA, and an example. Keep examples short — Hermes uses them as style anchors, not templates to copy.

---

## Track A — Dev brand (Ventrue Tech for LatAm developers)

Aligns with [CONTENT_STRATEGY.md](../../CONTENT_STRATEGY.md). Long-form authority, technical credibility, mostly English + Spanish, primary channels **LinkedIn, X, dev.to, GitHub**.

| Day | Topic | Hook formula | CTA |
|---|---|---|---|
| **Lun** | DevOps / Azure | "Así monto un pipeline X que normalmente toma Y, en Z minutos" | Link to blog tutorial |
| **Mar** | .NET / C# | "Vertical Slice vs Clean Architecture: el trade-off real con código" | Link to repo |
| **Mié** | Flutter / Mobile | "Lo que aprendí construyendo FinHelper (cifra incómoda)" | Link to FinHelper / blog |
| **Jue** | Cloud / IoT | "Lo que tu Azure Function NO te está cobrando (y debería preocuparte)" | Link to teardown |
| **Vie** | AI / ML | "Gemma corriendo local en mi torre, $0/mes — así genero este hilo" | Link to repo / Discord |
| **Sáb** | Tips / Tools | "5 comandos de `gh` que nadie te enseñó" | Newsletter signup |
| **Dom** | Roundup | "La semana en Ventrue Tech: 3 envíos, 1 fracaso, 1 lección" | Newsletter signup |

**Style anchors:**
- No emojis-cohete (no 🚀). Una sola línea de hook. Código real, no pseudo-código.
- Cierra con una pregunta concreta para invitar respuestas (engagement → algorithm).
- En LinkedIn: 3 párrafos máximo, salto de línea entre cada uno. En X: hilo de 4-6 tweets, primer tweet = hook completo standalone.

**CTA library (rotate):**
- "DM si te interesa ver el repo completo"
- "Newsletter semanal con un caso real cada viernes → ventrue.tech/newsletter"
- "Code review 1hr, $75 — agenda en ventrue.tech/consultoria"
- "FinHelper en Play Store si quieres ver el resultado final"

---

## Track B — WhatsApp-bot product (SMB owners in Ecuador)

Source kit: `~/HermesAgent/ventas/kit-ventas.md`. Short-cycle, vernacular Spanish-Ecuador, mostly visual. Primary channels **Instagram, Facebook, TikTok, Threads**, light cross-post to X.

| Slot | Ángulo | Fórmula del hook | CTA |
|---|---|---|---|
| **8AM Lun-Vie** | Problema→Solución | "[Negocio] perdía [N] clientes/semana por no contestar después de las 6pm. Le montamos esto." | "DM 'demo' y te armo una con tus datos" |
| **12PM Lun-Vie** | Demo 60s | Loom/screencap del bot respondiendo en WhatsApp en tiempo real | "DM 'demo'" |
| **6PM Lun-Vie** | Cifra incómoda | "El 67% de PYMEs en Ecuador no contesta DMs después de las 18h" | "Demo gratis hoy → DM" |
| **Sáb 10AM** | Detrás de escena | "Esta semana automatizamos 3 peluquerías. Así se ve antes y después." | "Setup desde $29 → DM 'precios'" |
| **Dom 10AM** | Testimonio | Texto/video del cliente con autorización | "Tu negocio puede ser el siguiente → DM" |

**Pricing anchors (del kit-ventas):**
- Básico $29 setup + $15/mes
- Pro $59 setup + $25/mes (recomendado)
- Premium $99 setup + $39/mes
- **Primer cliente:** $0 setup + $15/mes a cambio de testimonio en video

**Style anchors:**
- Español de Ecuador, vernacular. "Usted" en sectores formales (consultorios, talleres). "Vos" o "vos sabés" en gimnasios/barberías.
- Emojis OK pero medidos: 👋, 💬, ⚡, ✅. Nada de 🚀💯🔥 saturado.
- Hashtags en IG (5-7): #PymesEcuador #Quito #AsistentesIA #WhatsAppBusiness #Emprendimiento + sector (#Peluqueria, #Restaurante, #Taller).
- TikTok: vertical 9:16, primeros 2 segundos = el dolor, sin intro. CTA pinneado en comentario.

**Guion CTA estándar (DM):**
> Hola [nombre], vi [negocio] en [IG/Maps]. Armo asistentes que contestan solos los WhatsApp del negocio (precios, horarios, citas) 24/7, para que no pierdan clientes cuando no pueden responder. ¿Le hago una demo gratis con sus datos para que la pruebe? Sin compromiso.

---

## Cross-track rules

1. **Never cross-pollute audiences.** A Track A LinkedIn post about Azure Functions does NOT get cross-posted to Track B Instagram. Channel set is enforced at the Postiz integration ID level — see `.env`.
2. **Track B publishes never use the dev brand voice.** SMB owners don't care about Clean Architecture. Hermes' system prompt for Track B explicitly excludes dev jargon.
3. **One weekly bridge post:** Sundays on LinkedIn, the dev brand can mention "this week we shipped X bots for SMBs" — credibility for the consultancy without diluting Track B.
4. **Holidays:** Track B goes silent on Ecuador national holidays (Día del Trabajo, Independencia, etc.). Track A continues if there's value.
