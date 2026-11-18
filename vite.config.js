import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify('v2.6.0'),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10).replace(/-/g, '.'))
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false
  }
});
