import { DossierHeader } from "@/components/DossierHeader"
import { EvidencePanel } from "@/components/EvidencePanel"
import {
  DependencySpine,
  LayerAtlas,
  MantleBoard,
  OverviewHero,
  ReportGrid,
  SynthesisBlock,
} from "@/components/OverviewSections"
import { ReportIndex } from "@/components/ReportIndex"
import { getResearchData } from "@/lib/research"

export default function HomePage() {
  const data = getResearchData()

  return (
    <div className="app-shell">
      <DossierHeader metrics={data.metrics} variant="overview" />
      <main className="overview-layout" id="content">
        <ReportIndex reports={data.reports} />
        <div className="overview-main">
          <OverviewHero data={data} />
          <LayerAtlas data={data} />
          <DependencySpine data={data} />
          <MantleBoard data={data} />
          <SynthesisBlock data={data} />
          <ReportGrid reports={data.reports} />
        </div>
        <EvidencePanel
          hosts={data.sourceHosts}
          metrics={data.metrics}
          statusCorrections={data.statusCorrections}
        />
      </main>
    </div>
  )
}
