# 🚀 AI工具导航站

<div align="center">

**发现最好用的人工智能工具**

收录500+ AI工具，涵盖AI写作、AI绘画、AI视频、AI编程、AI音乐等热门分类

[![GitHub Stars](https://img.shields.io/github/stars/hjouy/ai-tools-directory?style=social)](https://github.com/hjouy/ai-tools-directory)
[![GitHub Issues](https://img.shields.io/github/issues/hjouy/ai-tools-directory)](https://github.com/hjouy/ai-tools-directory/issues)
[![License](https://img.shields.io/github/license/hjouy/ai-tools-directory)](LICENSE)

</div>

---

## 🌐 访问地址（多平台部署）

⚠️ **重要提示**：GitHub Pages 在中国大陆访问可能不稳定，建议优先使用其他镜像地址。

### 国内用户推荐访问地址

| 平台 | 访问地址 | 速度 | 推荐度 |
|------|---------|------|--------|
| **Vercel** ⭐ | https://ai-tools-nav.vercel.app | 最快 | ⭐⭐⭐⭐⭐ |
| **Cloudflare Pages** | https://ai-tools-nav.pages.dev | 快 | ⭐⭐⭐⭐ |
| **Netlify** | https://ai-tools-nav.netlify.app | 一般 | ⭐⭐⭐ |
| **GitHub Pages** | https://hjouy.github.io/ai-tools-directory/ | 可能慢 | ⭐⭐ |

### 国内备用入口

如果以上地址都无法访问，请访问：[国内访问入口页](https://hjouy.github.io/ai-tools-directory/index-cn.html)

### 海外用户

海外用户推荐使用 **GitHub Pages**，访问速度最佳且功能最完整。

---

## ✨ 功能特色

### 🔥 核心工具（完整版）

- **🎨 在线PS编辑器** - 专业级图片编辑，支持HSL调整、图层管理、撤销重做
- **👤 人脸融合** - 基于FaceMesh AI模型的真实换脸
- **📸 老照片修复** - AI去噪、划痕修复、黑白上色
- **🎭 风格转换** - Neural Style Transfer，6种艺术风格
- **🖼️ 超分辨率** - ESRGAN AI高清放大
- **🎬 AI视频剪辑** - 语音识别 + SRT字幕生成
- **🎞️ GIF制作** - 真实GIF编码，视频转GIF
- **🎥 视频背景移除** - MediaRecorder实时视频导出

### 📁 工具分类

- **AI写作** - 文案生成、内容创作、翻译工具
- **AI绘画** - 图片生成、风格转换、老照片修复
- **AI视频** - 视频剪辑、背景移除、GIF制作
- **AI编程** - 代码生成、代码解释、代码优化
- **AI音乐** - 音乐生成、声音克隆、语音合成
- **AI音频** - 语音转文字、文字转语音、音频处理

### 💎 其他功能

- 工具对比评测
- 工具使用教程
- AI行业资讯
- 工具排行榜（月榜/分类榜/飙升榜）
- 浮动AI对话助手
- 文件转换工具（PDF/Word/Excel/图片）

---

## 🛠️ 技术栈

- **前端框架**：纯 HTML + CSS + JavaScript（无框架依赖）
- **AI模型**：
  - TensorFlow.js + FaceMesh（人脸融合）
  - Hugging Face API（Stable Diffusion XL, GFPGAN, DeOldify, InstructPix2Pix）
  - Web Speech API（语音识别）
- **图片处理**：Canvas API, jsPDF, mammoth.js
- **部署平台**：GitHub Pages, Vercel, Cloudflare Pages, Netlify

---

## 📦 项目结构

```
ai-tools-directory/
├── index.html              # 首页
├── index-cn.html           # 国内访问入口页
├── tool.html               # 工具详情页
├── image-editor.html       # 在线PS编辑器
├── face-fusion.html        # 人脸融合
├── old-photo-restore.html  # 老照片修复
├── style-transfer.html     # 风格转换
├── super-resolution.html   # 超分辨率
├── ai-video-editor.html   # AI视频剪辑
├── gif-maker.html          # GIF制作
├── converter.html          # 文件转换
├── writing.html            # AI写作分类
├── image.html              # AI绘画分类
├── ranking.html            # 排行榜
├── news.html               # AI资讯
├── compare.html            # 工具对比
├── tutorials.html          # 使用教程
├── submit.html             # 工具提交
└── sitemap.xml             # 站点地图
```

---

## 🚀 本地开发

1. **克隆仓库**
```bash
git clone https://github.com/hjouy/ai-tools-directory.git
cd ai-tools-directory
```

2. **启动本地服务器**
```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve
```

3. **访问**
打开浏览器访问 `http://localhost:8000`

---

## 🌍 部署到其他平台

### Vercel（推荐）

查看详细部署指南：[DEPLOY_VERCEL.md](DEPLOY_VERCEL.md)

快速部署：
```bash
npm install -g vercel
vercel
```

### Cloudflare Pages

查看详细部署指南：[DEPLOY_CLOUDFLARE.md](DEPLOY_CLOUDFLARE.md)

快速部署：访问 https://dash.cloudflare.com/ → Pages → Create a project

### Netlify

查看详细部署指南：[DEPLOY_NETLIFY.md](DEPLOY_NETLIFY.md)

快速部署：访问 https://app.netlify.com/ → Add new site → Import from Git

---

## 📝 更新日志

### v2.0.0 (2026-03-23) - 专业版升级

✅ **8个工具完整版升级**
1. GIF制作工具 - gif.js真实GIF编码
2. 视频背景移除 - MediaRecorder视频导出
3. AI视频剪辑 - Web Speech API语音识别
4. AI图片生成 - Hugging Face Stable Diffusion XL
5. 人脸融合 - TensorFlow.js + FaceMesh AI模型
6. 老照片修复 - GFPGAN/DeOldify API
7. 风格转换 - InstructPix2Pix Neural Style Transfer
8. 图片编辑器 - 专业PS级编辑（撤销重做/HSL/图层/智能修复）

✅ **新增国内访问入口页**
✅ **多平台部署配置**

### v1.0.0 (2026-03-23) - 初始版本

✅ 基础工具集完成
✅ SEO优化（sitemap.xml, robots.txt）
✅ 完整的网站结构

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 📧 联系方式

- **项目地址**：https://github.com/hjouy/ai-tools-directory
- **在线访问**：https://ai-tools-nav.vercel.app（推荐）

---

<div align="center">

**如果觉得这个项目对你有帮助，请给个 ⭐️ Star 支持一下！**

Made with ❤️ by [AI工具导航站](https://ai-tools-nav.vercel.app)

</div>
