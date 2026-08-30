import { copyFile, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const out = resolve('dist-pages');
const entry = resolve(out, 'index.html');
const routes = [
  'projects/ai-video-preproduction',
  'projects/healthai-radar',
  'projects/mathmentor',
];

await copyFile(entry, resolve(out, '404.html'));

// 旧版项目素材不再进入公开构建，只发布三个当前案例。
await rm(resolve(out, 'assets/projects'), { recursive: true, force: true });
await rm(resolve(out, '蔡骐充_AI产品经理_作品集.pdf'), { force: true });

for (const route of routes) {
  const destination = resolve(out, route);
  await mkdir(destination, { recursive: true });
  await copyFile(entry, resolve(destination, 'index.html'));
}
