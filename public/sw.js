// Service Worker for caching static assets
const CACHE_NAME = 'prompts-v1';
const STATIC_CACHE = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Cache strategy for different resource types
const CACHE_STRATEGIES = {
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first'
};

// Install event - cache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') return;
  
  // Handle different resource types
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    // Static assets - Cache First
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.startsWith('/api/')) {
    // API requests - Network First
    event.respondWith(networkFirst(request));
  } else {
    // HTML pages - Stale While Revalidate
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache First Strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Network request failed:', error);
    return new Response('Network error', { status: 503 });
  }
}

// Network First Strategy
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    return cached || new Response('Network error', { status: 503 });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  });
  
  return cached || fetchPromise;
}