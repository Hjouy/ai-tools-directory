# 网站性能优化清单

## 已完成的优化

### 1. DNS预加载 ✅
- GitHub Pages: `dns-prefetch` + `preconnect`
- CDN: `preconnect` 到 cdnjs.cloudflare.com

### 2. 资源预加载 ✅
- 关键页面: `prefetch` tool.html, writing.html, image.html
- sitemap.xml 已提交

### 3. Script优化 ✅
- Google Analytics 使用 `async` 加载
- data.js 已在 head 中加载

## 待优化项

### 1. Font Awesome 异步加载
- 问题: Font Awesome 会阻塞渲染
- 方案: 使用 `media="print"` + `onload` 技巧
- 影响页面: 所有在线工具页面

### 2. 图片懒加载
- 问题: 非视口图片会立即加载
- 方案: 添加 `loading="lazy"` 属性
- 影响: 动态生成的图片（已有懒加载逻辑）

### 3. 关键CSS内联
- 问题: 大型CSS文件阻塞渲染
- 方案: 内联关键CSS，延迟加载完整CSS
- 当前状态: 已是内联CSS，无需优化

### 4. 第三方脚本延迟
- 问题: TensorFlow.js 等大型库阻塞渲染
- 方案: 使用 `defer` 或动态加载
- 影响页面: id-photo.html, background-remover.html, video-bg-remove.html

## Lighthouse 评分目标
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100
