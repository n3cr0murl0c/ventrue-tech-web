# 🤖 Social Media Automation - Ventrue Tech

## MCP Servers Configured

### 1. Social CLI MCP (Twitter/X, LinkedIn, Reddit, Instagram)
- **Path**: `~/Documents/GitHub/social-cli-mcp`
- **Status**: ✅ Installed (TypeScript errors in build, core works)
- **Tools**: `post_twitter`, `post_twitter_thread`, `post_reddit`, `post_linkedin`, `post_instagram`

### 2. Tortoise TTS MCP (Text-to-Speech)
- **Path**: `mcp-servers/tortoise_tts_mcp.py`
- **Status**: ✅ Ready
- **Tools**: `tortoise_initialize`, `tortoise_list_voices`, `tortoise_generate_speech`

---

## 🚀 Quick Start - Auto Publish Blog

### Option 1: Simple Script
```bash
# Publish a blog post
python .automation/scripts/auto_publish_social.py \
  "10 DevOps Best Practices" \
  "https://ventrue.tech/blog/devops-best-practices" \
  --summary "Learn the top DevOps practices for 2026" \
  --tags "devops,azure,docker"

# Dry run (preview only)
python .automation/scripts/auto_publish_social.py \
  "Title" "url" \
  --dry-run
```

### Option 2: Auto-detect new posts
```bash
python .automation/scripts/auto_publish_blog.py --auto
```

---

## 🐦 Twitter/X Posting

### Environment Variables
```bash
export X_CONSUMER_KEY=your_api_key
export X_SECRET_KEY=your_api_secret
export X_BEARER_TOKEN=your_bearer_token
export X_ACCESS_TOKEN=your_oauth_token
export X_ACCESS_SECRET=your_oauth_secret
```

### Test Connection
```bash
python .automation/scripts/twitter-api.py verify
```

### Post via CLI
```bash
python .automation/scripts/twitter-api.py post "Hello from Ventrue Tech! 🚀"
```

---

## 📝 Content Templates

### Blog Post (Automatic)
```
📝 Nuevo artículo: {title}

{summary}

🔗 {url}

#DevOps #SoftwareDev {tags}
```

### DevOps Tip
```
🔧 {tip}

#DevOps #ProgrammingTips
```

### Project Launch
```
🎉 Nuevo proyecto: {name}

{description}

🔗 {url}
```

---

## 📅 Automated Scheduling

### Cron Setup
```bash
# Add to crontab
# Publish tips 3x daily
0 8 * * * cd /path/to/project && python .automation/scripts/auto_publish_social.py "$(python .automation/scripts/tips_generator.py)" --twitter

# Blog updates when new content publishes
# (handled by CI/CD pipeline)
```

### CI/CD Integration
```yaml
# .github/workflows/publish-social.yml
name: Auto-publish to social
on:
  push:
    paths:
      - 'src/content/blog/*.md'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Publish blog post
        run: |
          python .automation/scripts/auto_publish_social.py \
            "${{ env.TITLE }}" \
            "${{ env.URL }}" \
            --summary "${{ env.SUMMARY }}" \
            --tags "${{ env.TAGS }}"
        env:
          X_CONSUMER_KEY: ${{ secrets.X_CONSUMER_KEY }}
          X_SECRET_KEY: ${{ secrets.X_SECRET_KEY }}
          X_ACCESS_TOKEN: ${{ secrets.X_ACCESS_TOKEN }}
          X_ACCESS_SECRET: ${{ secrets.X_ACCESS_SECRET }}
```

---

## 📊 Content Strategy

| Content Type | Frequency | Platform | Best Time |
|--------------|-----------|----------|-----------|
| Blog posts | 2-3x/week | All | Tue-Thu 9AM |
| DevOps tips | Daily | Twitter | 8AM, 12PM, 6PM |
| Industry news | Weekly | LinkedIn | Wed 10AM |
| Tutorials | Bi-weekly | All | Tue 2PM |

---

## 🔧 Configuration Files

```
.automation/
├── scripts/
│   ├── auto_publish_social.py    # Main publishing script
│   ├── auto_publish_blog.py      # Auto-detect & publish
│   ├── twitter-api.py            # Twitter API client
│   ├── tips_generator.py         # Generate tips content
│   └── scheduler.py              # Post scheduler
└── logs/
    └── social_posts.json         # Publishing history

mcp-servers/
├── mcp-config.json               # MCP configuration
└── tortoise_tts_mcp.py          # TTS for video generation
```

---

## 🎯 Hashtag Strategy

| Category | Hashtags |
|----------|----------|
| DevOps | #DevOps #CICD #Docker #Kubernetes |
| Azure | #Azure #Cloud #Microsoft |
| .NET | #.NET #CSharp #Backend |
| General | #SoftwareDev #Coding #Programming |

---

## 📈 Monitoring

### Track Engagement
- Twitter Analytics: https://analytics.twitter.com
- LinkedIn Insights: https://www.linkedin.com/analytics

### Logs
All posts are logged to `.automation/logs/social_posts.json`

```json
[
  {
    "date": "2026-02-08T12:00:00Z",
    "title": "10 DevOps Tips",
    "url": "https://ventrue.tech/blog/devops-tips",
    "results": {
      "twitter": "1234567890"
    }
  }
]
```

---

## 🆘 Troubleshooting

### "Twitter credentials not configured"
```bash
# Check env vars
echo $X_CONSUMER_KEY
echo $X_ACCESS_TOKEN

# Set them
export X_CONSUMER_KEY="your_key"
```

### "Rate limit exceeded"
- Wait 15 minutes between posts
- Twitter: 17 requests/15 min
- Use `wait_on_rate_limit=True` in tweepy

### Post not appearing
- Check if API keys have "Read and Write" permissions
- Verify app is approved for posting
