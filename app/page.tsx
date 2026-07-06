import { DossierHeader } from "@/components/DossierHeader"
import {
  AppendixCallout,
  LandingHero,
  LayerNav,
  StrawmapFigure,
  SynthesisTeaser,
} from "@/components/Landing"
import { getResearchData } from "@/lib/research"

export default function HomePage() {
  const data = getResearchData()

  return (
    <div className="app-shell">
      <DossierHeader active="home" />
      <main className="landing-layout" id="content">
        <LandingHero />
        <StrawmapFigure />
        <LayerNav data={data} />
        <AppendixCallout data={data} />
        <SynthesisTeaser />
      </main>
    </div>
  )
}
