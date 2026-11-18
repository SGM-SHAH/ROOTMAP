const { spawn } = require('child_process');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9446;

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

class Cdp {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }
  async connect() {
    return new Promise((res, rej) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => res();
      this.ws.onerror = rej;
      this.ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

async function run() {
  const proc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=d:/PROJECTS/ROOTMAP/scratch/cdp-test-ports-${PORT}`
  ]);

  let version;
  for (let i = 0; i < 20; i++) {
    try {
      version = await getJson(`http://127.0.0.1:${PORT}/json/version`);
      break;
    } catch(e) { await wait(300); }
  }

  const list = await getJson(`http://127.0.0.1:${PORT}/json/list`);
  const cdp = new Cdp(list[0].webSocketDebuggerUrl);
  await cdp.connect();

  await cdp.send('Page.navigate', { url: 'http://localhost:3000/?state=Tamil+Nadu&view=map' });
  // Fallback to live URL if local not running
  await wait(1000);

  const widths = [320, 375, 768, 1280, 1440, 1850, 1920, 2560];
  const zoomScales = [0.8, 1.0, 1.25, 1.5];

  console.log('Testing widths and zooms on live site...');
  await cdp.send('Page.navigate', { url: 'https://rootmap-app.web.app/?state=Tamil+Nadu&view=map' });
  await wait(3500);

  let failureCount = 0;

  for (const w of widths) {
    for (const z of zoomScales) {
      const h = Math.round(900 / z);
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: Math.round(w / z),
        height: h,
        deviceScaleFactor: z,
        mobile: w < 768
      });
      await wait(250);

      const check = await cdp.send('Runtime.evaluate', {
        expression: `(() => {
          const sw = document.documentElement.scrollWidth;
          const iw = window.innerWidth;
          const bw = document.body.scrollWidth;
          const hasHScroll = sw > iw || bw > iw;

          // Check if right buttons are clipped
          const reportBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Report'));
          const viewFullDir = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('View Full Directory'));
          
          const reportClipped = reportBtn ? reportBtn.getBoundingClientRect().right > iw + 2 : false;
          const viewDirClipped = viewFullDir ? viewFullDir.getBoundingClientRect().right > iw + 2 : false;

          return {
            hasHScroll,
            diff: Math.max(sw - iw, bw - iw),
            reportClipped,
            viewDirClipped,
            sw, iw, bw
          };
        })()`,
        returnByValue: true
      });

      const res = check.result.value;
      const isOk = !res.hasHScroll && !res.reportClipped && !res.viewDirClipped;
      if (!isOk) failureCount++;
      const status = isOk ? '✓ OK' : '✗ OVERFLOW';
      console.log(`Width ${w}px @ zoom ${Math.round(z*100)}%: ${status} (sw=${res.sw}, iw=${res.iw}, reportClipped=${res.reportClipped}, viewDirClipped=${res.viewDirClipped})`);
    }
  }

  console.log(`\nViewport & Zoom Test Completed. Failures: ${failureCount}`);

  proc.kill();
  process.exit(0);
}

run().catch(console.error);
