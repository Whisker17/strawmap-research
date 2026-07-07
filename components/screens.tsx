import { notFound } from "next/navigation"
import type { Locale } from "@/lib/i18n"
import { getResearchData } from "@/lib/research"
import { getLayerGuide } from "@/lib/roadmap"
import { DossierHeader } from "./DossierHeader"
import { AppendixCallout, LandingHero, LayerNav, StrawmapFigure, SynthesisTeaser } from "./Landing"
import { LayerDirections, LayerHero, LayerLimits, LayerPager, LayerReports } from "./LayerGuideView"
import { ReportIndex } from "./ReportIndex"
import { ReportReader, SourceRail } from "./ReportReader"
import {
  DependencySpine,
  EvidenceSection,
  MantleBoard,
  SynthesisBlock,
  SynthesisHero,
} from "./SynthesisSections"

export function HomeScreen({ locale }: { readonly locale: Locale }) {
  const data = getResearchData(locale)

  return (
    <div className="app-shell">
      <DossierHeader active="home" locale={locale} path="/" />
      <main className="landing-layout" id="content">
        <LandingHero locale={locale} />
        <StrawmapFigure locale={locale} />
        <LayerNav data={data} locale={locale} />
        <AppendixCallout data={data} locale={locale} />
        <SynthesisTeaser locale={locale} />
      </main>
    </div>
  )
}

export function LayerScreen({
  locale,
  layerId,
}: {
  readonly locale: Locale
  readonly layerId: string
}) {
  const guide = getLayerGuide(locale, layerId)
  if (guide === undefined) notFound()

  const data = getResearchData(locale)

  return (
    <div className="app-shell">
      <DossierHeader active={guide.id} locale={locale} path={`/layers/${guide.id}`} />
      <main className="layer-layout" id="content">
        <LayerHero guide={guide} locale={locale} />
        <LayerLimits guide={guide} locale={locale} />
        <LayerDirections guide={guide} locale={locale} reports={data.reports} />
        <LayerReports guide={guide} locale={locale} reports={data.reports} />
        <LayerPager guide={guide} locale={locale} />
      </main>
    </div>
  )
}

export function SynthesisScreen({ locale }: { readonly locale: Locale }) {
  const data = getResearchData(locale)

  return (
    <div className="app-shell">
      <DossierHeader active="synthesis" locale={locale} path="/synthesis" />
      <main className="synthesis-layout" id="content">
        <SynthesisHero data={data} locale={locale} />
        <SynthesisBlock data={data} locale={locale} />
        <DependencySpine data={data} locale={locale} />
        <MantleBoard data={data} locale={locale} />
        <EvidenceSection data={data} locale={locale} />
      </main>
    </div>
  )
}

export function ReportScreen({ locale, slug }: { readonly locale: Locale; readonly slug: string }) {
  const data = getResearchData(locale)
  const report = data.reports.find((candidate) => candidate.slug === slug)
  if (report === undefined) notFound()

  return (
    <div className="app-shell">
      <DossierHeader active={report.group} locale={locale} path={`/reports/${report.slug}`} />
      <main className="report-layout">
        <ReportIndex activeSlug={report.slug} locale={locale} reports={data.reports} />
        <ReportReader locale={locale} report={report} />
        <SourceRail locale={locale} report={report} />
      </main>
    </div>
  )
}
