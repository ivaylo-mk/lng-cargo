/*
 * Service Worker for LNG Cargo Properties Calculator PWA
 *
 * Strategy: cache-first for all same-origin resources. Once the user visits
 * once while online, every subsequent visit — including fully offline — serves
 * from cache. Updates install silently on the next visit after a redeploy.
 *
 * Cache version must be bumped manually whenever index.html or any asset is
 * updated. Bumping the version name causes the old cache to be deleted and
 * the new files to be fetched and re-cached.
 */
const CACHE_NAME = 'lng-cargo-v2.3.0';
const ASSETS = [
  './',
  './index.html',
  './LNG_Cargo_Properties_Calculator.html',
  './manifest.json',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Only cache successful same-origin responses
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline and not in cache — return a minimal HTML error
        if (event.request.destination === 'document') {
          return new Response(
            '<!DOCTYPE html><meta charset="utf-8"><title>Offline</title>' +
            '<body style="font-family:system-ui;padding:2rem;color:#eef;background:#070d1a;">' +
            '<h1>Offline</h1><p>This resource is not cached. Connect once to install.</p></body>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        }
      });
    })
  );
});
