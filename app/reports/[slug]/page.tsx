import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DossierHeader } from "@/components/DossierHeader"
import { ReportIndex } from "@/components/ReportIndex"
import { ReportReader, SourceRail } from "@/components/ReportReader"
import { getReportBySlug, getResearchData } from "@/lib/research"

type ReportPageProps = {
  readonly params: Promise<{
    readonly slug: string
  }>
}

export function generateStaticParams() {
  return getResearchData().reports.map((report) => ({
    slug: report.slug,
  }))
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const { slug } = await params
  const report = getReportBySlug(slug)
  if (report === undefined) return {}
  return {
    title: `${report.shortTitle} | Ethereum Strawmap Dossier`,
    description: report.conclusionExcerpt || report.coverage,
  }
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { slug } = await params
  const data = getResearchData()
  const report = data.reports.find((candidate) => candidate.slug === slug)
  if (report === undefined) notFound()

  return (
    <div className="app-shell">
      <DossierHeader metrics={data.metrics} variant="report" />
      <main className="report-layout">
        <ReportIndex activeSlug={report.slug} reports={data.reports} />
        <ReportReader report={report} />
        <SourceRail report={report} />
      </main>
    </div>
  )
}
