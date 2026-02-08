# 🎬 Pipeline de Videos Automatizados para TikTok/Reels/Shorts

## Flujo End-to-End

```
Contenido Generado → Tortoise TTS → FFmpeg → Video Loop → Publicación Auto
```

---

## 🗣️ Paso 1: Tortoise TTS (Text-to-Speech)

### Instalación
```bash
# Python 3.10+
pip install tortoise-tts

# Versión rápida (5x más rápido)
pip install tortoise-tts-fast
```

### Script de Generación de Audio
```python
# scripts/generate_voiceover.py
import argparse
from tortoise.api import TextToSpeech
from tortoise.utils.audio import load_voice
import os

tts = TextToSpeech()

def generate_voice(text, voice="pat", output_path="output.wav"):
    """
    Voces disponibles: pat, ada, blade,emma, james, jessica
    """
    voice_samples, conditioning_latents = load_voice(voice)
    
    tts.tts_to_file(
        text=text,
        voice_samples=voice_samples,
        conditioning_latents=conditioning_latents,
        file_path=output_path,
        k=1,  # Qualidade
        temperature=0.8
    )

if __name__ == "__main__":
    import sys
    content = sys.argv[1] if len(sys.argv) > 1 else "Error: No text provided"
    generate_voice(content, "pat", "voiceover.wav")
```

### Voces Recomendadas
| Voz | Género | Estilo |
|-----|--------|--------|
| **pat** | Masculino | Profesional |
| **emma** | Femenino | Casual |
| **jessica** | Femenina | Jovial |
| **blade** | Masculino | Tech/Cool |

---

## 🎨 Paso 2: Creación de Video Loop

### FFmpeg - Generador de Videos

```bash
# Install FFmpeg
sudo apt install ffmpeg
```

```python
# scripts/create_loop_video.py
import subprocess
import os
import json
from PIL import Image, ImageDraw, ImageFont

def create_background_image(text, output_path, size=(1080, 1920)):
    """Crea imagen de fondo con texto"""
    img = Image.new('RGB', size, color='#0a0a0f')
    draw = ImageDraw.Draw(img)
    
    # Añadir gradiente visual (simplificado)
    for y in range(size[1]):
        color = int(255 * (y / size[1]) * 0.1)
        draw.line([(0, y), (size[0], y)], fill=(10, 10, 20 + color))
    
    # Guardar
    img.save(output_path)

def create_loop_video(
    background_image,
    audio_path,
    output_path,
    subtitles_file=None,
    duration=None
):
    """
    Crea video loop con:
    - Background animado
    - Audio TTS
    - Subtítulos sincronizados
    - Transiciones suaves
    """
    
    # Command FFmpeg
    cmd = [
        'ffmpeg',
        '-y',  # Overwrite
        '-loop', '1',
        '-i', background_image,
        '-i', audio_path,
        '-c:v', 'libx264',
        '-tune', 'stillimage',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-pix_fmt', 'yuv420p',
        '-shortest',
        output_path
    ]
    
    if duration:
        cmd.extend(['-t', str(duration)])
    
    subprocess.run(cmd, check=True)

def add_ken_burns_effect(input_path, output_path, zoom=1.02):
    """Efecto Ken Burns (zoom lento) para loop"""
    cmd = [
        'ffmpeg', '-y',
        '-i', input_path,
        '-vf', f"scale=1920:1080,zoompan=z='min(zoom+0.001*{zoom},1.5)':d=250:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920",
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '23',
        output_path
    ]
    subprocess.run(cmd, check=True)

def create_viral_subtitles(audio_path, output_path):
    """Genera subtitles con timing"""
    # Usar whisper para transcripción
    import whisper
    
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    
    # Crear archivo SRT
    srt_content = ""
    for i, segment in enumerate(result["segments"]):
        start = segment["start"]
        end = segment["end"]
        text = segment["text"]
        
        srt_content += f"{i+1}\n"
        srt_content += f"{format_time(start)} --> {format_time(end)}\n"
        srt_content += f"{text.upper()}\n\n"
    
    with open(output_path, 'w') as f:
        f.write(srt_content)

def format_time(seconds):
    return f"{int(seconds//3600):02d}:{int((seconds%3600)//60):02d}:{int(seconds%60):02d},{int((seconds%1)*1000):03d}"

if __name__ == "__main__":
    create_background_image("DevOps Tip #42", "bg.png")
    create_loop_video("bg.png", "voiceover.wav", "output.mp4")
```

---

## 🔄 Paso 3: Estrategias de LOOP Virales

