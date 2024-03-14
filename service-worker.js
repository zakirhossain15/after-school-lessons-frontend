const CACHE_NAME = 'app-cache-v1';

const urlsToCache = [
'/',
'/index.html',
];

self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});

self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => {
if (event.request.url.match(/\.(jpe?g|png|gif|svg)$/i)) {
return serveImage(event.request);
}
return response || fetch(event.request);
})
.catch(() => {
return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
})
);
});

const serveImage = request => {
return caches.open(CACHE_NAME).then(cache => {
return cache.match(request).then(response => {
if (response) return response;

return fetch(request).then(networkResponse => {
cache.put(request, networkResponse.clone());
return networkResponse;
});
});
});
};

self.addEventListener('activate', event => {
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.filter(cacheName => {
return cacheName !== CACHE_NAME;
}).map(cacheName => {
return caches.delete(cacheName);
})
);
})
);
});