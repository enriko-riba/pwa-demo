var CACHE_NAME = 'hw008';

var urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  '/styles/site.css',
  '/app.js',
  '/assets/icon-512x512.png',
  '/assets/st1.jpg'

  , //  lib
  '/lib/jquery-3.2.1.min.js',
  '/lib/howler.min.js'
];

self.addEventListener('install', function (event) {
  console.log('[ServiceWorker] install', event);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('[ServiceWorker] install, adding to cache...', urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  console.log("[ServiceWorker] fetch:", event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // if cache hit - return response
        if (response) {
          console.log("[ServiceWorker] from cache:", response.url);
          return response;
        }

        console.log("[ServiceWorker] from server:", event.request.url);

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function (response) {
            // Check if we received a valid response
            if (response.type!=='opaque' && (!response || response.status !== 200 || response.type !== 'basic')) {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
                console.log("[ServiceWorker] added response to cache: ", response.url);
              });

            return response;
          }
        );
      })
  );
});