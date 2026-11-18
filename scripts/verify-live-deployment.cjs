const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
          const nextUrl = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href;
          return fetchUrl(nextUrl).then(resolve).catch(reject);
        }
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    }).on('error', reject);
  });
}

async function verify() {
  console.log('=== Verifying Live Deployment on rootmap-app.web.app ===\n');

  // 1. Root index
  const root = await fetchUrl('https://rootmap-app.web.app/');
  console.log('1. Root Status:', root.status);
  console.log('   Cache-Control:', root.headers['cache-control']);
  console.log('   Contains "REFERENCE":', root.body.includes('REFERENCE'));
  console.log('   OG Image:', root.body.match(/property="og:image" content="(.*?)"/)?.[1]);

  // 2. Prerendered state page
  const tn = await fetchUrl('https://rootmap-app.web.app/state/tamil-nadu');
  console.log('\n2. Prerendered Tamil Nadu Status:', tn.status);
  console.log('   Title:', tn.body.match(/<title>(.*?)<\/title>/)?.[1]);
  console.log('   OG Title:', tn.body.match(/property="og:title" content="(.*?)"/)?.[1]);
  console.log('   OG Image:', tn.body.match(/property="og:image" content="(.*?)"/)?.[1]);
  console.log('   Canonical:', tn.body.match(/rel="canonical" href="(.*?)"/)?.[1]);

  // 3. Prerendered UT page
  const dl = await fetchUrl('https://rootmap-app.web.app/ut/delhi');
  console.log('\n3. Prerendered Delhi Status:', dl.status);
  console.log('   Title:', dl.body.match(/<title>(.*?)<\/title>/)?.[1]);
  console.log('   Canonical:', dl.body.match(/rel="canonical" href="(.*?)"/)?.[1]);

  // 4. Sitemap & Robots
  const sitemap = await fetchUrl('https://rootmap-app.web.app/sitemap.xml');
  console.log('\n4. Sitemap Status:', sitemap.status, 'Length:', sitemap.body.length);
  const robots = await fetchUrl('https://rootmap-app.web.app/robots.txt');
  console.log('   Robots Status:', robots.status);

  // 5. OG Image asset
  const ogImg = await fetchUrl('https://rootmap-app.web.app/og/tamil-nadu.png');
  console.log('\n5. Live OG Image Status:', ogImg.status, 'Content-Type:', ogImg.headers['content-type']);

  console.log('\n✓ Live HTTP & Header checks complete!');
}

verify().catch(console.error);
