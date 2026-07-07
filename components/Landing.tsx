import {
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  Compass,
  FileText,
  Map as MapIcon,
} from "lucide-react"
import Link from "next/link"
import { type Locale, localePath, ui } from "@/lib/i18n"
import type { ResearchData } from "@/lib/types"

export function LandingHero({ locale }: { readonly locale: Locale }) {
  const strings = ui[locale]

  return (
    <section className="landing-hero" aria-labelledby="landing-title">
      <span className="eyebrow">{strings.heroEyebrow}</span>
      <h1 id="landing-title">{strings.heroTitle}</h1>
      <p className="landing-lead">{strings.heroLead}</p>
      <ol className="reading-steps" aria-label={strings.readingPathLabel}>
        {strings.readingSteps.map((step, index) => (
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

export function StrawmapFigure({ locale }: { readonly locale: Locale }) {
  const strings = ui[locale]

  return (
    <section className="strawmap-section" aria-labelledby="strawmap-title">
      <div className="section-heading">
        <MapIcon aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">{strings.strawmapEyebrow}</span>
          <h2 id="strawmap-title">{strings.strawmapTitle}</h2>
        </div>
      </div>
      <p className="section-lead">{strings.strawmapLead}</p>
      <figure className="strawmap-figure">
        <a href="/strawmap-original.png" rel="noreferrer" target="_blank">
          {/* biome-ignore lint/performance/noImgElement: static export serves the original file directly */}
          <img alt={strings.strawmapAlt} height={1906} src="/strawmap-original.png" width={2500} />
        </a>
        <figcaption>
          {strings.strawmapCaptionSource}
          <a href="https://strawmap.org/" rel="noreferrer" target="_blank">
            strawmap.org
          </a>
          {strings.strawmapCaptionNote}
        </figcaption>
      </figure>
    </section>
  )
}

export function LayerNav({
  data,
  locale,
}: {
  readonly data: ResearchData
  readonly locale: Locale
}) {
  const strings = ui[locale]

  return (
    <section className="layer-nav-section" aria-labelledby="layer-nav-title">
      <div className="section-heading">
        <Compass aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">{strings.layerNavEyebrow}</span>
          <h2 id="layer-nav-title">{strings.layerNavTitle}</h2>
        </div>
      </div>
      <p className="section-lead">{strings.layerNavLead}</p>
      <div className="layer-nav-grid">
        {data.layerGuides.map((guide) => {
          const reports = data.reports.filter((report) => report.group === guide.id)
          return (
            <Link
              className="layer-nav-card"
              data-group={guide.id}
              href={localePath(locale, `/layers/${guide.id}`)}
              key={guide.id}
            >
              <span className="layer-nav-en">{guide.kicker}</span>
              <h3>{guide.label}</h3>
              <p>{guide.tagline}</p>
              <span className="layer-nav-meta">
                {strings.layerNavMeta(guide.directions.length, reports.length)}
                <ArrowRight aria-hidden="true" size={15} />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export function AppendixCallout({
  data,
  locale,
}: {
  readonly data: ResearchData
  readonly locale: Locale
}) {
  const strings = ui[locale]
  const appendices = data.reports.filter((report) => report.group === "appendix")

  return (
    <section className="appendix-section" aria-labelledby="appendix-title">
      <div className="section-heading">
        <BookMarked aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">{strings.appendixEyebrow}</span>
          <h2 id="appendix-title">{strings.appendixTitle}</h2>
        </div>
      </div>
      <p className="section-lead">{strings.appendixLead}</p>
      <div className="appendix-grid">
        {appendices.map((report) => (
          <Link
            className="appendix-card"
            href={localePath(locale, `/reports/${report.slug}`)}
            key={report.slug}
          >
            <span className="report-card-number">{report.number}</span>
            <h3>{report.shortTitle}</h3>
            <p>{report.conclusionExcerpt || report.coverage}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function SynthesisTeaser({ locale }: { readonly locale: Locale }) {
  const strings = ui[locale]

  return (
    <section className="teaser-section" aria-labelledby="teaser-title">
      <div className="teaser-card">
        <div>
          <span className="eyebrow">{strings.teaserEyebrow}</span>
          <h2 id="teaser-title">{strings.teaserTitle}</h2>
          <p>{strings.teaserBody}</p>
        </div>
        <div className="teaser-links">
          <Link className="primary-link" href={localePath(locale, "/synthesis")}>
            {strings.teaserSynthesisLink}
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
          <Link className="primary-link" href="/REPORT_PACK.pdf">
            <FileText aria-hidden="true" size={15} />
            {strings.teaserPdfLink}
            <ArrowUpRight aria-hidden="true" size={13} />
          </Link>
        </div>
      </div>
    </section>
  )
}
