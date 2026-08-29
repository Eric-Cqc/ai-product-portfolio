import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, PlayCircle } from 'lucide-react';
import Home from '@/app/page';
import ResumePage from '@/app/resume/page';
import { ArchitectureDiagram, FlowDiagram, ProjectLeadVisual } from '@/components/project-visual';
import { SectionLabel, SiteFooter, SiteHeader } from '@/components/site-shell';
import { getProject, projects, type Project } from '@/lib/portfolio';

const BASE_PATH = '/ai-product-portfolio';

function normalizePath(pathname: string) {
  const withoutBase = pathname.startsWith(BASE_PATH) ? pathname.slice(BASE_PATH.length) : pathname;
  return withoutBase.replace(/\/+$/, '') || '/';
}

function StaticProjectPage({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const observedIndex = project.images && project.images.length > 1 ? '08' : '07';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="project-hero">
        <div className="site-wrap">
          <a className="back-link focus-ring" href="#projects"><ArrowLeft aria-hidden="true" /> 返回全部项目</a>
          <div className="project-hero-grid">
            <div>
              <div className="project-meta-row">
                <span className="project-number">{project.index}</span>
                <span>{project.category}</span>
                <span>{project.tier === 'flagship' ? '旗舰案例' : '精选项目'}</span>
              </div>
              <h1>{project.title}</h1>
              <p className="project-claim">{project.claim}</p>
              <p className="project-problem">{project.problem}</p>
            </div>
            <aside className="project-status-card">
              <div><span>当前状态</span><strong>{project.status}</strong></div>
              <p>{project.statusDetail}</p>
              <div className="status-score"><span>作品集适配评分</span><b>{project.score}<small>/100</small></b></div>
            </aside>
          </div>
          <div className="project-metric-strip">
            {project.metrics.map((metric) => (
              <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.note}</small></div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-wrap project-lead-visual"><ProjectLeadVisual project={project} /></section>

      <section className="site-wrap case-section case-brief">
        <div><SectionLabel index="01">PROJECT BRIEF / 问题与角色</SectionLabel><h2>我的角色，不用“负责”两个字带过。</h2></div>
        <div className="brief-grid">
          <article><span>ROLE / 我的角色</span><p>{project.role}</p></article>
          <article><span>BOUNDARY / 贡献边界</span><p>{project.contribution}</p></article>
        </div>
      </section>

      <section className="case-split section-surface border-y border-border">
        <div className="site-wrap case-section">
          <SectionLabel index="02">AI DIVISION / 为什么用 AI</SectionLabel>
          <div className="ai-split-grid">
            <article className="ai-do"><span>交给 AI</span><h2>开放理解、生成与探索</h2><p>{project.whyAI}</p></article>
            <article className="ai-dont"><span>不交给 AI</span><h2>事实、权限与不可逆决定</h2><p>{project.notAI}</p></article>
          </div>
        </div>
      </section>

      <section className="site-wrap case-section">
        <div className="section-heading compact-heading">
          <div><SectionLabel index="03">PRODUCT FLOW / 产品路径</SectionLabel><h2>从输入到结果，状态必须看得见。</h2></div>
          <p>{project.proof}</p>
        </div>
        <FlowDiagram project={project} />
      </section>

      <section className="site-wrap case-section">
        <div className="section-heading compact-heading">
          <div><SectionLabel index="04">SYSTEM DIVISION / 架构分工</SectionLabel><h2>模型、Agent、代码、人和状态，各自拥有一种决定。</h2></div>
          <p>架构图只画职责与 Gate，不用技术 Logo 数量代替判断。</p>
        </div>
        <ArchitectureDiagram project={project} />
      </section>

      <section className="decision-section section-ink">
        <div className="site-wrap case-section">
          <div className="section-heading section-heading-light compact-heading">
            <div><SectionLabel index="05">DECISIONS / 关键取舍</SectionLabel><h2>每个选择都有被放弃的方案，也都有代价。</h2></div>
            <p>如果没有约束、替代方案和代价，它更像功能说明，而不是产品决定。</p>
          </div>
          <div className="decision-list">
            {project.decisions.map((decision, index) => (
              <article key={decision.choice}>
                <div className="decision-index">D{String(index + 1).padStart(2, '0')}</div>
                <div className="decision-main"><span>我的选择</span><h3>{decision.choice}</h3><p>{decision.reason}</p></div>
                <dl>
                  <div><dt>约束</dt><dd>{decision.constraint}</dd></div>
                  <div><dt>放弃方案</dt><dd>{decision.alternative}</dd></div>
                  <div><dt>代价</dt><dd>{decision.cost}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-wrap case-section">
        <div className="section-heading compact-heading">
          <div><SectionLabel index="06">BADCASE / 失败如何改变产品</SectionLabel><h2>不展示失败截图，展示它改变了什么。</h2></div>
          <p>一条代表 Badcase，比额外堆一百个测试数字更能说明产品判断。</p>
        </div>
        <div className="badcase-grid">
          {[
            ['01 / INPUT', project.badcase.input],
            ['02 / FAILURE', project.badcase.failure],
            ['03 / CAUSE', project.badcase.cause],
            ['04 / CHANGE', project.badcase.change],
            ['05 / RESULT', project.badcase.result],
          ].map(([label, content], index) => (
            <article className={index === 3 ? 'badcase-highlight' : ''} key={label}><span>{label}</span><p>{content}</p></article>
          ))}
        </div>
      </section>

      {project.images && project.images.length > 1 ? (
        <section className="section-surface border-y border-border">
          <div className="site-wrap case-section">
            <div className="section-heading compact-heading">
              <div><SectionLabel index="07">OBSERVED / 可观察证据</SectionLabel><h2>真实界面只保留能证明决定的局部。</h2></div>
              <p>截图不是装饰。每一张都补完一句“这张图证明什么”。</p>
            </div>
            <div className="evidence-gallery">
              {project.images.map((image, index) => (
                <figure className={`evidence-frame evidence-${image.position ?? 'top'}`} key={`${image.src}-${index}`}>
                  <img src={image.src} alt={image.alt} width="1440" height="900" />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="site-wrap case-section state-section">
        <div><SectionLabel index={observedIndex}>STATE / 真实状态</SectionLabel><h2>已完成、未验证与下一步，放在同一个画面里。</h2></div>
        <div className="state-grid">
          <article className="state-done"><span>已完成 / 已验证</span><h3>{project.status}</h3><p>{project.statusDetail}</p></article>
          <article className="state-limits"><span>未验证 / 受限</span><ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article className="state-next"><span>下一步</span><p>{project.nextStep}</p></article>
        </div>
        <div className="project-actions">
          {project.github ? <a className="button-secondary focus-ring" href={project.github} target="_blank" rel="noreferrer"><Code2 aria-hidden="true" /> 查看 GitHub <ArrowUpRight aria-hidden="true" /></a> : null}
          {project.tier === 'flagship' ? <a className="button-primary focus-ring" href="assets/demo.mp4"><PlayCircle aria-hidden="true" /> 看总览演示</a> : null}
        </div>
      </section>

      <section className="next-project border-t border-border">
        <div className="site-wrap">
          <a className="focus-ring" href={`projects/${nextProject.slug}`}><span>NEXT / 下一个项目</span><strong>{nextProject.shortTitle}</strong><ArrowRight aria-hidden="true" /></a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="site-wrap section-space">
        <SectionLabel>404 / NOT FOUND</SectionLabel>
        <h1 className="mt-8 font-heading text-5xl">这个项目页不存在。</h1>
        <a className="button-primary focus-ring mt-10 inline-flex" href="./">返回作品集 <ArrowRight aria-hidden="true" /></a>
      </section>
      <SiteFooter />
    </main>
  );
}

export function StaticApp() {
  const path = normalizePath(window.location.pathname);
  if (path === '/resume') return <ResumePage />;
  const match = path.match(/^\/projects\/([^/]+)$/);
  if (match) {
    const project = getProject(decodeURIComponent(match[1]));
    return project ? <StaticProjectPage project={project} /> : <NotFound />;
  }
  return path === '/' ? <Home /> : <NotFound />;
}
