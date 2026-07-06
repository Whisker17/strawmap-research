import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { ReportSummary } from "@/lib/types"

export function ReportIndex({
  reports,
  activeSlug,
}: {
  readonly reports: readonly ReportSummary[]
  readonly activeSlug?: string
}) {
  return (
    <nav aria-label="报告索引" className="report-index">
      <div className="rail-heading">
        <span>Reports</span>
        <strong>{reports.length}</strong>
      </div>
      <ol>
        {reports.map((report) => (
          <li key={report.slug}>
            <Link
              aria-current={activeSlug === report.slug ? "page" : undefined}
              className="report-row"
              data-group={report.group}
              href={`/reports/${report.slug}`}
            >
              <span className="report-number">{report.number}</span>
              <span className="report-row-copy">
                <span>{report.shortTitle}</span>
                <small>
                  {report.layer} · {report.sourceCount} sources
                </small>
              </span>
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function ReportChips({
  numbers,
  reports,
}: {
  readonly numbers: readonly string[]
  readonly reports: readonly ReportSummary[]
}) {
  return (
    <div className="report-chip-list">
      {numbers.map((number) => {
        const report = reports.find((candidate) => candidate.number === number)
        if (report === undefined)
          return (
            <span key={number} className="report-chip muted">
              {number}
            </span>
          )
        return (
          <Link
            className="report-chip"
            data-group={report.group}
            href={`/reports/${report.slug}`}
            key={number}
          >
            {number}
          </Link>
        )
      })}
    </div>
  )
}
