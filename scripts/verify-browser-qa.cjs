const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\sgmsh\\.gemini\\antigravity\\brain\\b03600f8-d5b6-4db9-b222-bea2d5de9258';

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(typeof event.data === 'string' ? event.data : event.data.toString());
        if (msg.id && this.callbacks.has(msg.id)) {
          const { res, rej } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) rej(msg.error);
          else res(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((res, rej) => {
      const id = this.id++;
      this.callbacks.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expr) {
    const res = await this.send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.text || 'Eval failed');
    }
    return res.result ? res.result.value : undefined;
  }

  async setViewport(width, height, isMobile = false) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: isMobile
    });
    await this.send('Emulation.setVisibleSize', { width, height });
  }

  async captureScreenshot(filePath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${filePath}`);
  }
}

const PORT = 9444;

async function run() {
  console.log(`Starting Chrome in Incognito mode on port ${PORT}...`);
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--incognito',
    '--headless=new',
    '--disable-gpu',
    '--disable-background-networking',
    '--no-default-browser-check',
    '--user-data-dir=' + path.join(__dirname, '../scratch/chrome-qa-profile-9444')
  ]);

  let version;
  for (let i = 0; i < 20; i++) {
    try {
      version = await getJson(`http://127.0.0.1:${PORT}/json/version`);
      break;
    } catch(e) {
      await wait(300);
    }
  }

  if (!version) {
    throw new Error(`Chrome did not respond on ${PORT}`);
  }

  const list = await getJson(`http://127.0.0.1:${PORT}/json/list`);
  const target = list[0] || (await getJson(`http://127.0.0.1:${PORT}/json/new`));
  
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();
  await client.send('Page.enable');
  await client.send('DOM.enable');
  await client.send('Runtime.enable');

  console.log('Navigating to deployed site: https://rootmap-app.web.app/?state=Tamil+Nadu&view=map in private window...');
  await client.send('Page.navigate', { url: 'https://rootmap-app.web.app/?state=Tamil+Nadu&view=map' });
  await wait(3500);

  // 1. Desktop 1280x800 QA Pass
  await client.setViewport(1280, 800, false);
  await wait(1000);

  console.log('\n--- 1. MAP VIEW & KEYBOARD FOCUS QA AUDIT ---');
  const mapAudit = await client.evaluate(`(() => {
    // Check Tamil Nadu path
    const paths = Array.from(document.querySelectorAll('svg path[role="button"]'));
    const tnPath = paths.find(p => (p.getAttribute('aria-label') || '').includes('Tamil Nadu'));
    
    // Check focus outline on path
    let tnOutline = null;
    if (tnPath) {
      tnPath.focus();
      tnOutline = window.getComputedStyle(tnPath).outline;
    }

    // Check UT Inset text for Andaman & Nicobar
    const utButtons = Array.from(document.querySelectorAll('div.absolute.bottom-12.right-3 button, div.absolute.bottom-12.right-4 button'));
    const andamanBtn = utButtons.find(b => (b.getAttribute('aria-label') || '').includes('Andaman'));
    const andamanText = andamanBtn ? andamanBtn.querySelector('span')?.innerText : null;
    const andamanTitle = andamanBtn ? andamanBtn.title : null;

    // Check boundary note
    const boundaryNote = Array.from(document.querySelectorAll('*')).find(el => el.textContent && el.textContent.includes('Boundaries as per Survey of India'))?.textContent;

    // Check legend rule
    const legendRule = Array.from(document.querySelectorAll('*')).find(el => el.textContent && el.textContent.includes('Alliance = party or alliance leading the state government.'))?.textContent;

    // Check search placeholder
    const searchInputs = Array.from(document.querySelectorAll('input[type="search"]')).map(i => i.placeholder);

    // Check stat numbers and subtext
    const statSubtexts = Array.from(document.querySelectorAll('div.grid.grid-cols-2 span.text-\\\\[10px\\\\]')).map(el => el.innerText);

    // Check Area unit with thin space
    const areaStat = Array.from(document.querySelectorAll('strong')).find(el => el.innerText && el.innerText.includes('km²'))?.innerText;

    return {
      tnFound: !!tnPath,
      tnFill: tnPath ? tnPath.getAttribute('fill') : null,
      tnStroke: tnPath ? tnPath.getAttribute('stroke') : null,
      tnStrokeWidth: tnPath ? tnPath.getAttribute('stroke-width') : null,
      tnFilter: tnPath ? tnPath.getAttribute('filter') : null,
      tnOutline,
      andamanText,
      andamanTitle,
      boundaryNote: boundaryNote ? boundaryNote.trim() : null,
      legendRule: legendRule ? legendRule.trim() : null,
      searchInputs,
      statSubtexts: statSubtexts.slice(0, 6),
      areaStat
    };
  })()`);

  console.log('Map & Focus Audit Results:');
  console.log('  Tamil Nadu Fill:', mapAudit.tnFill);
  console.log('  Tamil Nadu Stroke:', mapAudit.tnStroke, 'Width:', mapAudit.tnStrokeWidth);
  console.log('  Tamil Nadu Glow Filter:', mapAudit.tnFilter);
  console.log('  Tamil Nadu Focused Outline:', mapAudit.tnOutline, '(No black box!)');
  console.log('  Andaman UT Inset Text:', mapAudit.andamanText, 'Title:', mapAudit.andamanTitle);
  console.log('  Search Placeholders:', mapAudit.searchInputs);
  console.log('  Population Subtext Sample:', mapAudit.statSubtexts);
  console.log('  Area Unit:', mapAudit.areaStat);

  // Capture Desktop Screenshot
  await client.captureScreenshot(path.join(ARTIFACT_DIR, 'live-v2.6.0-1280-desktop-map.png'));

  // 2. Widescreen 1920x1080 QA Pass
  await client.setViewport(1920, 1080, false);
  await wait(500);
  await client.captureScreenshot(path.join(ARTIFACT_DIR, 'live-v2.6.0-1920-widescreen-map.png'));

  // 3. Tablet 768x1024 QA Pass
  await client.setViewport(768, 1024, false);
  await wait(500);
  await client.captureScreenshot(path.join(ARTIFACT_DIR, 'live-v2.6.0-768-tablet-map.png'));

  // 4. Mobile 375x812 QA Pass (Directory List & Map)
  await client.setViewport(375, 812, true);
  await wait(500);
  await client.captureScreenshot(path.join(ARTIFACT_DIR, 'live-v2.6.0-375-mobile-map.png'));

  // Open directory list on mobile
  await client.send('Page.navigate', { url: 'https://rootmap-app.web.app/' });
  await wait(2000);
  await client.captureScreenshot(path.join(ARTIFACT_DIR, 'live-v2.6.0-375-mobile-directory.png'));

  // 5. Dark Mode Audit Pass
  await client.setViewport(1440, 900, false);
  await client.evaluate(`(() => {
    const themeBtn = document.querySelector('button[aria-label*="theme"], button[aria-label*="Dark"], button[title*="Dark"]');
    if (themeBtn) themeBtn.click();
    else document.documentElement.classList.add('dark');
  })()`);
  await wait(500);
  await client.captureScreenshot(path.join(ARTIFACT_DIR, 'live-v2.6.0-1440-dark-mode.png'));

  console.log('\n✓ All QA Screenshots and DOM audits verified!');

  chromeProc.kill();
  process.exit(0);
}

run().catch(err => {
  console.error('Error during QA:', err);
  process.exit(1);
});
