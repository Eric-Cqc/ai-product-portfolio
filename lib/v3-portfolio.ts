export type EvidenceLevelV3 =
  | '真实交互'
  | '固定评测集'
  | '本地运行结果'
  | '当前设计边界';

export type FactV3 = {
  value: string;
  label: string;
  meaning: string;
  evidenceLevel: EvidenceLevelV3;
};

export type HumanGateV3 = {
  owner: string;
  decision: string;
  onApprove: string;
  onReject: string;
};

export type JourneyStepV3 = {
  step: string;
  title: string;
  actor: string;
  action: string;
  systemResponse: string;
  humanGate?: HumanGateV3;
};

export type MechanismV3 = {
  index: string;
  title: string;
  question: string;
  constraint: string;
  choice: string;
  rejectedAlternative: string;
  cost: string;
  validation: string;
  evidenceImageSrc: string;
  readHint: string;
};

export type SystemOwnerV3 = '模型' | '确定性规则' | '人工' | '持久化状态';

export type SystemDivisionV3 = {
  owner: SystemOwnerV3;
  responsibility: string;
  excluded: string;
};

export type DecisionV3 = {
  title: string;
  question: string;
  choice: string;
  rejected: string;
  reason: string;
  tradeoff: string;
};

export type EvaluationTypeV3 =
  | '任务结果'
  | '过程轨迹'
  | '边界安全'
  | '体验质量';

export type EvaluationV3 = {
  type: EvaluationTypeV3;
  risk: string;
  method: string;
  grader: string;
  result: string;
  scope: string;
};

export type BadcaseV3 = {
  title: string;
  scenario: string;
  error: string;
  risk: string;
  change: string;
  retest: string;
};

export type ProjectImageV3 = {
  src: string;
  alt: string;
  caption: string;
  readHint: string;
  width: number;
  height: number;
  position?: 'top' | 'center' | 'bottom';
};

export type FlagshipProjectV3 = {
  index: string;
  slug: string;
  title: string;
  shortTitle: string;
  year: string;
  category: string;
  audience: string;
  summary: {
    from: string;
    to: string;
    promise: string;
  };
  status: {
    label: string;
    detail: string;
    evidenceLevel: EvidenceLevelV3;
  };
  role: {
    title: string;
    scope: string[];
    collaboration: string;
  };
  facts: FactV3[];
  oldWorkflow: {
    description: string;
    breakpoints: string[];
  };
  productPromise: {
    headline: string;
    keepsHumanControl: string;
    successDefinition: string;
  };
  journeyIntro: string;
  journey: JourneyStepV3[];
  mechanisms: MechanismV3[];
  systemDivision: SystemDivisionV3[];
  decisions: DecisionV3[];
  evaluations: EvaluationV3[];
  badcase: BadcaseV3;
  result: {
    headline: string;
    evidence: string[];
    meaning: string;
  };
  boundary: string[];
  nextSteps: string[];
  images: ProjectImageV3[];
  attribution?: string;
  github?: string;
  demo?: string;
};

