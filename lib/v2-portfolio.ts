export type WorkTier =
  | 'case-study'
  | 'selected-build'
  | 'product-study'
  | 'project-note';

export type WorkMetric = {
  value: string;
  label: string;
  detail: string;
};

export type WorkDecision = {
  title: string;
  rationale: string;
  tradeoff: string;
};

export type WorkImage = {
  src: string;
  alt: string;
  caption: string;
  position?: 'top' | 'center' | 'bottom';
};

export type WorkProject = {
  index: string;
  slug: string;
  title: string;
  shortTitle: string;
  year: string;
  tier: WorkTier;
  category: string;
  audience: string;
  status: string;
  statement: string;
  problem: string;
  oldFlow: string;
  outcome: string;
  role: string;
  contribution: string;
  aiRole: string;
  systemRole: string;
  workflow: string[];
  metrics: WorkMetric[];
  decisions: WorkDecision[];
  evaluation: {
    method: string;
    result: string;
    badcase: string;
    change: string;
  };
  boundary: string;
  images: WorkImage[];
  visual?: 'super-agent' | 'quant' | 'hermes' | 'credit' | 'courier' | 'campus';
  github?: string;
  demo?: string;
  attribution?: string;
};

export const projectsV2: WorkProject[] = [
  {
    index: '01',
    slug: 'ai-video-preproduction',
    title: 'AI Video Preproduction Agent',
    shortTitle: 'AI 视频前期制作',
    year: '2026',
    tier: 'case-study',
    category: '创作工作流 · Agent',
    audience: '小型创作团队 / 项目负责人',
    status: '本地可运行原型',
    statement: '把自然语言需求简报变成可比较、可审核、可追溯的前期制作交付包。',
    problem:
      '从模糊意图到需求简报、创意方向、脚本、分镜、拍摄计划与交付包，需要连续传递大量约束。一键生成会把早期误解一路放大，也容易覆盖已经批准的事实。',
    oldFlow:
      '创作人分别在文档、聊天和表格里来回复制信息；版本变化缺少来源链，进入拍摄前才发现时长、语气、镜头或受众约束已经漂移。',
    outcome:
      '建立需求简报 → 3 个创意方向 → 脚本 → 分镜 → 拍摄计划 → 审核 → 交付的人工决策工作流。候选、接受、选择与批准是不同状态；最终导出 12 文件交付包。',
    role: '产品定义、用户路径、人工决策闭环、版本与状态架构、评测设计与交互验收。',
    contribution:
      '定义七阶段流程与人类决策点；把候选内容与已接受事实拆开；设计不可变后继版本、审批绑定和交付清单；以全新中文任务走通浏览器全流程。',
    aiRole:
      '解析自然语言需求简报，生成多种创意、脚本、分镜与拍摄计划候选；开放创意不直接成为已批准事实。',
    systemRole:
      '结构约束、版本谱系、状态迁移、批准、文件命名、内容摘要与压缩包由确定性系统持有；交付只读取精确批准版本。',
    workflow: [
      '自然语言需求',
      '结构化确认',
      '3 个创意方向',
      '脚本与分镜',
      '拍摄计划',
      '人工批准',
      '12 文件交付',
    ],
    metrics: [
      {
        value: '3',
        label: '并列候选方向',
        detail: '先比较创意方向，再决定哪条进入后续制作。',
      },
      {
        value: '7',
        label: '连续产品阶段',
        detail: '从输入、选择到批准与交付，状态一路可见。',
      },
      {
        value: '12',
        label: '交付文件',
        detail: '固定命名、清单与内容摘要组成第二版交付包。',
      },
    ],
    decisions: [
      {
        title: '候选不会自动变成事实',
        rationale:
          '模型输出即使结构合法，也可能误解受众、语气或约束；需求简报接受、创意方向选择与制作批准分别由人确认。',
        tradeoff: '增加了操作步骤，但把创意选择与来源事实权留给了用户。',
      },
      {
        title: '修改生成后继版本，不覆盖历史',
        rationale:
          '脚本变化会影响分镜、拍摄计划与交付；每次修改创建不可变后继版本，并保留前序版本与输入摘要。',
        tradeoff: '数据模型和界面更重，但审批、回放与冲突处理有了清楚依据。',
      },
      {
        title: '先验证产品流程，再接付费模型',
        rationale:
          '确定性模型服务用于验证真实请求、数据库、存储、审核与压缩包导出路径；外部模型作为独立内容质量门槛。',
        tradeoff: '先把状态和交付路径做实，内容质量需要下一阶段单独验证。',
      },
    ],
    evaluation: {
      method:
        '用全新中文需求简报验证约束提取、候选比较、拒绝/接受、修订、重新批准、刷新恢复与交付；另用独立语气构造检查来源追踪。',
      result:
        '完整路径覆盖桌面、平板与手机视口；交付包包含 12 个固定成员。31 种独立语气构造在修复后均符合预期。',
      badcase:
        '用户输入“不要活泼风格”时，旧提取器仍把“活泼”写入语气字段；字段结构合法，但语义被反转。',
      change:
        '加入局部否定范围、反转短语、转折重置与角色感知追踪规则；否定不再被词表命中覆盖。',
    },
    boundary:
      '已完成本地前期制作全流程；下一步接入付费模型验证内容质量，产品范围仍止于拍摄前交付，不生成最终视频。',
    images: [
      {
        src: 'assets/projects/ai-video/01-brief-candidate.webp',
        alt: '自然语言输入被整理为结构化需求简报候选',
        caption:
          '01 · 自然语言约束先成为候选需求简报；用户接受后才进入后续链路。',
      },
      {
        src: 'assets/projects/ai-video/02-concepts-compare.webp',
        alt: '三个创意方向并列比较界面',
        caption:
          '02 · 三个方向并列比较，创意选择留给人，而不是让模型替用户决定。',
      },
      {
        src: 'assets/projects/ai-video/05-shot-plan-review.webp',
        alt: '镜头计划与人工审核界面',
        caption: '03 · 镜头、时长与执行提示进入审核；批准绑定精确版本。',
      },
      {
        src: 'assets/projects/ai-video/06-delivery-exported.webp',
        alt: '最终交付包导出界面',
        caption: '04 · 只有已批准的内容版本可以生成带文件清单的交付包。',
        position: 'bottom',
      },
    ],
    github: 'https://github.com/Eric-Cqc/ai-video-preproduction-agent',
    demo: 'assets/demo.mp4',
  },
  {
    index: '02',
    slug: 'healthai-radar',
    title: 'HealthAI Radar',
    shortTitle: 'HealthAI Radar',
    year: '2026',
    tier: 'case-study',
    category: '战略情报 · 证据原生',
    audience: '战略分析与竞争情报团队',
    status: '离线可运行演示版',
    statement: '让跨网页、PDF 与扫描件的每个结论，都能回到字段级证据。',
    problem:
      '跨公司、产品和语言重复搜索、摘录与核验成本高。普通 AI 摘要无法证明字段来自哪里，还会把抓取或 OCR 失败误写成“无更新”。',
    oldFlow:
      '分析员在浏览器、PDF、表格和周报之间手工搬运内容；复核者需要重新打开源文件，缺失与失败经常被压成一个空单元格。',
    outcome:
      '将 15 家公司 × 产品变化、商业化、战略动向三条追踪线，连同字段证据、人工审核与趋势指标做成一体化情报产品。候选事件只有在证据与审核通过后才进入已确认结果。',
    role: '产品定义、字段与状态规则、Agent 与规则引擎分工、证据体验、评测设计与交互验收。',
    contribution:
      '固定覆盖范围与失败语义；设计证据抽屉和审核动作；把模型候选、规则引擎与已确认事件分开；用多模态文档问题反推解析器和“未知”状态。',
    aiRole:
      '从 HTML、PDF、OCR 文本中抽取候选事件与字段；在固定覆盖之外，用受限探索补充未知信号。',
    systemRole:
      '覆盖矩阵、证据定位、字段规则、未知/失败状态、指标计算与确认结果由规则引擎控制；人工决定是否接受候选。',
    workflow: [
      '45 项固定扫描',
      '多模态解析',
      '候选事件',
      '字段级证据',
      '人工审核',
      '已确认事件',
      '趋势下钻',
    ],
    metrics: [
      {
        value: '15 × 3',
        label: '固定覆盖矩阵',
        detail: '产品变化、商业化与战略动向三条追踪线，共 45 项任务。',
      },
      {
        value: '30 / 30',
        label: '多模态文档测试',
        detail: '覆盖网页、PDF、OCR 与跨行标题，并逐条核对证据。',
      },
      {
        value: '3',
        label: '趋势指标',
        detail: '消息密度、密度加速度、产品演进速率，均只读取已确认事件。',
      },
    ],
    decisions: [
      {
        title: '覆盖由代码固定，Agent 只探索未知信号',
        rationale:
          '如果让 Agent 自己决定扫描范围，“没找到”可能只是它没有去找；固定矩阵先保证可比较覆盖。',
        tradeoff: '降低了开放探索自由度，但让缺失、失败和真实无更新可以区分。',
      },
      {
        title: '证据以字段为单位，不只附一个来源链接',
        rationale:
          '同一事件的日期、产品、阶段与结论可能来自不同位置；复核需要看到每个字段对应的原文和位置。',
        tradeoff: '数据模型与审核界面更复杂，但复核者不必重新阅读整份文档。',
      },
      {
        title: '模型只能提交候选事件',
        rationale:
          '抓取失败、OCR 误差与上下文缺失不能被自然语言流畅度掩盖；规则引擎检查字段和证据，人工决定是否进入确认结果。',
        tradeoff: '吞吐更低，但错误不会直接污染趋势与历史结论。',
      },
    ],
    evaluation: {
      method:
        '以 HTML、PDF、OCR 和跨行标题构成固定文档测试；分开检查字段抽取、证据定位、未知状态处理与结果确认条件。',
      result:
        '多模态文档测试达到 30/30；证据抽屉可以从结论下钻到具体来源位置。',
      badcase:
        'OCR 文本本身正确，但 JSON 顶层数组与跨行标题不符合旧解析规则，导致证据被丢弃。',
      change:
        '加入数组解析、跨行定位与“置信度未知”状态；“没有解析到”不再被系统写成“没有变化”。',
    },
    boundary:
      '已完成离线审核与证据下钻；下一步需要在真实影子运行中验证覆盖稳定性，再决定是否进入业务结果。',
    images: [
      {
        src: 'assets/projects/healthai/strategy-overview.webp',
        alt: 'HealthAI Radar 的公司与战略追踪总览',
        caption:
          '01 · 总览按公司与追踪线显示覆盖和事件状态；趋势只读取已提交事实。',
      },
      {
        src: 'assets/projects/healthai/evidence-drawer.webp',
        alt: '候选事件的字段级证据抽屉',
        caption: '02 · 复核者从结论直接下钻到字段原文、来源与状态。',
      },
      {
        src: 'assets/projects/healthai/readiness.webp',
        alt: '系统边界与准备状态界面',
        caption: '03 · 失败、未知与可提交状态在同一工作面中可见。',
        position: 'center',
      },
    ],
  },
  {
    index: '03',
    slug: 'mathmentor',
    title: 'MathMentor 奥数私教 Agent',
    shortTitle: 'MathMentor',
    year: '2026',
    tier: 'case-study',
    category: '智能教育 · 教学 Agent',
    audience: '小学高年级奥数学习者（家长查看学习摘要）',
    status: '本地可运行原型',
    statement: '不给答案的奥数私教：提示逐级开放，生成与判断彼此隔离。',
    problem:
      '通用聊天模型很容易把“帮助”变成直接给答案或越级提示，也会把同题换数后的再次做对误算成独立掌握。',
    oldFlow:
      '学生卡住时，要么等待老师，要么向聊天模型索要完整解法；后者短期顺畅，却无法知道学生真正掌握了哪一步。家长看到的通常只是次数和时长，也难判断是否能迁移到新题。',
    outcome:
      '在 DeepTutor v1.5.11 基础上扩展 32 个主题、320 道原创启用题、L0–L5 提示阶梯、索答安全门、隔离核验器、掌握与复习状态，形成不泄题的学习闭环。',
    role: '产品定义、教学 Agent 架构、提示与安全交互、评测设计、学生端与管理端验收。',
    contribution:
      '定义提示解锁与题族掌握规则；把引导器、核验器与确定性判题拆开；建立索答语义策略、待确认恢复和固定教学测试；完成学生主路径与管理员核查。',
    aiRole:
      '引导器每次只生成一个苏格拉底式追问；复杂开放作答进入低温结构化核验器，低置信度可以返回待确认状态。',
    systemRole:
      '题目、答案、L0–L5、提示门槛、额度、题族掌握、复习计划与幂等由确定性代码持有；答案不会进入发给学生端的数据。',
    workflow: [
      '选择主题',
      '独立尝试',
      '索答识别',
      '逐级提示',
      '提交作答',
      '隔离核验',
      '掌握与复习',
    ],
    metrics: [
      {
        value: '32',
        label: '数学主题',
        detail: '代数、几何、数论、组合各 8 个主题。',
      },
      {
        value: '320',
        label: '原创启用题',
        detail: '每个主题 10 道，题目与提示由产品规则管理。',
      },
      {
        value: 'L0–L5',
        label: '提示阶梯',
        detail: '帮助逐步升级，答案不会由模型自由释放。',
      },
    ],
    decisions: [
      {
        title: '引导器只问一个问题',
        rationale:
          '连续解释和多步推导很容易泄露完整解法；单个追问迫使产品根据学生当前状态选择下一步。',
        tradeoff: '对话不如通用助手“丰富”，但学习动作更聚焦、可判断。',
      },
      {
        title: '生成与判题使用不同职责',
        rationale:
          '语言流畅不等于数学正确；简单题走确定性判题，复杂题才进入隔离核验器。',
        tradeoff: '需要额外规则和待确认状态，但避免引导器自己证明自己正确。',
      },
      {
        title: '掌握基于题族，不基于一次正确',
        rationale:
          '同题换数字的再次做对可能只是短期记忆；掌握证据需要跨题型迁移并进入复习计划。',
        tradeoff: '升级更慢，但状态更接近真实学习，而不是即时激励分数。',
      },
    ],
    evaluation: {
      method:
        '固定测试覆盖索答拒绝、提示越级、答案泄漏、待确认状态、题族迁移、额度与幂等；另走一条学生端真实交互路径。',
      result:
        '30/30 教学测试与 20/20 确定性验证通过；这些数字只说明功能按规则运行，不代表学习效果。',
      badcase:
        '“我想直接知道答案”等语义变体没有被旧字面策略识别，存在绕过索答安全门的可能。',
      change:
        '扩展索答意图策略与回归集；低置信度不释放答案，而是回到可恢复提示路径。',
    },
    boundary:
      '基于 DeepTutor v1.5.11 扩展；下一步需要真实学生连续使用，验证提示节奏与跨题迁移是否改善学习。',
    images: [
      {
        src: 'assets/projects/mathmentor/problem.webp',
        alt: 'MathMentor 的题目与学生尝试界面',
        caption: '01 · 题目、答案和未来提示彼此隔离；学生先完成自己的尝试。',
      },
      {
        src: 'assets/projects/mathmentor/safety-gate.webp',
        alt: '直接索答被安全门拦截的界面',
        caption: '02 · 直接索答停在 L0，系统给观察方向而不是完整解法。',
      },
      {
        src: 'assets/projects/mathmentor/verifier.webp',
        alt: '作答核验与复习状态界面',
        caption: '03 · 提交后由独立路径核验，并把结果写入掌握与复习状态。',
        position: 'center',
      },
    ],
    attribution: '开源基础：DeepTutor v1.5.11。',
  },
  {
    index: '04',
    slug: 'ai-saas-pricing',
    title: 'AI SaaS Pricing Observatory',
    shortTitle: 'AI SaaS 定价观察台',
    year: '2026',
    tier: 'case-study',
    category: '商业研究 · 数据产品',
    audience: 'AI SaaS 战略、定价与投资研究者',
    status: '本地只读观察台',
    statement: '用五个时间窗口观察 40 个软件产品的 AI 定价架构变化。',
    problem:
      '套餐、额度、超额与按使用动作计量会随时间改变语义。一次性表格既看不见变化路径，也容易把旧页面、缺失页面和首次观察误写成正式采用时间。',
    oldFlow:
      '研究者依赖当前定价页或零散网页存档做横截面对比；当证据过期、跨产品或缺失时，结论仍可能被填成一个确定的“有/无”。',
    outcome:
      '建立 40 产品 × 5 时间窗口的纵向证据账本、A–G 定价状态和只读观察台。有效窗口中，25 个产品观察到生成式 AI，13 个观察到 AI 计量；但只有 2 个能看到较早的“有 AI、未计量”状态，因此不把首次观察误写成正式采用日期。',
    role: '研究产品定义、纵向测量方法、证据状态设计、观察台交互与发布验收。',
    contribution:
      '固定 40×5 产品窗口；定义时间新鲜度、可用性与状态规则；把证据账本、产品档案与公开观察台做成一条交付链；在事件条件不足时只发布描述性结论。',
    aiRole:
      '辅助大规模页面审阅、语义标签与异常定位；机器输出不能绕过证据、复核与时间窗口规则。',
    systemRole:
      '产品框架、目标窗口、新鲜度、缺失状态、A–G 编码、派生统计与公开层由确定性流程管理。',
    workflow: [
      '固定产品样本',
      '定位历史窗口',
      '保存证据状态',
      '语义复核',
      '生成派生结果',
      '观察台下钻',
    ],
    metrics: [
      {
        value: '40 × 5',
        label: '产品—时间窗口',
        detail: '从 2022 年 9 月至 2026 年 6 月，共 200 个观察单元。',
      },
      {
        value: '141 / 200',
        label: '主要可用窗口',
        detail: '内容、产品范围与 90 天新鲜度同时满足要求。',
      },
      {
        value: '25 / 13',
        label: '观察到 AI / 计量',
        detail: '至少一个有效窗口观察到生成式 AI / AI 专属计量。',
      },
    ],
    decisions: [
      {
        title: '证据不足保持“未确认”，不被填成“没有”',
        rationale:
          '没有可用快照可能来自抓取失败、页面过期或范围错误；把它写成“没有”会制造虚假趋势。',
        tradeoff: '可用样本减少，但时间比较的语义更可信。',
      },
      {
        title: '首次观察不等于正式上线',
        rationale:
          '历史窗口只能证明“最早在本证据集中看见”，不能证明厂商真实发布或用户采用日期。',
        tradeoff: '结论更保守，却避免给描述性研究套上事件研究语言。',
      },
      {
        title: '产品界面只读，研究输入单独固定',
        rationale: '观察台用于探索和复核，不应在浏览过程中悄悄改写标准化账本。',
        tradeoff: '更正需要回到审阅流程，但产品交互不会污染研究事实。',
      },
    ],
    evaluation: {
      method:
        '校验 40×5 覆盖、窗口新鲜度、已复核账本、派生数据与观察台接口；人工抽查产品档案的状态和支持文本。',
      result:
        '200 个产品窗口中 141 个满足主新鲜度层标准；只读界面可按产品、信号和窗口下钻证据。',
      badcase:
        '同一旧页面被多个时间窗口重复使用时，横截面看似完整，却会制造不存在的变化稳定性。',
      change:
        '记录相对目标时间的滞后、页面复用与新鲜度；超出 90 天的页面退出主要描述性分母，但仍保留为可见证据状态。',
    },
    boundary:
      '当前交付回答“观察到什么”，不回答因果效应或正式采用日期；下一步需要更密集的历史快照与人工复核。',
    images: [
      {
        src: 'assets/projects/saas/observatory-home.png',
        alt: 'Pricing Architecture Observatory 的首页与描述性指标',
        caption: '01 · 产品先说明研究命题与边界，再展示 40×5 的描述性范围。',
      },
      {
        src: 'assets/projects/saas/observatory-products.png',
        alt: '按产品和窗口下钻的证据档案',
        caption:
          '02 · 选择产品与窗口后，同屏查看证据新鲜度、状态编码与支持文本。',
        position: 'center',
      },
      {
        src: 'assets/projects/saas/first-observed.webp',
        alt: 'AI 定价计量首次观察的描述性结果图',
        caption: '03 · 图表只表达“首次观察到”，明确不等同于正式上线日期。',
      },
    ],
  },
  {
    index: '05',
    slug: 'super-agent',
    title: '双用户 Super Agent',
    shortTitle: 'Super Agent',
    year: '2026',
    tier: 'selected-build',
    category: '多租户 Agent · 控制面',
    audience: '需要研究、邮件、日程与长期任务的个人助理用户',
    status: '本地流程原型',
    statement:
      '让个人助理起草邮件、创建日程和执行长期任务，但把身份、审批与外部发送留在控制面。',
    problem:
      '长任务在崩溃与重试中可能串租户、重复发消息或越过审批；“Agent 能执行”并不等于“系统应该自动执行”。',
    oldFlow:
      '单进程助手把会话、工具和邮件/日程写操作混在一起；重试缺少幂等，用户难以知道动作是否真正发生，也难证明两名用户的数据没有串线。',
    outcome:
      '用两个独立用户作为最小隔离样本，将身份、任务状态、一次性审批、幂等与可靠发件箱拆成控制面。Agent 只产生计划和工具建议，邮件发送与日程创建需要明确授权，并可从持久状态恢复。',
    role: '多租户产品边界、任务与审批架构、可靠消息、恢复路径与离线任务验收。',
    contribution:
      '定义双租户隔离与任务状态；把建议、批准、投递和回执分开；建立幂等键、可靠发件箱与加密备份恢复。',
    aiRole: '理解目标、拆解任务、建议工具参数，并在受限上下文中继续执行。',
    systemRole:
      '身份、密钥、租户数据、审批、外部写入、幂等、可靠发件箱与恢复由确定性控制面持有。',
    workflow: [
      '租户进入',
      '任务拆解',
      '工具建议',
      '审批',
      '可靠发件箱',
      '外部回执',
      '恢复',
    ],
    metrics: [
      {
        value: '2',
        label: '隔离用户',
        detail: '用于证明身份、数据、密钥与任务状态不会跨用户流动。',
      },
      {
        value: '5 / 5',
        label: '离线任务测试',
        detail: '覆盖研究、文档、个人助理、记忆与工具安全路径。',
      },
      {
        value: '7 / 7',
        label: '备份恢复路径',
        detail: '验证持久状态可以重新加载。',
      },
    ],
    decisions: [
      {
        title: '模型不直接触发外部写操作',
        rationale:
          '消息发送、状态变更和身份相关动作具有不可逆后果；建议与执行必须经过审批控制面。',
        tradeoff: '自动化速度降低，但错误不会直接越过用户边界。',
      },
      {
        title: '重试依赖幂等与可靠发件箱，不依赖“模型记得”',
        rationale:
          '进程恢复后上下文可能变化；外部动作是否发生必须由持久回执判断。',
        tradeoff: '增加了状态机和消息基础设施，但消除重复投递与猜测。',
      },
    ],
    evaluation: {
      method:
        '离线任务集检查租户隔离、审批与失败恢复；加密备份在独立路径重载。',
      result:
        '核心离线任务 5/5、备份恢复 7/7；邮件与日程动作会先进入一次性审批，不会由模型直接发送。',
      badcase: '任务在外部写入后崩溃，重试可能再次发送相同动作。',
      change: '将写操作放入带幂等键的可靠发件箱，并以外部回执更新最终状态。',
    },
    boundary:
      '已验证双用户隔离、审批与恢复；下一步接入真实渠道并补管理界面。两个用户只是最小验证样本，不是产品容量上限。',
    images: [],
    visual: 'super-agent',
  },
  {
    index: '06',
    slug: 'quant-alpha',
    title: 'Quant Alpha Research Framework',
    shortTitle: 'Quant Alpha',
    year: '2026',
    tier: 'selected-build',
    category: 'AI 辅助研究 · 确定性引擎',
    audience: '量化研究者 / 研究流程负责人',
    status: '可复现合成数据演示',
    statement: '让 AI 负责发散，让确定性引擎负责证明哪些候选不能进入研究。',
    problem:
      'AI 可以快速生成大量研究候选；没有合法性、去重、泄漏门、风险门与来源链时，回测会把偶然性包装成发现。',
    oldFlow:
      '研究候选被直接写成代码并回测，失败理由不可追溯；重复因子和同族暴露让结果看起来比真实更丰富。',
    outcome:
      '建立候选数据规范与淘汰漏斗：54 个候选经过合法性、重复、时间可得性、风险、相关性与同族上限，最终保留 3 个；每个淘汰结果都带机器可读原因。',
    role: '研究流程定义、Agent/确定性引擎分工、候选数据规范、风险门与可复现输出。',
    contribution:
      '定义候选数据契约与拒绝原因；实现逐层漏斗和来源链；把合成数据演示与真实投资结果彻底分开。',
    aiRole: '提出研究假设、候选因子与解释，帮助拓宽搜索空间。',
    systemRole:
      '时点可得性、泄漏、合法性、去重、风险、相关性与同族上限由确定性引擎执行。',
    workflow: [
      '生成候选',
      '合法性',
      '去重',
      '时点可得性 / 泄漏',
      '风险门',
      '相关性',
      '同族上限',
    ],
    metrics: [
      {
        value: '54',
        label: '初始候选',
        detail: '由合成数据提供，用于验证研究流程。',
      },
      { value: '3', label: '最终保留', detail: '每个淘汰步骤都保留明确原因。' },
    ],
    decisions: [
      {
        title: 'AI 不能决定候选是否“有效”',
        rationale: '语言解释会掩盖时间泄漏和数学重复；生成与验证必须分开。',
        tradeoff: '通过率显著下降，但留下的结果可以复现和解释。',
      },
      {
        title: '每个拒绝都有机器可读原因',
        rationale: '只有最终排行榜无法帮助研究者改进下一轮假设。',
        tradeoff: '需要维护更多规则与记录，但失败能够形成下一轮研究反馈。',
      },
    ],
    evaluation: {
      method:
        '固定合成数据输入，重复运行完整漏斗并核对每层候选数、拒绝原因与输出一致性。',
      result: '漏斗稳定复现 54→51→50→13→6→3；公开仓库保留示例结果。',
      badcase:
        '一个“缺少字段”的候选声明了不存在的输入字段；系统在回测前直接拒绝，并记录字段未声明的原因。',
      change:
        '在相关性与排序前加入时点可得性与泄漏检查；失败候选不会进入后续结果。',
    },
    boundary:
      '当前结果来自合成数据，用来验证研究流程；下一步替换为有授权的时点数据后再讨论信号表现。',
    images: [
      {
        src: 'assets/projects/quant/funnel.webp',
        alt: '候选因子从 54 个逐层筛选到 3 个的漏斗图',
        caption: '每一层都回答“为什么不能继续”，而不是只展示最终排名。',
      },
    ],
    visual: 'quant',
    github: 'https://github.com/Eric-Cqc/quant-alpha-research-framework',
  },
  {
    index: '07',
    slug: 'hermes-agent-study',
    title: 'Hermes Agent 开源产品拆解',
    shortTitle: 'Hermes 拆解',
    year: '2026',
    tier: 'product-study',
    category: '前沿拆解 · 个人 Agent 平台',
    audience: '长期使用个人 Agent 的知识工作者',
    status: '产品拆解与实验方案',
    statement:
      '当 Agent 拥有记忆、技能与跨渠道执行能力，核心产品问题变成如何让自治可见、可控、可恢复。',
    problem:
      '个人 Agent 从单轮聊天走向长期身份后，错误记忆、技能漂移、跨渠道权限和无人值守执行会形成新的信任断点。',
    oldFlow:
      '传统助手被设备与单会话绑定；复杂任务无法长期继续。把所有能力简单聚合后，用户又很难知道 Agent 学到了什么、将做什么、哪里还在运行。',
    outcome:
      '基于 Nous Research Hermes Agent 的公开文档与源码结构，完成五层能力地图、一条跨会话关键旅程、三个信任断点和一个中文场景实验设计。',
    role: '开源产品研究、能力地图、关键用户旅程、权限原则与实验设计。',
    contribution:
      '将入口、连续性、计划、能力与信任拆成五层；提出记忆分级、技能变更对比、定时任务失败即关闭与跨渠道单一所有者四项产品判断。',
    aiRole:
      '上游产品中的 Agent 负责工具调用、记忆与技能学习、定时任务与委派；本案例不把这些能力写成个人实现。',
    systemRole:
      '本研究关注身份配对、审批、隔离、停止与恢复如何成为长期 Agent 可观察、可操作的产品框架。',
    workflow: [
      '建立最小权限',
      '跨渠道委派',
      '引用记忆继续',
      '风险动作审批',
      '建议保存技能',
      '停止与恢复',
    ],
    metrics: [
      {
        value: '5',
        label: '我归纳的产品层级',
        detail: '入口、连续性、计划、能力、信任。',
      },
      {
        value: '3',
        label: '信任断点',
        detail: '记忆写入、技能漂移、无人值守执行。',
      },
      {
        value: '1',
        label: '关键旅程',
        detail: '从建立到跨渠道恢复的连续体验。',
      },
    ],
    decisions: [
      {
        title: '记忆必须区分事实、推断与临时状态',
        rationale:
          '长期记忆提高连续性，也可能把一次错误推断固化成身份事实；用户需要逐条纠正、过期和禁用。',
        tradeoff: '增加记忆管理负担，但避免“它说记得”成为不可解释的黑箱。',
      },
      {
        title: '技能自我改进需要变更对比与回滚',
        rationale:
          '行为在使用中变化会产生权限与结果漂移；高权限技能的新版本不应静默启用。',
        tradeoff: '学习闭环变慢，但用户能够理解变化来源并撤回。',
      },
      {
        title: '无人值守风险动作默认失败即关闭',
        rationale:
          '定时任务场景没有用户实时回答；审批缺失时应保存失败和恢复点，而不是扩大自动权限。',
        tradeoff: '部分任务无法全自动完成，但错误不会在用户离线时扩散。',
      },
    ],
    evaluation: {
      method:
        '先核对上游说明、架构、安全文档、包元数据与许可证，再设计“跨渠道研究与日程整理”任务：检索和草稿可自动，外发消息、改日程与覆盖文件必须批准。',
      result:
        '形成五层能力地图、六步用户旅程与三个信任断点；实验通过标准是用户能在 60 秒内说清 Agent 已做、将做和等待决定的事项。',
      badcase:
        '如果把“自动创建技能”直接等同于“自动启用”，一次错误经验可能长期改变高权限行为。',
      change:
        '实验将决定是否优先增加记忆来源视图、批量审批和跨渠道唯一任务所有者；当前这些仍是设计判断，不是已验证结果。',
    },
    boundary:
      'Hermes Agent 由 Nous Research 开源；本页只展示我的产品拆解与实验方案，我未参与上游开发。',
    images: [],
    visual: 'hermes',
    attribution: '上游项目：Nous Research 的 Hermes Agent · MIT 许可证。',
    github: 'https://github.com/NousResearch/Hermes-Agent',
  },
  {
    index: '08',
    slug: 'credit-default',
    title: '信用违约成本敏感选择',
    shortTitle: '信用违约成本选择',
    year: '2026',
    tier: 'project-note',
    category: '业务机器学习 · 成本决策',
    audience: '信用风险建模与业务决策团队',
    status: '可复现模型实验',
    statement: '最高 AUC 不等于最低业务损失；模型与阈值必须共同选择。',
    problem:
      '只按 AUC 排名会忽略误放与误拒成本，也容易在特征中保留贷后字段，制造不可用的预测能力。',
    oldFlow:
      '模型比较、阈值选择和最终测试混在一起；业务成本直到结果出来后才被解释。',
    outcome:
      '清理贷后泄漏字段，以 5:1 情景假设表示“漏掉违约约为错拒好客户的五倍成本”，在验证集共同选择逻辑回归与 0.37 阈值，再将测试集留给最终一次评估。',
    role: '问题重构、泄漏修复、成本函数与阈值协议、可复现比较。',
    contribution:
      '定义仅用验证集的选择方法，绘制成本曲线，并把算法指标与示意业务成本并列解释。',
    aiRole: '不使用生成式 AI 做最终模型判断。',
    systemRole: '特征过滤、划分、训练、阈值搜索与测试评估均由确定性流程完成。',
    workflow: [
      '过滤泄漏',
      '训练比较',
      '验证成本曲线',
      '锁定模型与阈值',
      '独立测试',
    ],
    metrics: [
      {
        value: '0.37',
        label: '选择阈值',
        detail: '只在验证集按示意成本选择。',
      },
      {
        value: '0.676',
        label: '测试集 ROC-AUC',
        detail: '测试集不参与模型或阈值选择。',
      },
      {
        value: '5 : 1',
        label: '情景成本比',
        detail: '漏掉违约与错拒好客户的示意成本，不是生产参数。',
      },
    ],
    decisions: [
      {
        title: '模型与阈值按同一个成本目标选择',
        rationale:
          '默认 0.5 阈值无法表达误放与误拒的不对称；5:1 只是可替换的情景假设，不是银行真实损失参数。',
        tradeoff: '依赖成本假设；因此结果必须标注为示意而非真实财务结论。',
      },
    ],
    evaluation: {
      method: '仅用验证集完成选择，测试集只做一次最终评估。',
      result: '选择逻辑回归 / 0.37；独立测试 ROC-AUC 0.6760、PR-AUC 0.5225。',
      badcase: '贷后状态字段会直接泄露违约结果。',
      change: '在训练前移除泄漏字段，并把可用时点纳入特征规则。',
    },
    boundary:
      '当前是课程数据上的情景分析；真实授信前需替换成本参数，并补概率校准、公平性与时间外验证。',
    images: [
      {
        src: 'assets/projects/credit/cost-curve.webp',
        alt: '不同阈值下的验证成本曲线',
        caption: '用验证成本选择阈值，而不是在测试集上反复调参。',
      },
    ],
    visual: 'credit',
    github: 'https://github.com/Eric-Cqc/credit-default-cost-sensitive',
  },
  {
    index: '09',
    slug: 'courier-action',
    title: '骑手动作分类',
    shortTitle: '骑手动作分类',
    year: '2026',
    tier: 'project-note',
    category: '业务机器学习 · 泄漏修复',
    audience: '分类模型评审者与数据科学团队',
    status: '可复现分类实验',
    statement:
      '对“取货 / 送达”动作分类，先证明模型能泛化到未见骑手，再讨论分数。',
    problem:
      '课程任务要求根据时间、负载、距离、天气与紧急度等上下文，分类记录对应“取货”还是“送达”。若随机按行切分，同一骑手会同时出现在训练和验证中，模型可能只是在记住人。',
    oldFlow:
      '全样本预处理、训练/测试拼接与非分组交叉验证让分数偏高，也无法回答模型是否能泛化到未见骑手。',
    outcome:
      '改为骑手组隔离、折内预处理、固定阈值的五折评测；把它定位为模型评审项目，不声称用于真实派单或骑手管理。',
    role: '旧流程泄漏诊断、评测方法重建、特征规则与聚合结果表达。',
    contribution:
      '识别组间泄漏与预处理泄漏；重建整组抽样和折内预处理流程，并只发布不含个人标识的聚合结果。',
    aiRole: '不使用生成式 AI 做核心分类。',
    systemRole: '数据切分、预处理、训练和聚合报告由确定性流程完成。',
    workflow: [
      '骑手分组',
      '组间切分',
      '折内预处理',
      '模型训练',
      '固定阈值',
      '聚合结果',
    ],
    metrics: [
      { value: '16 万', label: '评测行数', detail: '来自 306 个骑手组。' },
      {
        value: '0.9077',
        label: 'LightGBM AUC',
        detail: '组间隔离五折聚合结果。',
      },
      {
        value: '306',
        label: '隔离骑手组',
        detail: '同一骑手不会跨训练折与验证折。',
      },
    ],
    decisions: [
      {
        title: '评测单位从“行”改成“骑手”',
        rationale: '真实泛化对象是未见骑手，不是同一骑手的新一行记录。',
        tradeoff: '分数更保守，但与真实部署问题一致。',
      },
    ],
    evaluation: {
      method: '306 个骑手组的组间隔离五折评测，预处理仅在训练折拟合。',
      result: 'LightGBM AUC 0.9077、F1 0.8148；只发布聚合结果。',
      badcase: '随机切分让同一骑手跨越训练集与测试集，制造虚高表现。',
      change: '以骑手组为切分单位，并阻断全样本预处理。',
    },
    boundary:
      '当前是课程分类任务的评测重建；结果只说明对未见骑手组的离线泛化，不用于真实派单决策。',
    images: [],
    visual: 'courier',
    github: 'https://github.com/Eric-Cqc/courier-action-classification',
  },
  {
    index: '10',
    slug: 'campus-food-sim',
    title: '校园取餐仿真',
    shortTitle: '校园取餐仿真',
    year: '2026',
    tier: 'project-note',
    category: '运营决策 · 离散事件仿真',
    audience: '校园餐饮与运营团队',
    status: '情景仿真',
    statement: '没有现场数据时，用透明假设比较方案，而不是凭直觉宣布赢家。',
    problem:
      '不同取餐方案可能分别改善等待、服务或总周转；只看一个指标会把局部优势写成全面最优。',
    oldFlow:
      '团队在没有真实运营日志时依赖直觉争论，无法量化不确定性，也无法知道方案对哪个环节有效。',
    outcome:
      '用 50 次共同随机数配对仿真比较三种场景：加快简单订单取餐把假设模型中的平均排队时间约从 4.3 秒降到 2.0 秒；缩短转运则把平均总周转从 14.87 分钟降到 14.20 分钟。',
    role: '问题建模、场景与指标定义、离散事件仿真、配对实验和决策表达。',
    contribution:
      '重构可复现仿真，定义共同随机数配对比较，并把不同指标上的取舍写成运营建议。',
    aiRole: '不为“用 AI”而加入生成模型。',
    systemRole: '到达、服务、转运、随机种子与聚合结果由离散事件引擎控制。',
    workflow: [
      '定义基线',
      '设置场景',
      '固定随机数',
      '50 次复制',
      '配对比较',
      '解释取舍',
    ],
    metrics: [
      {
        value: '50',
        label: '配对复制',
        detail: '固定随机种子的共同随机数实验。',
      },
      {
        value: '14.87 → 14.20',
        label: '分钟总周转',
        detail: '场景 3 缩短转运时间后的假设仿真结果。',
      },
      {
        value: '4.3 → 2.0',
        label: '秒取餐排队',
        detail: '场景 2 加快简单订单取餐后的平均等待。',
      },
    ],
    decisions: [
      {
        title: '同一随机到达序列比较不同方案',
        rationale: '配对设计减少场景间随机噪声，让差异更接近策略本身。',
        tradeoff: '结论仍依赖输入假设，不能替代现场校准。',
      },
    ],
    evaluation: {
      method: '50 次共同随机数配对实验，报告差异与 95% 置信区间。',
      result:
        '场景 2 的平均取餐排队约由 4.3 秒降至 2.0 秒；场景 3 的平均总周转由 14.87 分钟降至 14.20 分钟。',
      badcase: '只看等待时间会忽略转运与总周转的变化。',
      change: '将等待与总周转并列，并避免把单指标最优写成整体最优。',
    },
    boundary:
      '当前结论只在公开假设下成立；下一步需要现场到达率、服务时长与放弃率数据校准。',
    images: [],
    visual: 'campus',
    github: 'https://github.com/Eric-Cqc/campus-food-pickup-simulation',
  },
];

export const caseStudies = projectsV2.filter(
  (project) => project.tier === 'case-study',
);
export const selectedBuilds = projectsV2.filter(
  (project) =>
    project.tier === 'selected-build' || project.tier === 'product-study',
);
export const projectNotes = projectsV2.filter(
  (project) => project.tier === 'project-note',
);

export function getProjectV2(slug: string) {
  return projectsV2.find((project) => project.slug === slug);
}

export function tierLabel(tier: WorkTier) {
  if (tier === 'case-study') return '完整案例';
  if (tier === 'selected-build') return '短案例';
  if (tier === 'product-study') return '开源产品拆解';
  return '项目笔记';
}
