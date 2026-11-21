const fs = require('fs');
const path = require('path');

function scanDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (['node_modules', '.git', 'dist', 'scratch', '.vercel', 'artifacts'].includes(file)) continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDir(filePath, fileList);
    } else if (/\.(jsx?|html|css)$/.test(file)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = scanDir('src').concat(['index.html', 'tailwind.config.js']);
console.log('Total production source files scanned:', files.length);

const checks = {
  purpleGradientsOrAccents: /\b(purple|violet|from-purple|to-purple|from-violet|to-violet)\b/i,
  sparkleIcons: /\bSparkles\b/i,
  emDashes: /[\u2013\u2014]|&mdash;|&ndash;/,
  glassCardsOrBackdropBlur: /backdrop-blur|glass-panel|glass-card/i,
  hoverJumpOrScaleAnimations: /hover:scale|hover:-translate|hover:translate|group-hover:scale|group-hover:translate/i,
  viteTabTitle: /<title>.*vite\s*\+\s*react.*<\/title>/i,
  emojisInHeadings: /<h[1-6][^>]*>[^<]*[\uD83C-\uDBFF\uDC00-\uDFFF]+/i,
  loremIpsum: /\b(lorem\s+ipsum|dolor\s+sit)\b/i,
  colorStripeOnCards: /w-1\s+bg-(carto|blue|indigo|slate)|border-l-[34568]/i,
  dotGridBackground: /radial-gradient|dot-grid|bg-dots/i,
  interOrGeistFonts: /(['"])(Inter|Geist)\1|\bfont-(inter|geist)\b/i,
  threeCardsInRowOrBento: /(xl|lg|md):grid-cols-3|\bbento\b/i,
  pricingOrTestimonials: /\b(pricing-table|pricing-tier|testimonial-card|fake-testimonial)\b/i
};

const results = {};
for (const key of Object.keys(checks)) {
  results[key] = [];
}

let totalViolations = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');

  for (const [key, regex] of Object.entries(checks)) {
    lines.forEach((line, idx) => {
      if (regex.test(line)) {
        results[key].push({
          file: f,
          line: idx + 1,
          text: line.trim().slice(0, 120)
        });
        totalViolations++;
      }
    });
  }
}

for (const [key, hits] of Object.entries(results)) {
  if (hits.length === 0) {
    console.log(`✓ ${key}: 0 violations`);
  } else {
    console.log(`\n❌ Pattern: ${key} (${hits.length} hits)`);
    hits.slice(0, 10).forEach(h => {
      console.log(`  ${h.file}:${h.line} -> ${h.text}`);
    });
  }
}

console.log('\n----------------------------------------');
if (totalViolations === 0) {
  console.log('✓ PASS: All anti-pattern and cliches checks passed with 0 violations!');
  process.exit(0);
} else {
  console.log(`❌ FAIL: Found ${totalViolations} violations.`);
  process.exit(1);
}
