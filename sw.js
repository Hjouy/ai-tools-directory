// Service Worker - AI工具导航 PWA 离线缓存
const CACHE_NAME = 'ai-nav-v1';
const STATIC_CACHE = 'ai-nav-static-v1';

// 核心静态资源（优先缓存）
const CORE_ASSETS = [
  '/ai-tools-directory/',
  '/ai-tools-directory/index.html',
  '/ai-tools-directory/tools.html',
  '/ai-tools-directory/ranking.html',
  '/ai-tools-directory/data.js',
  '/ai-tools-directory/manifest.json',
];

// 工具页面（按需缓存）
const TOOL_PAGES = [
  'background-remover.html',
  'id-photo.html',
  'image-compress.html',
  'image-editor.html',
  'gif.html',
  'converter.html',
  'calculator.html',
  'password.html',
  'qrcode.html',
  'super-resolution.html',
  'old-photo-restore.html',
].map(p => '/ai-tools-directory/' + p);

// 安装事件：缓存核心资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(CORE_ASSETS).catch(err => {
        console.warn('[SW] 部分资源缓存失败:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 激活事件：清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== STATIC_CACHE)
          .map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// fetch 拦截：Network First 策略（优先网络，失败回退缓存）
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 只处理同源 GET 请求
  if (event.request.method !== 'GET') return;
  // 不缓存 CDN 模型文件（太大）
  if (url.hostname !== location.hostname && !url.hostname.includes('cdnjs')) return;
  // 不缓存 ONNX/模型分块
  if (url.pathname.includes('/chunks/') || url.pathname.endsWith('.onnx')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 网络成功：存入缓存
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // 网络失败：读缓存
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // 离线且无缓存：返回主页
          if (event.request.mode === 'navigate') {
            return caches.match('/ai-tools-directory/index.html');
          }
          return new Response('离线中，暂无缓存', { status: 503 });
        });
      })
  );
});
