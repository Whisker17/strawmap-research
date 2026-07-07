import type { Metadata } from "next"
import { ReportScreen } from "@/components/screens"
import { getReportBySlug, getResearchData } from "@/lib/research"

type ReportPageProps = {
  readonly params: Promise<{
    readonly slug: string
  }>
}

export function generateStaticParams() {
  return getResearchData("zh").reports.map((report) => ({
    slug: report.slug,
  }))
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const { slug } = await params
  const report = getReportBySlug("zh", slug)
  if (report === undefined) return {}
  return {
    title: `${report.shortTitle} | Ethereum Strawmap Dossier`,
    description: report.conclusionExcerpt || report.coverage,
  }
}

export default async function ChineseReportPage({ params }: ReportPageProps) {
  const { slug } = await params
  return <ReportScreen locale="zh" slug={slug} />
}
