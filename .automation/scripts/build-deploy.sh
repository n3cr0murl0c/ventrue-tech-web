#!/bin/bash
# Ventrue Tech - Build & Deploy Script
# Compila y despliega automáticamente a GitHub

cd /home/n3cr0murl0c/.openclaw/workspace/ventrue-tech-web

echo "🚀 Iniciando build automático..."

# Instalar dependencias si es necesario
npm ci --prefer-offline --no-audit 2>/dev/null

# Build del sitio
echo "📦 Compilando sitio..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build exitoso!"
    
    # Commit y push automático
    echo "📤 Commiteando cambios..."
    git add -A
    git commit -m "Auto-update: $(date +'%Y-%m-%d %H:%M')" 2>/dev/null
    
    # Push a GitHub
    echo "🚀 Push a GitHub..."
    git push origin main 2>/dev/null
    
    echo "🎉 Deploy completado!"
else
    echo "❌ Error en el build"
    exit 1
fi