### Tipo 1: Screen Recording Loop
```bash
# Grabar pantalla con código
# Transiciones suaves al final (3-5 segundos iguales al inicio)
```

### Tipo 2: Background Animado
```python
# Pattern: Gradient que se mueve
background = create_animated_gradient(duration=30)

# Añadir elementos que entran/salen
# Mantener atención con movimiento constante
```

### Tipo 3: Counting/Stacking
```
10 -> 9 -> 8 -> ... -> 1 -> (loop a 10)
```

### Tipo 4: Before/After
```
Código feo → Transformación → Código limpio → (loop)
```

### Fórmula Loop Perfecto:
```
[Hook: 0-3 seg] → [Contenido: 15-20 seg] → [CTA: 3 seg] → [Transición: 3 seg]
```

---

## 🤖 Paso 4: Automatización Completa

```python
# scripts/generate_social_video.py
import os
import json
from datetime import datetime

class SocialVideoGenerator:
    def __init__(self, config_path="config.json"):
        with open(config_path) as f:
            self.config = json.load(f)
    
    def generate_video(self, topic, platform="tiktok"):
        """
        Pipeline completo:
        1. Obtener contenido del content manager
        2. Generar audio TTS
        3. Crear visuales
        4. Renderizar video
        5. Exportar para plataforma
        """
        platform_config = self.config["platforms"][platform]
        
        # 1. Generate voiceover
        os.system(f"""
            python scripts/generate_voiceover.py \\
                "{topic}" \\
                --voice {platform_config['voice']} \\
                --output voiceover.wav
        """)
        
        # 2. Create visuals
        background = self.create_visual(topic, platform_config)
        
        # 3. Render video
        output = f"output_{platform}.mp4"
        self.render_video(background, "voiceover.wav", output, platform_config)
        
        # 4. Optimize for platform
        self.optimize_for_platform(output, platform)
        
        return output
    
    def batch_generate(self, topics, platform="tiktok"):
        """Generar múltiples videos"""
        videos = []
        for topic in topics:
            video = self.generate_video(topic, platform)
            videos.append(video)
        return videos

if __name__ == "__main__":
    generator = SocialVideoGenerator()
    
    # Topics del content manager
    topics = [
        "5 DevOps mistakes you're making",
        "Why I switched from Docker to Podman",
        "GitHub Copilot vs Claude Code",
        "AWS costs that will surprise you"
    ]
    
    videos = generator.batch_generate(topics, "tiktok")
```

---

## 📊 Configuración por Plataforma

```json
{
  "platforms": {
    "tiktok": {
      "resolution": "1080x1920",
      "duration": "30-60s",
      "voice": "pat",
      "aspect_ratio": "9:16",
      "hashtags": "#devops #coding #programming"
    },
    "instagram_reel": {
      "resolution": "1080x1350",
      "duration": "30s",
      "voice": "emma",
      "aspect_ratio": "4:5",
      "hashtags": "#software #developer"
    },
    "youtube_shorts": {
      "resolution": "1080x1920",
      "duration": "60s",
      "voice": "james",
      "aspect_ratio": "9:16",
      "hashtags": "#tutorial #programming"
    }
  }
}
```

---

## 🛠️ Herramientas Alternativas (Más Fáciles)

| Herramienta | Descripción | Precio |
|-------------|-------------|--------|
| **HeyGen** | AI avatars + TTS | $24/mes |
| **Synthesia** | AI avatars | $30/mes |
| **Pictory** | Article to video | $19/mes |
| **Runway ML** | AI video generation | $12/mes |
| **D-ID** | Talking avatars | $5.90/mes |

---

## 🎯 Contenido Recomendado (Nicho DevOps/Development)

| Formato | Duración | Engagement |
|---------|----------|------------|
| "5 mistakes in..." | 30s | Alto |
| "Why X is better than Y" | 45s | Medio-Alto |
| "Git trick you didn't know" | 20s | Alto |
| "Setup tour: dev environment" | 60s | Medio |
| "Code review of the day" | 45s | Alto |

---

## 📦 Dependencias

```txt
# requirements.txt
tortoise-tts>=0.1.0
torch>=2.0.0
ffmpeg-python>=0.2.0
Pillow>=9.0.0
openai-whisper>=20231117
```

---

## 🚀 Próximos Pasos

1. [ ] Instalar Tortoise TTS locally
2. [ ] Crear script básico de voiceover
3. [ ] Configurar FFmpeg pipeline
4. [ ] Crear templates visuales
5. [ ] Testear con 10 videos
6. [ ] Conectar con OneUp/Postiz para publicación
