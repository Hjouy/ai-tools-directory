# SEO搜索引擎优化指南

## 提交搜索引擎

### 1. Google Search Console（必须）

**网址**：https://search.google.com/search-console

**步骤**：
1. 登录 Google 账号
2. 点击「添加资源」
3. 选择「网域」或「网址前缀」
4. 验证网站所有权（推荐用 HTML 文件验证）
5. 验证通过后：
   - 点击左侧「站点地图」
   - 在「添加站点地图」输入框输入：`ai-tools-directory/sitemap.xml`
   - 点击提交

**或者直接访问**：
```
https://search.google.com/search-console/welcome
```

---

### 2. Bing Webmaster Tools（必须）

**网址**：https://www.bing.com/webmasters

**步骤**：
1. 登录 Microsoft 账号
2. 点击「添加网站」
3. 输入网站地址
4. 选择验证方式（推荐用元标记验证）
5. 验证通过后：
   - 点击「配置我的站点」→「站点地图」
   - 提交：`https://hjouy.github.io/ai-tools-directory/sitemap.xml`

---

### 3. 百度搜索资源平台（中文用户推荐）

**网址**：https://ziyuan.baidu.com

**步骤**：
1. 登录百度账号
2. 点击「用户中心」→「站点管理」
3. 添加网站并验证
4. 提交 sitemap.xml

---

## SEO优化清单

### 已完成 ✅
- [x] sitemap.xml - 包含所有页面
- [x] robots.txt - 正确配置
- [x] 首页完整 meta/og/twitter card
- [x] canonical URL
- [x] JSON-LD 结构化数据
- [x] FAQ 结构化数据
- [x] BreadcrumbList 结构化数据

### 待优化 ⚠️
- [ ] 为每个在线工具页添加独立 SEO 标题
- [ ] Google Search Console 提交
- [ ] Bing Webmaster Tools 提交
- [ ] 百度搜索资源平台提交

---

## 站点地图内容

**总计**：60+ URL

| 类别 | 数量 | 页面 |
|------|------|------|
| 首页 | 1 | index.html |
| 分类页 | 6 | writing/image/video/code/audio/productivity |
| 工具详情页 | 20+ | tool.html?id=xxx |
| 功能页 | 10+ | ranking/news/submit/converter... |
| 在线工具页 | 15+ | id-photo/background-remover... |

---

## 关键词策略

### 核心关键词
- AI工具导航
- 免费AI工具
- AI工具大全
- 在线AI工具

### 长尾关键词
- 证件照换底色 免费
- 在线抠图工具
- AI老照片修复
- 免费图片压缩
- PDF转Word在线

### 工具类关键词
- ChatGPT使用教程
- Midjourney注册
- Cursor AI编程
- Claude AI对话

---

## 内容更新建议

### 每周更新
- 1-2 篇工具使用教程
- 1 篇 AI 行业资讯
- 定期更新排行榜

### 每月更新
- 新增收录工具
- 工具对比文章
- 使用场景扩展

---

## 验证网站抓取

### Google
访问以下链接测试：
```
https://www.google.com/webmasters/tools/robots-testing-tool
```

### Bing
访问以下链接测试：
```
https://www.bing.com/webmaster/diagnostics/robotstxt
```

---

## 注意事项

1. **首次提交后**，Google 通常需要 1-2 周开始抓取
2. **定期更新 sitemap.xml** 的 lastmod 日期
3. **监控 Search Console** 的抓取错误，及时修复
4. **保持内容新鲜度**，搜索引擎喜欢活跃的网站
