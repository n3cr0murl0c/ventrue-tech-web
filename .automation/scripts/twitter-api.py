#!/usr/bin/env python3
"""
Twitter/X API v2 Integration for Ventrue Tech
Requires: tweepy
Install: pip install tweepy requests oauth2

Environment Variables:
- X_CONSUMER_KEY (API Key)
- X_SECRET_KEY (API Secret)  
- X_BEARER_TOKEN (App-only auth)
- X_ACCESS_TOKEN (OAuth 1.0a - for posting)
- X_ACCESS_SECRET (OAuth 1.0a - for posting)
"""

import os
import json
import random
from typing import Dict, List, Optional

try:
    import tweepy
    TWEEPY_AVAILABLE = True
except ImportError:
    TWEEPY_AVAILABLE = False


class TwitterAPI:
    """Twitter/X API v2 client for Ventrue Tech"""
    
    def __init__(self):
        self.consumer_key = os.getenv('X_CONSUMER_KEY')
        self.consumer_secret = os.getenv('X_SECRET_KEY')
        self.bearer_token = os.getenv('X_BEARER_TOKEN')
        self.access_token = os.getenv('X_ACCESS_TOKEN')
        self.access_secret = os.getenv('X_ACCESS_SECRET')
        
        self.client = None
        self.api_v2 = None
        
        if TWEEPY_AVAILABLE and self.bearer_token:
            # OAuth 2.0 for app-only auth
            self.client = tweepy.Client(
                bearer_token=self.bearer_token,
                consumer_key=self.consumer_key,
                consumer_secret=self.consumer_secret,
                access_token=self.access_token,
                access_token_secret=self.access_secret,
                wait_on_rate_limit=True
            )
    
    def verify_credentials(self) -> Optional[Dict]:
        """Verify API keys are working"""
        if not self.client:
            raise RuntimeError("Twitter API not initialized. Check env vars.")
        
        me = self.client.get_me()
        return {
            'id': me.data.id,
            'username': me.data.username,
            'name': me.data.name,
            'followers_count': me.data.public_metrics.get('followers_count', 0)
        }
    
    def post_tweet(self, text: str) -> Optional[Dict]:
        """Post a tweet (max 280 chars)"""
        if not self.client:
            raise RuntimeError("Twitter API not configured for posting")
        
        try:
            response = self.client.create_tweet(text=text)
            return {
                'success': True,
                'tweet_id': response.data.id,
                'url': f"https://twitter.com/i/status/{response.data.id}"
            }
        except tweepy.TweepyException as e:
            return {'success': False, 'error': str(e)}
    
    def post_thread(self, tweets: List[str]) -> List[Dict]:
        """Post a thread of tweets"""
        results = []
        for i, tweet in enumerate(tweets):
            result = self.post_tweet(tweet)
            results.append(result)
            if result.get('success') and i < len(tweets) - 1:
                import time
                time.sleep(2)  # Wait between tweets
        return results
    
    def delete_tweet(self, tweet_id: str) -> Dict:
        """Delete a tweet"""
        if not self.client:
            raise RuntimeError("Twitter API not configured")
        
        try:
            self.client.delete_tweet(tweet_id)
            return {'success': True, 'deleted_id': tweet_id}
        except tweepy.TweepyException as e:
            return {'success': False, 'error': str(e)}
    
    def get_user_tweets(self, user_id: str, max_results: int = 100) -> List[Dict]:
        """Get recent tweets from a user"""
        if not self.client:
            raise RuntimeError("Twitter API not configured")
        
        tweets = self.client.get_users_tweets(
            id=user_id,
            max_results=min(max_results, 100),
            tweet_fields=['created_at', 'public_metrics']
        )
        
        return [
            {
                'id': t.id,
                'text': t.text,
                'created_at': t.created_at,
                'metrics': t.public_metrics
            }
            for t in tweets.data or []
        ]
    
    def get_mentions(self, max_results: int = 100) -> List[Dict]:
        """Get recent mentions of your account"""
        if not self.client:
            raise RuntimeError("Twitter API not configured")
        
        mentions = self.client.get_users_mentions(
            id='me',  # Will use authenticated user
            max_results=min(max_results, 100)
        )
        
        return [
            {
                'id': m.id,
                'text': m.text,
                'author': m.author_id,
                'created_at': m.created_at
            }
            for m in mentions.data or []
        ]


