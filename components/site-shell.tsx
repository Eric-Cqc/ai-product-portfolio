import type { ReactNode } from 'react';

export {
  PortfolioFooterV3 as SiteFooter,
  PortfolioHeaderV3 as SiteHeader,
} from '@/components/portfolio-v3';

export function SectionLabel({
  children,
  index,
}: {
  children: ReactNode;
  index?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {index ? <span className="section-index">{index}</span> : null}
      <p className="eyebrow">{children}</p>
    </div>
  );
}
