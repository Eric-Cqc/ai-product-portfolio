export type Metric = {
  label: string;
  value: string;
  note: string;
};

export type Decision = {
  constraint: string;
  choice: string;
  alternative: string;
  reason: string;
  cost: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  category: string;
  tier: 'flagship' | 'selected';
  score: number;
  status: string;
  statusDetail: string;
  problem: string;
  role: string;
  contribution: string;
  claim: string;
  proof: string;
  metrics: Metric[];
  whyAI: string;
  notAI: string;
  workflow: string[];
  architecture: {
    model: string;
    agent: string;
    code: string;
    human: string;
    state: string;
  };
  decisions: Decision[];
  badcase: {
    input: string;
    failure: string;
    cause: string;
    change: string;
    result: string;
  };
  limitations: string[];
  nextStep: string;
  tags: string[];
  github?: string;
  images?: { src: string; alt: string; caption: string; position?: 'top' | 'center' | 'bottom' }[];
};

export const projects: Project[] = [
  {
    slug: 'mathmentor',
    index: '01',
    title: 'MathMentor 奥数私教 Agent',
    shortTitle: 'MathMentor',
    category: 'C 端教学 · 安全交互',
    tier: 'flagship',
    score: 89,
    status: '本地私测候选',
    statusDetail: '基于 DeepTutor v1.5.11 扩展；微信工程存在，但未正式上线。',
    problem: '通用聊天模型容易直接给答案、越级提示，或把同题换数字后的再次做对误算成独立掌握。学生需要的是不泄题、可恢复、能迁移且能安排复习的教学闭环。',
    role: '产品定义、教学 Agent 架构、评测设计、AI 协作开发与验收。',
    contribution: '明确署名 DeepTutor v1.5.11；个人贡献集中在 MathMentor 用户闭环、Coach / Verifier 分工、提示与掌握状态机、320 道原创题、评测 Harness 和小程序产品边界。',
    claim: '不给答案，也不等于没有帮助。',
    proof: '模型负责理解开放表达与生成追问；答案释放、提示升级、掌握度和复习状态由确定性系统持有。',
    metrics: [
      { label: '主题 / 原创题', value: '32 / 320', note: '代数、几何、数论、组合各 8 主题' },
      { label: '固定教学评测', value: '30 / 30', note: '现有离线就绪记录，本轮未重跑' },
      { label: '确定性 Harness', value: '20 / 20', note: '覆盖索答、泄漏、uncertain、迁移与幂等' },
    ],
    whyAI: '学生的错误表达、追问方式和证明过程高度开放；Coach 适合生成针对性的苏格拉底式追问，复杂证明可由隔离 Verifier 结合 rubric 判断。',
    notAI: '题目选择、L0–L5 解锁、索答拦截、答案泄漏检查、掌握证据、迁移升级、1/3/7/14/30 天复习、额度、幂等和管理员审核。',
    workflow: ['画像与主题图谱', '到期复习 / 迁移选题', '学生尝试', '索答与越级 Gate', 'Coach 追问', '混合判题 / Verifier', '掌握与复习', '人工审核训练候选'],
    architecture: {
      model: 'DeepSeek Coach 生成短追问；隔离 Verifier 判断复杂提交。两者上下文分离，Coach 不接收标准解。',
      agent: 'Tutor Loop 只处理学生消息、请求提示和提交，显式区分 complete、recover_uncertain 与 budget_exhausted。',
      code: '题目选择、L0–L5、双重答案 Gate、规范化 / 数值 / AST 判题、掌握、复习、额度和幂等。',
      human: '管理员逐条审核训练候选；批准后仍须复检和显式导出，不自动训练。',
      state: '持久化当前题、提示、轮次、草稿和幂等状态；uncertain、网络失败与刷新不清空任务。',
    },
    decisions: [
      {
        constraint: '一次答案泄漏会破坏教学价值与掌握数据。',
        choice: '模型调用前拦截索答，输出后再次检查答案、锁定提示和标准解片段。',
        alternative: '只依赖 system prompt 约束 Coach。',
        reason: '确定性策略可回归、可解释，也能承接模型漂移。',
        cost: '需要持续维护同义表达，也可能误拦。',
      },
      {
        constraint: '简单数值题要稳定低成本，复杂证明不能只做字符串匹配。',
        choice: '确定性判题优先，复杂题进入与 Coach 隔离的 Verifier；低置信度返回 uncertain。',
        alternative: '全部交给同一个 Coach，或每题都调用 LLM。',
        reason: '降低成本与延迟，避免把模糊判断硬写成对错。',
        cost: '需要维护两条判题路径和恢复交互。',
      },
      {
        constraint: '同题换数字、看过 L5 和独立远迁移的证据强度不同。',
        choice: '按题族折叠重复证据，并要求到期复习后才形成耐久掌握。',
        alternative: '让模型直接输出“已掌握”。',
        reason: '学习进度可解释、可重放，避免刷题造成虚高掌握。',
        cost: '需要更丰富的题目元数据，进度显得更慢。',
      },
    ],
    badcase: {
      input: '“我想直接知道答案”等变相索答。',
      failure: '原有字面规则没有命中语义变体，暴露教学意图层的策略缺口。',
      cause: '拦截器覆盖显式索答，但语义变体不足。',
      change: '扩展固定策略与回归；候选进入审核前再次检查答案、未来提示与单问题一致性。',
      result: '当前 Harness 20/20；293 条候选中 174 条被策略 Gate 拒绝，119 条仍须人工审核。',
    },
    limitations: ['没有真实学生留存或学习增益结果', '未完成连续三天真实私测', '微信小程序未正式上线', '本次实录只覆盖离线数值题，不代表付费模型或证明题复核'],
    nextStep: '以连续三天真实学习、断网恢复和到期复习为下一轮私测；微信发布继续作为独立外部门槛。',
    tags: ['Agent', 'Education', 'Verifier', 'Evaluation', 'WeChat'],
    images: [
      { src: 'assets/projects/mathmentor/problem.webp', alt: 'MathMentor 真实本地演示中的奥数题目与 L0 初始状态', caption: '学生先尝试，系统把答案与未来提示留在服务端；当前为离线数值题演示。' },
      { src: 'assets/projects/mathmentor/safety-gate.webp', alt: 'MathMentor 对直接索答的 L0 安全阻断', caption: '“直接告诉我答案”不会解锁下一层，而是返回一个可继续思考的观察方向。' },
      { src: 'assets/projects/mathmentor/verifier.webp', alt: 'MathMentor Verifier 核验、69% 掌握度和次日复习状态', caption: '真实提交后显示核验正确、掌握度 69% 与次日复习；不把一次正确写成长期掌握。' },
    ],
  },
  {
    slug: 'healthai-radar',
    index: '02',
    title: 'HealthAI Radar',
    shortTitle: 'HealthAI Radar',
    category: 'B 端战略情报 · Evidence-Native',
    tier: 'flagship',
    score: 92,
    status: '离线 Demo',
    statusDetail: 'Research Shadow 0/3；生产扫描、调度和正式写入关闭，safeToPromote=false。',
    problem: '跨公司、产品、语言和 HTML / PDF / 扫描件的重复搜索、摘录与核验成本高；普通 AI 摘要无法证明每个字段来自哪里，还会把抓取或 OCR 失败误写成“无更新”。',
    role: '产品定义、领域合同、Agent / 确定性内核分工、证据与人工审核体验、评测设计、AI 协作开发与验收。',
    contribution: '受真实专业研究工作流启发的个人项目，不是百度正式产品。DeepSeek、Qwen OCR/VL、LangGraph、React 与 ECharts 是第三方能力；离线 Demo 和 A08 基准不等于生产采用。',
    claim: '每个结论，都必须回到具体证据。',
    proof: '固定覆盖、字段级证据、明确的未知状态和人工授权共同决定什么能进入正式情报库。',
    metrics: [
      { label: '固定任务范围', value: '15 × 3 = 45', note: '15 家公司，Product / Commercialization / Strategic' },
      { label: 'Canonical assets', value: '47', note: '归一资产进入三项确定性趋势指标' },
      { label: 'A08 多模态文档', value: '30 / 30', note: '冻结 qualifying run；不等于付费 Research 通过' },
    ],
    whyAI: '模型适合从多语言网页、PDF、扫描件、表格和图表中发现弱信号、抽取候选字段、处理 OCR 文本并生成受证据约束的候选表达。',
    notAI: '公司范围、来源归属、时间窗、字段证据、否定 / 计划态、单位、主体、去重、NO_UPDATE / INCOMPLETE / FAILURE 语义、趋势指标、批准和正式写入。',
    workflow: ['45 项固定计划', '受控来源发现', 'HTML / PDF / OCR 路由', 'EvidenceAnchor', 'Candidate', 'Trusted Kernel', '人工审核', 'Committed Event', '趋势指标'],
    architecture: {
      model: 'DeepSeek 负责候选提议与引用式表达；Qwen OCR/VL 负责文档观察；输出始终是不可信候选。',
      agent: '固定 Plan-and-Execute 保证覆盖；bounded ReAct 只用于未知弱信号和只读查询。',
      code: 'Harness 控预算与白名单；Trusted Kernel 决定证据、时间窗、去重、Gate 和状态语义；指标由确定性代码计算。',
      human: '分析员决定证据是否充分、事实是否值得记录，以及是否允许进入正式情报库。',
      state: '每个 Track 持久化 retry、error、lease、heartbeat 和 checkpoint；重启只重放未确认步骤。',
    },
    decisions: [
      {
        constraint: '战略雷达必须证明 15 家 × 3 Track 覆盖，开放 Agent 容易跳过低热度公司。',
        choice: 'Scheduled Scan 范围由代码固定；bounded ReAct 只补未知信号。',
        alternative: '让一个开放 Agent 自行决定公司、Track、工具和停止条件。',
        reason: '把覆盖完整与探索灵活拆开，开放 Agent 不拥有正式写权限。',
        cost: '固定任务带来稳定成本，双层状态更复杂。',
      },
      {
        constraint: '日期、数字、产品和部署状态必须回到具体原文。',
        choice: '每个字段绑定 artifact、页码、block、bbox、exactText、textHash 和 confidence。',
        alternative: '向量检索后输出页面级引用的自由摘要。',
        reason: '候选、图表点和简报都可下钻证据，也能暴露 OCR 缺口。',
        cost: '文档处理、存储和审核更重。',
      },
      {
        constraint: '抓取失败被写成无更新会制造虚假稳定性。',
        choice: '只有完成可审计覆盖才允许 AUDITED_NO_UPDATE；其余保留 INCOMPLETE、PARTIAL_FAILURE 或 coverage_unknown。',
        alternative: '没找到候选就返回空结果。',
        reason: '未知与零对战略判断完全不同。',
        cost: '看板会保留更多未完成状态。',
      },
    ],
    badcase: {
      input: 'Qwen 已返回正确 OCR 文本和真实 bbox，但响应是 fenced 顶层 JSON array，标题跨视觉行。',
      failure: '旧对象型解析器丢弃数组，逐 block 匹配无法命中跨行 anchor，系统把可用证据记为 incomplete。',
      cause: 'Provider 响应形态与解析器契约不一致，匹配粒度过细，未知 confidence 曾被错误默认。',
      change: '修复数组解析与跨行匹配，使用显式 UNKNOWN confidence，逐 case 落盘 OCR 证据并绑定 digest。',
      result: 'qualifying run 达到 30/30、0 incomplete、0 failed；Research Shadow 仍为 0/3。',
    },
    limitations: ['Research Shadow 仍为 0/3', '生产扫描、调度和正式 Excel 写入关闭', '约 80% 只能作为试运行测算', '公开版只使用预置脱敏 Demo'],
    nextStep: '作品集只补录一条离线证据下钻路径；真正上线前仍需付费 evaluator、三轮 Shadow、crash / resume 和明确的人类 promotion。',
    tags: ['Agent', 'RAG', 'OCR', 'Evidence', 'Human Gate'],
    images: [
      { src: 'assets/projects/healthai/strategy-overview.webp', alt: 'HealthAI Radar 离线 Demo 的战略趋势页', caption: '页面明确标注 Demo / 只读 / 演示数据；趋势只统计已批准的 committed 事件。' },
      { src: 'assets/projects/healthai/evidence-drawer.webp', alt: 'HealthAI Radar 真实点击打开的证据抽屉', caption: '候选可回到原文与来源状态；本条演示证据明确显示“不可确认”，不会被包装成确定事实。' },
      { src: 'assets/projects/healthai/readiness.webp', alt: 'HealthAI Radar 的设置与生产边界页', caption: '正式写入、调度与生产均关闭；Research Shadow 0/3，safeToPromote=false。' },
    ],
  },
  {
    slug: 'ai-video-preproduction',
    index: '03',
    title: 'AI Video Preproduction Agent',
    shortTitle: 'AI Video',
    category: '创作工作流 · Human-in-the-loop',
    tier: 'flagship',
    score: 97,
    status: 'Local RC',
    statusDetail: 'deterministic single-tenant path 已验收；paid Provider 未验收；非成片生成器。',
    problem: '从模糊意图到 Brief、Concept、Script、Storyboard、Shot Plan 和交付包涉及大量上下文传递；一站式生成容易丢约束、覆盖已批准事实并混淆版本。',
    role: '产品定义、长链路 Human-in-the-loop 设计、状态 / Agent 架构、评测设计、AI 协作开发与验收。',
    contribution: '个人贡献集中在 Production Desk 工作流、结构化资产契约、人工 Gate、不可变版本与 lineage、状态恢复、Delivery v2 和验收；不把 DeepSeek 或第三方能力写成自研。',
    claim: 'AI 负责提出候选，人负责让它成为交付。',
    proof: '每一次接受、选择、修订和批准都绑定精确版本；Delivery 只引用真正被批准的 bundle。',
    metrics: [
      { label: '中文浏览器全流程', value: '366 / 0', note: '1440 / 1024 / 390 三种尺寸，本地真实路径' },
      { label: 'Delivery v2', value: '12 members', note: '固定文件名、字节、SHA-256 与 manifest' },
      { label: 'Paid Provider', value: '0 accepted', note: '外部认证 / 访问失败，不冒充已通过' },
    ],
    whyAI: '自然语言 Brief、创意方向、脚本、分镜描述、拍摄计划和修订说明是开放内容；模型适合结构化意图、扩展方案并生成阶段性草案。',
    notAI: '来源完整性、Schema / 语义验证、Candidate 接受、Concept 选择、规划批准、版本、权限、幂等、冲突、时长 / 连续性、manifest 和 ZIP 完整性。',
    workflow: ['Project', 'Upload & Parse', 'Brief Candidate', 'Accept / Reject', '3 Concepts', 'Human Selection', 'Script', 'Storyboard', 'Shot Plan', 'Review & Revision', 'Delivery ZIP'],
    architecture: {
      model: 'ProviderPort 为各阶段生成结构化候选；已验收路径使用 deterministic Provider，paid Provider 仍是独立 activation Gate。',
      agent: 'stage-aware、server-authored 编排；每个阶段只有当前状态允许的动作，人类决定是否进入下一阶段。',
      code: 'Schema、parser、tenant scope、CAS、幂等、coverage、时长、continuity、lineage、manifest 和 ZIP checksum。',
      human: 'Brief 接受 / 拒绝、Concept 选择、planning approval / revision / re-approve 都是显式授权。',
      state: 'PostgreSQL 持久化 immutable versions、operation reservations 与 predecessor / successor；相同 digest 精确 replay。',
    },
    decisions: [
      {
        constraint: 'Brief、Concept、Script 和镜头计划分别需要不同人的判断；一步生成会放大早期错误。',
        choice: '使用可见 stage rail 和分阶段 Human Gate。',
        alternative: '自由聊天或一键 batch 自动接受、选择和批准。',
        reason: '人在高代价下游生成前就能纠偏，并看见依据、版本和下一步。',
        cost: '点击与等待更多，状态和空态设计更复杂。',
      },
      {
        constraint: '修改 Script 会影响 Storyboard、Shot Plan 与 Delivery；原地编辑会破坏历史审批。',
        choice: '每次变化创建 immutable successor，批准只针对精确 bundle。',
        alternative: 'PATCH 当前对象或覆盖已批准版本。',
        reason: '保留输入、资产、审批和交付的 lineage，支持回放与并发冲突。',
        cost: '数据模型和 UI 更重，用户要理解 revision。',
      },
      {
        constraint: 'Schema 合法不等于来源语义正确。',
        choice: '模型结果先成为 candidate；接受、选择和批准分开。',
        alternative: 'Schema 通过即自动接受，或让模型自己选 Concept。',
        reason: '创意选择和来源事实权留给人。',
        cost: '人工 Gate 降低吞吐。',
      },
    ],
    badcase: {
      input: '“The tone is anything but playful.”',
      failure: '旧提取器把 Playful 写进 tone；Schema 完全合法，但语义反转。',
      cause: '词表切分丢失否定范围和 clause polarity。',
      change: '加入 clause-local polarity、反转短语、contrast reset、postposed negation 与 role-aware traceability oracle。',
      result: '116 个 traceability cases；第二轮 31 个独立 tone constructions 全部符合预期。',
    },
    limitations: ['paid Provider 未验收', '外部 pilot、production 与 multi-tenant 未通过', '产品不生成最终视频、图像或音频', '少数操作 POST 201 后客户端会短暂显示无法确认，重开页面可从持久状态继续'],
    nextStep: '修复短暂的客户端确认竞态；再以付费 Provider 完成独立 activation Gate 与外部创作者 pilot。',
    tags: ['Agent', 'Creative', 'Workflow', 'Versioning', 'HITL'],
    github: 'https://github.com/Eric-Cqc/ai-video-preproduction-agent',
    images: [
      { src: 'assets/projects/ai-video/01-brief-candidate.webp', alt: 'AI Video 真实 Local RC 中的 Brief 候选', caption: '自然语言输入先成为结构化候选；人接受后才进入下游。' },
      { src: 'assets/projects/ai-video/02-concepts-compare.webp', alt: 'AI Video 真实 Local RC 中的三个创意方向', caption: '系统提供三个 immutable Concept，本次由人选择“行动即证明”。' },
      { src: 'assets/projects/ai-video/05-shot-plan-review.webp', alt: 'AI Video 的拍摄计划和人工审核状态', caption: '20 秒脚本被拆成 3 个镜头；批准绑定精确版本。' },
      { src: 'assets/projects/ai-video/06-delivery-exported.webp', alt: 'AI Video 完成前期制作交付包和 ZIP 导出', caption: '真实 Local RC 完成 Delivery 与已验证 ZIP；本次导出显示 1 个 11,315 字节交付包。' },
    ],
  },
  {
    slug: 'ai-saas-pricing', index: '04', title: 'AI SaaS Pricing Observatory', shortTitle: 'AI SaaS Observatory', category: '商业研究 · 数据产品', tier: 'selected', score: 82,
    status: '可运行原型', statusDetail: '本地只读 Observatory；正式因果、采用时间和 token 成本研究保持 NO-GO。',
    problem: '历史页面、套餐、额度、超额和 action-based meter 在不同时间窗口中语义漂移，一次性表格无法保留证据状态。',
    role: '研究产品定义、纵向测量协议、证据状态设计、只读 Observatory、AI 协作开发与验收。',
    contribution: '机器编码与 AI 多轮复核只是候选工具，不等于人类编码可靠性；只公开 quote-free derived layer。',
    claim: '“第一次看到”不是“产品正式采用”。', proof: '把 40 个产品放进 5 个独立窗口，缺失保留为 UNCLEAR，展示层只读 canonical artifacts。',
    metrics: [{ label: '纵向框架', value: '40 × 5', note: '200 product-window' }, { label: '主新鲜度层有效', value: '141 / 200', note: '内容、范围和 ≤90 天新鲜度均通过' }],
    whyAI: '机器编码适合跨产品页面的语义归类和异常候选发现。', notAI: '窗口、证据新鲜度、UNCLEAR、lineage、发布 allowlist 和图表由确定性规则控制。',
    workflow: ['40 产品框架', '5 个目标窗口', '一手证据', '机器复核', '保守 reviewed panel', '描述性图表', '只读 Observatory'],
    architecture: { model: 'AI 用于语义编码与异常发现。', agent: '受协议约束的机器复核步骤，不是开放 Agent。', code: 'coverage、freshness、UNCLEAR、lineage、图表与只读 endpoints。', human: '正式人类可靠性未完成时，机器一致性不能写成人工信度。', state: '构建前后确认 canonical inputs 未变化并记录 artifact manifest。' },
    decisions: [
      { constraint: '页面缺失或过期不能等于没有 AI 功能。', choice: '保留 UNCLEAR，不做缺失即零的插补。', alternative: '为了完整表格把缺失填成 absence。', reason: '避免把证据恢复能力误写成产品状态。', cost: '覆盖率和结论更保守。' },
      { constraint: '证据不足以支持正式因果和采用时间。', choice: '只发布描述性 pilot，其余保持 NO-GO。', alternative: '用首次观察日期推断采用。', reason: '研究问题与证据能力匹配。', cost: '少了更强 headline，但不制造伪精确。' },
    ],
    badcase: { input: '整体恢复率通过，但低 freemium 分层仍不可用。', failure: '聚合阈值掩盖关键分层缺口。', cause: '单一总恢复率未约束各采样臂。', change: '增加分层披露恢复 Gate。', result: '扩大样本不再由整体通过自动触发。' },
    limitations: ['无公网部署', '人工编码可靠性未完成', 'Study 1/2 未运行，Study 3 仅 synthetic integration'], nextStep: '补拍只读 Observatory 产品视图，并完成分层人类编码 Gate。',
    tags: ['Pricing', 'Evidence', 'Data Product', 'Longitudinal'],
    images: [{ src: 'assets/projects/saas/genai-metering.webp', alt: '五个独立窗口中观察到的 GenAI 与 AI 计量数量', caption: '五个窗口是独立快照，柱高变化不等于同一 cohort 的采用轨迹。' }, { src: 'assets/projects/saas/first-observed.webp', alt: '首次观察到 AI 计量的分布图', caption: '首次观察是证据时间，不是厂商正式发布或用户采用时间。' }],
  },
  {
    slug: 'super-agent', index: '05', title: '双用户 Super Agent', shortTitle: 'Super Agent', category: '多租户 Agent · 权限与恢复', tier: 'selected', score: 83,
    status: '离线 Provider', statusDetail: '0.4.0 local Mock Staging candidate；真实模型、渠道、邮箱/日历和腾讯云未接通。',
    problem: '长任务在崩溃与重试中可能重复发消息、串租户数据或越过审批；模型不应同时掌握身份、权限和不可逆写操作。',
    role: '多租户产品边界、任务 / 审批 / 恢复架构、可靠消息设计、离线评测与 AI 协作开发验收。',
    contribution: '当前只证明本地 Mock 与可靠消息边界，不把接口、容器镜像或未接通 Provider 写成生产部署。',
    claim: '模型可以聪明，权限必须无聊。', proof: '共享不可变镜像、独立数据面；所有外部写都经过审批、Outbox、幂等和租约。',
    metrics: [{ label: '本地检查', value: '114 pass', note: '另有 1 项可选 OCR 跳过' }, { label: 'Eval / 恢复', value: '5 / 5 · 7 / 7', note: '离线任务与加密恢复' }],
    whyAI: '模型负责理解请求、规划研究或生成草稿。', notAI: '身份、租户、签名、防重放、权限、审批、Outbox、幂等、租约、死信、审计与恢复。',
    workflow: ['Tenant Gateway', '持久任务', 'Orchestrator', 'Model Router', 'Tool Broker', '人工审批', 'Outbox', 'Provider', '审计 / 恢复'],
    architecture: { model: 'Model Router 选择受限 Provider；当前真实 Provider 未验收。', agent: 'Orchestrator 连接持久任务、模型和 Tool Broker。', code: 'Gateway、审批、Outbox、幂等、租约、死信与审计链。', human: '外部动作批准前不能发送；真实平台回调未验收。', state: '租约 + heartbeat + fencing；失租 Worker 禁止提交。' },
    decisions: [
      { constraint: '共享数据库会放大串租户故障域。', choice: '共享不可变镜像、每租户独立数据面。', alternative: '单实例共享数据库。', reason: '隔离网络、Volume、Secret、日志和恢复。', cost: '资源与运维成本更高。' },
      { constraint: 'Worker 在发送前后崩溃会重复动作。', choice: '持久 Outbox + 幂等键 + 发送租约 + fencing。', alternative: 'Worker 直接调用 Provider。', reason: '重试和恢复可检查、可去重。', cost: '状态机更复杂，增加一步延迟。' },
    ],
    badcase: { input: 'Worker 在外部发送前后崩溃并被另一 Worker 重试。', failure: '直接调用会产生重复消息或旧 Worker 提交。', cause: '任务与副作用没有共同持久状态。', change: '加入 Outbox、幂等键、租约、heartbeat 和 fencing。', result: '本地恢复验证通过；真实渠道仍 disabled。' },
    limitations: ['无完整管理 UI', '外部能力均为 Mock / disabled', '腾讯云、真实渠道、OAuth 与生产备份未验收'], nextStep: '补充招聘版架构与本地审批 / 恢复交互；真实部署需要另行权限。',
    tags: ['Multi-tenant', 'Approval', 'Outbox', 'Recovery'],
  },
  {
    slug: 'quant-alpha', index: '06', title: 'Quant Alpha Research Framework', shortTitle: 'Quant Alpha', category: 'AI 研究 · 确定性引擎', tier: 'selected', score: 80,
    status: '公开重建', statusDetail: '只使用 deterministic synthetic data 与 textbook families；非平台分数、非实盘收益。',
    problem: 'AI 可以快速生成大量研究候选；没有合法性检查、去重、风险门和 lineage 时，回测会把泄漏和偶然性包装成发现。',
    role: '研究流程定义、Agent / 确定性引擎分工、候选合同、风险门与可复现输出设计。',
    contribution: '公开版本只证明研究工程和失败保留，不暗示 WorldQuant signal、平台分数、真实 alpha 或可投资结果。',
    claim: '让 Agent 负责发散，让引擎负责数学真相。', proof: '54 个候选经过合法性、去重、风险和相关性约束，最终只留下 3 个；每个淘汰理由可复现。',
    metrics: [{ label: '候选漏斗', value: '54→51→50→13→6→3', note: 'deterministic synthetic demo' }],
    whyAI: 'AI 适合提出假设、解释失败和扩展候选家族。', notAI: 'schema、去重、回测、风险门、相关性过滤、family cap 与 hash lineage。',
    workflow: ['候选生成', '合法性', '去重', '风险门', '相关性过滤', 'family cap', 'lineage'],
    architecture: { model: 'AI 可生成与解释候选，公共 demo 不依赖远程模型。', agent: '只有提议权，没有最终数学判断权。', code: '验证、去重、回测、风险、去相关、选择与 lineage。', human: '人定义阈值、家族和使用边界。', state: 'config/data/results hash 固定一次运行。' },
    decisions: [
      { constraint: '开放候选含非法参数与重复公式。', choice: '先过 schema / static checks 与精确去重。', alternative: '直接对全部候选回测。', reason: '不让不可运行或重复假设消耗预算。', cost: '降低自由度，需要维护合同。' },
      { constraint: '按 Sharpe 取 top-k 会选出同质、高风险候选。', choice: '先风险门，再收益相关性与 family cap。', alternative: '按单一分数排序。', reason: '组合更可解释，也保留失败。', cost: '可能舍弃局部高分候选。' },
    ],
    badcase: { input: '54 个候选混有非法、重复、高风险和高度相关项。', failure: '只展示赢家会隐藏研究失败和筛选偏差。', cause: '发散与数学判断没有职责分离。', change: '加入合同、去重、风险门、去相关和 family cap。', result: '最终留下 3 个，阶段计数与理由可复现。' },
    limitations: ['无终端用户 UI', '所有公开结果均为 synthetic'], nextStep: '真实研究必须另做数据授权、PIT 和独立验证，不迁移合成收益指标。',
    tags: ['Agent', 'Quant', 'Deterministic', 'Lineage'], github: 'https://github.com/Eric-Cqc/quant-alpha-research-framework',
    images: [{ src: 'assets/projects/quant/funnel.webp', alt: '合成数据研究候选从 54 到 3 的筛选漏斗', caption: '失败不是被删除，而是成为可解释、可复现的研究漏斗。' }],
  },
  {
    slug: 'credit-default', index: '07', title: 'Credit Default Cost-Sensitive Model Selection', shortTitle: 'Cost-Sensitive Credit', category: '业务机器学习 · 成本函数', tier: 'selected', score: 69,
    status: '可运行原型', statusDetail: '课程 Lending Club 子集；示意成本矩阵，非校准损失模型。',
    problem: '最高 AUC 不等于最低业务损失；模型和阈值需要在验证集上按误放 / 误拒成本共同选择，并阻断贷后字段泄漏。',
    role: '问题重构、泄漏修复、成本函数 / 阈值协议、可复现模型比较与结果表达。',
    contribution: '不声明真实节省、生产信用决策、公平性或部署；原始课程 CSV 不公开。',
    claim: '模型分数，只有进入成本函数后才成为产品决定。', proof: '所有选择只使用 validation；test 留到最后一次评估。',
    metrics: [{ label: '样本 / 特征', value: '1,402 / 30', note: '可映射标签与编码特征' }, { label: '验证选择', value: 'Cost 160 @ 0.37', note: 'Logistic；5:1 示意成本' }, { label: '独立测试', value: 'AUC .676 · PR .523', note: 'test 未参与选择' }],
    whyAI: '监督学习组合多个贷前字段形成风险分数。', notAI: '字段白名单、贷后阻断、train-only preprocessing、切分、成本矩阵、validation-only 选择和 test 冻结。',
    workflow: ['标签映射', '贷前 allowlist', '60/20/20 切分', '训练 pipeline', 'validation 成本阈值', '模型选择', '独立 test'],
    architecture: { model: 'Logistic、Tree、Random Forest 与 XGBoost 生成风险分数。', agent: '非 Agent 产品；作为模型评测与业务决策案例。', code: '标签、allowlist、feature pipeline、切分、threshold grid、成本与选择。', human: '真实成本、政策和公平性需要业务 / 风险审批。', state: '固定配置生成 metrics；test 不参与选择。' },
    decisions: [
      { constraint: '漏放违约和误拒好客户成本不同。', choice: '用示意 5×FN + 1×FP 在 validation 选择模型与阈值。', alternative: '按最高 AUC 或 F1 选赢家。', reason: '把模型指标转成业务决策函数。', cost: '结论依赖成本假设。' },
      { constraint: '全样本处理与贷后字段会让表现虚高。', choice: 'fail-closed 贷前 allowlist + training-only pipeline。', alternative: '分割前完成特征处理。', reason: '关闭可识别泄漏。', cost: '缺少 issue_d，仍无法测时间泛化。' },
    ],
    badcase: { input: '原课程流程包含贷后 payment / recovery 字段和分割前处理。', failure: '模型使用了决策时不可得信息。', cause: '特征边界和 fit scope 未协议化。', change: '贷前 allowlist，所有学习型处理进入 estimator pipeline。', result: '只报告新协议结果，并明确与历史成绩不可比。' },
    limitations: ['小型课程子集', '无时间切分', '分数未校准', '未做 fairness / reject inference / 部署'], nextStep: '真实使用前替换成本矩阵并增加时间切分、校准、公平性和政策审查。',
    tags: ['ML', 'Business Cost', 'Threshold', 'Leakage'], github: 'https://github.com/Eric-Cqc/credit-default-cost-sensitive',
    images: [{ src: 'assets/projects/credit/cost-curve.webp', alt: 'Logistic regression 在不同阈值下的验证成本曲线', caption: '选择点 0.37 来自 validation 的示意成本，而不是 test 上的最高分。' }],
  },
  {
    slug: 'courier-action', index: '08', title: 'Courier Action Classification', shortTitle: 'Courier Classification', category: '评测协议 · 泄漏修复', tier: 'selected', score: 67,
    status: '公开重建', statusDetail: '授权课程数据仅保留 aggregate result；无生产派单效用声明。',
    problem: '随机切分重复骑手、全样本预处理、train/test 拼接和 OOF 阈值搜索会制造过于乐观的分数。',
    role: '旧流程泄漏诊断、评测协议重建、特征 / 隐私边界与聚合结果发布。',
    contribution: '不发布源 CSV、行级预测、ID、坐标、旧 notebook 或排行榜。',
    claim: '先修复评测问题，再谈模型分数。', proof: '按骑手隔离 5 folds，所有预处理只在 fold 内拟合，阈值预先固定。',
    metrics: [{ label: '评测范围', value: '160k · 306 · 5', note: '行数、骑手组、folds' }, { label: 'LightGBM', value: 'AUC .9077 · F1 .8148', note: 'aggregate-only' }],
    whyAI: '监督分类综合时间、负载、天气、距离和紧急程度识别任务类型。', notAI: '骑手分组、fold-local preprocessing、固定阈值、特征排除和 aggregate-only 输出。',
    workflow: ['授权 CSV', 'whole-group 抽样', 'courier-disjoint folds', 'fold-local pipeline', '模型比较', 'aggregate metrics'],
    architecture: { model: 'Logistic 与 LightGBM。', agent: '非 Agent 产品；作为评测可信度案例。', code: 'schema、特征排除、grouped folds、fold-local pipeline 与固定阈值。', human: '生产使用需另做安全、隐私和运营定义。', state: 'seed 与协议固定；不写行级预测。' },
    decisions: [
      { constraint: '同一骑手跨 train / validation 会让模型记忆实体。', choice: '按 courier_id 做 StratifiedGroupKFold。', alternative: '随机行切分。', reason: '评估对未见骑手组的泛化。', cost: '分数可能下降，whole-group 也不是全数据估计。' },
      { constraint: '在报告用 OOF 上调阈值会自我优化。', choice: '阈值预先固定 0.5。', alternative: '在同一 OOF 搜最高 F1。', reason: '选择与报告分开。', cost: '未必得到最高 F1。' },
    ],
    badcase: { input: '旧 notebook 同时使用随机切分、全样本处理和 OOF 阈值搜索。', failure: '指标混入实体记忆与选择偏差。', cause: '实体、fit scope 与阈值选择未分开。', change: 'group-disjoint、fold-local、固定阈值与聚合发布。', result: '新协议生成 160k 行、306 组、5-fold 的聚合结果。' },
    limitations: ['数据来源与再分发许可未独立确认', 'whole-group 子样本而非全数据', '无产品 UI 或生产验证'], nextStep: '重绘模型对比与泄漏修复流程；真实运营需重做标签和时间 / 实体泛化。',
    tags: ['ML', 'Evaluation', 'Leakage', 'Privacy'], github: 'https://github.com/Eric-Cqc/courier-action-classification',
  },
  {
    slug: 'campus-food-sim', index: '09', title: 'Campus Food Pickup Simulation', shortTitle: 'Campus Food Simulation', category: '离散事件仿真 · 不用 AI 的判断', tier: 'selected', score: 63,
    status: '可运行原型', statusDetail: '假设驱动的 hypothetical simulation；不是校园现场测量。',
    problem: '没有现场运营数据时，团队仍需透明比较取餐服务与转运方案，而不是凭直觉把一个指标上的优势写成全面最优。',
    role: '问题建模、场景 / 指标定义、离散事件仿真重构、配对实验与决策表达。',
    contribution: '只使用公开合成仓库与聚合结果；不使用可能含队友、学号和课程信息的原 PPT。',
    claim: 'AI 品味，也包括知道什么时候不该用 AI。', proof: '机制明确、数据有限时，用 50 次配对仿真暴露方案在等待与总周转之间的取舍。',
    metrics: [{ label: '复制次数', value: '50', note: 'common random numbers' }, { label: 'Scenario 2 等待', value: '.072 → .033 min', note: '差 -0.038；95% CI [-.043,-.034]' }, { label: 'Scenario 3 周转', value: '-0.672 min', note: '等待差的 CI 跨 0' }],
    whyAI: '本项目刻意不使用 AI：机制和不确定性可以明确表达时，离散事件仿真更合适。', notAI: '到达、备餐、转运、顾客到达、资源、关门删失和统计比较全部由 SimPy 与确定性协议实现。',
    workflow: ['透明假设', 'Baseline / S2 / S3', '50 次配对复制', '完成 / 删失', '等待 / 周转 / 新鲜度', '95% CI', '多指标选择'],
    architecture: { model: '无生成式或机器学习模型。', agent: '无 Agent；作为“何时不用 AI”的案例。', code: 'SimPy 事件、资源、删失、seeds、统计与 artifacts。', human: '先定义业务目标，再选服务时间或转运改进。', state: '相同 replication index 共享随机数；输出 summary 和 paired differences。' },
    decisions: [
      { constraint: '独立随机样本会给场景差异增加额外噪声。', choice: 'common random numbers 配对实验。', alternative: '三组独立样本比较。', reason: '共享外生随机过程，差异更稳定。', cost: '结果仍依赖假设。' },
      { constraint: 'S2 改善等待，S3 更改善总周转。', choice: '不宣布全面赢家，按业务目标呈现多指标取舍。', alternative: '只用等待选方案。', reason: '不同杠杆作用在不同环节。', cost: '结论不如单一排名简洁。' },
    ],
    badcase: { input: '旧到达生成让旧时段的一次指数等待跨过高峰边界。', failure: '分段到达率在边界处不成立。', cause: '分段流和资源忙碌区间未独立建模。', change: '每时段独立启动到达流，从实际 busy intervals 算利用率，关门显式删失。', result: '50 次配对实验输出等待、周转、删失与 95% CI。' },
    limitations: ['没有现场校准', '不含弃单、人员波动、真实路网与有限存储', '关门策略删失晚间订单'], nextStep: '重绘等待、周转和新鲜度权衡；真实决策前采集到达、服务与弃单数据校准。',
    tags: ['Simulation', 'Operations', 'Decision', 'No-AI'], github: 'https://github.com/Eric-Cqc/campus-food-pickup-simulation',
  },
];

export const flagships = projects.filter((project) => project.tier === 'flagship');
export const selected = projects.filter((project) => project.tier === 'selected');

export const capabilityMap = [
  { index: '01', title: '端到端闭环', primary: 'AI Video', detail: '从输入、生成、人工选择与修订，到可核验的 12 文件交付。' },
  { index: '02', title: '架构判断', primary: 'HealthAI', detail: '让模型提议，让确定性内核和人掌握事实、状态与正式写入。' },
  { index: '03', title: 'AI 品味', primary: 'MathMentor', detail: '不给答案、独立验证、何时不用生成式 AI，都变成产品规则。' },
  { index: '04', title: '前沿敏感', primary: '三类 Agent', detail: '长周期证据、Human Gate、版本化交付与 Provider activation 分层。' },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
