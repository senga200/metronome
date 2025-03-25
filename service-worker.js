// 1 : INSTALL - Mise en cache des fichiers
self.addEventListener('install', event => {
  event.waitUntil(
      caches.open('pwa-cache').then(cache => {
          return cache.addAll([
              'index.html',
              'style.css',
              'app.js',
              'triangle.png',
              'clic1.mp3',
              'offline.html' 
          ]);
      })
  );
});

// 2 : ACTIVATE - Nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
      caches.keys().then(keys => {
          return Promise.all(
              keys
                  .filter(key => key !== 'pwa-cache') // Garde seulement le cache actuel
                  .map(key => caches.delete(key))    // Supprime les autres caches
          );
      })
  );
});

// 3 : FETCH - Réponse avec cache ou réseau + fallback offline
self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request).then(response => {
          return response || fetch(event.request).catch(() => caches.match('offline.html'));
      })
  );
});