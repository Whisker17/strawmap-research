import { AlertTriangle, ArrowLeft, ArrowRight, Compass, FileText } from "lucide-react"
import Link from "next/link"
import { type Locale, localePath, ui } from "@/lib/i18n"
import { layerGuidesByLocale } from "@/lib/roadmap"
import type { LayerGuide, ReportSummary } from "@/lib/types"

function reportByNumber(reports: readonly ReportSummary[], number: string) {
  return reports.find((report) => report.number === number)
}

function splitLimit(limit: string): readonly [string, string] {
  const cjkIndex = limit.indexOf("：")
  if (cjkIndex > 0) return [limit.slice(0, cjkIndex), limit.slice(cjkIndex + 1)]
  const asciiIndex = limit.indexOf(": ")
  if (asciiIndex > 0) return [limit.slice(0, asciiIndex), limit.slice(asciiIndex + 2)]
  return [limit, ""]
}

export function LayerHero({
  guide,
  locale,
}: {
  readonly guide: LayerGuide
  readonly locale: Locale
}) {
  const strings = ui[locale]

  return (
    <section className="layer-hero" data-group={guide.id} aria-labelledby="layer-title">
      <Link className="back-link" href={localePath(locale, "/")}>
        <ArrowLeft aria-hidden="true" size={16} />
        {strings.backToHome}
      </Link>
      <span className="layer-hero-en">{guide.kicker}</span>
      <h1 id="layer-title">{guide.label}</h1>
      <div className="layer-role">
        <h2>{strings.layerRoleTitle}</h2>
        {guide.role.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}

export function LayerLimits({
  guide,
  locale,
}: {
  readonly guide: LayerGuide
  readonly locale: Locale
}) {
  const strings = ui[locale]

  return (
    <section className="layer-limits" aria-labelledby="layer-limits-title">
      <div className="section-heading">
        <AlertTriangle aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">{strings.limitsEyebrow}</span>
          <h2 id="layer-limits-title">{strings.limitsTitle}</h2>
        </div>
      </div>
      <ul className="limit-list">
        {guide.limits.map((limit) => {
          const [head, rest] = splitLimit(limit)
          return (
            <li key={limit}>
              <strong>{head}</strong>
              {rest.length > 0 ? <p>{rest}</p> : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function LayerDirections({
  guide,
  reports,
  locale,
}: {
  readonly guide: LayerGuide
  readonly reports: readonly ReportSummary[]
  readonly locale: Locale
}) {
  const strings = ui[locale]

  return (
    <section className="layer-directions" aria-labelledby="layer-directions-title">
      <div className="section-heading">
        <Compass aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">{strings.directionsEyebrow}</span>
          <h2 id="layer-directions-title">{strings.directionsTitle}</h2>
        </div>
      </div>
      <div className="direction-list">
        {guide.directions.map((direction, index) => (
          <article className="direction-card" key={direction.id}>
            <div className="direction-head">
              <span className="direction-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{direction.title}</h3>
                {direction.northStar !== undefined ? (
                  <span className="north-star-tag">✦ {direction.northStar}</span>
                ) : null}
              </div>
            </div>
            <p>{direction.summary}</p>
            <div className="direction-reports">
              {direction.reportNumbers.map((number) => {
                const report = reportByNumber(reports, number)
                if (report === undefined) return null
                return (
                  <Link
                    className="direction-report-link"
                    data-group={report.group}
                    href={localePath(locale, `/reports/${report.slug}`)}
                    key={number}
                  >
                    <span className="report-number">{number}</span>
                    <span>{report.shortTitle}</span>
                    <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function LayerReports({
  guide,
  reports,
  locale,
}: {
  readonly guide: LayerGuide
  readonly reports: readonly ReportSummary[]
  readonly locale: Locale
}) {
  const strings = ui[locale]
  const layerReports = reports.filter((report) => report.group === guide.id)

  return (
    <section className="layer-reports" aria-labelledby="layer-reports-title">
      <div className="section-heading">
        <FileText aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">{strings.layerReportsEyebrow}</span>
          <h2 id="layer-reports-title">{strings.layerReportsTitle}</h2>
        </div>
      </div>
      <div className="report-card-grid">
        {layerReports.map((report) => (
          <Link
            className="report-card"
            data-group={report.group}
            href={localePath(locale, `/reports/${report.slug}`)}
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

export function LayerPager({
  guide,
  locale,
}: {
  readonly guide: LayerGuide
  readonly locale: Locale
}) {
  const strings = ui[locale]
  const guides = layerGuidesByLocale[locale]
  const index = guides.findIndex((candidate) => candidate.id === guide.id)
  const previous = guides[index - 1]
  const next = guides[index + 1]

  return (
    <nav aria-label={strings.pagerLabel} className="layer-pager">
      {previous !== undefined ? (
        <Link className="pager-link" href={localePath(locale, `/layers/${previous.id}`)}>
          <ArrowLeft aria-hidden="true" size={15} />
          <span>
            <small>{strings.pagerPrevious}</small>
            {previous.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next !== undefined ? (
        <Link className="pager-link pager-next" href={localePath(locale, `/layers/${next.id}`)}>
          <span>
            <small>{strings.pagerNext}</small>
            {next.label}
          </span>
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      ) : (
        <Link className="pager-link pager-next" href={localePath(locale, "/synthesis")}>
          <span>
            <small>{strings.pagerAfterLayers}</small>
            {strings.pagerSynthesis}
          </span>
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      )}
    </nav>
  )
}
