import { ArrowUpRight, Code2, PlayCircle } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-wrap flex items-center justify-between gap-4 py-4 sm:py-5">
        <a className="brand-mark focus-ring" href="./" aria-label="蔡骐充 AI 产品经理作品集首页">
          <span>CQC</span>
          <span className="brand-divider" aria-hidden="true" />
          <span>AI PRODUCT</span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          <a className="focus-ring" href="#projects">项目</a>
          <a className="focus-ring" href="#method">方法</a>
          <a className="focus-ring" href="resume">简历</a>
        </nav>
        <a className="text-link focus-ring hidden sm:inline-flex" href="蔡骐充_AI产品经理_作品集.pdf">
          下载 PDF <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#f2efe7]">
      <div className="site-wrap grid gap-8 py-10 md:grid-cols-[1.2fr_.8fr] md:py-14">
        <div>
          <p className="eyebrow">NEXT CONVERSATION</p>
          <p className="mt-4 max-w-2xl font-heading text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">
            如果一个问题值得用 AI，<br className="hidden sm:block" />它也值得被认真验证。
          </p>
        </div>
        <div className="flex flex-col justify-end gap-3 text-sm text-muted-foreground md:items-end">
          <a className="text-link focus-ring" href="https://github.com/Eric-Cqc" target="_blank" rel="noreferrer">
            <Code2 aria-hidden="true" /> GitHub / Eric-Cqc
          </a>
          <a className="text-link focus-ring" href="assets/demo.mp4">
            <PlayCircle aria-hidden="true" /> 观看 90 秒演示
          </a>
          <p className="mt-3">公开脱敏版 · 最后更新 2026.08</p>
        </div>
      </div>
      <div className="border-t border-border/80">
        <div className="site-wrap flex flex-col justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 蔡骐充 / Eric CQC</p>
          <p>不含内部客户、真实业务数据、密钥或私人联系方式</p>
        </div>
      </div>
    </footer>
  );
}

export function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return (
    <div className="flex items-center gap-3">
      {index ? <span className="section-index">{index}</span> : null}
      <p className="eyebrow">{children}</p>
    </div>
  );
}
