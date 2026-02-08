#!/usr/bin/env python3
"""
Auto-Publish Blog Posts to Social Media
Integrates with social-cli-mcp for Twitter/X, LinkedIn, Reddit, Instagram

Usage:
    python auto_publish_blog.py /path/to/blog/post.md
    python auto_publish_blog.py --url "https://ventrue.tech/blog/new-post"
"""

import os
import sys
import json
import subprocess
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional

# Configuration
SOCIAL_CLI_PATH = "/home/n3cr0murl0c/Documents/GitHub/social-cli-mcp"
SITE_URL = "https://ventrue.tech"

# Hashtag mappings by category
HASHTAG_MAP = {
    "devops": ["DevOps", "CI/CD", "Docker", "Kubernetes", "Automation"],
    "azure": ["Azure", "Cloud", "Microsoft", "CloudComputing"],
    "dotnet": [".NET", "CSharp", "Programming", "Backend"],
    "flutter": ["Flutter", "MobileDev", "Dart", "iOS", "Android"],
    "ai": ["AI", "MachineLearning", "Tech", "Innovation"],
    "general": ["SoftwareDevelopment", "Coding", "Programming", "Tech"],
    "career": ["TechJobs", "DevLife", "CodingLife"],
}

# Post templates
TEMPLATES = {
    "twitter": """📝 Nuevo artículo: {title}

{summary}

🔗 {url}

{hashtags}""",

    "linkedin": """🚀 Nuevo artículo publicado!

{title}

{summary}

👉 Lee el artículo completo: {url}

#VentrueTech #SoftwareDevelopment {hashtags}""",

    "reddit": """📝 {title}

{summary}

🔗 [Leer más]({url})

讨论 en r/devops o r/programming""",
}


def get_hashtags(tags: List[str], platform: str = "twitter") -> str:
    """Generate hashtags from article tags"""
    hashtags = []
    for tag in tags:
        tag_lower = tag.lower()
        for category, category_tags in HASHTAG_MAP.items():
            if any(ct.lower() in tag_lower for ct in category_tags):
                hashtags.extend([f"#{t}" for t in category_tags[:3]])
                break
        else:
            hashtags.append(f"#{tag.replace(' ', '')}")
    
    # Remove duplicates and limit
    seen = set()
    unique = []
    for h in hashtags:
        h_lower = h.lower()
        if h_lower not in seen:
            seen.add(h_lower)
            unique.append(h)
    
    if platform == "twitter":
        return ' '.join(unique[:5])
    elif platform == "linkedin":
        return ' '.join(unique[:8])
    else:
        return ' '.join(unique)


def extract_frontmatter(content: str) -> Dict:
    """Extract YAML frontmatter from markdown"""
    import re
    
    fm_match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if not fm_match:
        return {}
    
    frontmatter = {}
    lines = fm_match.group(1).split('\n')
    for line in lines:
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip()
    
    return frontmatter


def generate_social_content(frontmatter: Dict) -> Dict:
    """Generate social media content from blog post"""
    title = frontmatter.get('title', 'Nuevo artículo')
    summary = frontmatter.get('description', frontmatter.get('excerpt', ''))
    tags = frontmatter.get('tags', '').split(', ')
    tags = [t.strip() for t in tags if t.strip()]
    
    url = f"{SITE_URL}/blog/{frontmatter.get('slug', '')}"
    
    return {
        'title': title,
        'summary': summary[:200] + '...' if len(summary) > 200 else summary,
        'url': url,
        'tags': tags,
        'twitter': TEMPLATES['twitter'].format(
            title=title,
            summary=summary[:200],
            url=url,
            hashtags=get_hashtags(tags, 'twitter')
        ),
        'linkedin': TEMPLATES['linkedin'].format(
            title=title,
            summary=summary[:200],
            url=url,
            hashtags=get_hashtags(tags, 'linkedin')
        ),
        'reddit': TEMPLATES['reddit'].format(
            title=title,
            summary=summary[:200],
            url=url
        ),
    }


