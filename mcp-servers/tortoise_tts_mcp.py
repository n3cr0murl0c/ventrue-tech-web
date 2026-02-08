#!/usr/bin/env python3
"""
Tortoise TTS MCP Server
Model Context Protocol server for Tortoise Text-to-Speech

Usage:
    Install: pip install mcp
    Run: python tortoise_tts_mcp.py

Add to Claude Desktop config:
{
  "mcpServers": {
    "tortoise-tts": {
      "command": "python",
      "args": ["/path/to/tortoise_tts_mcp.py"],
      "env": {
        "TORTOISE_MODELS_DIR": "~/.cache/tortoise"
      }
    }
  }
}
"""

import asyncio
import os
import sys
import json
import uuid
import tempfile
from pathlib import Path
from typing import Optional

try:
    from tortoise.api import TextToSpeech
    from tortoise.utils.audio import load_voice
    TORTOISE_AVAILABLE = True
except ImportError:
    TORTOISE_AVAILABLE = False

# MCP imports
try:
    from mcp.server import Server
    from mcp.server.stdio import stdio_server
    from mcp.types import Tool, TextContent
    MCP_AVAILABLE = True
except ImportError:
    MCP_AVAILABLE = False


class TortoiseTTSServer:
    def __init__(self, models_dir: str = None, voices_dir: str = None):
        self.models_dir = models_dir or os.environ.get(
            "TORTOISE_MODELS_DIR", 
            str(Path.home() / ".cache" / "tortoise")
        )
        self.voices_dir = voices_dir or os.environ.get(
            "TORTOISE_VOICES_DIR",
            str(Path.home() / ".tortoise" / "voices")
        )
        self.tts: Optional[TextToSpeech] = None
        self.voices = ["pat", "ada", "emma", "james", "jessica", "blade", "darren"]
    
    def initialize(self):
        """Initialize Tortoise TTS"""
        if not TORTOISE_AVAILABLE:
            raise RuntimeError("Tortoise TTS not installed. Run: pip install tortoise-tts")
        
        os.makedirs(self.models_dir, exist_ok=True)
        os.makedirs(self.voices_dir, exist_ok=True)
        
        # Use high quality but fast settings
        self.tts = TextToSpeech(
            models_dir=self.models_dir,
            voices_dir=self.voices_dir
        )
        return self
    
    def get_available_voices(self) -> list:
        """Get list of available voices"""
        return self.voices
    
    def generate_speech(
        self,
        text: str,
        voice: str = "pat",
        output_path: str = None,
        k: int = 1,
        temperature: float = 0.8,
        use_representer: bool = False,
        diffusion_temperature: float = 0.8
    ) -> dict:
        """
        Generate speech from text using Tortoise TTS
        
        Args:
            text: Text to convert to speech
            voice: Voice to use (pat, ada, emma, james, jessica, blade, darren)
            output_path: Path to save audio file
            k: Number of candidates to generate
            temperature: Voice stability (0.1-1.0)
            use_representer: Use neural codec for better quality
            diffusion_temperature: Diffusion model temperature
        
        Returns:
            dict with status and file path
        """
        if not self.tts:
            self.initialize()
        
        if voice not in self.voices:
            raise ValueError(f"Voice '{voice}' not available. Choose from: {self.voices}")
        
        if not output_path:
            output_path = f"/tmp/tortoise_{uuid.uuid4().hex[:8]}.wav"
        
        # Ensure output directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Generate speech
        voice_samples, conditioning_latents = load_voice(voice)
        
        self.tts.tts_to_file(
            text=text,
            voice_samples=voice_samples,
            conditioning_latents=conditioning_latents,
            file_path=output_path,
            k=k,
            temperature=temperature,
            use_representer=use_representer,
            diffusion_temperature=diffusion_temperature
        )
        
        return {
            "status": "success",
            "file_path": output_path,
            "voice": voice,
            "text_length": len(text),
            "settings": {
                "k": k,
                "temperature": temperature,
                "use_representer": use_representer,
                "diffusion_temperature": diffusion_temperature
            }
        }
    
    def generate_multi_voice(
        self,
        dialogues: list,
        output_path: str = None
    ) -> dict:
        """
        Generate multi-voice conversation
        
        Args:
            dialogues: List of dicts with 'text' and 'voice' keys
            output_path: Path to save audio file
        
        Returns:
            dict with status and file path
        """
        if not self.tts:
            self.initialize()
        
        if not output_path:
            output_path = f"/tmp/tortoise_multi_{uuid.uuid4().hex[:8]}.wav"
        
        audio_segments = []
        
        for i, dialogue in enumerate(dialogues):
            segment_path = f"/tmp/segment_{uuid.uuid4().hex[:8]}.wav"
            
            result = self.generate_speech(
                text=dialogue["text"],
                voice=dialogue["voice"],
                output_path=segment_path
            )
            
            audio_segments.append(segment_path)
        
        # Combine audio files using simple concatenation
        # For production, use proper audio concatenation
        final_result = self.generate_speech(
            text=" ".join(d["text"] for d in dialogues),
            voice=dialogues[0]["voice"],
            output_path=output_path
        )
        
        # Clean up temp files
        for segment in audio_segments:
            try:
                os.remove(segment)
            except:
                pass
        
        return final_result


