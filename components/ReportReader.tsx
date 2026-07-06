import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { sections } from "@/lib/markdown"
import { getLayerGuide } from "@/lib/roadmap"
import type { Report } from "@/lib/types"
import { MarkdownContent } from "./MarkdownContent"

const lens = [
  ["瓶颈是什么", "bottleneck"],
  ["怎么优化", "mechanism"],
  ["未来效果", "futureEffect"],
  ["Mantle 影响", "mantleImpact"],
] as const

function reportLensValue(report: Report, key: (typeof lens)[number][1]): string {
  switch (key) {
    case "bottleneck":
      return report.bottleneck
    case "mechanism":
      return report.mechanism
    case "futureEffect":
      return report.futureEffect
    case "mantleImpact":
      return report.mantleImpact
  }
}

export function ReportReader({ report }: { readonly report: Report }) {
  const reportSections = sections(report.markdown).filter(
    (section) => section.title !== "Sources" && section.title !== "逐项拆解",
  )
  const guide = getLayerGuide(report.group)
  const backHref = guide === undefined ? "/" : `/layers/${guide.id}`
  const backLabel = guide === undefined ? "返回首页" : `返回${guide.label}导读`

  return (
    <article className="report-reader" id="content">
      <Link className="back-link" href={backHref}>
        <ArrowLeft aria-hidden="true" size={16} />
        {backLabel}
      </Link>
      <header className="report-head">
        <span className="eyebrow">
          {report.layer} · {report.sourceCount} sources
        </span>
        <h1>{report.title}</h1>
        {report.caveat.length > 0 ? <p className="report-caveat">{report.caveat}</p> : null}
      </header>

      <section className="lens-grid" aria-label="四问速览">
        {lens.map(([label, key]) => {
          const value = reportLensValue(report, key)
          if (value.length === 0) return null
          return (
            <div className="lens-card" key={key}>
              <span>{label}</span>
              <MarkdownContent markdown={value} />
            </div>
          )
        })}
      </section>

      {report.optimizations.length > 0 ? (
        <section className="optimization-table" aria-labelledby="optimization-title">
          <span className="eyebrow">Optimization breakdown</span>
          <h2 id="optimization-title">逐项拆解</h2>
          <MarkdownContent markdown={tableToMarkdown(report.optimizations)} />
        </section>
      ) : null}

      <section className="report-section-stream" aria-label="报告正文">
        {reportSections.map((section) => (
          <section className="reader-section" key={section.title}>
            <h2>{section.title}</h2>
            <MarkdownContent markdown={section.body} />
          </section>
        ))}
      </section>
    </article>
  )
}

export function SourceRail({ report }: { readonly report: Report }) {
  return (
    <aside className="source-rail" aria-label="报告来源">
      <div className="panel-title">
        <span>Sources</span>
        <strong>{report.sources.length}</strong>
      </div>
      <ol className="source-list">
        {report.sources.map((source, index) => (
          <li key={source.id}>
            <a href={source.url} rel="noreferrer" target="_blank">
              <span>D{index + 1}</span>
              <strong>{source.host}</strong>
              <small>{source.url}</small>
              <ExternalLink aria-hidden="true" size={13} />
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}

function tableToMarkdown(rows: readonly Readonly<Record<string, string>>[]): string {
  const firstRow = rows[0]
  if (firstRow === undefined) return ""
  const headers = Object.keys(firstRow)
  const header = `| ${headers.join(" | ")} |`
  const divider = `| ${headers.map(() => "---").join(" | ")} |`
  const body = rows.map(
    (row) => `| ${headers.map((headerKey) => row[headerKey] ?? "").join(" | ")} |`,
  )
  return [header, divider, ...body].join("\n")
}
