const fs = require('fs');
const path = require('path');

const states = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/statesData.json'), 'utf8'));

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const date = '2026-11-18';
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
xml += `  <url>\n    <loc>https://rootmap-app.web.app/</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
xml += `  <url>\n    <loc>https://rootmap-app.web.app/?view=map</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
xml += `  <url>\n    <loc>https://rootmap-app.web.app/?tab=uts</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;

states.forEach(s => {
  const slug = slugify(s.name);
  const isState = s.type === 'State';
  const routePrefix = isState ? 'state' : 'ut';
  const priority = isState ? '0.7' : '0.6';
  xml += `  <url>\n    <loc>https://rootmap-app.web.app/${routePrefix}/${slug}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
});

xml += '</urlset>\n';

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml, 'utf8');
console.log(`✓ Generated public/sitemap.xml with ${states.length * 2 + 3} URLs.`);
