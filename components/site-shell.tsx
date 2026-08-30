import type { ReactNode } from 'react';

export {
  PortfolioFooter as SiteFooter,
  PortfolioHeader as SiteHeader,
} from '@/components/portfolio-v2';

export function SectionLabel({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <div className="flex items-center gap-3">
      {index ? <span className="section-index">{index}</span> : null}
      <p className="eyebrow">{children}</p>
    </div>
  );
}
