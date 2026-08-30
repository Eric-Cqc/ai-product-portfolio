# 蔡骐充 AI 产品作品集

中文 AI 产品作品集，包含四个完整案例、三个短案例和三个项目笔记，并提供 PDF 与交互演示。

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

静态文件生成到 `dist-pages/`。构建后会为十个 `/projects/{slug}` 生成实体入口，并保留 `404.html` 回退，使 GitHub Pages 深链直接返回可访问页面。推送到 `main` 后，`.github/workflows/pages.yml` 自动部署。

## 内容结构

- `app/`：Vinext 本地预览页面与样式。
- `static/`：GitHub Pages 静态入口与路由。
- `lib/v2-portfolio.ts`：十个项目的事实、决策与项目口径。
- `public/projects.json`：便于复用的公开项目索引。
- `public/assets/`：脱敏截图、作品集 PDF 与演示视频。
