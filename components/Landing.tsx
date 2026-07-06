import {
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  Compass,
  FileText,
  Map as MapIcon,
} from "lucide-react"
import Link from "next/link"
import type { ResearchData } from "@/lib/types"

const readingSteps = [
  {
    title: "看原图",
    body: "从 strawmap 原始路线图开始，建立「层 × 时间」的整体框架：三个大层、六次硬分叉窗口、右侧的北极星目标。",
  },
  {
    title: "选一层",
    body: "进入一个 layer 的导读页：先弄清这层负责什么、现在卡在哪里，再看路线图准备怎么改。",
  },
  {
    title: "读报告",
    body: "从每个优化方向进入对应的深挖报告；需要证据时查报告来源、综合结论与两个校准附录。",
  },
] as const

export function LandingHero() {
  return (
    <section className="landing-hero" aria-labelledby="landing-title">
      <span className="eyebrow">Mantle research handoff · 2026-07-06</span>
      <h1 id="landing-title">Ethereum Strawmap 路线图研究图册</h1>
      <p className="landing-lead">
        strawmap.org 是 EF Architecture 团队维护的 Ethereum L1
        草案路线图（strawman：粗共识、非承诺）。这套研究把 2026-06-26 版 strawmap 拆成 4
        条阅读线、14 篇深挖报告和 2
        个校准附录，为每个优化点回答同一组问题：它解决什么瓶颈、怎么解、依赖谁、对 Mantle
        意味着什么。
      </p>
      <ol className="reading-steps" aria-label="推荐阅读路径">
        {readingSteps.map((step, index) => (
          <li key={step.title}>
            <span className="step-index">{index + 1}</span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function StrawmapFigure() {
  return (
    <section className="strawmap-section" aria-labelledby="strawmap-title">
      <div className="section-heading">
        <MapIcon aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Step 1 · The original map</span>
          <h2 id="strawmap-title">先看原图：strawmap.org 的 L1 草案路线图</h2>
        </div>
      </div>
      <p className="section-lead">
        横轴是硬分叉窗口（Glamsterdam → Hegotá →
        更远期），纵轴是三个大层：共识层（CL）、数据层（DL）、执行层（EL）。深色块是各层的
        headliner，右侧灰黑块是北极星目标。点击图片可查看大图。
      </p>
      <figure className="strawmap-figure">
        <a href="/strawmap-original.png" rel="noreferrer" target="_blank">
          {/* biome-ignore lint/performance/noImgElement: static export serves the original file directly */}
          <img
            alt="strawmap.org 原始路线图：共识层、数据层、执行层三大层在 2026-2029 各硬分叉窗口的优化项与北极星目标"
            height={1906}
            src="/strawmap-original.png"
            width={2500}
          />
        </a>
        <figcaption>
          来源：
          <a href="https://strawmap.org/" rel="noreferrer" target="_blank">
            strawmap.org
          </a>
          （EF Architecture 维护，2026-06-26
          更新）。图上标签是草案而非承诺——阅读任何具体状态前，请先过一遍下方的两个校准附录。
        </figcaption>
      </figure>
    </section>
  )
}

export function LayerNav({ data }: { readonly data: ResearchData }) {
  return (
    <section className="layer-nav-section" aria-labelledby="layer-nav-title">
      <div className="section-heading">
        <Compass aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Step 2 · Pick a layer</span>
          <h2 id="layer-nav-title">再选一层深入：四条阅读线</h2>
        </div>
      </div>
      <p className="section-lead">
        每条阅读线都按同一结构组织：这层做了什么 → 现在的缺陷与限制 → 未来的优化方向 →
        逐篇深挖报告。账户/隐私在原图上画在执行层内，这里单独拆出来读。
      </p>
      <div className="layer-nav-grid">
        {data.layerGuides.map((guide) => {
          const reports = data.reports.filter((report) => report.group === guide.id)
          return (
            <Link
              className="layer-nav-card"
              data-group={guide.id}
              href={`/layers/${guide.id}`}
              key={guide.id}
            >
              <span className="layer-nav-en">{guide.enLabel}</span>
              <h3>{guide.label}</h3>
              <p>{guide.tagline}</p>
              <span className="layer-nav-meta">
                {guide.directions.length} 个优化方向 · {reports.length} 篇报告
                <ArrowRight aria-hidden="true" size={15} />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export function AppendixCallout({ data }: { readonly data: ResearchData }) {
  const appendices = data.reports.filter((report) => report.group === "appendix")

  return (
    <section className="appendix-section" aria-labelledby="appendix-title">
      <div className="section-heading">
        <BookMarked aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Before you trust a label</span>
          <h2 id="appendix-title">先校准，再深读</h2>
        </div>
      </div>
      <p className="section-lead">
        strawmap
        上的标签不等于承诺：有的已上主网，有的只是研究草稿。两个附录负责把状态和模糊标签校准清楚，建议在引用任何结论前先读。
      </p>
      <div className="appendix-grid">
        {appendices.map((report) => (
          <Link className="appendix-card" href={`/reports/${report.slug}`} key={report.slug}>
            <span className="report-card-number">{report.number}</span>
            <h3>{report.shortTitle}</h3>
            <p>{report.conclusionExcerpt || report.coverage}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function SynthesisTeaser() {
  return (
    <section className="teaser-section" aria-labelledby="teaser-title">
      <div className="teaser-card">
        <div>
          <span className="eyebrow">Step 3 · Cross-layer view</span>
          <h2 id="teaser-title">综合结论、依赖关系与 Mantle 影响</h2>
          <p>
            读完单层之后，到综合页看跨层视角：核心发现、优化点之间的依赖脉络、Mantle
            四条关注线，以及全部来源与验证记录。
          </p>
        </div>
        <div className="teaser-links">
          <Link className="primary-link" href="/synthesis">
            进入综合与证据
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
          <Link className="primary-link" href="/REPORT_PACK.pdf">
            <FileText aria-hidden="true" size={15} />
            下载 PDF 全文
            <ArrowUpRight aria-hidden="true" size={13} />
          </Link>
        </div>
      </div>
    </section>
  )
}
