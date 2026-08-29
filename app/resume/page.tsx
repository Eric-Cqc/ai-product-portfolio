import type { Metadata } from 'next';
import { ArrowLeft, Code2, Download } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-shell';

export const metadata: Metadata = {
  title: '简历｜蔡骐充 AI 产品经理作品集',
  description: '蔡骐充的教育、经历、AI 产品项目与能力摘要。',
  openGraph: { title: '蔡骐充｜AI 产品经理简历', description: '教育、经历与代表项目。', images: [] },
  twitter: { title: '蔡骐充｜AI 产品经理简历', description: '教育、经历与代表项目。', images: [] },
};

const experience = [
  {
    time: '2026.07 — 至今',
    company: '百度网讯科技有限公司',
    role: '战略分析实习生',
    bullets: [
      '围绕 AI 应用与数字健康开展产业、公司、产品与商业化研究，把模型能力、产品形态、业务场景、数据基础和商业闭环放在同一框架中判断。',
      '比较 18 家 AI / 医疗 AI 厂商，维护 40+ 专家资源库并参与供应商与访谈验证；核心研究判断进入部门战略规划，随后承接医疗数据孤岛专项。',
    ],
  },
  {
    time: '2026.05 — 2026.07',
    company: '中金公司',
    role: '投资银行日常实习生（并购组）',
    bullets: [
      '支持并购与资本运作前期研究，把行业、监管、经营与财务信息整理为高标准决策材料。',
      '完成 6 家可比公司的经营 / 财务比较与估值支持；不把前期研究写成已完成交易。',
    ],
  },
  {
    time: '2025.12 — 2026.03',
    company: '富德证券',
    role: '投资分析实习生',
    bullets: ['完成 10+ 份结构化研究与产品 / 商业价值分析，参与创新方案研究和多方推进。'],
  },
  {
    time: '2022.06 — 2022.08',
    company: '深圳启迪科创私募股权基金',
    role: '投资研究实习生',
    bullets: ['研究智能物流、智能仓储、机器人和工业自动化，维护团队 200+ 潜在项目 Pipeline。'],
  },
];

const projectRows = [
  ['MathMentor', 'C 端教学 Agent', '32 个主题、320 道原创题；L0–L5、独立 Verifier、掌握与复习闭环。'],
  ['HealthAI Radar', 'B 端证据型 Agent', '15 家 × 3 Track = 45 项任务；字段证据、Trusted Kernel、人工审核与明确未知状态。'],
  ['AI Video', '复杂创作工作流', 'Brief → 3 Concepts → Script → Storyboard → Shot Plan → Review → 12 文件 ZIP。'],
];

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="resume-hero border-b border-border">
        <div className="site-wrap">
          <a className="back-link focus-ring" href="./"><ArrowLeft aria-hidden="true" /> 返回作品集</a>
          <div className="resume-heading">
            <div>
              <p className="eyebrow">RESUME / AI 产品经理</p>
              <h1>蔡骐充 <span>Eric CQC</span></h1>
              <p>把模糊问题，做成可验证的 AI 产品。</p>
            </div>
            <div className="resume-actions">
              <a className="button-primary focus-ring" href="蔡骐充_腾讯AI产品经理_简历.pdf"><Download aria-hidden="true" /> PDF</a>
              <a className="button-secondary focus-ring" href="蔡骐充_腾讯AI产品经理_简历.docx"><Download aria-hidden="true" /> DOCX</a>
              <a className="button-secondary focus-ring" href="https://github.com/Eric-Cqc" target="_blank" rel="noreferrer"><Code2 aria-hidden="true" /> GitHub</a>
            </div>
          </div>
          <div className="resume-summary">
            <p>港中文商业分析硕士，经历医疗 AI 战略、投行与科技投资。擅长把低透明度、跨专业的问题拆成可验证的产品任务：先明确用户与业务价值，再划分模型、Agent、工具和确定性代码的职责，用评测、Badcase 与人工审核持续迭代。</p>
            <dl>
              <div><dt>方向</dt><dd>AI 产品 / Agent / 评测</dd></div>
              <div><dt>语言</dt><dd>普通话 · 粤语 · English</dd></div>
              <div><dt>公开联系</dt><dd>GitHub / Eric-Cqc</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <div className="site-wrap resume-layout">
        <div className="resume-main">
          <section className="resume-section">
            <div className="resume-section-title"><span>01</span><h2>经历</h2></div>
            <div className="experience-list">
              {experience.map((item) => (
                <article key={`${item.company}-${item.time}`}>
                  <time>{item.time}</time>
                  <div><h3>{item.company}</h3><p className="experience-role">{item.role}</p><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <div className="resume-section-title"><span>02</span><h2>代表项目</h2></div>
            <div className="resume-project-list">
              {projectRows.map(([name, type, detail], index) => (
                <a href={`projects/${['mathmentor', 'healthai-radar', 'ai-video-preproduction'][index]}`} key={name} className="focus-ring">
                  <span>{String(index + 1).padStart(2, '0')}</span><div><h3>{name}</h3><b>{type}</b><p>{detail}</p></div>
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="resume-side">
          <section>
            <div className="resume-section-title"><span>A</span><h2>教育</h2></div>
            <article><time>2025.08 — 预计 2026.10</time><h3>香港中文大学</h3><p>Master of Science in Business Analytics</p></article>
            <article><time>2021.08 — 2025.06</time><h3>澳门大学</h3><p>历史学学士 · Dean&apos;s List（2023、2025）</p></article>
          </section>
          <section>
            <div className="resume-section-title"><span>B</span><h2>产品与 AI</h2></div>
            <p>用户与问题定义 · PRD / 流程 / 状态 · Agent / RAG / Tool · Human-in-the-loop · 评测集 / Badcase · Provider 边界 · 数据与公开安全</p>
          </section>
          <section>
            <div className="resume-section-title"><span>C</span><h2>数据与实现</h2></div>
            <p>Python · SQL · TypeScript · Git · 监督学习 · 离散事件仿真 · 数据可视化 · AI 协作开发与验收</p>
          </section>
          <section className="resume-boundary">
            <div className="resume-section-title"><span>D</span><h2>公开边界</h2></div>
            <p>个人项目、开源基础、AI 协作和当前运行状态均明确署名；本地、离线、合成和试运行测算不写成生产结果。</p>
          </section>
        </aside>
      </div>
      <SiteFooter />
    </main>
  );
}
