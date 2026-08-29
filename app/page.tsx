import { ArrowDownRight, ArrowRight, ArrowUpRight, Code2, Download, PlayCircle } from 'lucide-react';
import { capabilityMap, flagships, selected } from '@/lib/portfolio';
import { SectionLabel, SiteFooter, SiteHeader } from '@/components/site-shell';

export default function Home() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="hero-section">
        <div className="site-wrap hero-grid">
          <div className="hero-copy">
            <SectionLabel>AI PRODUCT PORTFOLIO / 2026</SectionLabel>
            <h1>把模糊问题，<br />做成可验证的 <em>AI 产品。</em></h1>
            <p className="hero-intro">
              从真实业务问题出发，把模型能力、Agent 架构、产品交互和评测闭环连接起来，做成可运行、可验证、能持续迭代的 AI 产品。
            </p>
            <div className="hero-actions">
              <a className="button-primary focus-ring" href="#projects">看三个旗舰 <ArrowDownRight aria-hidden="true" /></a>
              <a className="button-secondary focus-ring" href="蔡骐充_AI产品经理_作品集.pdf"><Download aria-hidden="true" /> 下载 PDF</a>
            </div>
            <div className="quick-proof" aria-label="快速证据">
              <span>3 个真实 Agent 工作流</span>
              <span>9 个可追溯项目</span>
              <span>状态边界公开标注</span>
            </div>
          </div>

          <aside className="hero-aside" aria-label="旗舰项目快速入口">
            <div className="hero-profile">
              <p>蔡骐充 / Eric CQC</p>
              <strong>产品定义 · Agent 架构<br />评测设计 · AI 协作开发与验收</strong>
              <span>香港中文大学商业分析硕士<br />预计 2026.10 获授学位</span>
            </div>
            <div className="hero-project-index">
              {flagships.map((project) => (
                <a className="focus-ring" href={`projects/${project.slug}`} key={project.slug}>
                  <span>{project.index}</span>
                  <div><strong>{project.shortTitle}</strong><small>{project.category}</small></div>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="projects" className="section-surface border-y border-border">
        <div className="site-wrap section-space">
          <div className="section-heading">
            <div>
              <SectionLabel index="01">FLAGSHIP CASES / 旗舰案例</SectionLabel>
              <h2>三个问题，三种 AI 产品判断。</h2>
            </div>
            <p>不以 Demo 数量取胜。每个案例都回答：为什么用 AI、什么不交给 AI、我做了哪些决定、Badcase 如何改变产品。</p>
          </div>

          <div className="flagship-grid">
            {flagships.map((project) => (
              <article className="flagship-card" key={project.slug}>
                <div className="card-topline">
                  <span>{project.index} / 03</span>
                  <span className="status-dot">{project.status}</span>
                </div>
                <p className="card-category">{project.category}</p>
                <h3>{project.shortTitle}</h3>
                <p className="card-claim">{project.claim}</p>
                <p className="card-problem">{project.problem}</p>
                <div className="card-metrics">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
                  ))}
                </div>
                <a className="card-link focus-ring" href={`projects/${project.slug}`}>
                  阅读完整案例 <ArrowRight aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="fit" className="site-wrap section-space">
        <div className="section-heading">
          <div>
            <SectionLabel index="02">ROLE FIT / 腾讯四维证据</SectionLabel>
            <h2>不展示能力条，只展示证据。</h2>
          </div>
          <p>同一个项目可以证明很多事，但每个能力只保留最强的一条证据，让招聘官更快完成判断。</p>
        </div>
        <div className="capability-grid">
          {capabilityMap.map((item) => (
            <article key={item.index}>
              <div><span>{item.index}</span><strong>{item.primary}</strong></div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-ink">
        <div className="site-wrap section-space">
          <div className="section-heading section-heading-light">
            <div>
              <SectionLabel index="03">SELECTED WORK / 六个精选</SectionLabel>
              <h2>用更短的案例，补足产品判断的宽度。</h2>
            </div>
            <p>商业研究、多租户 Agent、确定性研究、成本敏感模型、泄漏修复和仿真决策，各自只证明一个最重要的能力。</p>
          </div>
          <div className="selected-grid">
            {selected.map((project) => (
              <a className="selected-card focus-ring" href={`projects/${project.slug}`} key={project.slug}>
                <div className="selected-number">{project.index}</div>
                <div>
                  <span>{project.category}</span>
                  <h3>{project.shortTitle}</h3>
                  <p>{project.claim}</p>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="extension-note">完整项目库另含 SafeDrive SQL、年报文本测量、Index Futures 等扩展项目；首页不等量铺开，避免稀释 AI 产品主线。</p>
        </div>
      </section>

      <section id="method" className="site-wrap section-space method-section">
        <div>
          <SectionLabel index="04">METHOD / 工作方法</SectionLabel>
          <h2>先决定什么值得交给模型，<br />再决定怎么把结果收回来。</h2>
          <p>模型能力只是一层。真正可交付的 AI 产品，还需要清楚的问题边界、确定性内核、用户控制、评测和状态恢复。</p>
        </div>
        <ol className="method-list">
          {[
            ['问题', '用户是谁，旧流程最贵、最慢或最不透明的环节是什么？'],
            ['分工', '模型、Agent、工具、确定性代码和人分别拥有哪一种决定？'],
            ['评测', '什么输出算好，代表任务和 Badcase 能否改变方案？'],
            ['迭代', '失败状态是否被保留，产品能否恢复、回退和继续验证？'],
          ].map(([title, body], index) => (
            <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{body}</p></div></li>
          ))}
        </ol>
      </section>

      <section className="profile-band border-t border-border">
        <div className="site-wrap grid gap-10 py-14 lg:grid-cols-[1fr_1fr] lg:py-20">
          <div>
            <SectionLabel index="05">PROFILE / 为什么是我</SectionLabel>
            <h2>历史学训练证据，商业分析训练决策，产品把两者变成可运行系统。</h2>
          </div>
          <div className="profile-copy">
            <p>港中文商业分析硕士，经历医疗 AI 战略、投行与科技投资。我习惯处理低透明度、跨专业、证据不完整的问题，再把它拆成用户能判断、系统能验证的产品任务。</p>
            <div className="profile-links">
              <a className="button-primary focus-ring" href="resume">查看在线简历 <ArrowRight aria-hidden="true" /></a>
              <a className="button-secondary focus-ring" href="https://github.com/Eric-Cqc" target="_blank" rel="noreferrer"><Code2 aria-hidden="true" /> GitHub</a>
              <a className="button-secondary focus-ring" href="assets/demo.mp4"><PlayCircle aria-hidden="true" /> 90 秒演示</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
