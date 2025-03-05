const CACHE_NAME = "pwa-cache-v2";
const FILES_TO_CACHE = [
  "index.html",
  "style.css",
  "app.js",
  "triangle.png",
  "profilepix.png",
  "offline.html",
  "clic1.mp3",
];

//  INSTALL - Mise en cache des fichiers statiques
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

//  ACTIVATE - Suppression des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME) // Garde seulement le cache actuel
          .map((key) => caches.delete(key)) // Supprime les anciens caches
      );
    })
  );
});

//  FETCH -  requetes + cache dynamique
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request)
            .then((response) => {
              return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, response.clone()); //  Cache dynamique
                return response;
              });
            })
            .catch(() => caches.match("/offline.html")) //   offline
        );
      })
  );
});
