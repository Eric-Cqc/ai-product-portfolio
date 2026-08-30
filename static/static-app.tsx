import {
  PortfolioHomeV3,
  PortfolioNotFoundV3,
  PortfolioProjectPageV3,
} from '@/components/portfolio-v3';
import { getProjectV3 } from '@/lib/v3-portfolio';

const BASE_PATH = '/ai-product-portfolio';

function normalizePath(pathname: string) {
  const withoutBase = pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length)
    : pathname;
  return withoutBase.replace(/\/+$/, '') || '/';
}

export function StaticApp() {
  const path = normalizePath(window.location.pathname);

  const match = path.match(/^\/projects\/([^/]+)$/);
  if (match) {
    const project = getProjectV3(decodeURIComponent(match[1]));
    return project ? (
      <PortfolioProjectPageV3 project={project} />
    ) : (
      <PortfolioNotFoundV3 />
    );
  }

  return path === '/' ? <PortfolioHomeV3 /> : <PortfolioNotFoundV3 />;
}
