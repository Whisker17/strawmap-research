import { GitBranch, Layers3, Map as MapIcon, Target } from "lucide-react"
import Link from "next/link"
import type { ReportSummary, ResearchData } from "@/lib/types"
import { MarkdownContent } from "./MarkdownContent"
import { ReportChips } from "./ReportIndex"

function reportsByGroup(reports: readonly ReportSummary[]) {
  return {
    consensus: reports.filter((report) => report.group === "consensus"),
    data: reports.filter((report) => report.group === "data"),
    execution: reports.filter((report) => report.group === "execution"),
    account: reports.filter((report) => report.group === "account"),
    appendix: reports.filter((report) => report.group === "appendix"),
  }
}

export function OverviewHero({ data }: { readonly data: ResearchData }) {
  const grouped = reportsByGroup(data.reports)

  return (
    <section className="overview-hero" aria-labelledby="overview-title">
      <div className="hero-copy">
        <span className="eyebrow">Mantle research handoff · 2026-07-06</span>
        <h1 id="overview-title">Ethereum Strawmap 路线图研究图册</h1>
        <p>{data.synthesis.executiveSummary}</p>
      </div>
      <section className="hero-map" aria-labelledby="hero-map-title">
        <div className="map-header">
          <MapIcon aria-hidden="true" size={18} />
          <span id="hero-map-title">Layered reading map</span>
        </div>
        <div className="map-grid">
          <span data-group="consensus">共识 {grouped.consensus.length}</span>
          <span data-group="data">数据 {grouped.data.length}</span>
          <span data-group="execution">执行 {grouped.execution.length}</span>
          <span data-group="account">账户/隐私 {grouped.account.length}</span>
          <span data-group="appendix">附录 {grouped.appendix.length}</span>
        </div>
      </section>
    </section>
  )
}

export function LayerAtlas({ data }: { readonly data: ResearchData }) {
  return (
    <section className="atlas-section" aria-labelledby="layer-atlas">
      <div className="section-heading">
        <Layers3 aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Layer first</span>
          <h2 id="layer-atlas">先看每一层为什么需要改变</h2>
        </div>
      </div>
      <div className="layer-atlas">
        {data.layerSummaries.map((layer) => (
          <article className="layer-card" data-accent={layer.accent} key={layer.id}>
            <span className="layer-card-label">{layer.label}</span>
            <h3>当前瓶颈</h3>
            <p>{layer.problem}</p>
            <h3>优化方向</h3>
            <p>{layer.change}</p>
            <ReportChips numbers={layer.reportNumbers} reports={data.reports} />
          </article>
        ))}
      </div>
    </section>
  )
}

export function DependencySpine({ data }: { readonly data: ResearchData }) {
  return (
    <section className="dependency-section" aria-labelledby="dependency-spine">
      <div className="section-heading">
        <GitBranch aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Dependency spine</span>
          <h2 id="dependency-spine">再看优化点之间的一脉相承</h2>
        </div>
      </div>
      <div className="spine-list">
        {data.dependencies.map((dependency, index) => (
          <article className="spine-row" key={dependency.id}>
            <div className="spine-index">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <h3>{dependency.upstream}</h3>
              <p>{dependency.effect}</p>
            </div>
            <ReportChips numbers={dependency.reports} reports={data.reports} />
          </article>
        ))}
      </div>
    </section>
  )
}

export function MantleBoard({ data }: { readonly data: ResearchData }) {
  return (
    <section className="mantle-section" aria-labelledby="mantle-board">
      <div className="section-heading">
        <Target aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Mantle reading board</span>
          <h2 id="mantle-board">最后落到 Mantle 应该怎么读</h2>
        </div>
      </div>
      <div className="mantle-board">
        {data.mantleTracks.map((track) => (
          <article className="mantle-lane" key={track.id}>
            <h3>{track.label}</h3>
            <p>{track.body}</p>
            <ReportChips numbers={track.reports} reports={data.reports} />
          </article>
        ))}
      </div>
      <div className="mantle-lines">
        <h3>Mantle 最重要的阅读线索</h3>
        <ul>
          {data.mantleReadingLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ReportGrid({ reports }: { readonly reports: readonly ReportSummary[] }) {
  return (
    <section className="report-grid-section" aria-labelledby="report-grid">
      <div className="section-heading">
        <div>
          <span className="eyebrow">All reports</span>
          <h2 id="report-grid">完整分报告索引</h2>
        </div>
      </div>
      <div className="report-card-grid">
        {reports.map((report) => (
          <Link
            className="report-card"
            data-group={report.group}
            href={`/reports/${report.slug}`}
            key={report.slug}
          >
            <span className="report-card-number">{report.number}</span>
            <h3>{report.shortTitle}</h3>
            <p>{report.conclusionExcerpt || report.coverage}</p>
            <small>
              {report.layer} · {report.sourceCount} sources
            </small>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function SynthesisBlock({ data }: { readonly data: ResearchData }) {
  return (
    <section className="synthesis-section" aria-labelledby="synthesis-title">
      <span className="eyebrow">Synthesis</span>
      <h2 id="synthesis-title">综合结论</h2>
      <MarkdownContent markdown={data.synthesis.findings.map((item) => `- ${item}`).join("\n")} />
    </section>
  )
}
