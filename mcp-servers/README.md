# 🐢 Tortoise TTS MCP Server - Docker Deployment

Model Context Protocol server for high-quality text-to-speech using Tortoise TTS.

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Build and run
cd mcp-servers
docker compose up --build

# Run in background
docker compose up -d

# View logs
docker compose logs -f tortoise-tts-mcp
```

### Option 2: Manual Docker Build

```bash
# Build image
docker build -t tortoise-tts-mcp mcp-servers/

# Run container
docker run -it --rm \
  -v tortoise-models:/home/appuser/.cache/tortoise \
  -v tortoise-voices:/home/appuser/.tortoise \
  -v $(pwd)/output:/app/output \
  tortoise-tts-mcp
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `TORTOISE_MODELS_DIR` | `~/.cache/tortoise` | Models cache directory |
| `TORTOISE_VOICES_DIR` | `~/.tortoise` | Custom voices directory |
| `OUTPUT_DIR` | `/app/output` | Generated audio output |
| `PYTHONUNBUFFERED` | `1` | Python stdout unbuffered |

### GPU Support (Optional)

For faster inference with GPU:

```yaml
# Add to docker-compose.yml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: 1
          capabilities: [gpu]
```

---

## 🎯 Docker Desktop MCP Toolkit Integration

### Step 1: Enable Docker MCP Toolkit

1. Open **Docker Desktop**
2. Go to **Settings** → **Beta features**
3. Enable **Enable Docker MCP Toolkit**
4. Click **Apply**

### Step 2: Add Tortoise TTS Server

#### Option A: Using Docker MCP Toolkit Catalog

```bash
# Add server via CLI
docker mcp add tortoise-tts \
  --image n3cr0murl0c/tortoise-tts-mcp:latest
```

#### Option B: Manual Configuration

Add to your MCP configuration file:

```json
{
  "mcpServers": {
    "tortoise-tts": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-v", "tortoise-models:/home/appuser/.cache/tortoise",
        "-v", "tortoise-voices:/home/appuser/.tortoise",
        "-e", "TORTOISE_MODELS_DIR=/home/appuser/.cache/tortoise",
        "n3cr0murl0c/tortoise-tts-mcp:latest"
      ]
    }
  }
}
```

---

## 🐳 Manual Docker Run Examples

### Basic Usage

```bash
docker run -it --rm \
  -v tortoise-models:/home/appuser/.cache/tortoise \
  -v tortoise-voices:/home/appuser/.tortoise \
  -v $(pwd)/output:/app/output \
  n3cr0murl0c/tortoise-tts-mcp:latest \
  --init
```

### Generate Audio

```bash
docker run -it --rm \
  -v tortoise-models:/home/appuser/.cache/tortoise \
  -v tortoise-voices:/home/appuser/.tortoise \
  -v $(pwd)/output:/app/output \
  n3cr0murl0c/tortoise-tts-mcp:latest \
  --text "Hello, this is Tortoise TTS!" \
  --voice pat \
  --quality high_quality
```

---

## 🛠️ Development

### Build Multi-Platform Image

```bash
# Build for amd64 and arm64
docker buildx build --platform linux/amd64,linux/arm64 \
  -t n3cr0murl0c/tortoise-tts-mcp:latest \
  --push .
```

### Push to Registry

```bash
# Login to Docker Hub
docker login

# Push image
docker push n3cr0murl0c/tortoise-tts-mcp:latest
```

---

## 📁 Volume Management

### List Volumes

```bash
docker volume ls | grep tortoise
```

### Backup Volume

```bash
docker run --rm \
  -v tortoise-models:/data \
  -v $(pwd)/backup:/backup \
  alpine \
  tar czf /backup/models.tar.gz -C /data .
```

### Restore Volume

```bash
docker run --rm \
  -v tortoise-models:/data \
  -v $(pwd)/backup:/backup \
  alpine \
  tar xzf /backup/models.tar.gz -C /data .
```

---

## 🐛 Troubleshooting

### Models Not Downloading

```bash
# Check models directory permissions
docker exec tortoise-tts-mcp ls -la /home/appuser/.cache/tortoise

# Manual download
docker exec -it tortoise-tts-mcp python -c "from tortoise.api import TextToSpeech; tts = TextToSpeech()"
```

### Out of Memory

```bash
# Increase Docker memory limit to 4GB+ in Docker Desktop preferences
```

### Slow Inference

```bash
# Use GPU if available
docker run ... --gpus all ...

# Or use fast quality mode
--quality fast
```

---

## 📚 Related Files

- `tortoise_tts_mcp.py` - Main MCP server implementation
- `requirements.txt` - Python dependencies
- `Dockerfile` - Multi-stage Docker build
- `docker-compose.yml` - Orchestration file
- `SOCIAL_AUTOMATION.md` - Content automation guide
- `AUTO_VIDEO_GENERATION.md` - Video pipeline documentation

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - See LICENSE file for details.
