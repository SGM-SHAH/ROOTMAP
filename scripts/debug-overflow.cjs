const { spawn } = require('child_process');
const http = require('http');

async function check() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const proc = spawn(CHROME_PATH, [
    '--remote-debugging-port=9445',
    '--headless=new',
    '--disable-gpu',
    '--window-size=1920,1080',
    '--user-data-dir=d:/PROJECTS/ROOTMAP/scratch/cdp-overflow-test'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  
  const getJson = u => new Promise((res, rej) => http.get(u, r => {
    let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
  }).on('error', rej));

  const list = await getJson('http://127.0.0.1:9445/json/list');
  const ws = new WebSocket(list[0].webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const send = (m, p = {}) => new Promise((res, rej) => {
    const cur = id++;
    const handler = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id === cur) {
        ws.removeEventListener('message', handler);
        res(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: cur, method: m, params: p }));
  });

  await send('Page.navigate', { url: 'https://rootmap-app.web.app/?state=Tamil+Nadu&view=map' });
  await new Promise(r => setTimeout(r, 3500));

  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const docWidth = document.documentElement.offsetWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      
      const overflowing = [];
      document.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth + 1) {
          overflowing.push({
            tag: el.tagName,
            cls: el.className,
            id: el.id,
            right: rect.right,
            width: rect.width
          });
        }
      });

      // Also check if any element has horizontal scroll
      const horizontalScrollable = [];
      document.querySelectorAll('*').forEach(el => {
        if (el.scrollWidth > el.clientWidth && el.clientWidth > 0 && window.getComputedStyle(el).overflowX !== 'hidden') {
          horizontalScrollable.push({
            tag: el.tagName,
            cls: el.className,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            overflowX: window.getComputedStyle(el).overflowX
          });
        }
      });

      return {
        innerWidth,
        docWidth,
        scrollWidth,
        bodyScrollWidth,
        hasHorizontalOverflow: scrollWidth > innerWidth || bodyScrollWidth > innerWidth,
        overflowingCount: overflowing.length,
        overflowing: overflowing.slice(0, 10),
        horizontalScrollable: horizontalScrollable.slice(0, 10)
      };
    })()`,
    returnByValue: true
  });

  console.log('Results at 1920x1080:', JSON.stringify(evalRes.result.value, null, 2));
  proc.kill();
  process.exit(0);
}
check().catch(console.error);
