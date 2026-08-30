import {
  PortfolioHome,
  PortfolioNotFound,
  PortfolioProjectPage,
} from '@/components/portfolio-v2';
import { getProjectV2 } from '@/lib/v2-portfolio';

const BASE_PATH = '/ai-product-portfolio';

function normalizePath(pathname: string) {
  const withoutBase = pathname.startsWith(BASE_PATH) ? pathname.slice(BASE_PATH.length) : pathname;
  return withoutBase.replace(/\/+$/, '') || '/';
}

export function StaticApp() {
  const path = normalizePath(window.location.pathname);

  const match = path.match(/^\/projects\/([^/]+)$/);
  if (match) {
    const project = getProjectV2(decodeURIComponent(match[1]));
    return project ? <PortfolioProjectPage project={project} /> : <PortfolioNotFound />;
  }

  return path === '/' ? <PortfolioHome /> : <PortfolioNotFound />;
}
