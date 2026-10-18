# 蔡骐充 · AI 产品案例集

**三个产品案例，展示如何把模糊业务问题转成可运行、可审查的 AI 工作流程。**

[打开在线案例集](https://eric-cqc.github.io/ai-product-portfolio/) · [观看演示视频](https://eric-cqc.github.io/ai-product-portfolio/assets/demo.mp4) · [查看 GitHub 个人主页](https://github.com/Eric-Cqc)

| 案例 | 为谁解决什么问题 | 公开阶段与入口 |
| --- | --- | --- |
| AI Video Preproduction Agent | 帮助内容团队从需求与创意走到可审核的制作蓝图 | 本地流程原型；[案例](https://eric-cqc.github.io/ai-product-portfolio/projects/ai-video-preproduction) / [源码](https://github.com/Eric-Cqc/ai-video-preproduction-agent) |
| HealthAI Radar | 帮助战略情报分析员把资讯、证据与趋势判断连接起来 | 本地研究工作台；[案例](https://eric-cqc.github.io/ai-product-portfolio/projects/healthai-radar) |
| MathMentor 奥数私教 | 通过逐层提示、独立判题和迁移任务组织学习 | 本地网页原型与固定评测；[案例](https://eric-cqc.github.io/ai-product-portfolio/projects/mathmentor)；基于 DeepTutor v1.5.11 扩展 |

每个案例说明目标用户、我的工作、关键产品选择、截图及验证边界。在线站点是案例展示；视频入口是录制演示，不是三个产品的在线试用服务。HealthAI Radar 与 MathMentor 此处提供案例材料，不将本站源码描述为它们的完整应用源码。

本仓库维护三个案例的展示网站。SQL、机器学习及其他研究项目在[个人主页](https://github.com/Eric-Cqc)单独列出，不计入这三个案例。

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
- `lib/v3-portfolio.ts`：三个案例共用的事实、决策与公开口径。
- `public/projects.json`：公开项目索引。
- `public/assets/`：脱敏截图、作品集 PDF 与演示视频。
