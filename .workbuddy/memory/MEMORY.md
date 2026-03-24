# AI工具导航站 - 长期记忆

## 项目概况
- **项目类型**：AI工具导航站（参考 toolify.ai 模式）
- **GitHub Pages 地址**：https://hjouy.github.io/ai-tools-directory/
- **仓库**：https://github.com/hjouy/ai-tools-directory
- **本地工作区**：`c:\Users\36970\WorkBuddy\20260323080729\`
- **盈利模式**：免费收录 + 付费推广（¥299/月专业版，¥999/月顶级版）
- **核心定位**：免费在线工具平台（用户不需要注册即可使用各种工具）

## 首页布局重构 (2026-03-23 晚)
- **核心策略**：在线工具是第一吸引力，AI工具推荐弱化
- Hero区域：改为"免费在线工具"主题，突出"无需注册·浏览器直接用"
- 在线工具专区：12个工具卡片展示（证件照/抠图/老照片/风格转换/超分/视频抠图/人脸融合/文件转换/GIF/图片压缩/计算器/密码生成）
- AI工具推荐：移到下方，简化显示
- 导航栏：在线工具设为首选入口

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

## 统一工具数据库 (data.js) - 2026-03-23 完成
- 新增 `data.js` 统一管理所有工具数据
- 收录 20+ AI 工具完整数据（ChatGPT/Midjourney/Cursor/Claude/Stable Diffusion/Runway/Suno/Gemini等）
- index.html 改为动态从 data.js 加载工具数据
- tool.html 改为使用 data.js 中的 TOOLS_DATA
- 包含 Python 批量更新脚本 (update_index.py, update_tool.py)

## 在线工具页面 (2026-03-23 全面升级)
| 页面 | 功能 | AI模型/算法 |
|------|------|-------------|
| id-photo.html | 证件照换底色 | ⭐ MediaPipe SelfieSegmentation |
| background-remover.html | AI智能抠图 | ⭐ MediaPipe SelfieSegmentation |
| video-bg-remove.html | AI视频抠图 | ⭐ MediaPipe SelfieSegmentation |
| old-photo-restore.html | 老照片修复 | 增强去噪/上色/锐化算法 |
| style-transfer.html | 风格转换 | 6种艺术风格增强算法 |
| super-resolution.html | 图片超分 | 双三次插值+细节增强+智能锐化 |
| converter.html | 文件格式转换 | 可用 |
| gif-maker.html | GIF制作 | 可用 |
| image-compress.html | 图片压缩 | 可用 |

## MediaPipe SelfieSegmentation 模型
- CDN: `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1.1632779610/`
- TensorFlow.js: `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.17.0/dist/tf.min.js`
- 模型类型：general（通用模式，边缘处理更好）
- 备用算法：基于颜色边缘检测的分割（fallbackSegmentation）

## 技术栈
- 纯HTML/CSS/JS（无框架），GitHub Pages静态托管
- 暗色主题，渐变色彩，响应式设计
- localStorage保存AI对话历史
- jsPDF：图片转PDF功能
- mammoth.js：文档转换支持（演示版本）
- MediaPipe SelfieSegmentation：人像分割（证件照换底色）

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

## ⚠️ 进行中的工作：数据同步 (2026-03-23)

### 当前进度
| 页面 | 状态 | 说明 |
|------|------|------|
| index.html | ✅ 已完成 | 引用 data.js，动态渲染 |
| tool.html | ✅ 已完成 | 使用 TOOLS_DATA |
| writing.html | ✅ 已完成 | 同步到 data.js |
| image.html | ✅ 已完成 | 同步到 data.js |
| ranking.html | ✅ 已完成 | 月榜/分类榜/飙升榜动态渲染 |

### data.js 写作类工具 (2026-03-23 新增)
- chatgpt, claude, jasper, copy-ai, writesonic, rytr
- grammarly, kimi, tongyi-qianwen, wenxin-yiyan, perplexity

### 同步要点
1. 在页面 `<head>` 中添加 `<script src="data.js"></script>`
2. 删除页面内的硬编码工具数据
3. 使用 `TOOLS_DATA` 获取对应分类工具
4. 保留页面的样式和交互逻辑不变

### ranking.html 同步详情 (2026-03-23 21:16)
- 月榜：10个工具按排名顺序渲染，含涨跌幅趋势
- 分类榜：AI写作/AI绘画/AI编程各TOP3
- 飙升榜：4个增长最快的工具，含增长率
- 跳转逻辑：有详情页的工具 → tool.html，无详情页 → 官网

### 重要提醒
- **不要删除旧数据**，只是让页面从 data.js 读取
- Git 历史已保存所有旧代码，无需额外备份
- 同步顺序建议：writing.html → image.html → ranking.html

## SEO优化完成 (2026-03-23 晚)
- 创建 SEO_GUIDE.md 提交指南
- 工具页面已有独立SEO标签
- sitemap.xml 包含 60+ URL
- 新增5篇高质量教程文章：
  - tutorial-id-photo.html - 证件照制作指南
  - tutorial-photo-edit.html - 老照片修复教程
  - tutorial-cutout.html - 在线抠图教程
  - tutorial-file-convert.html - PDF转换指南
  - tutorial-chatgpt.html - ChatGPT完全指南

## 网站功能升级 (2026-03-23 深夜)
- Font Awesome 异步加载（23个页面）
- 暗色/亮色主题切换（initTheme, toggleTheme函数）
- 社交分享按钮（微信/微博/QQ/复制链接）
- 图片下载自动加水印（保护版权）
- 新增5篇教程：
  - tutorial-super-resolution.html
  - tutorial-face-fusion.html
  - tutorial-video-bg-remove.html
  - tutorial-style-transfer.html
  - tutorial-image-compress.html
- 关键文件：share-buttons.js, watermark.js, optimize_fa.py

## 在线工具质量优化 (2026-03-24)
- **修复style-transfer.html BUG**：applyPopArtStyle和applyVintageStyle中original变量未定义，添加Uint8ClampedArray副本
- **完善pdf-tools.html**：
  - PDF转PNG：使用PDF.js实现多页PDF逐页转换为PNG图片
  - PDF压缩：使用pdf-lib的useObjectStreams选项压缩，显示压缩前后大小对比
- **检查结果**：background-remover/id-photo/gif-maker/image-compress/video-bg-remove/old-photo-restore/converter等功能均正常
