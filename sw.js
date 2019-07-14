CACHE_NAME = "cache_v1.4";
URL_CACHE = [
  'index.html',
  '/',
  'styles.css',
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
  "https://juststickers.in/wp-content/uploads/2014/05/Tux-Shape-Cut.png"
];

self.addEventListener('install', (event) => {
  // console.log("installed");


  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        cache.addAll(URL_CACHE);
      })
  );

});

self.addEventListener('activate', (event) => {

  event.waitUntil(
    caches.keys()
      .then((cache) => {
        Promise.all(
          cache.filter(item => {
            if (item != CACHE_NAME)
              return caches.delete(item);
          })
        );
      })
  );
  event.waitUntil(self.clients.claim());
});


self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(res => {
        if (res) {
          console.log("I'm on the cache", res);
          return res;
        }
        return fetch(event.request, { "cache": "no-store" })
          .then(res => {
            console.log("Not cache", res);
            return res;
          }, err => {
            return err;
          })
      })
  );
});
