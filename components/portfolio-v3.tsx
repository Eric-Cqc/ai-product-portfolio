'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Download,
  PlayCircle,
  ZoomIn,
} from 'lucide-react';
import {
  flagshipProjectsV3,
  projectsV3,
  type FlagshipProjectV3,
  type ProjectImageV3,
} from '@/lib/v3-portfolio';

const caseSections = [
  ['00', '摘要', 'summary'],
  ['01', '旧流程与机会', 'problem'],
  ['02', '用户旅程', 'journey'],
  ['03', '关键机制', 'mechanisms'],
  ['04', '系统分工', 'division'],
  ['05', '产品取舍', 'decisions'],
  ['06', '如何验证', 'evaluation'],
  ['07', '失败与迭代', 'badcase'],
  ['08', '结果与边界', 'boundary'],
] as const;

function twoDigits(index: number) {
  return String(index + 1).padStart(2, '0');
}

function siteHref(path: string) {
  if (/^(?:https?:|mailto:|tel:)/i.test(path)) return path;

  const cleanPath = path.replace(/^\.?\//, '');
  if (typeof document !== 'undefined') {
    const base = document.querySelector('base')?.href;
    if (base) {
      const href = new URL(cleanPath, base);
      return `${decodeURI(href.pathname)}${href.search}${href.hash}`;
    }
  }

  return `/${cleanPath}`;
}

function ProjectTitle({ title }: { title: string }) {
  if (title === 'MathMentor 奥数私教') {
    return (
      <>
        MathMentor <span className="v3-title-no-break">奥数私教</span>
      </>
    );
  }

  return title;
}

export function PortfolioHeaderV3() {
  return (
    <>
      <a className="v3-skip-link v3-focus" href="#main-content">
        跳到主要内容
      </a>
      <header className="v3-header">
        <div className="v3-shell v3-header-inner">
          <a
            className="v3-brand v3-focus"
            href={siteHref('./')}
            aria-label="蔡骐充人工智能产品案例集首页"
          >
            <strong>蔡骐充</strong>
            <span>人工智能产品案例集</span>
          </a>
          <span className="v3-header-index" aria-hidden="true">
            三个深度案例
          </span>
          <nav className="v3-nav" aria-label="案例集导航">
            <a className="v3-focus" href={siteHref('./#cases')}>
              三个案例
            </a>
            <a className="v3-focus" href={siteHref('assets/demo.mp4')}>
              演示视频
            </a>
            <a
              className="v3-focus"
              href={siteHref('蔡骐充_人工智能产品案例集_2026.pdf')}
            >
              下载作品集
            </a>
            <a
              className="v3-focus"
              href="https://github.com/Eric-Cqc"
              target="_blank"
              rel="noreferrer"
            >
              GitHub 主页
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

export function PortfolioFooterV3() {
  return (
    <footer className="v3-footer">
      <div className="v3-shell v3-footer-grid">
        <div className="v3-footer-copy">
          <span>产品案例集 · 2026</span>
          <h2>创作协同、战略情报与智能教育。</h2>
        </div>
        <div className="v3-footer-links">
          <a
            className="v3-focus"
            href={siteHref('蔡骐充_人工智能产品案例集_2026.pdf')}
          >
            <span>下载完整作品集</span>
            <Download aria-hidden="true" />
          </a>
          <a className="v3-focus" href={siteHref('assets/demo.mp4')}>
            <span>查看演示视频</span>
            <PlayCircle aria-hidden="true" />
          </a>
          <a
            className="v3-focus"
            href="https://github.com/Eric-Cqc"
            target="_blank"
            rel="noreferrer"
          >
            <span>查看完整项目库</span>
            <Code2 aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function ProjectShot({
  image,
  label,
  className = '',
}: {
  image?: ProjectImageV3;
  label: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imageHref = image ? siteHref(image.src) : '';

  if (!image || failed) {
    return (
      <figure className={`v3-shot ${className}`}>
        <div
          className="v3-shot-fallback"
          role="img"
          aria-label={`${label}暂无可公开截图`}
        >
          界面图暂时无法显示。
        </div>
        <figcaption>
          <span>{label}</span>
          <span>请稍后重新载入。</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className={`v3-shot ${className}`}>
      <a
        className="v3-shot-link v3-focus"
        href={imageHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`打开原图：${image.alt}`}
      >
        <img
          src={imageHref}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: image.position ?? 'top' }}
          onError={() => setFailed(true)}
        />
        <span className="v3-shot-zoom">
          <ZoomIn aria-hidden="true" /> 打开高清原图
        </span>
      </a>
      <figcaption>
        <span>{label}</span>
        <span>
          {image.caption} {image.readHint}
        </span>
      </figcaption>
    </figure>
  );
}

function HomeCaseRow({ project }: { project: FlagshipProjectV3 }) {
  return (
    <a
      className={`v3-case-row v3-accent-${project.slug} v3-focus`}
      href={siteHref(`projects/${project.slug}`)}
      aria-label={`阅读${project.title}完整案例`}
    >
      <span className="v3-case-number">{project.index}</span>
      <span className="v3-case-domain">{project.category}</span>
      <h2>
        <ProjectTitle title={project.title} />
      </h2>
      <p className="v3-case-shift">
        从{project.summary.from}，到{project.summary.to}。
      </p>
      <span className="v3-case-fact">
        <strong>{project.facts[0]?.value}</strong>
        <span>{project.facts[0]?.label}</span>
      </span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}

function HomeCaseFeature({ project }: { project: FlagshipProjectV3 }) {
  return (
    <section
      className={`v3-home-case v3-accent-${project.slug}`}
      id={`case-${project.index}`}
    >
      <div className="v3-shell">
        <header className="v3-home-case-head">
          <span>{project.index}</span>
          <div className="v3-home-case-title">
            <h2>
              <ProjectTitle title={project.title} />
            </h2>
            <p>{project.summary.promise}</p>
          </div>
          <div className="v3-home-case-aside">
            <p>
              <strong>用户</strong>
              {project.audience}
            </p>
            <p>
              <strong>我的工作</strong>
              {project.role.title}
            </p>
            <p>
              <strong>当前状态</strong>
              {project.status.label}
            </p>
          </div>
        </header>
        <div className="v3-home-proof" aria-label={`${project.title}核心证据`}>
          {project.facts.map((fact) => (
            <article key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
              <p>{fact.meaning}</p>
            </article>
          ))}
        </div>
        <div className="v3-home-case-body">
          <ProjectShot
            image={project.images[0]}
            label={`${project.index} · 核心界面`}
          />
          <div className="v3-home-mechanisms">
            {project.mechanisms.map((mechanism) => (
              <article key={mechanism.index}>
                <span>{mechanism.index}</span>
                <div>
                  <h3>{mechanism.title}</h3>
                  <p>{mechanism.choice}</p>
                </div>
              </article>
            ))}
            <a
              className="v3-case-link v3-focus"
              href={siteHref(`projects/${project.slug}`)}
            >
              阅读完整案例 <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PortfolioHomeV3() {
  return (
    <main className="v3-page" id="main-content">
      <PortfolioHeaderV3 />

      <section className="v3-cover">
        <div className="v3-shell">
          <div className="v3-cover-heading">
            <div>
              <p className="v3-kicker">创作协同 · 战略情报 · 智能教育</p>
              <h1>
                把模糊任务，
                <br />
                做成可运行、
                <br />
                <span>可验证的产品。</span>
              </h1>
            </div>
            <div className="v3-cover-deck">
              <p>
                三个真实案例，分别回答创作协同、战略情报与智能教育中：人工智能应该做什么、由谁决定、怎样验证。
              </p>
              <div className="v3-cover-actions">
                <a className="v3-focus" href="#cases">
                  查看三个案例 <ArrowRight aria-hidden="true" />
                </a>
                <a className="v3-focus" href={siteHref('assets/demo.mp4')}>
                  播放演示视频 <PlayCircle aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="v3-case-ledger" id="cases" aria-label="三个完整案例">
            {flagshipProjectsV3.map((project) => (
              <HomeCaseRow project={project} key={project.slug} />
            ))}
          </div>

          <div className="v3-cover-foot">
            <span>创作协同 · 战略情报 · 智能教育</span>
            <span>查看项目细节 →</span>
          </div>
        </div>
      </section>

      {flagshipProjectsV3.map((project) => (
        <HomeCaseFeature project={project} key={project.slug} />
      ))}

      <PortfolioFooterV3 />
    </main>
  );
}

function ProjectToc({ project }: { project: FlagshipProjectV3 }) {
  return (
    <aside className="v3-toc" aria-label="本案例目录">
      <span className="v3-toc-title">本案例目录</span>
      <ol>
        {caseSections.map(([index, label, id]) => (
          <li key={id}>
            <a className="v3-focus" href={`#${id}`}>
              <span>{index}</span>
              {label}
            </a>
          </li>
        ))}
      </ol>
      <div className="v3-toc-actions">
        {project.demo ? (
          <a className="v3-focus" href={siteHref(project.demo)}>
            演示视频 <PlayCircle aria-hidden="true" />
          </a>
        ) : null}
        {project.github ? (
          <a
            className="v3-focus"
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            项目代码 <Code2 aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </aside>
  );
}

function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <header className="v3-section-head">
      <span className="v3-section-number">{index}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

function CaseMasthead({ project }: { project: FlagshipProjectV3 }) {
  return (
    <section className="v3-project-masthead" id="summary">
      <div className="v3-shell">
        <a className="v3-back v3-focus" href={siteHref('./#cases')}>
          <ArrowLeft aria-hidden="true" /> 返回三个案例
        </a>
        <div className="v3-masthead-grid">
          <div className="v3-masthead-title">
            <p className="v3-kicker">
              {project.index} · {project.category} · {project.year}
            </p>
            <h1>
              <ProjectTitle title={project.title} />
            </h1>
            <p>{project.summary.promise}</p>
            <div className="v3-shift-line">
              <div>
                <strong>从</strong>
                {project.summary.from}
              </div>
              <ArrowRight aria-hidden="true" />
              <div>
                <strong>到</strong>
                {project.summary.to}
              </div>
            </div>
          </div>
          <aside className="v3-masthead-side">
            <dl className="v3-meta">
              <div>
                <dt>用户</dt>
                <dd>{project.audience}</dd>
              </div>
              <div>
                <dt>我的工作</dt>
                <dd>{project.role.title}</dd>
              </div>
              <div>
                <dt>当前状态</dt>
                <dd>
                  {project.status.label}。{project.status.detail}
                </dd>
              </div>
              <div>
                <dt>验证范围</dt>
                <dd>{project.status.evidenceLevel}</dd>
              </div>
            </dl>
          </aside>
        </div>

        <dl className="v3-project-facts">
          {project.facts.map((fact) => (
            <div className="v3-fact" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>
                <strong>{fact.value}</strong>
                <span>{fact.meaning}</span>
              </dd>
            </div>
          ))}
        </dl>
        <ProjectShot
          image={project.images[0]}
          label={`${project.index} · 案例封面`}
          className="v3-lead-shot"
        />
      </div>
    </section>
  );
}

function ProblemSection({ project }: { project: FlagshipProjectV3 }) {
  return (
    <section className="v3-section" id="problem">
      <SectionHeading
        index="01"
        title="旧流程为什么失效"
        description="先定位旧流程的关键断点，再定义产品应改变什么、哪些决定必须留给人。"
      />
      <p className="v3-prose-lead">{project.oldWorkflow.description}</p>
      <ul className="v3-breakpoints" aria-label="旧流程的主要断点">
        {project.oldWorkflow.breakpoints.map((breakpoint) => (
          <li key={breakpoint}>{breakpoint}</li>
        ))}
      </ul>
      <div className="v3-before-after">
        <article>
          <span>产品要改变什么</span>
          <h3>{project.productPromise.headline}</h3>
          <p>{project.productPromise.successDefinition}</p>
        </article>
        <article>
          <span>人保留什么决定</span>
          <h3>关键决定由对应负责人确认</h3>
          <p>{project.productPromise.keepsHumanControl}</p>
        </article>
      </div>
    </section>
  );
}

function JourneySection({ project }: { project: FlagshipProjectV3 }) {
  return (
    <section className="v3-section" id="journey">
      <SectionHeading
        index="02"
        title="完整用户旅程"
        description={project.journeyIntro}
      />
      <ol className="v3-journey">
        {project.journey.map((item) => (
          <li key={`${item.step}-${item.title}`}>
            <span className="v3-journey-index">{item.step}</span>
            <span className="v3-journey-actor">{item.actor}</span>
            <h3>{item.title}</h3>
            <p>
              {item.action} {item.systemResponse}
            </p>
            {item.humanGate ? (
              <div className="v3-human-gate">
                <CheckCircle2 aria-hidden="true" />
                <span>
                  {item.humanGate.owner}：{item.humanGate.decision}
                  <br />
                  通过后，{item.humanGate.onApprove}未通过时，
                  {item.humanGate.onReject}
                </span>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

function MechanismsSection({ project }: { project: FlagshipProjectV3 }) {
  return (
    <section className="v3-section" id="mechanisms">
      <SectionHeading
        index="03"
        title="三个关键机制"
        description="以下机制直接影响用户流程、权限和结果可靠性。"
      />
      <div className="v3-mechanism-list">
        {project.mechanisms.map((mechanism) => {
          const evidenceImage = project.images.find(
            (image) => image.src === mechanism.evidenceImageSrc,
          );
          return (
            <article className="v3-mechanism" key={mechanism.index}>
              <div className="v3-mechanism-copy">
                <div className="v3-mechanism-heading">
                  <span>{mechanism.index}</span>
                  <h3>{mechanism.title}</h3>
                </div>
                <dl>
                  <div>
                    <dt>问题与约束</dt>
                    <dd>
                      {mechanism.question} {mechanism.constraint}
                    </dd>
                  </div>
                  <div>
                    <dt>产品选择</dt>
                    <dd>{mechanism.choice}</dd>
                  </div>
                  <div>
                    <dt>放弃、代价与验证</dt>
                    <dd>
                      {mechanism.rejectedAlternative} {mechanism.cost}{' '}
                      {mechanism.validation}
                    </dd>
                  </div>
                </dl>
              </div>
              <ProjectShot
                image={evidenceImage}
                label={`机制 ${mechanism.index}`}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function DivisionSection({ project }: { project: FlagshipProjectV3 }) {
  return (
    <section className="v3-section" id="division">
      <SectionHeading
        index="04"
        title="系统分工"
        description="模型、规则、持久化状态和人工分别承担明确职责。"
      />
      <div className="v3-system-grid">
        {project.systemDivision.map((division, index) => (
          <article key={division.owner}>
            <span>
              {twoDigits(index)} · {division.owner}
            </span>
            <h3>负责什么</h3>
            <p>{division.responsibility}</p>
            <p>不负责：{division.excluded}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DecisionsSection({ project }: { project: FlagshipProjectV3 }) {
  return (
    <section className="v3-section" id="decisions">
      <SectionHeading
        index="05"
        title="产品取舍"
        description="在当前用户风险和验证范围内，说明选择了什么、放弃了什么，以及代价。"
      />
      <div className="v3-decisions">
        {project.decisions.map((decision, index) => (
          <article className="v3-decision" key={decision.title}>
            <span>{twoDigits(index)}</span>
            <div>
              <span>问题</span>
              <h3>{decision.title}</h3>
              <p>{decision.question}</p>
            </div>
            <div>
              <span>选择与原因</span>
              <p>
                {decision.choice} {decision.reason}
              </p>
            </div>
            <div>
              <span>放弃与代价</span>
              <p>
                {decision.rejected} {decision.tradeoff}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function EvaluationSection({ project }: { project: FlagshipProjectV3 }) {
  return (
    <section className="v3-section" id="evaluation">
      <SectionHeading
        index="06"
        title="如何验证"
        description="先看用户任务能否完成，再检查过程、边界和界面是否可靠。"
      />
      <div className="v3-evaluations">
        {project.evaluations.map((evaluation, index) => (
          <article className="v3-evaluation" key={evaluation.type}>
            <div className="v3-evaluation-head">
              <span>
                {twoDigits(index)} · {evaluation.type}
              </span>
              <span>{project.index}</span>
            </div>
            <h3>{evaluation.risk}</h3>
            <p className="v3-evaluation-result">
              <span>当前结论</span>
              {evaluation.result}
            </p>
            <dl>
              <div>
                <dt>怎么测</dt>
                <dd>{evaluation.method}</dd>
              </div>
              <div>
                <dt>谁来判</dt>
                <dd>{evaluation.grader}</dd>
              </div>
              <div>
                <dt>适用范围</dt>
                <dd>{evaluation.scope}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function BadcaseSection({ project }: { project: FlagshipProjectV3 }) {
  const steps = [
    ['01 · 情境', project.badcase.scenario],
    ['02 · 失败', project.badcase.error],
    ['03 · 风险', project.badcase.risk],
    ['04 · 改动与回归', `${project.badcase.change} ${project.badcase.retest}`],
  ];

  return (
    <section className="v3-section" id="badcase">
      <SectionHeading
        index="07"
        title="失败与迭代"
        description="记录一次失败的情境、风险、修正和回归结果。"
      />
      <div className="v3-badcase">
        <div className="v3-badcase-lead">
          <span>失败情境</span>
          <h3>{project.badcase.title}</h3>
        </div>
        <div className="v3-badcase-flow">
          {steps.map(([label, copy]) => (
            <article key={label}>
              <span>{label}</span>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BoundarySection({ project }: { project: FlagshipProjectV3 }) {
  return (
    <section className="v3-section" id="boundary">
      <SectionHeading
        index="08"
        title="结果、我的工作与边界"
        description="说清做成了什么、我负责什么，以及现阶段不能证明什么。"
      />
      <p className="v3-prose-lead">{project.result.headline}</p>
      <div className="v3-role-note">
        <span>我的具体工作</span>
        <ul>
          {project.role.scope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{project.role.collaboration}</p>
        {project.attribution ? <small>{project.attribution}</small> : null}
      </div>
      <div className="v3-close">
        <article>
          <span>已交付与能证明的范围</span>
          <h3>{project.result.meaning}</h3>
          <ul>
            {project.result.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <span>尚未验证的事项与下一步</span>
          <h3>后续验证范围</h3>
          <ul>
            {project.boundary.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {project.nextSteps.map((item) => (
              <li key={item}>下一步：{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export function PortfolioProjectPageV3({
  project,
}: {
  project: FlagshipProjectV3;
}) {
  const currentIndex = projectsV3.findIndex(
    (item) => item.slug === project.slug,
  );
  const nextProject = projectsV3[(currentIndex + 1) % projectsV3.length];

  return (
    <main
      className={`v3-page v3-project-page v3-accent-${project.slug}`}
      id="main-content"
    >
      <PortfolioHeaderV3 />
      <CaseMasthead project={project} />
      <div className="v3-shell v3-case-layout">
        <ProjectToc project={project} />
        <div className="v3-case-content">
          <ProblemSection project={project} />
          <JourneySection project={project} />
          <MechanismsSection project={project} />
          <DivisionSection project={project} />
          <DecisionsSection project={project} />
          <EvaluationSection project={project} />
          <BadcaseSection project={project} />
          <BoundarySection project={project} />
        </div>
      </div>
      <section className="v3-next">
        <div className="v3-shell">
          <a
            className="v3-focus"
            href={siteHref(`projects/${nextProject.slug}`)}
          >
            <span>下一个完整案例</span>
            <strong>
              <ProjectTitle title={nextProject.title} />
            </strong>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
      <PortfolioFooterV3 />
    </main>
  );
}

export function PortfolioNotFoundV3() {
  return (
    <main className="v3-page" id="main-content">
      <PortfolioHeaderV3 />
      <section className="v3-not-found">
        <div>
          <span>404 · 页面不存在</span>
          <h1>这不在三个案例里。</h1>
          <a className="v3-case-link v3-focus" href={siteHref('./')}>
            返回案例集 <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
      <PortfolioFooterV3 />
    </main>
  );
}
