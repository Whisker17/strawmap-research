import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { type Locale, localePath, ui } from "@/lib/i18n"
import type { LayerId, ReportSummary } from "@/lib/types"

const indexGroupOrder: readonly LayerId[] = [
  "consensus",
  "data",
  "execution",
  "account",
  "appendix",
]

export function ReportIndex({
  reports,
  locale,
  activeSlug,
}: {
  readonly reports: readonly ReportSummary[]
  readonly locale: Locale
  readonly activeSlug?: string
}) {
  const strings = ui[locale]

  return (
    <nav aria-label={strings.reportIndexLabel} className="report-index">
      <div className="rail-heading">
        <span>{strings.reportIndexHeading}</span>
        <strong>{reports.length}</strong>
      </div>
      {indexGroupOrder.map((group) => {
        const groupReports = reports.filter((report) => report.group === group)
        if (groupReports.length === 0) return null
        const label = strings.indexGroups[group] ?? group
        return (
          <section aria-label={label} className="report-index-group" key={group}>
            <span className="report-group-label" data-group={group}>
              {label}
            </span>
            <ol>
              {groupReports.map((report) => (
                <li key={report.slug}>
                  <Link
                    aria-current={activeSlug === report.slug ? "page" : undefined}
                    className="report-row"
                    data-group={report.group}
                    href={localePath(locale, `/reports/${report.slug}`)}
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
          </section>
        )
      })}
    </nav>
  )
}

export function ReportChips({
  numbers,
  reports,
  locale,
}: {
  readonly numbers: readonly string[]
  readonly reports: readonly ReportSummary[]
  readonly locale: Locale
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
            href={localePath(locale, `/reports/${report.slug}`)}
            key={number}
          >
            {number}
          </Link>
        )
      })}
    </div>
  )
}
