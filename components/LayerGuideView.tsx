import { AlertTriangle, ArrowLeft, ArrowRight, Compass, FileText } from "lucide-react"
import Link from "next/link"
import { layerGuides } from "@/lib/roadmap"
import type { LayerGuide, ReportSummary } from "@/lib/types"

function reportByNumber(reports: readonly ReportSummary[], number: string) {
  return reports.find((report) => report.number === number)
}

export function LayerHero({ guide }: { readonly guide: LayerGuide }) {
  return (
    <section className="layer-hero" data-group={guide.id} aria-labelledby="layer-title">
      <Link className="back-link" href="/">
        <ArrowLeft aria-hidden="true" size={16} />
        返回首页
      </Link>
      <span className="layer-hero-en">{guide.enLabel}</span>
      <h1 id="layer-title">{guide.label}</h1>
      <div className="layer-role">
        <h2>这一层做了什么</h2>
        {guide.role.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}

export function LayerLimits({ guide }: { readonly guide: LayerGuide }) {
  return (
    <section className="layer-limits" aria-labelledby="layer-limits-title">
      <div className="section-heading">
        <AlertTriangle aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Why change</span>
          <h2 id="layer-limits-title">现在的缺陷与限制</h2>
        </div>
      </div>
      <ul className="limit-list">
        {guide.limits.map((limit) => {
          const [head, ...rest] = limit.split("：")
          return (
            <li key={limit}>
              <strong>{head}</strong>
              {rest.length > 0 ? <p>{rest.join("：")}</p> : null}
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
}: {
  readonly guide: LayerGuide
  readonly reports: readonly ReportSummary[]
}) {
  return (
    <section className="layer-directions" aria-labelledby="layer-directions-title">
      <div className="section-heading">
        <Compass aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Where it goes</span>
          <h2 id="layer-directions-title">未来的优化方向</h2>
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
                    href={`/reports/${report.slug}`}
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
}: {
  readonly guide: LayerGuide
  readonly reports: readonly ReportSummary[]
}) {
  const layerReports = reports.filter((report) => report.group === guide.id)

  return (
    <section className="layer-reports" aria-labelledby="layer-reports-title">
      <div className="section-heading">
        <FileText aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Deep dives</span>
          <h2 id="layer-reports-title">本层的研究报告</h2>
        </div>
      </div>
      <div className="report-card-grid">
        {layerReports.map((report) => (
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

export function LayerPager({ guide }: { readonly guide: LayerGuide }) {
  const index = layerGuides.findIndex((candidate) => candidate.id === guide.id)
  const previous = layerGuides[index - 1]
  const next = layerGuides[index + 1]

  return (
    <nav aria-label="相邻阅读线" className="layer-pager">
      {previous !== undefined ? (
        <Link className="pager-link" href={`/layers/${previous.id}`}>
          <ArrowLeft aria-hidden="true" size={15} />
          <span>
            <small>上一条阅读线</small>
            {previous.label}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next !== undefined ? (
        <Link className="pager-link pager-next" href={`/layers/${next.id}`}>
          <span>
            <small>下一条阅读线</small>
            {next.label}
          </span>
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      ) : (
        <Link className="pager-link pager-next" href="/synthesis">
          <span>
            <small>读完四条线之后</small>
            综合结论与证据
          </span>
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      )}
    </nav>
  )
}
