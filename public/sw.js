const CACHE_NAME = 'safeguard-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/manifest.json',
    '/icon.svg',
    '/favicon.ico',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Only handle GET requests for now
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                // Optional: Return a fallback offline page if it's a navigation request
                if (event.request.mode === 'navigate') {
                    return caches.match('/');
                }
            });
        })
    );
});

// Implementation of background sync would go here
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-incidents') {
        event.waitUntil(syncIncidents());
    }
});

async function syncIncidents() {
    // Logic to read from IndexedDB and send to server
    console.log('Syncing incidents in background...');
}