export const projectsV3: FlagshipProjectV3[] = [
  {
    index: '01',
    slug: 'ai-video-preproduction',
    title: 'AI Video Preproduction Agent',
    shortTitle: '视频前期制作',
    year: '2026',
    category: '创作流程智能体 · 人工决策闭环',
    audience: '品牌与内容团队中的策划、制片和创意负责人',
    summary: {
      from: '散落在聊天、文档和表格里的创意讨论',
      to: '经过选择、版本化、审核并可核验导出的前期制作包',
      promise:
        '系统把模糊需求逐步收敛为制作资产，但创意方向与最终交付始终由人决定。',
    },
    status: {
      label: '本地流程原型已验证',
      detail:
        '本地网页与接口已走通需求、审核和导出；生成内容由确定性离线模型服务提供。付费模型、媒体渲染和团队协作尚未验证。',
      evidenceLevel: '真实交互',
    },
    role: {
      title: '产品定义、流程与边界设计、智能体架构、评测设计与交互验收',
      scope: [
        '把模糊创作任务拆成七类业务阶段与对应确认点',
        '定义候选、选择、版本、审核与交付之间的状态关系',
        '设计模型、规则和人工的权限边界',
        '用全新中文任务验收真实网页闭环与失败路径',
      ],
      collaboration:
        '我负责需求拆解、状态契约、评测和界面验收；实现由人工智能协作完成。',
    },
    facts: [
      {
        value: '3',
        label: '并列创意方向',
        meaning: '先形成可比较选择，再允许一个方向进入脚本阶段。',
        evidenceLevel: '真实交互',
      },
      {
        value: '7',
        label: '业务阶段',
        meaning:
          '需求、概念、脚本、分镜、镜头计划、审核和交付七类业务阶段；旅程中的人工确认单独列出。',
        evidenceLevel: '本地运行结果',
      },
      {
        value: '12',
        label: '交付包文件',
        meaning: '固定命名、清单、内容摘要和制作资产组成可复核交付包。',
        evidenceLevel: '本地运行结果',
      },
    ],
    oldWorkflow: {
      description:
        '创作团队在聊天记录中确认方向，在共享文档中改脚本，再用表格拼镜头计划。信息看似齐全，真正进入制作时却很难回答“哪个版本被批准、这次修改影响了什么、现在交付的是哪一组资产”。',
      breakpoints: [
        '早期需求误解会被脚本、分镜和镜头计划逐层放大。',
        '覆盖式修改抹掉选择理由，返工时无法安全回退。',
        '概念很多却没有明确选择，团队持续生成而不做决定。',
        '交付依赖人工拼接，容易混用新旧脚本、分镜和镜头计划。',
      ],
    },
    productPromise: {
      headline: '每次创意决定都形成可继续制作、可追溯的结果。',
      keepsHumanControl:
        '需求简报是否成立、三个方向选哪一个、完整制作包能否交付，均由对应负责人确认。',
      successDefinition:
        '团队可以从一句需求走到一组精确批准的制作资产；刷新、修改或重试后，版本关系和交付内容仍然一致。',
    },
    journeyIntro:
      '开放生成在阶段内完成；需求确认、方向选择和整包批准由对应负责人决定，未确认时后续动作保持关闭。',
    journey: [
      {
        step: '01',
        title: '建立项目与输入需求',
        actor: '策划',
        action: '用自然语言输入受众、目标、时长、语气、禁用项与交付要求。',
        systemResponse:
          '保存原始输入并生成结构化需求简报候选，不覆盖输入来源。',
      },
      {
        step: '02',
        title: '确认需求简报',
        actor: '项目负责人',
        action: '逐项检查模型是否正确理解目标和约束。',
        systemResponse:
          '候选保持未接受状态，只有确认后的版本才能进入概念阶段。',
        humanGate: {
          owner: '项目负责人',
          decision: '接受、拒绝或修改这份需求简报。',
          onApprove: '锁定需求版本并开放创意方向生成。',
          onReject: '保留原始输入和拒绝原因，回到需求修订。',
        },
      },
      {
        step: '03',
        title: '生成三个可比较方向',
        actor: '模型服务',
        action: '在同一份已接受需求上生成三个结构一致、表达不同的创意方向。',
        systemResponse:
          '并列呈现核心主张、叙事方式和执行提示，不自动排序成唯一答案。',
      },
      {
        step: '04',
        title: '选择创意方向',
        actor: '创意负责人',
        action: '比较三个方向，明确选中一个，并保留未选方向。',
        systemResponse: '把选择绑定到需求版本；只有选中方向可以生成后续资产。',
        humanGate: {
          owner: '创意负责人',
          decision: '哪一个方向值得投入后续制作。',
          onApprove: '创建选中状态并开放脚本生成。',
          onReject: '不生成脚本，返回需求或重新生成三个方向。',
        },
      },
      {
        step: '05',
        title: '形成脚本版本',
        actor: '模型服务与策划',
        action: '模型生成结构化脚本；策划针对语气、节奏和约束提出修改。',
        systemResponse: '每次修改创建后继版本，旧版本继续可查。',
      },
      {
        step: '06',
        title: '展开分镜',
        actor: '模型服务',
        action: '把脚本段落展开为镜头意图、画面与叙事关系。',
        systemResponse: '分镜绑定精确脚本版本，脚本变化不会静默改写既有分镜。',
      },
      {
        step: '07',
        title: '形成镜头计划',
        actor: '制片',
        action: '查看镜头、时长、执行说明和前后依赖，补充可执行性意见。',
        systemResponse:
          '保存镜头计划版本，并将需要返修的位置带回对应上游资产。',
      },
      {
        step: '08',
        title: '整包审核',
        actor: '创意负责人和制片',
        action: '在同一页面核对脚本、分镜和镜头计划是否构成一致方案。',
        systemResponse:
          '审核记录绑定精确资产组合，不接受“当前页面看起来没问题”的模糊批准。',
        humanGate: {
          owner: '创意负责人和制片',
          decision: '批准整包，或指明需要返修的资产。',
          onApprove: '冻结批准组合并开放交付导出。',
          onReject: '创建修订任务；已有批准不会自动继承到新版本。',
        },
      },
      {
        step: '09',
        title: '导出并核验交付包',
        actor: '交付负责人',
        action: '下载压缩包并查看文件清单、资产编号与内容摘要。',
        systemResponse: '只导出已批准组合；相同组合可复算并核对内容。',
      },
    ],
    mechanisms: [
      {
        index: '01',
        title: '用三个创意岔路迫使团队做选择',
        question: '怎样保留生成模型的发散能力，又不让团队陷入无限生成？',
        constraint:
          '创意质量具有主观性，系统不能用一个自动分数替代负责人判断；候选过多又会推迟决定。',
        choice:
          '每次固定生成三个结构一致的方向，并要求负责人明确选中一个，未选方向保留但不能进入脚本。',
        rejectedAlternative:
          '放弃“继续聊、继续生成直到满意”的开放式对话，因为它没有稳定的比较面，也留不下明确选择。',
        cost: '三个方向不保证覆盖全部可能性，负责人也多了一次操作；换来的是可复盘的方向选择和更稳定的下游输入。',
        validation:
          '用全新中文需求走通候选生成、三项并列比较、选择和刷新恢复；未选择时脚本阶段保持关闭。',
        evidenceImageSrc:
          'assets/projects-v3/ai-video/02-concept-selection.png',
        readHint: '先看三列方案的共同结构，再看被选方向如何改变后续阶段状态。',
      },
      {
        index: '02',
        title: '返工创建后继版本，不覆盖历史',
        question: '脚本一改，如何避免分镜和镜头计划在不知情时失效？',
        constraint:
          '前期制作资产存在依赖；覆盖式编辑会让审核记录失去对象，也无法解释一次返工影响了哪些内容。',
        choice:
          '需求、脚本、分镜和镜头计划均采用不可变版本；修改产生后继版本，审阅绑定具体版本或资产组合。',
        rejectedAlternative:
          '放弃“永远只有一份当前文档”，因为当前值无法同时承担编辑、追溯、审核和交付四种职责。',
        cost: '数据模型、界面和状态提示更复杂；用户需要理解“新版本仍需重新审核”。',
        validation:
          '检查前序关系、修订后的审核失效、刷新恢复与重复请求；旧版本继续可见，新版本不会继承旧批准。',
        evidenceImageSrc:
          'assets/projects-v3/ai-video/03-planning-bundle-review.png',
        readHint: '注意镜头计划所绑定的脚本与分镜版本，以及返修后的审核状态。',
      },
      {
        index: '03',
        title: '交付只读取精确批准的资产组合',
        question: '怎样把“做完了”变成可以核验的交付条件？',
        constraint:
          '脚本、分镜和镜头计划可能处于不同版本；导出“当前最新”会把未审核修改混进交付。',
        choice:
          '交付清单锁定脚本、分镜和镜头计划的编号与内容摘要；只有整包审核通过后才允许生成压缩包。',
        rejectedAlternative:
          '放弃从页面当前状态一键导出，因为“最新”不等于“已批准”，界面状态也不是稳定的交付依据。',
        cost: '任何资产变化都需要重新批准，牺牲了一点速度；换来可复算、可追责且不混版的交付。',
        validation:
          '对导出成员、固定命名、清单、内容摘要和压缩包做一致性比对；未批准组合不能导出。',
        evidenceImageSrc:
          'assets/projects-v3/ai-video/04-approved-delivery.png',
        readHint: '从批准状态读到交付清单，再核对每项资产编号与摘要。',
      },
    ],
    systemDivision: [
      {
        owner: '模型',
        responsibility: '解析需求并生成简报、创意、脚本、分镜和镜头计划候选。',
        excluded:
          '不能替人选择创意、批准制作包、发布内容或直接访问外部供应商。',
      },
      {
        owner: '确定性规则',
        responsibility: '执行结构校验、状态迁移、幂等、租户范围和交付条件。',
        excluded: '不评价创意好坏，也不把结构合法误写为内容正确。',
      },
      {
        owner: '人工',
        responsibility:
          '确认需求、选择方向、判断可执行性并批准或打回完整制作包。',
        excluded: '不再手工拼接版本、猜测交付成员或重复整理文件名。',
      },
      {
        owner: '持久化状态',
        responsibility:
          '保存不可变版本、前序关系、审核对象、资产组合、清单与内容摘要。',
        excluded:
          '不依赖聊天上下文记住“上次选了什么”，也不以页面当前值充当事实。',
      },
    ],
    decisions: [
      {
        title: '模块化单体优先于微服务',
        question: '当前最难的是扩容，还是让版本、审核与交付保持一致？',
        choice:
          '采用模块化单体，把项目、版本、审核和交付置于清晰的一致性边界。',
        rejected: '没有为了“智能体架构”过早拆成多个微服务。',
        reason: '此阶段的核心风险是混版和状态漂移，不是单个服务的吞吐。',
        tradeoff:
          '未来独立扩缩某一生成模块需要再拆分，但现在更容易证明一次交付为何成立。',
      },
      {
        title: '结构化业务对象优先于聊天记录',
        question: '模型说过的话，能否直接成为制作团队的业务事实？',
        choice:
          '聊天和提示只作为生成输入；需求、脚本、分镜、镜头计划以结构化版本保存。',
        rejected: '没有把一条长对话当成唯一项目记录。',
        reason: '只有结构化对象才能被逐项审核、版本化、关联和导出。',
        tradeoff:
          '降低了对话的自由度，需要维护结构与迁移；换来稳定的协作对象。',
      },
      {
        title: '先验证闭环，再验证付费模型质量',
        question: '在模型质量尚不确定时，最先需要证明什么？',
        choice: '默认用确定性离线模型服务走通真实接口、状态、审核与交付。',
        rejected: '没有把付费模型接通等同于产品完成。',
        reason: '即使候选内容更漂亮，错误状态和混版交付仍会让产品不可用。',
        tradeoff:
          '当前不能用内容质量作为成果；真实供应商评测被明确放在下一阶段。',
      },
    ],
    evaluations: [
      {
        type: '任务结果',
        risk: '页面能生成内容，却无法完成从需求到交付的闭环。',
        method: '用一份全新中文需求，从项目建立走到整包批准与压缩包下载。',
        grader: '按七阶段状态、交付成员、资产编号与内容摘要逐项比对。',
        result: '本地真实网页与接口完成闭环，交付包包含 12 个固定成员。',
        scope: '证明产品路径与交付结构成立，不代表真实模型内容质量或客户采用。',
      },
      {
        type: '过程轨迹',
        risk: '重试、修订或刷新后出现重复版本、丢失选择或审核对象漂移。',
        method:
          '检查候选选择、前序版本、重复请求、冲突、刷新恢复和修订后重新批准。',
        grader: '确定性状态断言与版本关系比对。',
        result:
          '同请求可以回放，不同输入产生冲突；修订创建后继版本且不会继承旧批准。',
        scope: '当前在本地候选环境验证，尚未覆盖真实多人同时编辑。',
      },
      {
        type: '边界安全',
        risk: '模型或错误租户越过批准、混用资产，或浏览器直接持有供应商权限。',
        method: '验证未批准组合、跨租户读取、结构不合规输出和模型失败路径。',
        grader: '权限、结构与状态规则自动判定，失败时检查是否产生半成品。',
        result:
          '不合规输出不进入候选链；未批准组合不能导出；模型没有交付与发布权限。',
        scope: '未验证真实身份系统、云存储或外部供应商权限。',
      },
      {
        type: '体验质量',
        risk: '状态虽然正确，但用户不知道下一步、为什么被阻止或自己正在批准什么。',
        method:
          '以全新任务检查桌面、平板和手机视口中的关键动作、状态提示与错误恢复。',
        grader: '真实浏览器任务完成与界面可见性检查。',
        result: '需求确认、概念选择、返修、批准与下载均可从界面完成。',
        scope: '这是交互验收，不是创作团队可用性研究。',
      },
    ],
    badcase: {
      title: '结构合法，语义却被一句否定反转',
      scenario: '用户在需求中写“不要活泼风格”，其余字段均能正常解析。',
      error:
        '旧提取器命中“活泼”词条，仍把它写入语气字段；结果结构完整，却违背原始约束。',
      risk: '错误语气会进入三个概念并继续放大到脚本、分镜和交付，且容易因“格式正确”逃过检查。',
      change:
        '增加局部否定范围、反转短语、转折重置和角色感知追踪，并在需求确认页保留原文对照。',
      retest: '31 种独立语气构造回归通过；“不要活泼”不再被词表命中覆盖。',
    },
    result: {
      headline:
        '形成一条可选择、可返工、可批准的制作路径，并输出可核验的交付包。',
      evidence: [
        '七类业务阶段在同一项目状态中衔接，人工确认点单独记录。',
        '三个概念必须经人工选中，未选择时不能进入脚本。',
        '修订保留前序版本，批准绑定精确资产组合。',
        '交付包带固定文件清单和可比对内容摘要。',
      ],
      meaning:
        '本地验证覆盖前期制作流程和人机分工；尚未评测付费模型的创意质量，也不包含成片生成。',
    },
    boundary: [
      '当前默认使用确定性离线模型服务，真实付费模型质量尚未验证。',
      '不做图像或视频生成、媒体渲染、发布与投放。',
      '未验证真实客户项目、多人身份系统、云对象存储和生产协作权限。',
    ],
    nextSteps: [
      '邀请三组真实创作角色完成受控试用，记录审批前返工轮次和交付包可用性。',
      '在相同需求与评测表下比较真实模型服务，单独评估约束遵循、创意差异和成本。',
      '先观察版本误用率与返修定位时间，再决定是否增加多人协作和富文档输入。',
    ],
    images: [
      {
        src: 'assets/projects-v3/ai-video/01-brief-review.png',
        alt: '自然语言需求与结构化需求简报候选并列的界面',
        caption: '需求不会直接驱动后续生成；负责人先逐项确认模型理解。',
        readHint: '看原始约束如何映射为候选字段，以及接受和拒绝两个动作。',
        width: 1400,
        height: 1400,
      },
      {
        src: 'assets/projects-v3/ai-video/02-concept-selection.png',
        alt: '三个创意方向并列比较并标明选择状态的界面',
        caption:
          '三个候选并列呈现，负责人明确选中一项；离线内容不用于评价创意质量。',
        readHint: '看三列的统一结构和选中状态。',
        width: 1400,
        height: 1400,
      },
      {
        src: 'assets/projects-v3/ai-video/03-planning-bundle-review.png',
        alt: '脚本、分镜、镜头计划和整包审核状态的界面',
        caption: '脚本、分镜和镜头计划汇入同一审核工作面。',
        readHint: '看三类资产的就绪状态与批准、退回动作。',
        width: 1400,
        height: 1100,
      },
      {
        src: 'assets/projects-v3/ai-video/04-approved-delivery.png',
        alt: '已批准制作包与交付清单的界面',
        caption: '只有精确批准的资产组合可以生成带清单与摘要的交付包。',
        readHint: '从批准状态顺着资产编号读到交付清单。',
        width: 1050,
        height: 1540,
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
    category: '战略情报智能体 · 证据可追溯',
    audience: '医疗人工智能战略与竞争情报分析员',
    summary: {
      from: '跨网页、PDF 和扫描件的重复搜索与资讯搬运',
      to: '每条趋势都能回到证据、审核状态和缺口原因的情报工作台',
      promise:
        '系统可以发现和整理线索，但任何无法回到字段证据的结论都不会悄悄进入正式趋势。',
    },
    status: {
      label: '本地研究工作台已验证',
      detail:
        '本地语料上的研究、审核与下钻路径已有真实界面证据；付费模型研究评测、连续影子运行、生产调度与正式写入仍保持关闭。',
      evidenceLevel: '真实交互',
    },
    role: {
      title: '产品定义、证据与状态规则、智能体边界、评测设计与交互验收',
      scope: [
        '把公司与战略轨道固定为可核对的覆盖矩阵',
        '定义弱信号、候选和已提交事件的状态门槛',
        '设计字段级证据、失败语义和趋势下钻体验',
        '把受限研究能力与正式写入权限彻底分开',
      ],
      collaboration:
        '我负责覆盖矩阵、证据状态、权限边界、评测和界面验收；实现由人工智能协作完成。',
    },
    facts: [
      {
        value: '15 × 3',
        label: '固定覆盖矩阵',
        meaning: '15 家公司按产品、商业化、战略三条轨道拆成 45 项任务。',
        evidenceLevel: '本地运行结果',
      },
      {
        value: '5',
        label: '明确运行结果',
        meaning:
          '更新、已核无更新、不完整、部分失败与失败不会被压成同一种空白。',
        evidenceLevel: '当前设计边界',
      },
      {
        value: '3',
        label: '可解释趋势指标',
        meaning: '消息密度、密度加速度、产品演进速率只读取已提交事件。',
        evidenceLevel: '本地运行结果',
      },
    ],
    oldWorkflow: {
      description:
        '分析员在搜索页、新闻稿、产品页、PDF、扫描文件和表格之间搬运信息。问题不只在耗时：同一事件会被转载多次，计划日期会被写成已发生日期，抓取失败会变成空单元格，而一张趋势图往往无法解释自己来自哪些事实。',
      breakpoints: [
        '“没有找到”可能只是没有扫描到，不能直接等于“没有更新”。',
        '一篇材料中的日期、产品、阶段与结论可能来自不同位置，单个链接不足以复核。',
        '同一官方事件被多家媒体转载，按网址计数会虚增趋势。',
        '模型摘要语言流畅，却可能把文字识别误差或合作意向写成确定事实。',
      ],
    },
    productPromise: {
      headline: '每个战略判断都保留证据、审核状态和缺口。',
      keepsHumanControl:
        '模型只能提出弱信号和候选；审核员看到字段证据后，才能批准、暂缓或忽略。正式战略解释仍由分析员完成。',
      successDefinition:
        '任何趋势数字都能下钻到已提交事件和原文位置；抓取失败、证据不足与真实无更新始终保持不同状态。',
    },
    journeyIntro:
      '日常覆盖由固定任务保证，开放式研究只用于补充未知。证据先进入候选，再经过规则和人工；分析员看到的趋势不是模型摘要的二次包装。',
    journey: [
      {
        step: '01',
        title: '选择研究范围',
        actor: '战略分析员',
        action: '选择公司、时间窗口和产品／商业化／战略轨道。',
        systemResponse:
          '把问题落到固定覆盖矩阵，显示本轮应完成的任务与既有缺口。',
      },
      {
        step: '02',
        title: '执行固定扫描',
        actor: '任务调度与规则',
        action:
          '按公司与轨道执行 45 项有边界任务，并保留完成、重试和失败状态。',
        systemResponse: '检查点允许中断恢复；模型不能决定“今天跳过哪家公司”。',
      },
      {
        step: '03',
        title: '发现弱信号',
        actor: '受限研究智能体',
        action: '在来源白名单、步数、搜索、抓取和时间预算内调查潜在线索。',
        systemResponse: '线索先保存为弱信号，不直接进入指标或正式表。',
      },
      {
        step: '04',
        title: '处理多模态文档',
        actor: '文档路由',
        action:
          '根据网页、原生 PDF 或扫描件选择正文、版面或扫描件文字识别（OCR）路径。',
        systemResponse:
          '保留来源主体、页码或文本块；文字识别结果只作为待核材料。',
      },
      {
        step: '05',
        title: '绑定字段级证据',
        actor: '模型与可信内核',
        action:
          '提出公司、事件、日期、阶段等候选字段，并为每个字段绑定原文锚点。',
        systemResponse: '缺少支持的字段保持未知或证据不足，不由模型补齐。',
      },
      {
        step: '06',
        title: '去重与规则校验',
        actor: '确定性规则',
        action: '校验来源角色、日期、事件状态、重复项、产品别名和证据完整性。',
        systemResponse: '生成清楚的通过、待补证或阻止原因。',
      },
      {
        step: '07',
        title: '审核候选事件',
        actor: '情报审核员',
        action: '在同一工作面阅读候选结论、逐字段原文、来源和缺口。',
        systemResponse: '提供批准、暂缓和忽略三种动作，并保存理由。',
        humanGate: {
          owner: '情报审核员',
          decision: '证据是否足以把候选升级为已提交事件。',
          onApprove: '事件进入已提交库，可用于趋势和简报。',
          onReject: '保持暂缓或忽略，不影响正式指标；证据缺口继续可见。',
        },
      },
      {
        step: '08',
        title: '计算趋势并下钻',
        actor: '确定性指标服务',
        action: '只读取已提交事件，按范围和时间窗计算三项内部工作指标。',
        systemResponse: '图表保留支持事件、筛选条件、分类法版本与缺口码。',
      },
      {
        step: '09',
        title: '形成战略解释',
        actor: '战略分析员',
        action: '从趋势打开事件和原文，结合业务语境形成判断或继续调查。',
        systemResponse: '保留引用链和未决问题，不自动把指标写成战略结论。',
        humanGate: {
          owner: '战略分析员',
          decision: '现有证据支持什么判断，哪些问题仍不能下结论。',
          onApprove: '将带引用的判断纳入人工简报。',
          onReject: '回到补证或保持未知，不用流畅摘要填补空白。',
        },
      },
    ],
    mechanisms: [
      {
        index: '01',
        title: '弱信号、候选和已提交事件分层',
        question: '怎样让模型扩大信息发现面，又不让它直接改写正式事实？',
        constraint:
          '开放网络中的来源质量、转载、日期和措辞差异很大；模型发现一条相关内容，不等于事件已经成立。',
        choice:
          '把“值得继续看”“已绑定字段证据”“通过规则和人工审核”设为三个不同状态，只有最后一层进入指标。',
        rejectedAlternative:
          '放弃模型提取后直接写入正式表，因为一次文字识别或语境错误会进入历史趋势并被反复引用。',
        cost: '审核吞吐更低，还需要维护候选队列；换来事实升级过程可见，错误不会静默污染趋势。',
        validation:
          '在本地工作台走通弱信号、候选、规则原因、批准／暂缓／忽略和已提交事件的状态迁移。',
        evidenceImageSrc:
          'assets/projects-v3/healthai/03-provenance-review-gate.png',
        readHint: '先区分信号状态，再看审核员能看到哪些原文和缺口。',
      },
      {
        index: '02',
        title: '让每一个趋势数字可以下钻',
        question: '一张战略趋势图怎样回答“为什么是这个数字”？',
        constraint:
          '聚合指标会隐藏来源差异；只有一个链接或自然语言说明，无法复核某个字段和时间窗。',
        choice:
          '指标快照保留范围、窗口、筛选指纹、分类法版本、支持事件和缺口码；图表点击后直达事件与原文锚点。',
        rejectedAlternative: '放弃黑箱“竞争力总分”和只附参考链接的摘要看板。',
        cost: '指标种类更少，证据数据模型更重；换来分析员可以追问并纠正。',
        validation:
          '从三项趋势中的数据点下钻到已提交事件，再打开来源、页码或文本位置。',
        evidenceImageSrc:
          'assets/projects-v3/healthai/02-evidence-drilldown.png',
        readHint: '顺着一个指标点，读取支持事件、字段证据与原文位置。',
      },
      {
        index: '03',
        title: '未知必须显示为未知',
        question: '系统没拿到结果时，如何避免一张安静但错误的“无更新”看板？',
        constraint:
          '抓取失败、部分轨道失败、发现线索但证据不足和真正无更新，都会在普通表格里变成空白。',
        choice:
          '区分更新、已核无更新、不完整、部分失败和失败；覆盖不足时指标返回空值和缺口码。',
        rejectedAlternative: '放弃用零、空单元格或自动补全文本掩盖失败。',
        cost: '界面出现更多待处理状态，数字也不总是完整；换来团队不会把数据缺口误读成业务趋势。',
        validation:
          '注入抓取、证据与轨道级失败，检查运行记录、审核队列和指标是否保留相应缺口。',
        evidenceImageSrc:
          'assets/projects-v3/healthai/04-evidence-library-gap.png',
        readHint: '看 45 项任务中的完成、重试和失败如何与“已核无更新”分开。',
      },
    ],
    systemDivision: [
      {
        owner: '模型',
        responsibility:
          '发现弱信号、解析材料、提出字段与候选结论，并解释需要继续调查的方向。',
        excluded:
          '不能审批事件、形成正式战略结论、执行任意代码或写入正式结果。',
      },
      {
        owner: '确定性规则',
        responsibility:
          '固定覆盖、选择文档路径、校验证据、去重、判断状态并计算可解释指标。',
        excluded: '不替代分析员判断业务意义，也不把抓取成功等同于事实成立。',
      },
      {
        owner: '人工',
        responsibility:
          '阅读逐字段证据，批准、暂缓或忽略候选，并形成最终战略解释。',
        excluded: '不再重复搜索和复制全部材料，也不必相信没有证据的流畅摘要。',
      },
      {
        owner: '持久化状态',
        responsibility:
          '保存任务范围、来源锚点、候选状态、审核理由、已提交事件、指标版本与缺口码。',
        excluded: '不把弱信号覆盖成正式事实，也不把失败状态压成空值。',
      },
    ],
    decisions: [
      {
        title: '固定 45 项扫描，不让模型自由决定覆盖',
        question: '怎样知道“没有更新”来自真实无变化，而不是智能体没有去找？',
        choice:
          '以 15 家公司和三条轨道形成固定日常矩阵，开放研究只补充未知信号。',
        rejected: '没有让模型每天自行决定扫描对象和停止条件。',
        reason: '固定范围让覆盖、失败、成本与时间窗口可以比较。',
        tradeoff: '牺牲一部分开放探索自由度，需要人工维护关注名单。',
      },
      {
        title: '声明级证据优先于只做语义检索',
        question: '找到相关材料后，怎样证明一个具体字段来自哪里？',
        choice:
          '为关键字段保存来源主体、原文片段、页码或文本块、日期和内容摘要。',
        rejected: '没有只返回一组相似文档和一段模型总结。',
        reason: '审核对象是事件中的具体主张，而不是文档是否“大致相关”。',
        tradeoff: '提取和审核成本更高，但纠错可以定位到字段。',
      },
      {
        title: '三个可解释指标优先于黑箱总分',
        question: '战略用户真正需要一个排名，还是需要知道变化发生在哪里？',
        choice:
          '只计算消息密度、密度加速度和产品演进速率，并允许下钻到支持事件。',
        rejected: '没有输出无法解释权重的“竞争力指数”。',
        reason: '内部工作指标用于组织注意力，不应伪装为企业价值或未来胜负。',
        tradeoff: '不能用一个数字快速排序所有公司，但每个变化都能被追问。',
      },
    ],
    evaluations: [
      {
        type: '任务结果',
        risk: '系统能显示看板，却不能从材料形成可审核事件并回到证据。',
        method:
          '用本地离线语料走通发现、文档处理、字段证据、审核、提交与趋势下钻。',
        grader: '按事件状态、字段锚点、支持来源和指标输入逐项比对。',
        result:
          '本地路径可将已存在事件提交并在趋势中下钻；不把它写成真实网络发现能力。',
        scope: '证明工作台闭环，未证明付费模型在开放网络上的召回与准确率。',
      },
      {
        type: '过程轨迹',
        risk: '智能体跳过公司、超出预算或绕过候选与审核直接形成结果。',
        method:
          '检查 45 项任务、检查点恢复、白名单、步数／来源／时间预算和事件状态迁移。',
        grader: '任务账本与状态规则比对。',
        result: '固定任务与受限研究保持分离；研究路径没有审批和正式写入权限。',
        scope: '生产调度和连续新鲜数据影子运行尚未完成。',
      },
      {
        type: '边界安全',
        risk: '抓取失败、文字识别误差或证据不足被写成确定事实或“无更新”。',
        method:
          '以 30 份中英文官方材料覆盖网页、原生 PDF、扫描 PDF、表格、图表和混合版式。',
        grader: '字段级支持检查、状态规则和缺口码判断。',
        result:
          '文档处理基准 30/30 通过；该结果只验证既定材料处理，不代表开放网络研究准确率。',
        scope:
          '这是文档处理基准，不等于开放网络研究准确率；12 案例人工标准已完成，但付费模型研究评测尚未执行。',
      },
      {
        type: '体验质量',
        risk: '分析员仍需重新打开整份文档，或无法理解一个候选为何被阻止。',
        method:
          '在真实浏览器中完成趋势查看、候选审核、证据抽屉和运行记录任务。',
        grader: '关键字段与原文同屏可见、审核动作和缺口原因可定位。',
        result: '本地演示路径支持从趋势到事件再到原文锚点的连续下钻。',
        scope: '尚未完成真实情报团队的任务时长与复核成本研究。',
      },
    ],
    badcase: {
      title: '文字提取正确，证据仍在结构解析中丢失',
      scenario:
        '扫描 PDF 经文字识别得到正确文字，但返回顶层数组，标题又跨越两行。',
      error:
        '旧解析规则只接受单个对象和单行标题，候选字段找不到原文锚点，整条证据被丢弃。',
      risk: '系统可能把“解析不到”误写成“没有变化”，让趋势出现虚假下降，也让分析员看不到补证任务。',
      change:
        '支持顶层数组与跨行定位；无法稳定定位时标记置信度未知并进入补证，而不是自动归零。',
      retest:
        '增加顶层数组与跨行定位的回归用例；无法稳定定位时仍进入补证，不会被记为“无更新”。',
    },
    result: {
      headline: '把“资讯很多”改造成“哪些事实成立、证据在哪里、哪里仍不知道”。',
      evidence: [
        '45 项固定任务让覆盖和失败可以被比较。',
        '弱信号、候选和已提交事件具有不同权限与后果。',
        '三个趋势指标只读取已提交事件，并保留支持事件与缺口。',
        '本地工作台能从趋势下钻到字段原文和审核状态。',
      ],
      meaning:
        '本地验证覆盖证据提取、审核和趋势下钻；开放网络研究质量与生产运行尚未验证。',
    },
    boundary: [
      '12 案例人工标准已完成；付费模型研究评测尚未执行，不能公布研究准确率。',
      '连续三轮合格影子运行尚未完成，生产调度与正式写入保持关闭。',
      '本地演示数据只用于验证状态和交互，不代表客户材料或生产情报。',
    ],
    nextSteps: [
      '在已完成的 12 案例人工标准下，以相同预算和工具权限执行付费模型研究评测。',
      '完成三轮新的 45／45 影子运行，其中一轮包含中断恢复，并记录噪声与补证成本。',
      '邀请真实分析员比较旧流程与工作台，测量复核时间、重复事件率和证据缺口处理率。',
    ],
    images: [
      {
        src: 'assets/projects-v3/healthai/01-trend-overview.png',
        alt: '三项战略趋势指标与公司覆盖状态的本地演示界面',
        caption: '趋势只读取已提交事件；缺口不会被填成零。',
        readHint: '选择一个指标点，观察它如何连接到支持事件。',
        width: 1900,
        height: 1450,
      },
      {
        src: 'assets/projects-v3/healthai/02-evidence-drilldown.png',
        alt: '趋势指标下钻到事件与来源的本地演示界面',
        caption: '一个指标点可以下钻到支持事件与来源。',
        readHint: '从趋势点顺着事件读取原文位置。',
        width: 1500,
        height: 1250,
      },
      {
        src: 'assets/projects-v3/healthai/03-provenance-review-gate.png',
        alt: '来源异常候选、阻断原因与人工审核状态界面',
        caption: '来源异常或字段证据不足时，候选不会进入正式指标。',
        readHint: '看阻断原因、候选原文与审核动作如何同屏呈现。',
        width: 1550,
        height: 1370,
      },
      {
        src: 'assets/projects-v3/healthai/04-evidence-library-gap.png',
        alt: '证据库中的待补信号、来源数量与不可确认状态界面',
        caption: '待补信号保留来源和原文快照，不会被写成“没有更新”。',
        readHint: '看证据缺口如何保留在证据库中。',
        width: 1500,
        height: 1200,
      },
    ],
  },
  {
    index: '03',
    slug: 'mathmentor',
    title: 'MathMentor 奥数私教',
    shortTitle: 'MathMentor',
    year: '2026',
    category: '智能教育 · 分级引导与独立判题',
    audience: '初中奥数与竞赛入门学习者，以及查看学习进度的家长或老师',
    summary: {
      from: '会直接泄露答案、也无法判断是否真正掌握的通用聊天助手',
      to: '按尝试逐级提示、独立判题、记录迁移掌握度并安排复习的训练闭环',
      promise:
        '系统只给当前最需要的一步，把答案和评分从教学对话中隔离，让“会做”建立在独立迁移证据上。',
    },
    status: {
      label: '本地网页原型与固定评测已完成',
      detail:
        '网页核心学习路径和固定评测已验证；小程序仅完成静态交付检查，微信发布、连续手机试用和学习成效尚未验证。',
      evidenceLevel: '固定评测集',
    },
    role: {
      title: '产品定义、教学策略、智能体边界、评测设计与学生端验收',
      scope: [
        '定义从尝试到逐级提示、提交、判题、掌握和复习的学习闭环',
        '设计不给答案的输入规则与 L0–L5 提示状态机',
        '将教学对话、独立判题器与确定性掌握规则拆开',
        '建立原创题库、固定评测集和保守回退策略',
      ],
      collaboration:
        '在 DeepTutor v1.5.11 基础上，我负责提示阶梯、独立判题、掌握规则、评测和界面验收；实现由人工智能协作完成。',
    },
    facts: [
      {
        value: '32',
        label: '数学主题',
        meaning: '代数、几何、数论与组合各 8 个主题，带前置知识关系。',
        evidenceLevel: '本地运行结果',
      },
      {
        value: '320',
        label: '原创启用题',
        meaning: '每个主题 10 道，按基础、同构、近迁移和远迁移组织。',
        evidenceLevel: '本地运行结果',
      },
      {
        value: '30 + 20',
        label: '两组固定情境',
        meaning:
          '教学评测覆盖六类风险，确定性验证覆盖提示、回退、判题与掌握路径。',
        evidenceLevel: '固定评测集',
      },
    ],
    oldWorkflow: {
      description:
        '学生卡住时，要么等老师，要么向通用聊天助手索要解法。完整步骤会缩短独立尝试；随后答对也难区分独立理解、记住原题或受提示完成。',
      breakpoints: [
        '“直接告诉我答案”的请求容易把辅导变成代做。',
        '一段长回复同时包含多个步骤，学生失去下一次主动推理机会。',
        '同一个对话模型既教学又自评，会顺着自己的提示给出过高判断。',
        '答对一次被当成掌握，无法区分原题复现、近迁移和隔天仍会做。',
      ],
    },
    productPromise: {
      headline: '每次只给当前所需的一步，让学生保留下一次推理机会。',
      keepsHumanControl:
        '学生先表达尝试，再决定是否请求下一层提示和何时提交；家长或老师只看到学习摘要，不替系统释放答案。',
      successDefinition:
        '学生端永远拿不到未解锁提示和答案；教学回复只推进一步；判题独立于对话；掌握度只由足够独立的迁移证据推进。',
    },
    journeyIntro:
      '同一道题不再是一问一答，而是一段受控训练：学生的尝试决定下一步，提示层级影响掌握信用，判题与教学对话彼此隔离。',
    journey: [
      {
        step: '01',
        title: '选择目标与学习范围',
        actor: '学生',
        action: '选择年级、目标和当前知识主题。',
        systemResponse: '根据前置知识与当前掌握状态推荐可训练主题。',
      },
      {
        step: '02',
        title: '获得安全题目',
        actor: '题库与规则',
        action: '从当前主题与迁移层级选择启用题目。',
        systemResponse: '学生端只收到题干与必要条件，不下发答案和未解锁提示。',
      },
      {
        step: '03',
        title: '写下自己的尝试',
        actor: '学生',
        action: '提交观察、算式、图形关系或具体卡点，而不是空输入。',
        systemResponse: '规则判断是否形成有效尝试，并决定能否进入下一层帮助。',
        humanGate: {
          owner: '学生',
          decision: '先提交自己的思路，还是继续独立思考。',
          onApprove: '记录尝试并开放当前允许的帮助。',
          onReject: '保持题目状态，不用自动答案填补空白。',
        },
      },
      {
        step: '04',
        title: '识别直接索答',
        actor: '确定性规则',
        action: '检查“给答案、完整步骤、跳过提示”等直接索答意图。',
        systemResponse: '命中时拒绝泄露，返回一个可行动的观察方向。',
      },
      {
        step: '05',
        title: '请求下一层提示',
        actor: '学生与私教对话',
        action:
          '学生按需请求帮助；私教只基于已解锁内容提出一个苏格拉底式问题。',
        systemResponse:
          '一次事件最多推进 L0–L5 中的一层，并检查最终答案与锁定内容泄漏。',
        humanGate: {
          owner: '学生',
          decision: '是否消耗一次提示，还是继续独立尝试。',
          onApprove: '解锁且只展示下一层帮助。',
          onReject: '保留当前层级与提示额度。',
        },
      },
      {
        step: '06',
        title: '提交答案与过程',
        actor: '学生',
        action: '在认为准备好时提交答案，并在需要时补充关键过程。',
        systemResponse:
          '把当前题目、答案、必要过程和提示使用情况送入独立判题路径。',
        humanGate: {
          owner: '学生',
          decision: '现在提交独立作答，还是继续尝试。',
          onApprove: '进入独立判题。',
          onReject: '继续保留当前题目和已解锁提示。',
        },
      },
      {
        step: '07',
        title: '独立判题',
        actor: '独立判题器',
        action: '不读取私教聊天历史，核验答案与必要过程。',
        systemResponse:
          '简单题走确定性判断；无法可靠决定时返回“不确定”，不强行更新能力。',
      },
      {
        step: '08',
        title: '更新掌握与迁移层级',
        actor: '掌握度规则',
        action: '结合题目迁移类型、正确性、提示层级和是否看过解答计算信用。',
        systemResponse:
          '独立正确逐级推进；高级提示或已看答案会折减或取消信用。',
      },
      {
        step: '09',
        title: '到期复习与学习摘要',
        actor: '学生、家长或老师',
        action: '学生完成到期复习；家长或老师查看近七天进展与待复习主题。',
        systemResponse: '延迟复习结果与即时作答分开记录，摘要不展示题目答案。',
      },
    ],
    mechanisms: [
      {
        index: '01',
        title: 'L0–L5 按学生尝试逐层解锁',
        question: '怎样让帮助逐步增加，同时保证学生仍在思考？',
        constraint:
          '模型倾向一次给出完整解释；如果提示都提前下发到学生端，界面或请求都可能泄露答案。',
        choice:
          '学生先提供有效尝试，一次事件只解锁下一层；直接索答由规则先拦截，模型回复再做锁定内容泄漏检查。',
        rejectedAlternative:
          '不采用自由聊天框和一次生成整份解法，因为它们无法控制帮助剂量，也无法判断学生完成了哪一步。',
        cost: '对话更克制，学生可能觉得系统没有立刻给足信息；换来每次帮助的原因、层级和学习代价可解释。',
        validation:
          '固定情境覆盖空输入、一次只升一级、提示额度、直接索答、模型不可用和未解锁内容泄漏。',
        evidenceImageSrc: 'assets/projects-v3/mathmentor/02-layered-hint.png',
        readHint: '看学生的具体尝试如何决定下一层提示，而不是只读系统回复。',
      },
      {
        index: '02',
        title: '教学对话与独立判题分离',
        question: '怎样避免一个模型既提示答案，又给自己的提示打高分？',
        constraint:
          '对话历史含有引导信息；让同一上下文完成判题，会把语言连贯或模型自己的暗示当成学生能力。',
        choice:
          '独立判题器不接收私教历史；安全算术和标准答案优先使用确定性判断，不能可靠决定时返回不确定。',
        rejectedAlternative:
          '放弃让私教模型直接判断“学生已经掌握”，也不在低置信度时强行二选一。',
        cost: '需要维护额外判题路径和不确定状态，部分答案会等待继续作答或人工确认。',
        validation:
          '固定评测分别检查错误诊断、判题、待确认恢复和模型不可用回退；不确定结果不会改变掌握度。',
        evidenceImageSrc:
          'assets/projects-v3/mathmentor/03-verifier-with-hint.png',
        readHint: '看判题结果、依据和不确定状态如何与私教对话分开。',
      },
      {
        index: '03',
        title: '掌握度来自独立迁移，不来自答题次数',
        question: '答对一道题，什么时候才能说明学生真的会了？',
        constraint:
          '原题重做、同题换数、被高级提示带出答案和隔天仍会做，是强度不同的学习证据。',
        choice:
          '按基础、同构、近迁移、远迁移保存独立正确证据；提示层级和查看解答影响信用，延迟复习单独计入。',
        rejectedAlternative:
          '放弃用总答题数、即时正确率或对话时长直接表示掌握。',
        cost: '能力升级更慢，题库必须有明确题族关系；换来掌握状态更接近“能迁移、能保持”。',
        validation:
          '固定评测覆盖迁移递进、提示折减、看答案后答对、延迟复习失败和不确定判定。',
        evidenceImageSrc:
          'assets/projects-v3/mathmentor/04-independent-success.png',
        readHint: '看掌握状态由哪类独立证据推进，以及下一次复习如何被安排。',
      },
    ],
    systemDivision: [
      {
        owner: '模型',
        responsibility:
          '在当前题、学生尝试和已解锁提示范围内，生成一个简短的苏格拉底式追问。',
        excluded:
          '不能给最终答案、完整推导、未解锁提示，也不能自行修改掌握度。',
      },
      {
        owner: '确定性规则',
        responsibility:
          '选题、隐藏答案、识别索答、推进提示、执行安全判题、计算信用并安排复习。',
        excluded:
          '不在缺少证据时猜测学生已经理解，也不让训练样本自动进入模型。',
      },
      {
        owner: '人工',
        responsibility:
          '学生提供尝试并决定何时请求帮助和提交；成人审核外部题目、许可与训练候选。',
        excluded: '家长或老师不需要逐句控制私教，也不会从摘要中获得题目答案。',
      },
      {
        owner: '持久化状态',
        responsibility:
          '保存题目、提示层级、额度、尝试、判题结果、迁移证据、掌握度和复习日期。',
        excluded: '不把一次聊天印象当长期能力，也不因模型不可用丢失学习进度。',
      },
    ],
    decisions: [
      {
        title: '从 320 道可审题内容开始',
        question: '题目越多，是否就越像一个完整学习产品？',
        choice:
          '先建立 32 个主题、每主题 10 道原创启用题，并明确迁移关系与提示层级。',
        rejected:
          '没有把来源、许可、答案和难度未审核的外部题直接加入正式题库。',
        reason: '教学智能体的安全边界依赖题目、答案和提示都可被审查。',
        tradeoff:
          '覆盖面较小，扩题速度较慢；但题目可以用于一致评测和掌握规则。',
      },
      {
        title: '分层提示限制帮助剂量',
        question: '学习者需要更自由的对话，还是当前恰好够用的下一步？',
        choice:
          '把对话限制在当前题、当前尝试和已解锁层级，每次最多提出一个问题。',
        rejected: '没有让模型自由决定是否展示整套解法。',
        reason: '产品目标是维持学习动作，而不是最大化单次回答的信息量。',
        tradeoff:
          '回复看起来不如通用助手丰富，需要更精细地设计被拒绝后的继续路径。',
      },
      {
        title: '模型不确定时不更新学习状态',
        question: '模型判断不稳或候选数据很多时，应该自动放宽还是保持保守？',
        choice:
          '模型不可用时保留确定性提示和判题；低置信度返回不确定；训练候选先脱敏和人工审核。',
        rejected: '没有用模型自信语气替代判题，也没有把候选对话自动用于训练。',
        reason: '错误答案和未经审核的样本会同时伤害学习体验与后续模型。',
        tradeoff:
          '自动化程度更低，部分开放答案需要等待；换来可恢复且不放大错误的边界。',
      },
    ],
    evaluations: [
      {
        type: '任务结果',
        risk: '题目、提示、提交、判题和复习各自存在，却无法形成连续学习闭环。',
        method:
          '用一条真实学生路径完成选题、尝试、索答拦截、逐级提示、提交、判题和学习摘要。',
        grader: '检查学生端数据、提示层级、判题结果、掌握变化和复习状态。',
        result: '本地网页路径完成从安全题目到家长摘要的闭环。',
        scope: '证明当前功能可操作，不代表真实学生留存或学习效果。',
      },
      {
        type: '过程轨迹',
        risk: '学生用空输入越级、一次解锁多层，或看过答案后仍获得完整掌握信用。',
        method:
          '20 个确定性情境覆盖空输入、单层推进、提示预算、索答、回退、判题与迁移递进。',
        grader: '状态机与固定期望逐步比对。',
        result: '20／20 情境通过；提示推进、回退与掌握信用按规则执行。',
        scope: '固定情境用于检查规则，不代表所有自然语言表达都已覆盖。',
      },
      {
        type: '边界安全',
        risk: '模型泄露答案、未解锁提示或在无法判断时错误更新学生能力。',
        method: '30 个教学案例覆盖提示策略、错误诊断、判题、掌握、迁移和复习。',
        grader: '答案与锁定内容泄漏、判题结论、掌握变化和安全回退分别评分。',
        result: '30／30 固定教学案例通过；不确定判定不改变掌握度。',
        scope:
          '这是当前固定集结果，不等于真实学习成效或开放输入的完备安全证明。',
      },
      {
        type: '体验质量',
        risk: '拒绝给答案后只剩一句警告，学生不知道还能做什么。',
        method:
          '检查直接索答、模型不可用、错误答案与下一次复习在学生端的可恢复路径。',
        grader: '每个阻止状态必须给出一个可继续动作，且不暴露未解锁内容。',
        result:
          '本地真实路径中，直接索答停在当前层并返回观察方向；模型不可用时仍可继续确定性流程。',
        scope: '尚未完成连续三天手机私测与真实学生理解度访谈。',
      },
    ],
    badcase: {
      title: '字面拦截挡住了“给答案”，却漏过语义相同的表达',
      scenario: '学生输入“我想直接知道答案”，没有使用旧规则中的固定命令词。',
      error:
        '旧策略按字面词组匹配，存在把语义相同请求交给模型、进而泄露完整解法的可能。',
      risk: '一次泄露就会破坏本题的独立性；学生随后答对，也不能再作为可靠掌握证据。',
      change:
        '扩展索答意图与语义变体回归；低置信度时不释放答案，转为要求具体尝试或给安全观察方向。',
      retest:
        '确定性验证覆盖直接索答、提示预算和模型不可用回退，20／20 情境通过。',
    },
    result: {
      headline: '把“回答数学问题”重构成可控制帮助剂量、可独立判题的学习循环。',
      evidence: [
        '学生端题目数据不包含答案和未解锁提示。',
        'L0–L5 一次只推进一层，直接索答先经过规则校验。',
        '独立判题器不读取私教聊天历史，不确定时不更新掌握度。',
        '32 个主题与 320 道题支持四类迁移和到期复习。',
      ],
      meaning:
        '本地验证覆盖引导、判题、掌握和复习；正式发布与学习成效仍需真实环境和用户研究。',
    },
    boundary: [
      '基于开源 DeepTutor v1.5.11 扩展，开源底座与新增部分明确区分。',
      '微信正式发布、域名与应用配置、连续三天手机私测尚未完成。',
      '真实次日复习、学习效果、服务器容量与训练候选逐条人工审核尚未验证。',
    ],
    nextSteps: [
      '邀请少量真实学习者完成受控试用，记录提示依赖率、被拒答后的继续尝试率和独立迁移正确率。',
      '完成真实次日复习，比较即时答对与延迟保持之间的差异。',
      '由人工逐条审核训练候选的隐私、教学质量与许可，再决定是否训练专用模型。',
    ],
    images: [
      {
        src: 'assets/projects-v3/mathmentor/01-direct-answer-gate.png',
        alt: '直接索答被拦截并返回安全观察方向的界面',
        caption: '学生直接索答时停留在当前层，系统返回一个观察方向。',
        readHint: '看索答输入、L0 状态与家长摘要。',
        width: 1220,
        height: 1100,
      },
      {
        src: 'assets/projects-v3/mathmentor/02-layered-hint.png',
        alt: 'L0 到 L1 逐级提示与单问式引导的界面',
        caption: '每次只开放下一层帮助，直接索答不会越过当前状态。',
        readHint: '看当前层级、已用提示和唯一的下一步问题。',
        width: 1220,
        height: 1100,
      },
      {
        src: 'assets/projects-v3/mathmentor/03-verifier-with-hint.png',
        alt: '使用一次提示后的独立判题与掌握度界面',
        caption: '判题正确不等于独立完成；提示使用会折减掌握信用。',
        readHint: '看“独立完成：否”、提示记录与复习日期。',
        width: 1220,
        height: 1100,
      },
      {
        src: 'assets/projects-v3/mathmentor/04-independent-success.png',
        alt: '无提示独立正确、掌握度和复习日期界面',
        caption: '无提示独立正确形成更强的掌握证据，并安排后续复习。',
        readHint: '看“独立完成：是”、独立正确率、掌握度与复习日期。',
        width: 1220,
        height: 1100,
      },
    ],
    attribution: '开源基础：DeepTutor v1.5.11。',
  },
];

export const flagshipProjectsV3 = projectsV3;

export function getProjectV3(slug: string) {
  return projectsV3.find((project) => project.slug === slug);
}
