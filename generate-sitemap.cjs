const fs = require('fs');
const path = require('path');

const site = 'https://ventrue.tech';
const pages = [
  '/',
  '/es/',
  '/en/',
  '/about/',
  '/es/about/',
  '/en/about/',
  '/projects/',
  '/es/projects/',
  '/en/projects/',
  '/contact/',
  '/es/contact/',
  '/en/contact/',
  '/blog/',
  '/es/blog/',
  '/en/blog/',
  '/blog/mejorar-codigo-2026/',
  '/blog/typescript-avanzado/',
  '/es/blog/mejorar-codigo-2026/',
  '/es/blog/typescript-avanzado/',
  '/en/blog/mejorar-codigo-2026/',
  '/en/blog/typescript-avanzado/',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${site}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'dist', 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
