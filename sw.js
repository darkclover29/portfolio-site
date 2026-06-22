/**
 * Service Worker — offline support with stale-while-revalidate.
 * Caches shell (HTML, CSS, JS) and serves from cache when offline.
 */
const CACHE = 'portfolio-v1';

const PRECACHE = [
  '/',
  '/index.html',
  '/assets/',
];

// Install: open cache (lazy — don't precache chunks, browser will cache on first visit)
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Skip non-GET, cross-origin API calls (JokeAPI, GitHub, etc.)
  if (e.request.method !== 'GET') return;
  if (url.origin !== self.location.origin &&
      !url.href.startsWith('https://fonts.googleapis.com') &&
      !url.href.startsWith('https://fonts.gstatic.com') &&
      !url.href.startsWith('https://cdnjs.cloudflare.com')) return;

  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(e.request);
      const networkFetch = fetch(e.request).then(res => {
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      }).catch(() => null);

      // Stale-while-revalidate: return cached immediately, update in background
      if (cached) {
        networkFetch; // fire-and-forget update
        return cached;
      }
      return networkFetch || new Response('Offline', { status: 503 });
    })
  );
});
