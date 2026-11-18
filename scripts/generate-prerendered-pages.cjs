const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist');
const dataFilePath = path.join(__dirname, '../src/data/statesData.json');
const indexHtmlPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, 'utf8');
const states = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

console.log(`Prerendering static entry pages for ${states.length} States and Union Territories...`);

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

states.forEach((item) => {
  const slug = slugify(item.name);
  const isState = item.type === 'State';
  const routePrefix = isState ? 'state' : 'ut';
  const title = `${item.name} - Capital, CM, Districts | Political Directory of India`;
  const leaderRole = item.chiefMinister ? 'Chief Minister' : (item.governor?.role || 'Administrator');
  const leaderName = item.chiefMinister?.name || item.governor?.name || 'Administrator';
  const alliance = item.rulingAlliance || 'Direct Administration';
  const distCount = item.districts?.length || item.demographics?.totalDistricts || 0;
  const popVal = item.demographics?.census2011Population?.toLocaleString() || 'N/A';
  const areaVal = item.demographics?.areaSqKm ? `${item.demographics.areaSqKm.toLocaleString()}\u202Fkm²` : 'N/A';
  const litVal = item.demographics?.literacyRate || 'N/A';
  
  const desc = `Compiled from official sources (Census of India, Survey of India, ECI & MHA). Civic reference and administrative profile of ${item.name} (${item.type}). Capital: ${item.capital}. ${leaderRole}: ${leaderName} (${alliance}). ${distCount} districts, Census 2011 population: ${popVal}. Parliamentary representation: ${item.parliamentarySeats?.lokSabha || 0} Lok Sabha, ${item.parliamentarySeats?.rajyaSabha || 0} Rajya Sabha seats.`;
  const canonicalUrl = `https://rootmap-app.web.app/${routePrefix}/${slug}`;
  const ogImageUrl = `https://rootmap-app.web.app/og/${slug}.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Place",
        "name": item.name,
        "alternateName": item.hindi?.name || item.name,
        "containedInPlace": {
          "@type": "Country",
          "name": "India"
        },
        "description": desc,
        "url": canonicalUrl,
        "image": ogImageUrl,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": item.name,
          "addressCountry": "IN"
        }
      },
      {
        "@type": "GovernmentOrganization",
        "name": `Government of ${item.name}`,
        "alternateName": item.hindi?.name ? `${item.hindi.name} सरकार` : undefined,
        "url": canonicalUrl,
        "subOrganization": item.chiefMinister ? {
          "@type": "GovernmentOffice",
          "name": `Chief Minister of ${item.name}`,
          "employee": {
            "@type": "Person",
            "name": item.chiefMinister.name,
            "jobTitle": "Chief Minister"
          }
        } : {
          "@type": "GovernmentOffice",
          "name": `${item.governor?.role || 'Administrator'} of ${item.name}`,
          "employee": {
            "@type": "Person",
            "name": item.governor?.name || 'Administrator',
            "jobTitle": item.governor?.role || 'Administrator'
          }
        }
      },
      {
        "@type": "Dataset",
        "name": `${item.name} Administrative and Civic Dataset`,
        "description": `Statistical, demographic and constitutional profile of ${item.name} including districts, seats, and executive administration.`,
        "license": "https://data.gov.in/",
        "creator": {
          "@type": "GovernmentOrganization",
          "name": "Political Directory of India Editorial Board",
          "url": "https://rootmap-app.web.app/"
        }
      }
    ]
  };

  let pageHtml = template
    .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${desc.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${desc.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${ogImageUrl}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${desc.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${ogImageUrl}" />`);

  // Ensure og:image dimensions are set
  if (!pageHtml.includes('property="og:image:width"')) {
    pageHtml = pageHtml.replace('<meta property="og:image"', '<meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="og:image"');
  }

  // Insert canonical link
  if (!pageHtml.includes('<link rel="canonical"')) {
    pageHtml = pageHtml.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
  } else {
    pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  }

  // Insert state specific JSON-LD
  pageHtml = pageHtml.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`);

  // Include prerendered static preview snippet in root for SEO crawlers
  const ssrPreview = `
    <div id="ssr-snapshot" class="sr-only">
      <h1>${item.name} (${item.hindi?.name || ''})</h1>
      <p>Type: ${item.type} | Capital: ${item.capital}</p>
      <p>${leaderRole}: ${leaderName} | Ruling Alliance: ${alliance}</p>
      <p>Districts: ${distCount} | Population (Census 2011): ${popVal}</p>
      <p>Area: ${areaVal} | Literacy Rate: ${litVal}</p>
      <p>Lok Sabha Seats: ${item.parliamentarySeats?.lokSabha || 0} | Rajya Sabha Seats: ${item.parliamentarySeats?.rajyaSabha || 0}</p>
    </div>
  `;
  pageHtml = pageHtml.replace('<div id="root">', `<div id="root">${ssrPreview}`);

  // Write to dist/${routePrefix}/${slug}/index.html
  const targetDir = path.join(distPath, routePrefix, slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');

  // Also write to dist/${slug}/index.html for legacy / flat links
  const flatDir = path.join(distPath, slug);
  fs.mkdirSync(flatDir, { recursive: true });
  fs.writeFileSync(path.join(flatDir, 'index.html'), pageHtml, 'utf8');
});

console.log(`✓ Prerendered ${states.length} static state and UT pages successfully.`);
