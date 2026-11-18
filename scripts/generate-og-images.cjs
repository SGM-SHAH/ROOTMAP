const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const dataFilePath = path.join(__dirname, '../src/data/statesData.json');
const publicOgDir = path.join(__dirname, '../public/og');
const distOgDir = path.join(__dirname, '../dist/og');
const tempDir = path.join(__dirname, '../scratch/og-temps');

fs.mkdirSync(publicOgDir, { recursive: true });
fs.mkdirSync(distOgDir, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });

const states = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function renderHtml(title, subtitle, badgeText, leaderText, partyText, allianceText, stats, color) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background: #fbfaf5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1a202c;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 56px 64px 48px;
      position: relative;
    }
    /* Inner subtle cartographic border */
    body::before {
      content: "";
      position: absolute;
      top: 16px;
      left: 16px;
      right: 16px;
      bottom: 16px;
      border: 1.5px solid #dcd7c9;
      pointer-events: none;
      border-radius: 12px;
    }
    body::after {
      content: "";
      position: absolute;
      top: 22px;
      left: 22px;
      right: 22px;
      bottom: 22px;
      border: 1px solid #ede9df;
      pointer-events: none;
      border-radius: 8px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #1E3A8A;
      padding-bottom: 18px;
    }
    .header-brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .emblem {
      width: 44px;
      height: 44px;
      background: #1E3A8A;
      color: #ffffff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 20px;
      letter-spacing: -0.5px;
    }
    .site-title {
      font-family: Georgia, "Playfair Display", serif;
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.3px;
    }
    .site-sub {
      font-size: 13px;
      color: #64748b;
      font-weight: 500;
      margin-top: 2px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    .badge {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding: 6px 14px;
      border-radius: 6px;
      background: #eff6ff;
      color: #1E3A8A;
      border: 1px solid #bfdbfe;
    }
    .main {
      margin-top: 24px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .entity-type {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #64748b;
      margin-bottom: 8px;
    }
    .entity-title {
      font-family: Georgia, "Playfair Display", serif;
      font-size: 58px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.05;
      letter-spacing: -1px;
    }
    .leader-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 16px;
      font-size: 18px;
      color: #334155;
    }
    .leader-role {
      color: #64748b;
      font-weight: 500;
    }
    .leader-name {
      font-weight: 700;
      color: #0f172a;
    }
    .party-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 4px 12px;
      border-radius: 6px;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      font-size: 14px;
      font-weight: 600;
    }
    .party-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${color || '#3b82f6'};
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
      margin-top: 28px;
    }
    .stat-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px 18px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .stat-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      margin-bottom: 6px;
    }
    .stat-value {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.1;
      font-variant-numeric: tabular-nums;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .stat-sub {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 4px;
      font-weight: 500;
    }
    .footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: #64748b;
    }
    .footer strong {
      color: #334155;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-brand">
      <div class="emblem">&#9878;</div>
      <div>
        <div class="site-title">Political Directory of India</div>
        <div class="site-sub">Official Civic & Administrative Reference</div>
      </div>
    </div>
    <div class="badge">${badgeText}</div>
  </div>

  <div class="main">
    <div class="entity-type">${subtitle}</div>
    <h1 class="entity-title">${title}</h1>
    <div class="leader-row">
      <span class="leader-role">${leaderText}</span>
      <span class="party-chip">
        <span class="party-dot"></span>
        <span>${partyText} ${allianceText ? `(${allianceText})` : ''}</span>
      </span>
    </div>
  </div>

  <div class="stats-grid">
    ${stats.map(s => `
      <div class="stat-card">
        <div class="stat-label">${s.label}</div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-sub">${s.sub}</div>
      </div>
    `).join('')}
  </div>

  <div class="footer">
    <div>Compiled from Census of India, Survey of India, Election Commission of India & MHA</div>
    <div><strong>rootmap-app.web.app</strong></div>
  </div>
</body>
</html>`;
}

console.log('Generating 1200x630 OG social preview images...');

// 1. Generate default.png
const defaultHtml = renderHtml(
  '28 States & 8 Union Territories',
  'National Gazetteer & Civic Reference',
  'Reference Edition',
  'Parliament: 543 Lok Sabha / 233 Rajya Sabha Seats',
  'All 36 Jurisdictions',
  'National Directory',
  [
    { label: 'Total Districts', value: '786', sub: 'Survey of India' },
    { label: 'Population (2011)', value: '1.21 Billion', sub: 'Census of India' },
    { label: 'Total Area', value: '3,287,263 km²', sub: '7th in World' },
    { label: 'National Literacy', value: '74.04%', sub: 'Census 2011' }
  ],
  '#1E3A8A'
);

const defaultTempHtmlPath = path.join(tempDir, 'default.html');
fs.writeFileSync(defaultTempHtmlPath, defaultHtml);

const defaultPublicPng = path.join(publicOgDir, 'default.png');
const defaultDistPng = path.join(distOgDir, 'default.png');

execFileSync(CHROME_PATH, [
  '--headless',
  '--disable-gpu',
  `--screenshot=${defaultPublicPng}`,
  '--window-size=1200,630',
  '--hide-scrollbars',
  defaultTempHtmlPath
]);
fs.copyFileSync(defaultPublicPng, defaultDistPng);
console.log('✓ Generated default OG image: og/default.png');

// 2. Generate per-state OG images
states.forEach((item) => {
  const slug = slugify(item.name);
  const leaderRole = item.chiefMinister ? 'Chief Minister' : (item.governor?.role || 'Administrator');
  const leaderName = item.chiefMinister?.name || item.governor?.name || 'Administrator';
  const party = item.rulingParty?.abbr || item.rulingParty?.name || 'Admin';
  const alliance = item.rulingAlliance || '';
  const distCount = item.districts?.length || item.demographics?.totalDistricts || 0;
  const popVal = item.demographics?.census2011Population?.toLocaleString() || item.demographics?.population?.split('(')[0] || 'N/A';
  const areaVal = item.demographics?.areaSqKm ? `${item.demographics.areaSqKm.toLocaleString()} km²` : 'N/A';
  const litVal = item.demographics?.literacyRate || 'N/A';
  const partyColor = item.rulingParty?.color || '#1E3A8A';

  const html = renderHtml(
    item.name,
    `${item.type.toUpperCase()} • CAPITAL: ${item.capital.toUpperCase()}`,
    item.type === 'State' ? 'State Reference' : 'UT Reference',
    `${leaderRole}: ${leaderName}`,
    party,
    alliance,
    [
      { label: 'Districts', value: String(distCount), sub: 'Survey of India' },
      { label: 'Population', value: popVal, sub: 'Census 2011' },
      { label: 'Area', value: areaVal, sub: item.demographics?.areaRank || 'Official' },
      { label: 'Literacy', value: litVal, sub: 'Census 2011' }
    ],
    partyColor
  );

  const tempHtmlPath = path.join(tempDir, `${slug}.html`);
  fs.writeFileSync(tempHtmlPath, html);

  const publicPng = path.join(publicOgDir, `${slug}.png`);
  const distPng = path.join(distOgDir, `${slug}.png`);

  execFileSync(CHROME_PATH, [
    '--headless',
    '--disable-gpu',
    `--screenshot=${publicPng}`,
    '--window-size=1200,630',
    '--hide-scrollbars',
    tempHtmlPath
  ]);
  fs.copyFileSync(publicPng, distPng);
});

console.log(`✓ Generated ${states.length} state-specific 1200x630 OG images successfully.`);
