# 部署到 Netlify

## 快速部署

### 方法1：通过 Netlify Dashboard（推荐）

1. 访问 https://app.netlify.com/
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub 连接
4. 选择仓库：`hjouy/ai-tools-directory`
5. 配置构建设置：
   - Build command: 留空
   - Publish directory: `./`
   - Branch: `main`
6. 点击 "Deploy site"

7. 等待部署完成（通常30秒-1分钟）

8. 部署完成后，访问地址为：`https://ai-tools-nav.netlify.app`

### 方法2：使用 Netlify CLI（需要安装 Node.js）

1. 安装 Netlify CLI：
```bash
npm install -g netlify-cli
```

2. 登录：
```bash
netlify login
```

3. 部署：
```bash
netlify deploy --prod --dir=.
```

4. 按照提示输入站点名称：`ai-tools-nav`

## 自定义域名

在 Netlify Dashboard 中：
1. 进入 Site settings → Domain management
2. 添加自定义域名（可选）
3. 配置 DNS 记录

## 特性

✅ 全球CDN加速
✅ 国内访问速度一般
✅ 每次推送代码自动更新
✅ 自动HTTPS证书
✅ 免费额度充足（100GB/月）

## 注意事项

⚠️ 国内访问速度比 Vercel 和 Cloudflare 稍慢
⚠️ 免费版每月有100GB流量限制

## 推荐用途

✅ 作为备用访问入口
✅ 全球用户访问
✅ 测试和预览环境
