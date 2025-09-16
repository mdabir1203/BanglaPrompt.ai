// Advanced service worker tuned for high-traffic scenarios

const CACHE_VERSION = 'v2';
const STATIC_CACHE = `prompts-static-${CACHE_VERSION}`;
const ASSET_CACHE = `prompts-assets-${CACHE_VERSION}`;
const API_CACHE = `prompts-api-${CACHE_VERSION}`;
const FONT_CACHE = `prompts-fonts-${CACHE_VERSION}`;

const PRECACHE_URLS = ['/', '/index.html'];
const ASSET_PATTERN = /\/assets\/.*\.(?:js|css)$/;
const FONT_HOSTNAMES = ['fonts.googleapis.com', 'fonts.gstatic.com'];
const IMAGE_EXTENSIONS = /\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico)$/;

const MAX_ASSET_ENTRIES = 80;
const MAX_API_ENTRIES = 40;
const MAX_FONT_ENTRIES = 20;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => Promise.resolve())
      .finally(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) =>
              key !== STATIC_CACHE &&
              key !== ASSET_CACHE &&
              key !== API_CACHE &&
              key !== FONT_CACHE,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }

  if (url.origin === self.location.origin) {
    if (ASSET_PATTERN.test(url.pathname)) {
      event.respondWith(staleWhileRevalidate(request, ASSET_CACHE, MAX_ASSET_ENTRIES, event));
      return;
    }

    if (IMAGE_EXTENSIONS.test(url.pathname)) {
      event.respondWith(cacheFirst(request, ASSET_CACHE, MAX_ASSET_ENTRIES));
      return;
    }

    if (url.pathname.startsWith('/api/')) {
      event.respondWith(networkFirst(request, API_CACHE, MAX_API_ENTRIES));
      return;
    }
  }

  if (FONT_HOSTNAMES.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, FONT_CACHE, MAX_FONT_ENTRIES, event));
    return;
  }

  if (url.protocol.startsWith('http')) {
    event.respondWith(staleWhileRevalidate(request, API_CACHE, MAX_API_ENTRIES, event));
  }
});

async function cacheFirst(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
      await limitCacheSize(cache, maxEntries);
    }
    return response;
  } catch (error) {
    return new Response('Network error', { status: 503 });
  }
}

async function networkFirst(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
      await limitCacheSize(cache, maxEntries);
      return response;
    }
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    if (request.mode === 'navigate') {
      const fallback = await cache.match('/index.html');
      if (fallback) {
        return fallback;
      }
    }
  }

  const cachedResponse = await cache.match(request);
  return (
    cachedResponse ||
    new Response('Offline', {
      status: 503,
      statusText: 'Offline',
    })
  );
}

async function staleWhileRevalidate(request, cacheName, maxEntries, event) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then(async (response) => {
      if (response && response.ok) {
        await cache.put(request, response.clone());
        await limitCacheSize(cache, maxEntries);
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    if (event) {
      event.waitUntil(fetchPromise);
    }
    return cached;
  }

  const networkResponse = await fetchPromise;
  if (networkResponse) {
    return networkResponse;
  }

  return new Response('Offline', { status: 503 });
}

async function limitCacheSize(cache, maxEntries) {
  if (!maxEntries) {
    return;
  }

  const keys = await cache.keys();
  const excess = keys.length - maxEntries;
  if (excess <= 0) {
    return;
  }

  for (let i = 0; i < excess; i += 1) {
    await cache.delete(keys[i]);
  }
}
