# 🐦 Twitter/X API Integration for Ventrue Tech

## Quick Start

### 1. Configure Environment Variables

```bash
# Copy template
cp .env.example .env

# Edit with your keys
nano .env
```

Required variables:
```bash
X_CONSUMER_KEY=your_api_key
X_SECRET_KEY=your_api_secret
X_BEARER_TOKEN=your_bearer_token
X_ACCESS_TOKEN=your_oauth_token
X_ACCESS_SECRET=your_oauth_secret
```

### 2. Install Dependencies

```bash
pip install tweepy requests
```

### 3. Test Connection

```bash
python .automation/scripts/twitter-api.py verify
```

---

## Usage

### Post a Tweet

```bash
python .automation/scripts/twitter-api.py post "Hello from Ventrue Tech! 🚀"
```

### Post Blog Update

```bash
python .automation/scripts/twitter-api.py blog "10 DevOps Tips" "https://ventrue.tech/blog/devops-tips"
```

### Post DevOps Tip

```bash
python .automation/scripts/twitter-api.py tip "Use Docker multi-stage builds to reduce image size by 90%! 🐳"
```

---

## Python Module Usage

```python
from twitter_api import TwitterAPI, generate_tweet, post_blog_update

# Initialize
api = TwitterAPI()

# Verify
me = api.verify_credentials()
print(f"Connected as @{me['username']}")

# Post blog update
result = post_blog_update(
    title="How to Deploy to Azure",
    url="https://ventrue.tech/blog/azure-deployment",
    summary="Complete guide to Azure deployment",
    tags=["Azure", "DevOps", "Cloud"]
)
```

---

## Automated Content Pipeline

### Auto-post New Blog Articles

Add to your content automation script:

```python
from twitter_api import post_blog_update

def notify_new_post(post):
    """Tweet about new blog post"""
    post_blog_update(
        title=post['title'],
        url=f"https://ventrue.tech{post['url']}",
        summary=post['summary'],
        tags=post['tags']
    )
```

### Schedule Posts

Use cron or the automation script:

```bash
# Add to crontab
0 8 * * * cd /path/to/project && python .automation/scripts/twitter-api.py tip "$(python tips_generator.py)"
0 12 * * * cd /path/to/project && python .automation/scripts/twitter-api.py blog "$(python latest_post.py)"
```

---

## Content Templates

The API includes templates for:

| Template | Usage |
|----------|-------|
| `blog_post` | Share new articles |
| `tip` | DevOps/tech tips |
| `project` | Project launches |
| `news` | Tech news |
| `job` | Job openings |
| `milestone` | Achievements |

---

## Rate Limits

Twitter API v2 Limits:
- Tweets: 17 requests/15 min
- App-only (reads): 450 requests/15 min

The `tweepy` library handles rate limiting automatically with `wait_on_rate_limit=True`.

---

## Troubleshooting

### "Missing environment variables"

```bash
# Check your env
echo $X_CONSUMER_KEY
echo $X_BEARER_TOKEN

# Set them
export X_CONSUMER_KEY="your_key"
```

### "401 Unauthorized"

Your keys may have expired. Regenerate at:
https://developer.twitter.com/en/portal/dashboard

### "403 Forbidden"

You may need to apply for elevated access:
https://developer.twitter.com/en/portal/products

---

## Files

```
.automation/scripts/
├── twitter-api.py      # Main API client
├── content-generator.py # Auto-content generation
└── scheduler.py        # Post scheduler

src/lib/
└── twitter-api.js     # JS version (Node.js)
```

---

## Next Steps

1. ✅ Configure API keys
2. ✅ Test posting
3. 📅 Schedule automated posts
4. 📊 Track engagement metrics
5. 🔄 Integrate with blog automation
