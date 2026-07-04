/**
 * Service Worker — offline support.
 * - Navigations (HTML): network-first so new deploys show up immediately;
 *   falls back to cache when offline.
 * - Static assets (hashed JS/CSS, fonts): stale-while-revalidate.
 */
const CACHE = 'portfolio-v2';

// Install: activate immediately (assets are cached lazily on first fetch)
self.addEventListener('install', () => {
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

  // HTML navigations: network-first, so a deploy is never stuck behind cache
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(cache => cache.put(e.request, copy));
          }
          return res;
        })
        .catch(() =>
          caches.match(e.request).then(cached =>
            cached || new Response('Offline', { status: 503 })
          )
        )
    );
    return;
  }

  // Everything else: stale-while-revalidate
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(e.request);
      const networkFetch = fetch(e.request).then(res => {
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      }).catch(() => null);

      return cached || networkFetch || new Response('Offline', { status: 503 });
    })
  );
});
