# 蔡骐充 AI 产品经理作品集

公开脱敏的中文 AI 产品作品集：三个旗舰 Agent 案例、六个精选项目、在线简历、12 页 PDF 与 73.5 秒演示视频。

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

静态文件生成到 `dist-pages/`。`404.html` 与入口共用同一构建，使 `/projects/{slug}` 和 `/resume` 在 GitHub Pages 直接访问时仍能正确渲染。推送到 `main` 后，`.github/workflows/pages.yml` 自动部署。

## 内容结构

- `app/`：Vinext 本地预览页面与样式。
- `static/`：GitHub Pages 静态入口与路由。
- `lib/portfolio.ts`：作品集事实、决策与项目口径的唯一内容源。
- `public/projects.json`：便于复用的公开项目索引。
- `public/assets/`：脱敏截图、PDF、DOCX 与演示视频。

公开版不包含真实密钥、内部 URL、原始业务数据、私人联系方式或本地绝对路径。
