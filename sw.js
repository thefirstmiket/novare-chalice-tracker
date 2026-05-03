// CACHE DISABLED - unregister old service workers
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))); self.clients.claim(); });