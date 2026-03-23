# 部署到 Cloudflare Pages

## 快速部署

### 方法1：通过 Cloudflare Dashboard（推荐）

1. 访问 https://dash.cloudflare.com/
2. 登录后，点击左侧菜单 "Pages"
3. 点击 "Create a project"
4. 选择 "Connect to Git" 连接你的 GitHub 仓库
5. 选择仓库：`hjouy/ai-tools-directory`
6. 配置构建设置：
   - Project name: `ai-tools-nav`
   - Framework preset: `None`
   - Build command: 留空
   - Build output directory: `.`
   - Root directory: `/`
7. 点击 "Save and Deploy"

8. 等待部署完成（通常1-2分钟）

9. 部署完成后，访问地址为：`https://ai-tools-nav.pages.dev`

### 方法2：使用 Wrangler CLI（需要安装 Node.js）

1. 安装 Wrangler：
```bash
npm install -g wrangler
```

2. 登录 Cloudflare：
```bash
wrangler login
```

3. 部署：
```bash
wrangler pages deploy . --project-name=ai-tools-nav
```

## 自定义域名

在 Cloudflare Dashboard 中：
1. 进入 Pages 项目 → Custom domains
2. 添加自定义域名（可选）
3. 配置 DNS 记录

## 特性

✅ 全球CDN加速
✅ 国内访问速度优秀
✅ 每次推送代码自动更新
✅ 自动HTTPS证书
✅ 无限带宽
✅ 免费额度充足

## 与 GitHub Pages 对比

| 特性 | GitHub Pages | Cloudflare Pages |
|------|-------------|-----------------|
| 国内速度 | 慢 ❌ | 快 ✅ |
| 免费 | ✅ | ✅ |
| 自定义域名 | ✅ | ✅ |
| 构建时间 | 较快 | 快 |
| 全球CDN | 一般 | 优秀 |
| 部署速度 | 快 | 快 |
