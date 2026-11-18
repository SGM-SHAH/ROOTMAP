const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');

let html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Find JS and CSS assets
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const jsFile = files.find(f => f.endsWith('.js'));
  const cssFile = files.find(f => f.endsWith('.css'));

  let standaloneHtml = html;

  if (cssFile) {
    const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
    // Replace CSS link with inline style
    standaloneHtml = standaloneHtml.replace(
      new RegExp(`<link[^>]*href="[^"]*${cssFile}"[^>]*>`, 'i'),
      `<style>\n${cssContent}\n</style>`
    );
  }

  if (jsFile) {
    const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
    // Replace JS script tag with inline defer script
    standaloneHtml = standaloneHtml.replace(
      new RegExp(`<script[^>]*src="[^"]*${jsFile}"[^>]*></script>`, 'i'),
      `<script defer>\n${jsContent}\n</script>`
    );
  }

  fs.writeFileSync(path.join(__dirname, 'standalone.html'), standaloneHtml, 'utf8');
  console.log('Saved standalone.html successfully. Size:', standaloneHtml.length);
}
