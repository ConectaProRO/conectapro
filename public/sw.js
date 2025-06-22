// Service Worker atualizado para cache menos agressivo
const CACHE_NAME = 'conectapro-v' + Date.now(); // Cache dinâmico
const urlsToCache = [
  '/',
  '/conectapro.png',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/manifest.json'
];

// Instalar service worker
self.addEventListener('install', function(event) {
  // Pular espera e ativar imediatamente
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativar service worker
self.addEventListener('activate', function(event) {
  // Tomar controle imediatamente
  self.clients.claim();
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // Deletar caches antigos
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar requisições - estratégia Network First para HTML
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  
  // Para arquivos HTML, sempre tentar rede primeiro
  if (event.request.destination === 'document' || 
      url.pathname.endsWith('.html') || 
      url.pathname === '/') {
    
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          // Se a rede responder, usar e cachear
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(function() {
          // Se falhar, tentar cache
          return caches.match(event.request);
        })
    );
  }
  // Para outros recursos, usar cache primeiro
  else {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Se estiver no cache, retornar
          if (response) {
            return response;
          }
          
          // Se não, buscar na rede
          return fetch(event.request).then(function(response) {
            // Cachear apenas se for sucesso
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          });
        })
    );
  }
});

// Mensagem para forçar atualização
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(cacheName) {
        caches.delete(cacheName);
      });
    });
  }
});
