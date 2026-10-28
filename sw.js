// 이 숫자를 올리면 새 버전 설치 때 이전 캐시를 삭제합니다.
const CACHE_VERSION='travel-packing-cache-v3';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./sw.js','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_VERSION).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_VERSION).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE_VERSION).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match('./index.html'))))});
