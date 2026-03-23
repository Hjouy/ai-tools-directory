# 部署到 Vercel

## 快速部署（推荐）

### 方法1：使用 Vercel CLI（需要安装 Node.js）

1. 安装 Vercel CLI：
```bash
npm install -g vercel
```

2. 在项目根目录运行：
```bash
vercel login
vercel
```

3. 按照提示操作，选择以下配置：
- Project name: `ai-tools-nav`
- Framework: `Other`
- Build Command: 留空
- Output Directory: `./`

4. 部署完成后，Vercel 会提供访问地址（如：https://ai-tools-nav.vercel.app）

### 方法2：通过 Vercel Dashboard（网页操作）

1. 访问 https://vercel.com/new
2. 导入你的 GitHub 仓库：`hjouy/ai-tools-directory`
3. 配置：
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build and Output Settings: 留空（默认即可）
4. 点击 "Deploy" 按钮

5. 等待部署完成（通常30秒-1分钟）

## 自定义域名

在 Vercel Dashboard 中：
1. 进入项目 Settings → Domains
2. 添加自定义域名（可选）
3. 按照提示配置 DNS 记录

## 常见问题

### 部署失败
- 确保 `vercel.json` 文件存在
- 检查仓库权限

### 访问404
- 确认 `_redirects` 或 `vercel.json` 配置正确
- 清除浏览器缓存重试

## 预期结果

✅ Vercel 会自动部署你的静态网站
✅ 提供全球CDN加速
✅ 国内访问速度比 GitHub Pages 快很多
✅ 自动HTTPS证书
✅ 每次推送代码自动更新部署
