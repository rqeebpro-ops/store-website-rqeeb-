// Raqeeb Pro PWA Service Worker (v3 - Optimized Network-First Strategy)
const CACHE_NAME = 'raqeeb-pwa-v3';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/assets/aistudio/Rqeeb_unified_icons_gold_b927d66b.png',
  '/favicon.png',
  '/logo.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Ignore cross-origin non-http schemes (e.g. chrome-extension)
  if (!url.protocol.startsWith('http')) return;

  // 1. Navigation / HTML requests: NETWORK-FIRST STRATEGY
  // Always fetch fresh HTML from the network to ensure the latest JS bundle hashes are loaded.
  // Only fallback to cache if offline.
  if (request.mode === 'navigate' || (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return caches.match('/');
        })
    );
    return;
  }

  // 2. Static Assets (JS, CSS, Images, Fonts)
  // Try Cache first; if not in cache, fetch from network and cache it.
  // NEVER fallback to HTML for asset requests to prevent SyntaxError: Unexpected token '<'
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          // Cache successful asset responses
          if (
            url.pathname.startsWith('/assets/') ||
            url.pathname.endsWith('.png') ||
            url.pathname.endsWith('.jpg') ||
            url.pathname.endsWith('.svg') ||
            url.pathname.endsWith('.woff2')
          ) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
        }
        return networkResponse;
      }).catch(() => {
        // Return empty response or fail cleanly rather than serving index.html as a JS chunk
        return new Response(null, { status: 404, statusText: 'Not Found' });
      });
    })
  );
});