def publish_to_social(content: str, platforms: List[str]) -> Dict:
    """Publish content using social-cli-mcp"""
    result = {
        'success': True,
        'platforms': {}
    }
    
    for platform in platforms:
        try:
            cmd = [
                "node", f"{SOCIAL_CLI_PATH}/dist/cli.js",
                "post", content,
                f"--{platform}"
            ]
            
            output = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            result['platforms'][platform] = {
                'success': output.returncode == 0,
                'output': output.stdout.strip() if output.stdout else output.stderr.strip()
            }
            
        except Exception as e:
            result['platforms'][platform] = {
                'success': False,
                'error': str(e)
            }
    
    return result


def publish_blog_post(file_path: str, platforms: List[str] = None):
    """Main function to publish a blog post"""
    if platforms is None:
        platforms = ["twitter", "linkedin"]
    
    print(f"📝 Processing: {file_path}")
    
    # Read file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract metadata
    frontmatter = extract_frontmatter(content)
    
    if not frontmatter:
        print("❌ No frontmatter found in file")
        return
    
    # Generate social content
    social = generate_social_content(frontmatter)
    
    print(f"📌 Title: {social['title']}")
    print(f"🔗 URL: {social['url']}")
    print(f"🏷️ Tags: {', '.join(social['tags'])}")
    print()
    
    # Show previews
    print("🐦 Twitter preview:")
    print("-" * 40)
    print(social['twitter'][:200] + "...")
    print()
    
    print("💼 LinkedIn preview:")
    print("-" * 40)
    print(social['linkedin'][:200] + "...")
    print()
    
    # Publish
    print(f"🚀 Publishing to: {', '.join(platforms)}")
    result = publish_to_social(social['twitter'], platforms)
    
    for platform, status in result['platforms'].items():
        if status['success']:
            print(f"✅ {platform}: Posted successfully")
        else:
            print(f"❌ {platform}: {status.get('error', 'Unknown error')}")
    
    # Log
    log_entry = {
        'date': datetime.now().isoformat(),
        'title': social['title'],
        'url': social['url'],
        'platforms': platforms,
        'result': result
    }
    
    log_file = Path(".automation/logs/social_posts.json")
    log_file.parent.mkdir(parents=True, exist_ok=True)
    
    existing = []
    if log_file.exists():
        with open(log_file, 'r') as f:
            existing = json.load(f)
    
    existing.append(log_entry)
    
    with open(log_file, 'w') as f:
        json.dump(existing, f, indent=2)
    
    print(f"\n📊 Logged to: {log_file}")


def auto_discover_and_publish():
    """Auto-discover new blog posts and publish"""
    posts_dir = Path("src/content/blog")
    
    if not posts_dir.exists():
        posts_dir = Path("src/pages/blog")
    
    if not posts_dir.exists():
        print("❌ Blog posts directory not found")
        return
    
    # Check for unpublished posts
    log_file = Path(".automation/logs/social_posts.json")
    published_urls = set()
    
    if log_file.exists():
        with open(log_file, 'r') as f:
            for entry in json.load(f):
                published_urls.add(entry.get('url', ''))
    
    # Find new posts
    new_posts = []
    for md_file in posts_dir.glob("*.md"):
        url = f"{SITE_URL}/blog/{md_file.stem}/"
        if url not in published_urls:
            new_posts.append(md_file)
    
    if not new_posts:
        print("✅ No new posts to publish")
        return
    
    print(f"📚 Found {len(new_posts)} new posts")
    
    for post in new_posts:
        publish_blog_post(str(post))


if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "--auto":
            auto_discover_and_publish()
        elif sys.argv[1] == "--help":
            print(__doc__)
        else:
            platforms = []
            if "--twitter" in sys.argv or "-t" in sys.argv:
                platforms.append("twitter")
            if "--linkedin" in sys.argv or "-l" in sys.argv:
                platforms.append("linkedin")
            if "--reddit" in sys.argv or "-r" in sys.argv:
                platforms.append("reddit")
            if not platforms:
                platforms = ["twitter", "linkedin"]
            
            publish_blog_post(sys.argv[1], platforms)
    else:
        print(__doc__)
