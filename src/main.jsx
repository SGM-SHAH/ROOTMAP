import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

function renderApp() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

if (document.getElementById('root')) {
  renderApp();
} else {
  window.addEventListener('DOMContentLoaded', renderApp);
}

// Register service worker with update detection & automatic refresh on new deployments
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    let hasUpdated = false;
    let refreshing = false;

    navigator.serviceWorker.register('/sw.js').then((registration) => {
      registration.update();
      window.addEventListener('focus', () => registration.update());

      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              hasUpdated = true;
              console.log('New deployment detected; activating immediately.');
              installingWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        }
      });
    }).catch(() => {});

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing && hasUpdated) {
        refreshing = true;
        window.location.reload();
      }
    });
  });
}
