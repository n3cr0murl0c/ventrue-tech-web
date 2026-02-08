# =====================================================
# Tortoise TTS MCP Server - Docker Image
# =====================================================

# Build multi-platform: linux/amd64 and linux/arm64
FROM --platform=$BUILDPLATFORM python:3.10-slim AS builder

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    make \
    libsox-dev \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip wheel && \
    pip install --no-cache-dir -r requirements.txt

# =====================================================
# Production Stage
# =====================================================
FROM python:3.10-slim AS production

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libsox-dev \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash appuser && \
    mkdir -p /home/appuser/.cache/tortoise && \
    mkdir -p /home/appuser/.tortoise && \
    chown -R appuser:appuser /home/appuser

WORKDIR /app

# Copy from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy application
COPY --chown=appuser:appuser . .

# Switch to non-root user
USER appuser

# Environment variables
ENV TORTOISE_MODELS_DIR=/home/appuser/.cache/tortoise
ENV TORTOISE_VOICES_DIR=/home/appuser/.tortoise
ENV PYTHONUNBUFFERED=1

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import sys; sys.exit(0)" || exit 1

# Expose port (if running as server)
EXPOSE 8080

# Default command - run MCP server
CMD ["python", "tortoise_tts_mcp.py"]
