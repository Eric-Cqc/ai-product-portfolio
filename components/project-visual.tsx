import type { Project } from '@/lib/portfolio';

function FlowDiagram({ project }: { project: Project }) {
  return (
    <div className="diagram-shell" aria-label={`${project.shortTitle} 产品流程`}>
      <div className="diagram-label">PRODUCT FLOW / 状态如何变化</div>
      <div className="flow-track">
        {project.workflow.map((step, index) => (
          <div className="flow-step" key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchitectureDiagram({ project }: { project: Project }) {
  const items = [
    ['MODEL', project.architecture.model],
    ['AGENT', project.architecture.agent],
    ['CODE', project.architecture.code],
    ['HUMAN', project.architecture.human],
    ['STATE', project.architecture.state],
  ];

  return (
    <div className="architecture-grid" aria-label={`${project.shortTitle} 架构职责分工`}>
      {items.map(([label, content], index) => (
        <div className="architecture-cell" key={label}>
          <div className="flex items-center justify-between gap-3">
            <span className="architecture-code">{label}</span>
            <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
          </div>
          <p>{content}</p>
        </div>
      ))}
    </div>
  );
}

function CourierVisual() {
  const models = [
    { name: 'LightGBM', auc: 90.77, f1: 81.48 },
    { name: 'Logistic', auc: 82.73, f1: 74.20 },
  ];
  return (
    <div className="data-visual" role="img" aria-label="LightGBM 与 Logistic 的 AUC 和 F1 聚合指标比较">
      <div className="diagram-label">AGGREGATE EVALUATION / 聚合评测</div>
      {models.map((model) => (
        <div className="metric-row" key={model.name}>
          <strong>{model.name}</strong>
          <div className="bar-group">
            <span className="bar bar-primary" style={{ width: `${model.auc}%` }}><i>AUC {model.auc.toFixed(2)}</i></span>
            <span className="bar bar-secondary" style={{ width: `${model.f1}%` }}><i>F1 {model.f1.toFixed(2)}</i></span>
          </div>
        </div>
      ))}
      <p className="visual-note">160,000 行 · 306 个 courier groups · 5 folds · 只发布聚合结果</p>
    </div>
  );
}

function CampusVisual() {
  const rows = [
    { name: 'Baseline', wait: 72, turnaround: 100 },
    { name: 'Scenario 2', wait: 33, turnaround: 98.6 },
    { name: 'Scenario 3', wait: 71, turnaround: 95.5 },
  ];
  return (
    <div className="data-visual" role="img" aria-label="三种校园取餐仿真情景在等待与总周转上的相对比较">
      <div className="diagram-label">TRADE-OFF / 不是一个指标决定赢家</div>
      {rows.map((row) => (
        <div className="metric-row" key={row.name}>
          <strong>{row.name}</strong>
          <div className="bar-group">
            <span className="bar bar-primary" style={{ width: `${row.wait}%` }}><i>等待</i></span>
            <span className="bar bar-secondary" style={{ width: `${row.turnaround}%` }}><i>总周转</i></span>
          </div>
        </div>
      ))}
      <p className="visual-note">指数为相对长度；正式数值与 95% CI 见上方指标。结果来自 50 次假设驱动仿真，不是校园实测。</p>
    </div>
  );
}

function MathMentorVisual() {
  const levels = ['L0 尝试', 'L1 方向', 'L2 关键观察', 'L3 分解', 'L4 强提示', 'L5 露解'];
  return (
    <div className="mentor-visual" role="img" aria-label="MathMentor 提示阶梯与独立 Verifier 分工">
      <div className="diagram-label">HINT LADDER / 帮助逐步升级，答案不由模型自由释放</div>
      <div className="hint-ladder">
        {levels.map((level, index) => <div key={level} style={{ '--level': index + 1 } as React.CSSProperties}><span>0{index}</span>{level}</div>)}
      </div>
      <div className="verifier-strip">
        <span>学生提交</span><b>→</b><span>确定性判题</span><b>→</b><span>隔离 Verifier</span><b>→</b><span>掌握 / uncertain</span>
      </div>
    </div>
  );
}

function SuperAgentVisual() {
  return (
    <div className="super-agent-visual" role="img" aria-label="双用户 Super Agent 的租户隔离、审批与 Outbox 架构">
      <div className="tenant-lane"><span>TENANT A</span><b>独立身份 · 数据 · Secret · 审计</b></div>
      <div className="control-plane"><span>GATEWAY</span><i>→</i><span>ORCHESTRATOR</span><i>→</i><span>APPROVAL</span><i>→</i><span>OUTBOX</span></div>
      <div className="tenant-lane"><span>TENANT B</span><b>独立身份 · 数据 · Secret · 审计</b></div>
      <p>共享的只有不可变镜像；模型不能绕过审批直接触发外部动作。</p>
    </div>
  );
}

export function ProjectLeadVisual({ project }: { project: Project }) {
  if (project.slug === 'mathmentor') return <MathMentorVisual />;
  if (project.slug === 'super-agent') return <SuperAgentVisual />;
  if (project.slug === 'courier-action') return <CourierVisual />;
  if (project.slug === 'campus-food-sim') return <CampusVisual />;

  if (project.images?.length) {
    const image = project.images[0];
    return (
      <figure className={`evidence-frame evidence-${image.position ?? 'top'}`}>
        <img src={image.src} alt={image.alt} width="1440" height="900" />
        <figcaption>{image.caption}</figcaption>
      </figure>
    );
  }

  return <FlowDiagram project={project} />;
}

export { ArchitectureDiagram, FlowDiagram };
