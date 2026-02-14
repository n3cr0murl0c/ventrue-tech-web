#!/bin/bash
# Ventrue Tech - Auto Content Publisher
# Genera un nuevo artículo de blog automáticamente

cd /home/n3cr0murl0c/.openclaw/workspace/ventrue-tech-web

# Fecha actual
TODAY=$(date +%Y-%m-%d)
SLUG="articulo-auto-$(date +%Y%m%d%H%M%S)"

# Topics rotativos basados en día de la semana
DAY_OF_WEEK=$(date +%u)

case $DAY_OF_WEEK in
  1) # Lunes - DevOps
    TOPIC="devops"
    TITLE="DevOps Monday: "
    ;;
  2) # Martes - .NET
    TOPIC="dotnet"
    TITLE=".NET Tuesday: "
    ;;
  3) # Miércoles - Flutter
    TOPIC="flutter"
    TITLE="Flutter Wednesday: "
    ;;
  4) # Jueves - Cloud/Azure
    TOPIC="cloud"
    TITLE="Cloud Thursday: "
    ;;
  5) # Viernes - AI/ML
    TOPIC="ai"
    TITLE="AI Friday: "
    ;;
  6) # Sábado - Tips rápidos
    TOPIC="tips"
    TITLE="Quick Tip: "
    ;;
  7) # Domingo - Resumen
    TOPIC="weekly"
    TITLE="Weekly Roundup: "
    ;;
esac

# Plantilla de artículo
ARTICLE=$(cat <<EOF
---
title: "${TITLE} $(date +%Y)"
description: "${TITLE} $(date +%Y)"
pubDate: ${TODAY}
author: "Ventrue Tech Team"
tags: ["${TOPIC}", "automation", "2026"]
lang: "es"
featured: false
readTime: 5
---

# ${TITLE}


## Puntos Clave

1. Contenido relevante sobre ${TOPIC}
2. Ejemplos prácticos
3. Recursos adicionales

## Conclusión

¡Continúa aprendiendo sobre ${TOPIC}!

---
Tags: #${TOPIC} #VentrueTech #Desarrollo
EOF
)

# Crear archivo de artículo
echo "$ARTICLE" > src/content/blog/${SLUG}.md

echo "✅ Artículo creado: ${SLUG}.md"
