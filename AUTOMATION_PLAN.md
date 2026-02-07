# 🤖 Ventrue Tech - Plan de Automatización de Contenido

## 📅 Resumen del Schedule

| Job | Frecuencia | Hora | Acción |
|-----|------------|------|--------|
| **Social Media** | 3x/día | 8AM, 12PM, 6PM | Tweets/posts automáticos |
| **Content Generator** | Daily | 9AM | Nuevo artículo de blog |
| **Sitemap Update** | Daily | 2AM | Regenerar sitemap + build |
| **Weekly Push** | Domingo | 10AM | Deploy a GitHub |

---

## 🚀 Jobs Configurados

### 1. Ventrue: Social Media Auto-Post
- **Frecuencia:** 8AM, 12PM, 6PM (diario)
- **Acción:** Genera tweets/posts sobre Dev, Flutter, .NET, DevOps, AI
- **Hashtags:** #DevLatam #Flutter #DotNet #DevOps #AI

### 2. Ventrue: Daily Content Generator
- **Frecuencia:** 9AM (diario)
- **Acción:** Genera artículo de blog automáticamente
- **Temas rotativos:**
  - Lunes → DevOps
  - Martes → .NET
  - Miércoles → Flutter
  - Jueves → Cloud/Azure
  - Viernes → AI/ML
  - Sábado → Tips rápidos
  - Domingo → Resumen semanal

### 3. Ventrue: Sitemap Update
- **Frecuencia:** 2AM (diario)
- **Acción:** Regenera sitemap, build, commit

### 4. Ventrue: Weekly Content Push
- **Frecuencia:** Domingo 10AM
- **Acción:** Build completo + push a GitHub

---

## 📂 Scripts de Automatización

```
.automation/
└── scripts/
    ├── auto-publish.sh      # Publicador básico
    ├── generate-content.sh   # Generador avanzado
    └── build-deploy.sh      # Build + deploy
```

### Usar manualmente:

```bash
# Generar artículo
bash .automation/scripts/generate-content.sh

# Deploy automático
bash .automation/scripts/build-deploy.sh
```

---

## 📊 Métricas Automáticas

| Métrica | Herramienta | Frecuencia |
|---------|-------------|------------|
| Traffic | Google Analytics 4 | Real-time |
| Rankings | Ahrefs/SEMrush | Semanal |
| Backlinks | Ahrefs | Semanal |
| Social | Buffer Analytics | Diario |
| Newsletter | ConvertKit | Por email |

---

## 🎯 Contenido Generado por Día

| Día | Topic Principal | Artículos/Semana |
|-----|----------------|-----------------|
| Lunes | DevOps | 1 |
| Martes | .NET | 1 |
| Miércoles | Flutter | 1 |
| Jueves | Cloud/Azure | 1 |
| Viernes | AI/ML | 1 |
| Sábado | Tips | 1 |
| Domingo | Roundup | 1 |

**Total: 7 artículos/semana**

---

## 🔧 Configuración Avanzada

### Variables de Entorno

```bash
# GitHub Token (ya configurado)
export GH_TOKEN=***

# Google Analytics ID (reemplazar en SEO.astro)
GA4_ID=G-XXXXXXXXXX
```

### Verificar Jobs Activos

```bash
openclaw cron list
```

### Logs de Ejecución

Los jobs annuncian resultados por Telegram automáticamente.

---

## 📈 Objetivos de Automatización

| Métrica | Objetivo 30 días | Objetivo 90 días |
|---------|-----------------|------------------|
| Artículos publicados | 20 | 60 |
| Organic visits | 500 | 2,000 |
| Email subscribers | 100 | 500 |
| Social posts | 90 | 270 |
| Revenue | $0 | $100+ |

---

*Documento creado: 2026-02-07*
*Timezone: America/Guayaquil*
