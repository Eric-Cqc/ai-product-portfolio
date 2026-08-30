# 蔡骐充人工智能产品作品集

中文人工智能产品案例集，只保留三个完整案例，并提供 PDF 与交互演示。

## 本地查看

```bash
npm ci
npm run dev
```

默认地址为 `http://localhost:3000/`。

## GitHub Pages 构建

```bash
npm run build:pages
```

静态文件生成到 `dist-pages/`。构建后会为三个 `/projects/{slug}` 生成实体入口，并保留 `404.html` 回退，使 GitHub Pages 深链直接返回可访问页面。推送到 `main` 后，`.github/workflows/pages.yml` 自动部署。

## 内容结构

- `app/`：Vinext 本地预览页面与样式。
- `static/`：GitHub Pages 静态入口与路由。
- `lib/v3-portfolio.ts`：三个旗舰项目共用的事实、决策与公开口径。
- `public/projects.json`：便于复用的公开项目索引。
- `public/assets/`：脱敏截图、作品集 PDF 与演示视频。
