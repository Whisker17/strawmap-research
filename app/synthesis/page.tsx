import type { Metadata } from "next"
import { DossierHeader } from "@/components/DossierHeader"
import {
  DependencySpine,
  EvidenceSection,
  MantleBoard,
  SynthesisBlock,
  SynthesisHero,
} from "@/components/SynthesisSections"
import { getResearchData } from "@/lib/research"

export const metadata: Metadata = {
  title: "综合结论与证据 | Ethereum Strawmap Dossier",
  description: "跨层核心发现、优化点依赖脉络、Mantle 关注线与全部来源验证记录。",
}

export default function SynthesisPage() {
  const data = getResearchData()

  return (
    <div className="app-shell">
      <DossierHeader active="synthesis" />
      <main className="synthesis-layout" id="content">
        <SynthesisHero data={data} />
        <SynthesisBlock data={data} />
        <DependencySpine data={data} />
        <MantleBoard data={data} />
        <EvidenceSection data={data} />
      </main>
    </div>
  )
}
