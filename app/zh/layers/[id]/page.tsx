import type { Metadata } from "next"
import { LayerScreen } from "@/components/screens"
import { getLayerGuide, layerGuidesByLocale } from "@/lib/roadmap"

type LayerPageProps = {
  readonly params: Promise<{
    readonly id: string
  }>
}

export function generateStaticParams() {
  return layerGuidesByLocale.zh.map((guide) => ({ id: guide.id }))
}

export async function generateMetadata({ params }: LayerPageProps): Promise<Metadata> {
  const { id } = await params
  const guide = getLayerGuide("zh", id)
  if (guide === undefined) return {}
  return {
    title: `${guide.label} | Ethereum Strawmap Dossier`,
    description: guide.tagline,
  }
}

export default async function ChineseLayerPage({ params }: LayerPageProps) {
  const { id } = await params
  return <LayerScreen layerId={id} locale="zh" />
}
