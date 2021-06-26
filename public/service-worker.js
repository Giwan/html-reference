const CACHE_NAME = "cache-v2";

self.addEventListener("install", function (event) {
    console.info("Service worker installed");
});

// https://web.dev/offline-cookbook/#on-activate
const handleActivationEvent = async function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            cacheNames
                .filter((cacheName) => cacheName !== CACHE_NAME)
                .map((cacheName) => caches.delete(cacheName));
        })
    );
};

self.addEventListener("activate", handleActivationEvent);

const handleFetchEvent = function (event) {
    const noCache = [/manifest\.json/, /service-worker\.js/];

    if (noCache.find((ncItem) => ncItem.test(event.request.url))) {
        return fetch(event.request.url);
    }

    // --------------- other requests can be cached  ---------------

    event.respondWith(
        caches.match(event.request.url).then(async (cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            try {
                const cache = await caches.open(CACHE_NAME);
                const response = await fetch(event.request.url);

                await cache.add(event.request.url);

                return response;
            } catch (error) {
                console.error("failed to request: ", event.request.url);
                return await fetch(event.request.url);
            }
        })
    );
};

self.addEventListener("fetch", handleFetchEvent);
