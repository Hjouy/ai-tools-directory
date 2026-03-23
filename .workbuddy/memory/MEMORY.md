# AI工具导航站 - 长期记忆

## 项目概况
- **项目类型**：AI工具导航站（参考 toolify.ai 模式）
- **GitHub Pages 地址**：https://hjouy.github.io/ai-tools-directory/
- **仓库**：https://github.com/hjouy/ai-tools-directory
- **本地工作区**：`c:\Users\36970\WorkBuddy\20260323080729\`
- **盈利模式**：免费收录 + 付费推广（¥299/月专业版，¥999/月顶级版）

## 已有页面（截至 2026-03-23）
| 页面 | 描述 |
|------|------|
| index.html | 首页，6分类+6热门工具+AI对话+快速查询+移动端优化 |
| tool.html | 工具详情页，含8个工具完整数据 |
| writing.html | AI写作分类页，12个工具+搜索框 |
| image.html | AI绘画分类页，12个工具+搜索框 |
| ranking.html | 排行榜（月榜/分类榜/飙升榜） |
| news.html | AI行业资讯（含侧边栏热门话题） |
| submit.html | 工具提交页（三档套餐） |
| converter.html | 文件转换工具（PDF/Word/Excel/图片）- 图片转PDF完全可用 |
| compare.html | 工具对比页（ChatGPT vs Claude等4组对比） |
| tutorials.html | AI工具教程专区（10个工具使用教程） |
| use-cases.html | 使用场景页（6个应用场景） |
| 404.html | 404错误页面（带导航和搜索） |
| rss.xml | RSS订阅源（包含所有工具、对比、教程、资讯） |

## SEO资产（2026-03-23 完成）
- `sitemap.xml`：23个URL完整站点地图（新增 compare.html、tutorials.html）
- `robots.txt`：搜索引擎规则
- `seo-head.js`：公共SEO脚本
- 每页均有：完整meta/og/twitter card/JSON-LD结构化数据/canonical URL/面包屑
- 额外结构化数据：FAQ、HowTo 教程、BreadcrumbList

## 工具详情页支持的工具ID
chatgpt, midjourney, cursor, stable-diffusion, runway, suno, claude, notion-ai

## 技术栈
- 纯HTML/CSS/JS（无框架），GitHub Pages静态托管
- 暗色主题，渐变色彩，响应式设计
- localStorage保存AI对话历史
- jsPDF：图片转PDF功能
- mammoth.js：文档转换支持（演示版本）

## 后续升级方向
- 增加更多工具详情页（video/code/audio 分类）
- 用户收藏功能（localStorage）
- 暗色/亮色模式切换
- 用户生成内容：评论、收藏、评分系统（localStorage + 可选后端）
- 页面加载速度优化：图片压缩、懒加载、CDN
- 提交站点地图到 Google Search Console / Bing Webmaster Tools
- 文件转换后端服务：PDF转Word、Word转PDF、PDF转Excel（当前仅图片转PDF可用）

## 工作流程
- 本地开发完成后，直接执行 git push
- 用户要求：每次提升完成后自动推送，不再给用户手动操作
