import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const out = resolve('dist-pages');
const entry = resolve(out, 'index.html');
const routes = [
  'resume',
  'projects/mathmentor',
  'projects/healthai-radar',
  'projects/ai-video-preproduction',
  'projects/ai-saas-pricing',
  'projects/super-agent',
  'projects/quant-alpha',
  'projects/credit-default',
  'projects/courier-action',
  'projects/campus-food-sim',
];

await copyFile(entry, resolve(out, '404.html'));

for (const route of routes) {
  const destination = resolve(out, route);
  await mkdir(destination, { recursive: true });
  await copyFile(entry, resolve(destination, 'index.html'));
}
