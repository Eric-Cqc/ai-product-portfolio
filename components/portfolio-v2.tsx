import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Download,
  PlayCircle,
} from 'lucide-react';
import {
  caseStudies,
  projectNotes,
  projectsV2,
  selectedBuilds,
  tierLabel,
  type WorkProject,
} from '@/lib/v2-portfolio';

export function PortfolioHeader() {
  return (
    <header className="v2-header">
      <div className="site-wrap v2-header-inner">
        <a
          className="v2-brand focus-ring"
          href="./"
          aria-label="蔡骐充 AI 产品作品集首页"
        >
          <strong>蔡骐充</strong>
          <span>AI 产品作品集 · 2026</span>
        </a>
        <nav className="v2-nav" aria-label="作品集导航">
          <a className="focus-ring" href="./#project-index">
            全部项目
          </a>
          <a className="focus-ring" href="./#cases">
            完整案例
          </a>
          <a className="focus-ring" href="蔡骐充_AI产品经理_作品集.pdf">
            下载作品集
          </a>
          <a
            className="focus-ring"
            href="https://github.com/Eric-Cqc"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

export function PortfolioFooter() {
  return (
    <footer className="v2-footer">
      <div className="site-wrap v2-footer-grid">
        <div>
          <p className="v2-overline">蔡骐充 · AI 产品作品集</p>
          <h2>4 个完整案例、3 个短案例与 3 个项目笔记。</h2>
        </div>
        <div className="v2-footer-links">
          <a href="蔡骐充_AI产品经理_作品集.pdf">
            <Download aria-hidden="true" /> 下载作品集
          </a>
          <a href="assets/demo.mp4">
            <PlayCircle aria-hidden="true" /> 查看交互演示
          </a>
          <a
            href="https://github.com/Eric-Cqc"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 aria-hidden="true" /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

function ProjectImage({
  project,
  imageIndex = 0,
  className = '',
}: {
  project: WorkProject;
  imageIndex?: number;
  className?: string;
}) {
  const image = project.images[imageIndex];
  if (!image) return <ProjectDiagram project={project} className={className} />;
  return (
    <figure className={'v2-project-image ' + className}>
      <img
        src={image.src}
        alt={image.alt}
        width="1440"
        height="900"
        className={'image-position-' + (image.position ?? 'top')}
      />
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function HermesDiagram() {
  const layers = [
    ['01', '入口', '命令行 / 桌面端 / 网页端 / 消息平台'],
    ['02', '连续性', '会话 / 搜索 / 上下文 / 记忆 / 技能'],
    ['03', '计划', '任务循环 / 定时任务 / 委派 / 看板'],
    ['04', '能力', '模型服务 / 工具 / MCP / 执行环境'],
    ['05', '信任', '身份 / 配对 / 审批 / 隔离 / 停止与恢复'],
  ];
  return (
    <div
      className="hermes-map"
      role="img"
      aria-label="Hermes Agent 五层产品能力地图"
    >
      <div className="diagram-title">
        <span>个人拆解</span>
        <strong>长期 Agent 的五层产品框架</strong>
      </div>
      <ol>
        {layers.map(([index, title, detail]) => (
          <li key={index}>
            <span>{index}</span>
            <strong>{title}</strong>
            <p>{detail}</p>
          </li>
        ))}
      </ol>
      <p className="diagram-footnote">
        长期使用的关键，是用户能看到记忆、权限和后台任务如何变化，并能随时停止或恢复。
      </p>
    </div>
  );
}

function SuperAgentDiagram() {
  return (
    <div
      className="control-map"
      role="img"
      aria-label="双用户 Super Agent 的租户隔离与审批控制面"
    >
      <div className="control-tenant">
        <span>用户甲</span>
        <strong>身份 · 数据 · 密钥</strong>
      </div>
      <ol>
        <li>任务拆解</li>
        <li>工具建议</li>
        <li className="is-accent">人工审批</li>
        <li>可靠发件箱</li>
        <li>外部回执</li>
      </ol>
      <div className="control-tenant">
        <span>用户乙</span>
        <strong>身份 · 数据 · 密钥</strong>
      </div>
      <p>模型负责建议，控制面负责权限、幂等与恢复。</p>
    </div>
  );
}

function QuantDiagram() {
  const steps = [
    ['生成', 54],
    ['合法', 51],
    ['去重', 50],
    ['时间可得', 13],
    ['风险', 6],
    ['同族上限', 3],
  ];
  return (
    <div
      className="funnel-map"
      role="img"
      aria-label="研究候选从 54 个逐层筛选到 3 个"
    >
      <div className="diagram-title">
        <span>研究漏斗</span>
        <strong>每一层都保留淘汰理由</strong>
      </div>
      <ol>
        {steps.map(([label, value]) => (
          <li key={String(label)}>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
            <i
              style={{
                width: String(Math.max(8, (Number(value) / 54) * 100)) + '%',
              }}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

function CourierDiagram() {
  return (
    <div
      className="score-map"
      role="img"
      aria-label="骑手动作分类模型的测试结果"
    >
      <div className="diagram-title">
        <span>按骑手分组评测</span>
        <strong>避免同一骑手跨训练集与验证集</strong>
      </div>
      <div>
        <span>LightGBM · AUC</span>
        <i style={{ width: '90.77%' }}>
          <b>0.9077</b>
        </i>
      </div>
      <div>
        <span>LightGBM · F1</span>
        <i style={{ width: '81.48%' }}>
          <b>0.8148</b>
        </i>
      </div>
      <p>16 万行 · 306 个骑手组 · 5 折</p>
    </div>
  );
}

function CampusDiagram() {
  return (
    <div
      className="scenario-map"
      role="img"
      aria-label="校园取餐仿真的三种情景比较"
    >
      <div className="diagram-title">
        <span>配对仿真</span>
        <strong>不同方案改善不同指标</strong>
      </div>
      <div className="scenario-row">
        <span>基线</span>
        <i style={{ width: '72%' }} />
        <b>等待约 4.3 秒</b>
      </div>
      <div className="scenario-row is-accent">
        <span>场景 2</span>
        <i style={{ width: '33%' }} />
        <b>等待约 2.0 秒</b>
      </div>
      <div className="scenario-row">
        <span>场景 3</span>
        <i style={{ width: '66%' }} />
        <b>总周转 14.20 分钟</b>
      </div>
      <p>50 次共同随机数配对实验；长度只用于相对比较。</p>
    </div>
  );
}

function CreditDiagram({ project }: { project: WorkProject }) {
  return <ProjectImage project={project} />;
}

export function ProjectDiagram({
  project,
  className = '',
}: {
  project: WorkProject;
  className?: string;
}) {
  const content =
    project.visual === 'hermes' ? (
      <HermesDiagram />
    ) : project.visual === 'super-agent' ? (
      <SuperAgentDiagram />
    ) : project.visual === 'quant' ? (
      <QuantDiagram />
    ) : project.visual === 'courier' ? (
      <CourierDiagram />
    ) : project.visual === 'campus' ? (
      <CampusDiagram />
    ) : project.visual === 'credit' ? (
      <CreditDiagram project={project} />
    ) : (
      <WorkflowDiagram project={project} />
    );
  return <div className={'v2-diagram-shell ' + className}>{content}</div>;
}

function WorkflowDiagram({ project }: { project: WorkProject }) {
  return (
    <div
      className="workflow-map"
      aria-label={project.shortTitle + ' 的产品流程'}
    >
      {project.workflow.map((step, index) => (
        <div key={step}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{step}</strong>
          {index < project.workflow.length - 1 ? (
            <i aria-hidden="true">→</i>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function FeaturedProjectCard({ project }: { project: WorkProject }) {
  return (
    <a className="v2-feature-card focus-ring" href={'projects/' + project.slug}>
      <ProjectImage project={project} />
      <div className="v2-card-meta">
        <span>{project.index}</span>
        <span>{project.category}</span>
        <ArrowUpRight aria-hidden="true" />
      </div>
      <h2>{project.shortTitle}</h2>
      <p>{project.statement}</p>
      <strong>
        {project.metrics.map((metric) => metric.value).join(' · ')}
      </strong>
    </a>
  );
}

function WorkIndexRow({ project }: { project: WorkProject }) {
  return (
    <a className="work-index-row focus-ring" href={'projects/' + project.slug}>
      <span className="work-index-number">{project.index}</span>
      <div className="work-index-name">
        <strong>{project.shortTitle}</strong>
        <span>{project.category}</span>
      </div>
      <p>{project.statement}</p>
      <div className="work-index-proof">
        <strong>{project.metrics[0].value}</strong>
        <span>{project.metrics[0].label}</span>
      </div>
      <span className="work-index-tier">{tierLabel(project.tier)}</span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}

function CaseSummary({
  project,
  reverse = false,
}: {
  project: WorkProject;
  reverse?: boolean;
}) {
  return (
    <article className={'home-case-summary ' + (reverse ? 'is-reverse' : '')}>
      <ProjectImage project={project} />
      <div className="home-case-copy">
        <div className="home-case-label">
          <span>{project.index}</span>
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
        <h3>{project.statement}</h3>
        <p>{project.outcome}</p>
        <dl>
          <div>
            <dt>我的工作</dt>
            <dd>{project.contribution}</dd>
          </div>
          <div>
            <dt>项目结果</dt>
            <dd>
              {project.metrics
                .slice(0, 2)
                .map((metric) => metric.value + ' ' + metric.label)
                .join('；')}
            </dd>
          </div>
        </dl>
        <a
          className="v2-text-link focus-ring"
          href={'projects/' + project.slug}
        >
          阅读完整案例 <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function SelectedCard({ project }: { project: WorkProject }) {
  return (
    <article className="selected-build-card">
      <div className="selected-build-head">
        <span>{project.index}</span>
        <span>{tierLabel(project.tier)}</span>
      </div>
      <ProjectDiagram project={project} />
      <h3>{project.title}</h3>
      <p className="selected-build-statement">{project.statement}</p>
      <dl>
        <div>
          <dt>产品结果</dt>
          <dd>{project.outcome}</dd>
        </div>
        <div>
          <dt>关键判断</dt>
          <dd>{project.decisions[0].title}</dd>
        </div>
      </dl>
      <a className="v2-text-link focus-ring" href={'projects/' + project.slug}>
        查看项目 <ArrowRight aria-hidden="true" />
      </a>
    </article>
  );
}

function ProjectNoteCard({ project }: { project: WorkProject }) {
  return (
    <a
      className="project-note-card focus-ring"
      href={'projects/' + project.slug}
    >
      <div>
        <span>{project.index}</span>
        <span>{project.category}</span>
        <ArrowUpRight aria-hidden="true" />
      </div>
      <h3>{project.shortTitle}</h3>
      <p>{project.statement}</p>
      <strong>
        {project.metrics.map((metric) => metric.value).join(' · ')}
      </strong>
    </a>
  );
}

export function PortfolioHome() {
  return (
    <main className="v2-page">
      <PortfolioHeader />

      <section className="v2-opening">
        <div className="site-wrap">
          <div className="v2-opening-copy">
            <div>
              <p className="v2-overline">2026 · 精选作品</p>
              <h1>AI 产品案例集</h1>
            </div>
            <div>
              <p>
                本集包含 9 个项目案例与 1
                个开源产品拆解，覆盖创作协同、战略情报、智能教育、商业研究、Agent
                控制与模型决策。
              </p>
              <p>重点呈现目标用户、关键机制、我的职责与项目结果。</p>
            </div>
          </div>
          <div className="v2-feature-grid" aria-label="四个完整案例">
            {caseStudies.map((project) => (
              <FeaturedProjectCard project={project} key={project.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="project-index-section" id="project-index">
        <div className="site-wrap">
          <header className="v2-section-head">
            <div>
              <span>01</span>
              <h2>全部项目</h2>
            </div>
            <p>
              其中 9 项为产品与数据项目；Hermes Agent 为 Nous Research
              开源产品拆解。
            </p>
          </header>
          <div className="work-index-header" aria-hidden="true">
            <span>编号</span>
            <span>项目</span>
            <span>问题与产品</span>
            <span>一项证据</span>
            <span>形式</span>
            <span />
          </div>
          <div className="work-index-list">
            {projectsV2.map((project) => (
              <WorkIndexRow project={project} key={project.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-cases" id="cases">
        <div className="site-wrap">
          <header className="v2-section-head">
            <div>
              <span>02</span>
              <h2>四个完整案例</h2>
            </div>
            <p>
              四个案例从用户任务出发，依次说明产品流程、系统分工、关键取舍与迭代。
            </p>
          </header>
          <div className="home-case-list">
            {caseStudies.map((project, index) => (
              <CaseSummary
                project={project}
                reverse={index % 2 === 1}
                key={project.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="selected-build-section">
        <div className="site-wrap">
          <header className="v2-section-head">
            <div>
              <span>03</span>
              <h2>三个短案例</h2>
            </div>
            <p>
              控制面、确定性研究引擎与开源 Agent
              产品拆解，各自呈现一个核心产品判断。
            </p>
          </header>
          <div className="selected-build-grid">
            {selectedBuilds.map((project) => (
              <SelectedCard project={project} key={project.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="project-notes-section">
        <div className="site-wrap">
          <header className="v2-section-head">
            <div>
              <span>04</span>
              <h2>三个项目笔记</h2>
            </div>
            <p>三个项目分别处理成本阈值、分组泄漏与取餐运营方案。</p>
          </header>
          <div className="project-notes-grid">
            {projectNotes.map((project) => (
              <ProjectNoteCard project={project} key={project.slug} />
            ))}
          </div>
        </div>
      </section>

      <PortfolioFooter />
    </main>
  );
}

function ProjectMetricStrip({ project }: { project: WorkProject }) {
  return (
    <div className="project-proof-strip">
      {project.metrics.map((metric) => (
        <div key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
          <p>{metric.detail}</p>
        </div>
      ))}
    </div>
  );
}

function EvidenceGallery({ project }: { project: WorkProject }) {
  if (project.images.length < 2) return null;
  return (
    <div className="project-evidence-gallery">
      {project.images.slice(1).map((image, index) => (
        <figure className="v2-project-image" key={image.src}>
          <img
            src={image.src}
            alt={image.alt}
            width="1440"
            height="900"
            className={'image-position-' + (image.position ?? 'top')}
          />
          <figcaption>
            {image.caption.replace(
              /^\d+\s*·\s*/,
              String(index + 2).padStart(2, '0') + ' · ',
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function ProjectSystemSplit({ project }: { project: WorkProject }) {
  return (
    <div className="project-system-split">
      <article>
        <span>模型 / Agent</span>
        <h3>开放理解与候选生成</h3>
        <p>{project.aiRole}</p>
      </article>
      <article>
        <span>系统规则 / 人工决策</span>
        <h3>事实、状态与不可逆决定</h3>
        <p>{project.systemRole}</p>
      </article>
    </div>
  );
}

function DecisionList({ project }: { project: WorkProject }) {
  return (
    <div className="project-decision-list">
      {project.decisions.map((decision, index) => (
        <article key={decision.title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3>{decision.title}</h3>
            <p>{decision.rationale}</p>
          </div>
          <p>
            <strong>取舍</strong>
            {decision.tradeoff}
          </p>
        </article>
      ))}
    </div>
  );
}

function EvaluationPanel({ project }: { project: WorkProject }) {
  return (
    <div className="evaluation-panel">
      <article>
        <span>测试方式</span>
        <p>{project.evaluation.method}</p>
      </article>
      <article>
        <span>结果</span>
        <p>{project.evaluation.result}</p>
      </article>
      <article>
        <span>一次关键问题</span>
        <p>{project.evaluation.badcase}</p>
      </article>
      <article className="is-accent">
        <span>改动</span>
        <p>{project.evaluation.change}</p>
      </article>
    </div>
  );
}

function ShortEvidencePanel({ project }: { project: WorkProject }) {
  const isStudy = project.tier === 'product-study';
  return (
    <div className="evaluation-panel">
      <article>
        <span>{isStudy ? '实验任务' : '项目结果'}</span>
        <p>{isStudy ? project.evaluation.method : project.evaluation.result}</p>
      </article>
      <article className="is-accent">
        <span>{isStudy ? '如何判断通过' : '一次关键问题'}</span>
        <p>
          {isStudy ? project.evaluation.result : project.evaluation.badcase}
        </p>
      </article>
    </div>
  );
}

function ProjectNoteDetailPage({ project }: { project: WorkProject }) {
  const currentIndex = projectsV2.findIndex(
    (item) => item.slug === project.slug,
  );
  const nextProject = projectsV2[(currentIndex + 1) % projectsV2.length];
  const decision = project.decisions[0];

  return (
    <main className="v2-note-page">
      <PortfolioHeader />
      <div className="site-wrap v2-note-body">
        <section className="v2-note-summary">
          <a className="v2-back-link focus-ring" href="./#project-index">
            <ArrowLeft aria-hidden="true" /> 返回全部项目
          </a>
          <span>
            {project.index} · 项目笔记 · {project.year}
          </span>
          <h1>{project.title}</h1>
          <p>{project.problem}</p>
          <p>{project.outcome}</p>
          <dl>
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.value}</dt>
                <dd>
                  {metric.label}
                  <br />
                  {metric.detail}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <aside className="v2-note-decision">
          <ProjectDiagram project={project} />
          <span>一个关键判断</span>
          <h2>{decision.title}</h2>
          <p>{decision.rationale}</p>
          <p>
            <strong>取舍：</strong>
            {decision.tradeoff}
          </p>
        </aside>

        <section className="v2-note-boundary">
          <span>我的工作</span>
          <p>{project.contribution}</p>
          <span>当前状态与下一步</span>
          <p>{project.boundary}</p>
        </section>

        <div className="v2-note-actions">
          {project.github ? (
            <a
              className="v2-outline-button focus-ring"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              <Code2 aria-hidden="true" /> 查看 GitHub{' '}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
      <section className="v2-next-project">
        <div className="site-wrap">
          <a className="focus-ring" href={'projects/' + nextProject.slug}>
            <span>下一个项目</span>
            <strong>{nextProject.shortTitle}</strong>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
      <PortfolioFooter />
    </main>
  );
}

function ShortProjectDetailPage({ project }: { project: WorkProject }) {
  const currentIndex = projectsV2.findIndex(
    (item) => item.slug === project.slug,
  );
  const nextProject = projectsV2[(currentIndex + 1) % projectsV2.length];
  const isStudy = project.tier === 'product-study';

  return (
    <main className="v2-page">
      <PortfolioHeader />
      <section className="v2-project-hero">
        <div className="site-wrap">
          <a className="v2-back-link focus-ring" href="./#project-index">
            <ArrowLeft aria-hidden="true" /> 返回全部项目
          </a>
          <div className="v2-project-title-grid">
            <div>
              <p className="v2-project-meta">
                {project.index} · {tierLabel(project.tier)} · {project.year}
              </p>
              <h1>{project.title}</h1>
              <p className="v2-project-statement">{project.statement}</p>
            </div>
            <dl>
              <div>
                <dt>产品场景</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt>目标用户</dt>
                <dd>{project.audience}</dd>
              </div>
              <div>
                <dt>我的角色</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>当前状态</dt>
                <dd>{project.status}</dd>
              </div>
            </dl>
          </div>
          <ProjectImage project={project} className="v2-project-lead-image" />
          <ProjectMetricStrip project={project} />
        </div>
      </section>

      <section className="v2-case-section">
        <div className="site-wrap v2-case-two-column">
          <header>
            <span>01</span>
            <h2>问题与产品结果</h2>
          </header>
          <div className="v2-reading-column">
            <h3>{project.problem}</h3>
            <p>{project.oldFlow}</p>
            <div className="v2-outcome-callout">
              <span>产品结果</span>
              <p>{project.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="v2-case-section is-canvas">
        <div className="site-wrap">
          <header className="v2-section-head compact">
            <div>
              <span>02</span>
              <h2>{isStudy ? '我的产品拆解' : '核心机制'}</h2>
            </div>
            <p>沿任务流程说明模型、系统规则与人工决策的分工。</p>
          </header>
          <WorkflowDiagram project={project} />
          <ProjectSystemSplit project={project} />
        </div>
      </section>

      <section className="v2-case-section is-night">
        <div className="site-wrap">
          <header className="v2-section-head compact is-light">
            <div>
              <span>03</span>
              <h2>关键产品判断</h2>
            </div>
            <p>每项选择都对应用户风险、实现成本与替代方案。</p>
          </header>
          <DecisionList project={project} />
        </div>
      </section>

      <section className="v2-case-section">
        <div className="site-wrap">
          <header className="v2-section-head compact">
            <div>
              <span>04</span>
              <h2>{isStudy ? '实验方案' : '项目结果'}</h2>
            </div>
            <p>
              {isStudy
                ? '用一个跨渠道任务检验拆解中的信任判断。'
                : '短案例只保留一项结果与一个会影响产品判断的问题。'}
            </p>
          </header>
          <ShortEvidencePanel project={project} />
        </div>
      </section>

      <section className="v2-project-close">
        <div className="site-wrap v2-project-close-grid">
          <div>
            <span>{isStudy ? '项目来源与我的拆解' : '我的工作'}</span>
            <p>{project.contribution}</p>
            {project.attribution ? <small>{project.attribution}</small> : null}
          </div>
          <div>
            <span>当前状态与下一步</span>
            <p>{project.boundary}</p>
          </div>
          <div className="v2-project-actions">
            {project.github ? (
              <a
                className="v2-outline-button focus-ring"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                <Code2 aria-hidden="true" /> 查看 GitHub{' '}
                <ArrowUpRight aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="v2-next-project">
        <div className="site-wrap">
          <a className="focus-ring" href={'projects/' + nextProject.slug}>
            <span>下一个项目</span>
            <strong>{nextProject.shortTitle}</strong>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
      <PortfolioFooter />
    </main>
  );
}

export function PortfolioProjectPage({ project }: { project: WorkProject }) {
  if (project.tier === 'project-note') {
    return <ProjectNoteDetailPage project={project} />;
  }
  if (project.tier === 'selected-build' || project.tier === 'product-study') {
    return <ShortProjectDetailPage project={project} />;
  }

  const currentIndex = projectsV2.findIndex(
    (item) => item.slug === project.slug,
  );
  const nextProject = projectsV2[(currentIndex + 1) % projectsV2.length];

  return (
    <main className="v2-page">
      <PortfolioHeader />
      <section className="v2-project-hero">
        <div className="site-wrap">
          <a className="v2-back-link focus-ring" href="./#project-index">
            <ArrowLeft aria-hidden="true" /> 返回全部项目
          </a>
          <div className="v2-project-title-grid">
            <div>
              <p className="v2-project-meta">
                {project.index} · {tierLabel(project.tier)} · {project.year}
              </p>
              <h1>{project.title}</h1>
              <p className="v2-project-statement">{project.statement}</p>
            </div>
            <dl>
              <div>
                <dt>产品场景</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt>目标用户</dt>
                <dd>{project.audience}</dd>
              </div>
              <div>
                <dt>我的角色</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>当前状态</dt>
                <dd>{project.status}</dd>
              </div>
            </dl>
          </div>
          <ProjectImage project={project} className="v2-project-lead-image" />
          <ProjectMetricStrip project={project} />
        </div>
      </section>

      <section className="v2-case-section">
        <div className="site-wrap v2-case-two-column">
          <header>
            <span>01</span>
            <h2>用户与旧流程</h2>
          </header>
          <div className="v2-reading-column">
            <h3>{project.problem}</h3>
            <p>{project.oldFlow}</p>
            <div className="v2-outcome-callout">
              <span>产品结果</span>
              <p>{project.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="v2-case-section is-canvas">
        <div className="site-wrap">
          <header className="v2-section-head compact">
            <div>
              <span>02</span>
              <h2>产品如何工作</h2>
            </div>
            <p>按用户任务拆解流程，并标出模型、系统规则与人工决策的分工。</p>
          </header>
          <WorkflowDiagram project={project} />
          <ProjectSystemSplit project={project} />
        </div>
      </section>

      <section className="v2-case-section">
        <div className="site-wrap">
          <header className="v2-section-head compact">
            <div>
              <span>03</span>
              <h2>关键交互路径</h2>
            </div>
            <p>按用户完成任务的顺序，展示输入、选择、审核与交付状态。</p>
          </header>
          <EvidenceGallery project={project} />
        </div>
      </section>

      <section className="v2-case-section is-night">
        <div className="site-wrap">
          <header className="v2-section-head compact is-light">
            <div>
              <span>04</span>
              <h2>关键产品取舍</h2>
            </div>
            <p>每项选择都对应用户风险、实现成本与替代方案。</p>
          </header>
          <DecisionList project={project} />
        </div>
      </section>

      <section className="v2-case-section">
        <div className="site-wrap">
          <header className="v2-section-head compact">
            <div>
              <span>05</span>
              <h2>测试与迭代</h2>
            </div>
            <p>用代表性任务检查核心路径，并记录问题如何推动改动。</p>
          </header>
          <EvaluationPanel project={project} />
        </div>
      </section>

      <section className="v2-project-close">
        <div className="site-wrap v2-project-close-grid">
          <div>
            <span>我的工作</span>
            <p>{project.contribution}</p>
            {project.attribution ? <small>{project.attribution}</small> : null}
          </div>
          <div>
            <span>当前状态与下一步</span>
            <p>{project.boundary}</p>
          </div>
          <div className="v2-project-actions">
            {project.github ? (
              <a
                className="v2-outline-button focus-ring"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                <Code2 aria-hidden="true" /> 查看 GitHub{' '}
                <ArrowUpRight aria-hidden="true" />
              </a>
            ) : null}
            {project.demo ? (
              <a className="v2-solid-button focus-ring" href={project.demo}>
                <PlayCircle aria-hidden="true" /> 查看交互演示
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="v2-next-project">
        <div className="site-wrap">
          <a className="focus-ring" href={'projects/' + nextProject.slug}>
            <span>下一个项目</span>
            <strong>{nextProject.shortTitle}</strong>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
      <PortfolioFooter />
    </main>
  );
}

export function PortfolioNotFound() {
  return (
    <main className="v2-page">
      <PortfolioHeader />
      <section className="site-wrap v2-not-found">
        <span>404</span>
        <h1>这个项目页不存在。</h1>
        <a className="v2-solid-button focus-ring" href="./">
          返回作品集 <ArrowRight aria-hidden="true" />
        </a>
      </section>
      <PortfolioFooter />
    </main>
  );
}
