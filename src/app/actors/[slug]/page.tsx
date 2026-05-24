import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ActorHeader } from "@/components/actors/ActorHeader";
import { ActorOverview } from "@/components/actors/ActorOverview";
import { CampaignTimeline } from "@/components/actors/CampaignTimeline";
import { DetectionNotes } from "@/components/actors/DetectionNotes";
import { IocTable } from "@/components/actors/IocTable";
import { MalwareList } from "@/components/actors/MalwareList";
import { MitreTechniqueList } from "@/components/actors/MitreTechniqueList";
import { Button } from "@/components/ui/button";
import { getActorBySlug, threatActors } from "@/data/threat-actors";

export function generateStaticParams() {
  return threatActors.map((actor) => ({
    slug: actor.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const actor = getActorBySlug(slug);

  if (!actor) {
    return {
      title: "Actor Not Found | ThreatScope",
    };
  }

  return {
    title: `${actor.name} | ThreatScope`,
    description: actor.summary,
  };
}

export default async function ActorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const actor = getActorBySlug(slug);

  if (!actor) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Button asChild variant="ghost">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to dashboard
        </Link>
      </Button>

      <ActorHeader actor={actor} />
      <ActorOverview actor={actor} />

      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        <MitreTechniqueList techniques={actor.techniques} />
        <MalwareList malware={actor.malware} />
      </section>

      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <IocTable iocs={actor.iocs} />
        <CampaignTimeline campaigns={actor.campaigns} />
      </section>

      <DetectionNotes notes={actor.detectionNotes} />
    </div>
  );
}
