# Twitter/X API Integration for Ventrue Tech
# Uses environment variables: X_CONSUMER_KEY, X_SECRET_KEY, X_BEARER_TOKEN

TWITTER_API_BASE = "https://api.twitter.com/2"

# Required env vars:
# - X_CONSUMER_KEY (API Key)
# - X_SECRET_KEY (API Secret)
# - X_BEARER_TOKEN (App-only auth)
# - X_ACCESS_TOKEN (Optional - for posting)
# - X_ACCESS_SECRET (Optional - for posting)

import os
import base64
import json
import requests
from typing import Optional, Dict, List

class TwitterAPI:
    """Twitter/X API v2 integration for Ventrue Tech"""
    
    def __init__(self):
        self.consumer_key = os.getenv('X_CONSUMER_KEY')
        self.consumer_secret = os.getenv('X_SECRET_KEY')
        self.bearer_token = os.getenv('X_BEARER_TOKEN')
        self.access_token = os.getenv('X_ACCESS_TOKEN')
        self.access_secret = os.getenv('X_ACCESS_SECRET')
        
        self.headers = {
            'Authorization': f'Bearer {self.bearer_token}',
            'Content-Type': 'application/json'
        }
    
    def verify_credentials(self) -> Dict:
        """Verify API keys are working"""
        response = requests.get(
            f'{TWITTER_API_BASE}/users/me',
            headers=self.headers
        )
        return response.json()
    
    def post_tweet(self, text: str) -> Dict:
        """Post a tweet (requires OAuth 1.0a with access tokens)"""
        if not self.access_token:
            raise ValueError("X_ACCESS_TOKEN not set for posting")
        
        # OAuth 1.0a for posting
        import oauth2
        consumer = oauth2.Consumer(key=self.consumer_key, secret=self.consumer_secret)
        token = oauth2.Token(key=self.access_token, secret=self.access_secret)
        client = oauth2.Client(consumer, token)
        
        response, data = client.request(
            f'{TWITTER_API_BASE}/tweets',
            method='POST',
            body=json.dumps({'text': text}),
            headers={'Content-Type': 'application/json'}
        )
        
        return json.loads(data.decode('utf-8'))
    
    def get_user_tweets(self, user_id: str, max_results: int = 100) -> Dict:
        """Get recent tweets from a user"""
        response = requests.get(
            f'{TWITTER_API_BASE}/users/{user_id}/tweets',
            headers=self.headers,
            params={'max_results': max_results}
        )
        return response.json()
    
    def get_trending_topics(self, woeid: int = 23424823) -> Dict:
        """Get trending topics (requires OAuth 1.0a)"""
        if not self.access_token:
            raise ValueError("X_ACCESS_TOKEN not set for trends")
        
        import oauth2
        consumer = oauth2.Consumer(key=self.consumer_key, secret=self.consumer_secret)
        token = oauth2.Token(key=self.access_token, secret=self.access_secret)
        client = oauth2.Client(consumer, token)
        
        response, data = client.request(
            f'{TWITTER_API_BASE}/trends/place.json?id={woeid}'
        )
        return json.loads(data.decode('utf-8'))


# Content templates for Ventrue Tech
TWEET_TEMPLATES = {
    'blog_post': [
        "📝 Nuevo artículo en nuestro blog: {title}\n\n{summary}\n\n🔗 {url}\n\n#DevOps #SoftwareDevelopment #{tags}",
        "💡 {title}\n\n{summary}\n\n👉 Lee el artículo completo: {url}\n\n#Tech #{tags}",
        "🚀 Nuevo contenido: {title}\n\n{summary}\n\n📖 {url}",
    ],
    'tip': [
        "🔧 {tip}\n\n#DevOps #ProgrammingTips",
        "💻 {tip}\n\n#SoftwareDevelopment #Coding",
        "⚡ {tip}\n\n#TechTips #{tags}",
    ],
    'project': [
        "🎉 Nuevo proyecto: {name}\n\n{description}\n\n🔗 {url}",
        "📦 {name} está live!\n\n{description}\n\nVer más: {url}",
    ],
    'news': [
        "📰 {title}\n\n{summary}\n\n#TechNews #{tags}",
        "🔍 {title}\n\n{summary}\n\n#Industry #{tags}",
    ]
}


def generate_blog_tweet(post: Dict, template: str = 'blog_post') -> str:
    """Generate a tweet from a blog post"""
    import random
    templates = TWEET_TEMPLATES.get(template, TWEET_TEMPLATES['blog_post'])
    selected = random.choice(templates)
    
    tags = ' '.join(f'#{tag}' for tag in post.get('tags', []))
    
    return selected.format(
        title=post.get('title', ''),
        summary=post.get('summary', '')[:100] + '...',
        url=post.get('url', ''),
        tags=tags
    )


# Quick post function
def post_blog_update(title: str, url: str, tags: List[str] = None):
    """Quick post about a blog update"""
    api = TwitterAPI()
    
    tweet = f"""📝 Nuevo artículo: {title}

🔗 {url}

#DevOps #SoftwareDevelopment"""

    if tags:
        tweet += '\n' + ' '.join(f'#{tag}' for tag in tags)
    
    try:
        result = api.post_tweet(tweet)
        print(f"✅ Tweet posted: {result.get('data', {}).get('id')}")
        return result
    except Exception as e:
        print(f"❌ Error posting tweet: {e}")
        return None


if __name__ == "__main__":
    # Test connection
    api = TwitterAPI()
    
    if api.bearer_token:
        print("✅ Bearer token configured")
        try:
            me = api.verify_credentials()
            print(f"👤 Connected as: @{me.get('data', {}).get('username', 'unknown')}")
        except Exception as e:
            print(f"❌ Verification failed: {e}")
    else:
        print("❌ X_BEARER_TOKEN not set in environment")
        print("Required env vars:")
        print("  - X_CONSUMER_KEY")
        print("  - X_SECRET_KEY") 
        print("  - X_BEARER_TOKEN")
        print("  - X_ACCESS_TOKEN (for posting)")
        print("  - X_ACCESS_SECRET (for posting)")
