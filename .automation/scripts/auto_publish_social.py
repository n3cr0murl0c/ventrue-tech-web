#!/usr/bin/env python3
"""
Social CLI Auto-Publish Integration
Posts blog updates to Twitter/X and LinkedIn automatically

Usage:
    python auto_publish_social.py "Blog post title" "https://ventrue.tech/blog/post"
    python auto_publish_social.py --help
"""

import os
import sys
import json
import argparse
from datetime import datetime

# Configuration
SITE_URL = "https://ventrue.tech"
TWITTER_HANDLE = "@ventrue_tech"

# Templates
TWITTER_TEMPLATES = [
    "📝 Nuevo artículo: {title}\n\n{summary}\n\n🔗 {url}\n\n#DevOps #SoftwareDev {tags}",
    "💡 {title}\n\n{summary}\n\n👉 Lee más: {url}",
    "🚀 Nuevo contenido fresco: {title}\n\n{summary}\n\n📖 {url}",
]

LINKEDIN_TEMPLATES = [
    "🚀 Nuevo artículo publicado!\n\n{title}\n\n{summary}\n\n👉 Leer artículo completo: {url}\n\n#VentrueTech #SoftwareDevelopment {tags}",
]


def generate_hashtags(tags, platform="twitter"):
    """Generate hashtags from tags"""
    hashtag_map = {
        "devops": ["#DevOps", "#CICD", "#Docker", "#Automation"],
        "azure": ["#Azure", "#Cloud", "#Microsoft", "#CloudComputing"],
        "dotnet": ["#.NET", "#CSharp", "#Programming", "#Backend"],
        "flutter": ["#Flutter", "#MobileDev", "#Dart", "#iOS", "#Android"],
        "ai": ["#AI", "#MachineLearning", "#Tech", "#Innovation"],
        "general": ["#SoftwareDevelopment", "#Coding", "#Programming"],
    }
    
    tags = tags or []
    
    if isinstance(tags, str):
        tags = [t.strip() for t in tags.split(',') if t.strip()]
    
    hashtags = []
    for tag in tags:
        tag_lower = tag.lower()
        for category, cats in hashtag_map.items():
            if any(c.lower() in tag_lower for c in cats):
                hashtags.extend(cats[:3])
                break
        else:
            hashtags.append(f"#{tag.replace(' ', '')}")
    
    # Deduplicate
    seen = set()
    unique = []
    for h in hashtags:
        if h.lower() not in seen:
            seen.add(h.lower())
            unique.append(h)
    
    return ' '.join(unique[:8])


def select_template(templates):
    """Randomly select a template"""
    import random
    return random.choice(templates)


def publish_twitter(title, url, summary="", tags=None):
    """Post to Twitter using environment variables"""
    consumer_key = os.getenv("X_CONSUMER_KEY")
    consumer_secret = os.getenv("X_SECRET_KEY")
    access_token = os.getenv("X_ACCESS_TOKEN")
    access_secret = os.getenv("X_ACCESS_SECRET")
    
    if not all([consumer_key, consumer_secret, access_token, access_secret]):
        print("❌ Twitter credentials not configured")
        print("   Required env vars: X_CONSUMER_KEY, X_SECRET_KEY, X_ACCESS_TOKEN, X_ACCESS_SECRET")
        return None
    
    try:
        import twitter
        
        api = twitter.Api(
            consumer_key=consumer_key,
            consumer_secret=consumer_secret,
            access_token_key=access_token,
            access_token_secret=access_secret
        )
        
        hashtags = generate_hashtags(tags, "twitter")
        template = select_template(TWITTER_TEMPLATES)
        tweet = template.format(
            title=title[:100] if len(title) > 100 else title,
            summary=summary[:200] + "..." if len(summary) > 200 else summary,
            url=url,
            tags=hashtags
        )
        
        # Ensure under 280 chars
        if len(tweet) > 280:
            tweet = tweet[:277] + "..."
        
        status = api.PostUpdate(tweet)
        print(f"✅ Tweet posted: https://twitter.com/{TWITTER_HANDLE}/status/{status.id}")
        return status.id
    
    except ImportError:
        print("❌ python-twitter not installed")
        print("   Install: pip install python-twitter")
        return None
    except Exception as e:
        print(f"❌ Twitter error: {e}")
        return None


def publish_linkedin(title, url, summary="", tags=None):
    """Post to LinkedIn"""
    access_token = os.getenv("LINKEDIN_ACCESS_TOKEN")
    
    if not access_token:
        print("❌ LinkedIn credentials not configured (LINKEDIN_ACCESS_TOKEN)")
        return None
    
    # LinkedIn posting logic would go here
    print("📤 LinkedIn posting requires LinkedIn API setup")
    print(f"   Preview: {title}")
    return None


def publish_all(title, url, summary="", tags=None):
    """Publish to all platforms"""
    results = {}
    
    print(f"\n🐦 Publishing to Twitter...")
    results['twitter'] = publish_twitter(title, url, summary, tags)
    
    print(f"\n💼 Publishing to LinkedIn...")
    results['linkedin'] = publish_linkedin(title, url, summary, tags)
    
    return results


def log_publish(title, url, results):
    """Log published content"""
    log_entry = {
        'date': datetime.now().isoformat(),
        'title': title,
        'url': url,
        'results': results
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


def main():
    parser = argparse.ArgumentParser(description="Auto-publish blog posts to social media")
    parser.add_argument("title", help="Blog post title")
    parser.add_argument("url", help="Blog post URL")
    parser.add_argument("--summary", "-s", default="", help="Post summary")
    parser.add_argument("--tags", "-t", default="", help="Comma-separated tags")
    parser.add_argument("--twitter", action="store_true", help="Post to Twitter only")
    parser.add_argument("--linkedin", action="store_true", help="Post to LinkedIn only")
    parser.add_argument("--dry-run", action="store_true", help="Show preview without posting")
    
    args = parser.parse_args()
    
    tags = [t.strip() for t in args.tags.split(',') if t.strip()]
    
    print(f"📝 Title: {args.title}")
    print(f"🔗 URL: {args.url}")
    print(f"🏷️ Tags: {', '.join(tags)}")
    
    if args.dry_run:
        print("\n📋 Preview:")
        hashtags = generate_hashtags(tags)
        template = select_template(TWITTER_TEMPLATES)
        tweet = template.format(
            title=args.title[:100],
            summary=args.summary[:200],
            url=args.url,
            tags=hashtags
        )
        print("-" * 40)
        print(tweet[:280])
        print("-" * 40)
        return
    
    if args.twitter:
        publish_twitter(args.title, args.url, args.summary, tags)
    elif args.linkedin:
        publish_linkedin(args.title, args.url, args.summary, tags)
    else:
        results = publish_all(args.title, args.url, args.summary, tags)
        log_publish(args.title, args.url, results)


if __name__ == "__main__":
    main()
