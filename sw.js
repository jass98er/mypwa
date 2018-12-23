var appVersion = 'v1.00';

var files = [
    "./",
    "./index.html",
    "./main.css",
    "./icon.png",
]

self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(appVersion)
        .then(cache=>{
            return cache.addAll(files)
            .catch(err=>{
                console.error('error finding files')
            })
        })
    )
    console.info('sw installed');
    //self.skipWaiting();
})

self.addEventListener('activate',event=>{
    event.waitUntil(
        caches.keys()
        .then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache=>{
                    if(cache !== appVersion){
                        console.info("deleted old cache")
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
    //return self.clients.claim();
})

self.addEventListener('fetch',event=>{
    console.info('SW fetch',event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(res=>{
            return res || fetch(event.request);
        })
    )
})