# Content Templates for Ventrue Tech
TWEET_TEMPLATES = {
    'blog_post': [
        "📝 Nuevo artículo: {title}\n\n{summary}\n\n🔗 {url}\n\n#DevOps #Software #{tags}",
        "💡 {title}\n\n{summary}\n\n👉 Lee más: {url}\n\n#Tech #{tags}",
        "🚀 Nuevo contenido fresco: {title}\n\n{summary}\n\n📖 {url}",
    ],
    'tip': [
        "🔧 {tip}\n\n#DevOps #ProgrammingTips",
        "💻 {tip}\n\n#SoftwareDevelopment #Coding #{tags}",
        "⚡ {tip}\n\n#TechTips #{tags}",
    ],
    'project': [
        "🎉 Nuevo proyecto: {name}\n\n{description}\n\n🔗 {url}",
        "📦 {name} ya está live!\n\n{description}\n\nVer más: {url}",
    ],
    'news': [
        "📰 {title}\n\n{summary}\n\n#TechNews #{tags}",
        "🔍 {title}\n\n{summary}\n\n#Industry #{tags}",
    ],
    'job': [
        "💼 Estamos buscando: {role}\n\n{description}\n\n📍 {location}\n\n#Hiring #TechJobs",
    ],
    'milestone': [
        "🎯 {milestone}\n\n¡Gracias por acompañarnos! 🙏\n\n#VentrueTech #Growth",
    ]
}


def generate_tweet(
    template_type: str,
    title: str = "",
    summary: str = "",
    url: str = "",
    tags: List[str] = None,
    name: str = "",
    description: str = "",
    role: str = "",
    location: str = "",
    milestone: str = "",
    tip: str = ""
) -> str:
    """Generate a tweet from template"""
    templates = TWEET_TEMPLATES.get(template_type, TWEET_TEMPLATES['blog_post'])
    selected = random.choice(templates)
    
    if tags:
        tags_str = ' '.join(f'#{tag}' for tag in tags if tag)
    else:
        tags_str = 'DevOps'
    
    text = selected.format(
        title=title[:100] if title else '',
        summary=summary[:100] + '...' if summary else '',
        url=url,
        tags=tags_str,
        name=name,
        description=description[:100] if description else '',
        role=role,
        location=location,
        milestone=milestone,
        tip=tip[:280] if tip else ''
    )
    
    # Ensure within limit
    return text[:280]


# Automated posting functions
def post_blog_update(
    title: str,
    url: str,
    summary: str = "",
    tags: List[str] = None
) -> Dict:
    """Post about a new blog article"""
    api = TwitterAPI()
    tweet = generate_tweet('blog_post', title, summary, url, tags)
    return api.post_tweet(tweet)


def post_devops_tip(tip: str, tags: List[str] = None) -> Dict:
    """Post a DevOps tip"""
    api = TwitterAPI()
    tweet = generate_tweet('tip', tip=tip, tags=tags)
    return api.post_tweet(tweet)


def post_project_update(
    name: str,
    description: str,
    url: str = ""
) -> Dict:
    """Post about a new or updated project"""
    api = TwitterAPI()
    tweet = generate_tweet('project', name=name, description=description, url=url)
    return api.post_tweet(tweet)


# CLI Interface
if __name__ == "__main__":
    import sys
    
    api = TwitterAPI()
    
    # Check configuration
    if not api.bearer_token:
        print("❌ Error: Missing environment variables")
        print("\nRequired env vars for posting:")
        print("  export X_CONSUMER_KEY='your_consumer_key'")
        print("  export X_SECRET_KEY='your_consumer_secret'")
        print("  export X_BEARER_TOKEN='your_bearer_token'")
        print("  export X_ACCESS_TOKEN='your_access_token'")
        print("  export X_ACCESS_SECRET='your_access_secret'")
        print("\nFor read-only (analytics only):")
        print("  export X_BEARER_TOKEN='your_bearer_token'")
        sys.exit(1)
    
    # Verify credentials
    try:
        me = api.verify_credentials()
        print(f"✅ Connected as: @{me['username']}")
        print(f"   Followers: {me['followers_count']}")
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
    
    # Parse command
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == 'post':
            if len(sys.argv) > 2:
                text = sys.argv[2]
                result = api.post_tweet(text)
                if result.get('success'):
                    print(f"✅ Posted: {result['url']}")
                else:
                    print(f"❌ Error: {result.get('error')}")
            else:
                print("Usage: python twitter_api.py post 'Your tweet text'")
        
        elif command == 'blog':
            title = sys.argv[2] if len(sys.argv) > 2 else "New Post"
            url = sys.argv[3] if len(sys.argv) > 3 else ""
            result = post_blog_update(title, url)
            if result.get('success'):
                print(f"✅ Blog posted: {result['url']}")
        
        elif command == 'tip':
            tip = sys.argv[2] if len(sys.argv) > 2 else "DevOps tip here"
            result = post_devops_tip(tip)
            if result.get('success'):
                print(f"✅ Tip posted: {result['url']}")
        
        elif command == 'verify':
            print(f"✅ Verified: @{me['username']}")
        
        else:
            print(f"Unknown command: {command}")
    else:
        print("🐦 Ventrue Tech Twitter CLI")
        print("\nUsage:")
        print("  python twitter_api.py verify          # Verify connection")
        print("  python twitter_api.py post 'text'    # Post a tweet")
        print("  python twitter_api.py blog 'title' url  # Post blog update")
        print("  python twitter_api.py tip 'tip text' # Post DevOps tip")