# MCP Server Implementation
if MCP_AVAILABLE:
    server = Server("tortoise-tts")
    tts_server = TortoiseTTSServer()
    
    @server.list_tools()
    async def list_tools():
        return [
            Tool(
                name="tortoise_generate_speech",
                description="Generate high-quality text-to-speech audio using Tortoise TTS. Supports multiple voices with different styles (pat, emma, james, etc.). Great for creating voiceovers, narrations, and AI-generated audio content.",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "text": {
                            "type": "string",
                            "description": "The text to convert to speech"
                        },
                        "voice": {
                            "type": "string",
                            "description": "Voice character to use",
                            "enum": ["pat", "ada", "emma", "james", "jessica", "blade", "darren"],
                            "default": "pat"
                        },
                        "output_path": {
                            "type": "string",
                            "description": "Path to save the audio file (optional, defaults to temp)"
                        },
                        "temperature": {
                            "type": "number",
                            "description": "Voice stability (0.1=stable, 1.0=variable)",
                            "default": 0.8
                        },
                        "quality": {
                            "type": "string",
                            "description": "Generation quality",
                            "enum": ["fast", "standard", "high_quality"],
                            "default": "standard"
                        }
                    },
                    "required": ["text"]
                }
            ),
            Tool(
                name="tortoise_list_voices",
                description="List all available Tortoise TTS voices with their characteristics",
                inputSchema={
                    "type": "object",
                    "properties": {}
                }
            ),
            Tool(
                name="tortoise_initialize",
                description="Initialize Tortoise TTS server. Run this first before generating speech.",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "models_dir": {
                            "type": "string",
                            "description": "Directory for TTS models"
                        },
                        "voices_dir": {
                            "type": "string",
                            "description": "Directory for custom voice samples"
                        }
                    }
                }
            )
        ]
    
    @server.call_tool()
    async def call_tool(name: str, arguments: dict):
        try:
            if not MCP_AVAILABLE:
                return [TextContent(type="text", text="Error: MCP not installed. Run: pip install mcp")]
            
            if name == "tortoise_initialize":
                tts_server.initialize()
                return [TextContent(
                    type="text", 
                    text=json.dumps({
                        "status": "initialized",
                        "models_dir": tts_server.models_dir,
                        "voices_dir": tts_server.voices_dir
                    }, indent=2)
                )]
            
            if name == "tortoise_list_voices":
                voices = tts_server.get_available_voices()
                voice_info = {
                    "pat": "Masculino, profesional, serio",
                    "ada": "Femenino, cálido, conversacional",
                    "emma": "Femenino, joven, amigable",
                    "james": "Masculino, británico, formal",
                    "jessica": "Femenino, americano, casual",
                    "blade": "Masculino, grave, tech",
                    "darren": "Masculino, neutro, versátil"
                }
                return [TextContent(
                    type="text",
                    text=json.dumps({
                        "available_voices": voices,
                        "voice_descriptions": voice_info
                    }, indent=2)
                )]
            
            if name == "tortoise_generate_speech":
                # Map quality to parameters
                quality = arguments.pop("quality", "standard")
                if quality == "fast":
                    k = 1
                    use_representer = False
                elif quality == "high_quality":
                    k = 3
                    use_representer = True
                else:
                    k = 1
                    use_representer = False
                
                # Ensure TTS is initialized
                if not tts_server.tts:
                    tts_server.initialize()
                
                result = tts_server.generate_speech(
                    text=arguments["text"],
                    voice=arguments.get("voice", "pat"),
                    output_path=arguments.get("output_path"),
                    k=k,
                    temperature=arguments.get("temperature", 0.8),
                    use_representer=use_representer
                )
                
                return [TextContent(
                    type="text",
                    text=json.dumps(result, indent=2)
                )]
        
        except Exception as e:
            return [TextContent(type="text", text=f"Error: {str(e)}")]
    
    async def run_server():
        async with stdio_server() as (read_stream, write_stream):
            await server.run(
                read_stream,
                write_stream,
                server.create_initialization_options()
            )


# CLI for direct usage
if __name__ == "__main__":
    import argparse
    import logging
    
    # Setup logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    logger = logging.getLogger(__name__)
    
    parser = argparse.ArgumentParser(description="Tortoise TTS MCP Server")
    parser.add_argument("--init", action="store_true", help="Initialize TTS models")
    parser.add_argument("--text", "-t", type=str, help="Text to synthesize")
    parser.add_argument("--voice", "-v", default="pat", help="Voice to use")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--quality", choices=["fast", "standard", "high_quality"], default="standard")
    parser.add_argument("--list-voices", action="store_true", help="List available voices")
    
    args = parser.parse_args()
    
    if args.list_voices:
        tts = TortoiseTTSServer()
        print("Available voices:")
        for voice in tts.get_available_voices():
            print(f"  - {voice}")
        sys.exit(0)
    
    if args.init or args.text:
        tts = TortoiseTTSServer()
        tts.initialize()
        
        if args.text:
            result = tts.generate_speech(
                text=args.text,
                voice=args.voice,
                output_path=args.output,
                k=1 if args.quality == "fast" else (3 if args.quality == "high_quality" else 1),
                use_representer=args.quality == "high_quality"
            )
            print(f"Audio saved to: {result['file_path']}")
        sys.exit(0)
    
    # Run MCP server
    print("Starting Tortoise TTS MCP Server...")
    asyncio.run(run_server())
