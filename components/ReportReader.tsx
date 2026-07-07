import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { type Locale, localePath, ui } from "@/lib/i18n"
import { sections } from "@/lib/markdown"
import { getLayerGuide } from "@/lib/roadmap"
import type { Report } from "@/lib/types"
import { MarkdownContent } from "./MarkdownContent"

const lensKeys = ["bottleneck", "mechanism", "futureEffect", "mantleImpact"] as const

type LensKey = (typeof lensKeys)[number]

function reportLensValue(report: Report, key: LensKey): string {
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

export function ReportReader({
  report,
  locale,
}: {
  readonly report: Report
  readonly locale: Locale
}) {
  const strings = ui[locale]
  const excludedSections = new Set([
    "Sources",
    strings.breakdownTitle,
    "逐项拆解",
    "Item-by-Item Breakdown",
  ])
  const reportSections = sections(report.markdown).filter(
    (section) => !excludedSections.has(section.title),
  )
  const guide = getLayerGuide(locale, report.group)
  const backHref =
    guide === undefined ? localePath(locale, "/") : localePath(locale, `/layers/${guide.id}`)
  const backLabel = guide === undefined ? strings.backToHome : strings.backToLayerGuide(guide.label)
  const lensLabels: Readonly<Record<LensKey, string>> = {
    bottleneck: strings.lensBottleneck,
    mechanism: strings.lensMechanism,
    futureEffect: strings.lensFutureEffect,
    mantleImpact: strings.lensMantleImpact,
  }

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

      <section className="lens-grid" aria-label={strings.lensSectionLabel}>
        {lensKeys.map((key) => {
          const value = reportLensValue(report, key)
          if (value.length === 0) return null
          return (
            <div className="lens-card" key={key}>
              <span>{lensLabels[key]}</span>
              <MarkdownContent markdown={value} />
            </div>
          )
        })}
      </section>

      {report.optimizations.length > 0 ? (
        <section className="optimization-table" aria-labelledby="optimization-title">
          <span className="eyebrow">{strings.breakdownEyebrow}</span>
          <h2 id="optimization-title">{strings.breakdownTitle}</h2>
          <MarkdownContent markdown={tableToMarkdown(report.optimizations)} />
        </section>
      ) : null}

      <section className="report-section-stream" aria-label={strings.reportBodyLabel}>
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

export function SourceRail({
  report,
  locale,
}: {
  readonly report: Report
  readonly locale: Locale
}) {
  const strings = ui[locale]

  return (
    <aside className="source-rail" aria-label={strings.sourcesRailLabel}>
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
