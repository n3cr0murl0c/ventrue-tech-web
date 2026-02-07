# Ventrue Tech Website

Company website for Ventrue Tech - built with Astro, Tailwind CSS, and featuring dark/light mode and Spanish/English internationalization.

## 🚀 Features

- **Modern Design**: Clean, responsive UI with gradient accents and animations
- **Dark/Light Mode**: Toggle between themes with persistence
- **i18n Ready**: Spanish (es) and English (en) language support
- **Blog System**: Markdown-based blog for hourly articles
- **Projects Showcase**: Portfolio section to display company projects
- **Contact Form**: Ready-to-use contact form layout
- **SEO Optimized**: Meta tags, semantic HTML, fast loading

## 📁 Project Structure

```
ventrue-tech-web/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   ├── content/          # Markdown content
│   │   ├── blog/         # Blog posts (in Spanish)
│   │   └── projects/    # Project showcases
│   ├── i18n/             # Internationalization
│   │   ├── ui.ts         # Translation strings
│   │   └── utils.ts     # i18n utilities
│   ├── layouts/         # Page layouts
│   │   └── Layout.astro
│   ├── pages/            # Route pages
│   │   ├── es/          # Spanish pages
│   │   │   ├── index.astro
│   │   │   ├── about.astro
│   │   │   ├── contact.astro
│   │   │   ├── blog/
│   │   │   └── projects/
│   │   └── en/          # English pages
│   ├── styles/           # Global styles
│   │   └── global.css
│   └── utils/            # Utilities
│       └── theme.ts      # Theme management
├── public/              # Static assets
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
└── package.json
```

## 🛠️ Installation

```bash
# Navigate to project directory
cd ventrue-tech-web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Adding Blog Posts

Create markdown files in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO"
pubDate: 2026-02-07
author: "Author Name"
tags: ["tag1", "tag2"]
lang: "es"
featured: true
readTime: 5
---

# Your content here...
```

## 🎨 Customization

### Colors
Edit `tailwind.config.mjs` to customize the color palette:

```javascript
colors: {
  ventrue: {
    dark: '#0a0a0f',
    accent: '#00d4ff',
    secondary: '#7c3aed',
  }
}
```

### Translations
Add translations in `src/i18n/ui.ts`:

```typescript
export const ui = {
  es: {
    'key': 'Valor en español',
  },
  en: {
    'key': 'Value in english',
  },
};
```

## 🌐 Deployment

### Vercel
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy to Netlify (auto-detects Astro)
```

### GitHub Pages
```bash
npm run build
# Push to gh-pages branch
```

## 📄 License

MIT License - Feel free to use for your own projects!

---

Built with ❤️ by Ventrue Tech
