import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DossierHeader } from "@/components/DossierHeader"
import {
  LayerDirections,
  LayerHero,
  LayerLimits,
  LayerPager,
  LayerReports,
} from "@/components/LayerGuideView"
import { getResearchData } from "@/lib/research"
import { getLayerGuide, layerGuides } from "@/lib/roadmap"

type LayerPageProps = {
  readonly params: Promise<{
    readonly id: string
  }>
}

export function generateStaticParams() {
  return layerGuides.map((guide) => ({ id: guide.id }))
}

export async function generateMetadata({ params }: LayerPageProps): Promise<Metadata> {
  const { id } = await params
  const guide = getLayerGuide(id)
  if (guide === undefined) return {}
  return {
    title: `${guide.label} | Ethereum Strawmap Dossier`,
    description: guide.tagline,
  }
}

export default async function LayerPage({ params }: LayerPageProps) {
  const { id } = await params
  const guide = getLayerGuide(id)
  if (guide === undefined) notFound()

  const data = getResearchData()

  return (
    <div className="app-shell">
      <DossierHeader active={guide.id} />
      <main className="layer-layout" id="content">
        <LayerHero guide={guide} />
        <LayerLimits guide={guide} />
        <LayerDirections guide={guide} reports={data.reports} />
        <LayerReports guide={guide} reports={data.reports} />
        <LayerPager guide={guide} />
      </main>
    </div>
  )
}
