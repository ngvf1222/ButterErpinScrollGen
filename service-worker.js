const addResourcesToCache = async (resources) => {
  // 오프라인 데이터 저장을 위해 Cache Storage 활용
  const cache = await caches.open("trickcal-rolls-cache");
  await cache.addAll(resources);
};
// ver 2
self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      // 캐시하려는 모든 리소스를 나열..
      "/",
      "https://unpkg.com/@tailwindcss/browser@4",
      "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js",
      "./index.html",
      "./style.css",
      "./script.js",
      "./475638249_17856458853362958_1850110772365870625_n.jpg",
      "./475731059_17856458862362958_5142921208880804035_n.jpg",
      "./ONE Mobile POP.ttf",
      "./Stage_fairy_a.png",
      "475731059_17856458862362958_5142921208880804035_ncopy.jpg",
      "manifest.json",
    ])
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    // 캐시 우선 전략 (그 외 다른 전략에 대해서는 후술)
    // -> 캐시된 응답에서 먼저 검색하고, 찾지 못한 경우 네트워크에서 로드
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener("install", (event) => {
  // 서비스 워커가 즉시 activate 되도록 강제
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // 새로 activate 된 서비스 워커가 즉시 모든 페이지를 제어하도록 강제
  event.waitUntil(clients.claim());
});
