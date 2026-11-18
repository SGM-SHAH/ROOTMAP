const { spawn } = require('child_process');
const http = require('http');

async function run() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const p = spawn(CHROME_PATH, [
    '--remote-debugging-port=9456',
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=d:/PROJECTS/ROOTMAP/scratch/cdp-uts-map'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const list = await new Promise((res, rej) => http.get('http://127.0.0.1:9456/json/list', r => {
    let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
  }).on('error', rej));

  const ws = new WebSocket(list[0].webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const send = (m, params = {}) => new Promise(res => {
    const cid = id++;
    const h = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id === cid) {
        ws.removeEventListener('message', h);
        res(msg.result);
      }
    };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id: cid, method: m, params }));
  });

  await send('Page.navigate', { url: 'https://rootmap-app.web.app/?view=map' });
  await new Promise(r => setTimeout(r, 3500));

  const res = await send('Runtime.evaluate', {
    expression: JSON.stringify(`(() => {
      const buttons = Array.from(document.querySelectorAll('div.absolute.bottom-12.right-3 button, div.absolute.bottom-12.right-4 button')).map(b => ({
        text: b.querySelector('span')?.innerText,
        title: b.title,
        ariaLabel: b.getAttribute('aria-label')
      }));
      return buttons;
    })()`),
    returnByValue: true
  });

  // Evaluate the function inside page
  const evalAgain = await send('Runtime.evaluate', {
    expression: `(() => {
      const buttons = Array.from(document.querySelectorAll('div.absolute.bottom-12.right-3 button, div.absolute.bottom-12.right-4 button')).map(b => ({
        text: b.querySelector('span')?.innerText,
        title: b.title,
        ariaLabel: b.getAttribute('aria-label')
      }));
      return buttons;
    })()`,
    returnByValue: true
  });

  console.log('Map UT Inset Buttons:', JSON.stringify(evalAgain.result.value, null, 2));
  p.kill();
  process.exit(0);
}

run().catch(console.error);
