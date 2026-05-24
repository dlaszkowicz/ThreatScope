import { ActorDirectory } from "@/components/actors/ActorDirectory";
import { PageHeader } from "@/components/layout/PageHeader";
import { dashboardStats } from "@/data/threat-actors";

export const metadata = {
  title: "Threat Actors",
  description: "Search and filter local mock threat actor profiles.",
};

export default function ActorsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        description="Search local mock profiles by actor name, alias, country, sector, severity, technique, malware family, campaign context, or IOC note."
        eyebrow="Threat actor directory"
        meta={[
          { label: "Tracked actors", value: dashboardStats.trackedActors },
          { label: "Critical profiles", value: dashboardStats.criticalThreats },
          { label: "Known IOCs", value: dashboardStats.knownIocs },
        ]}
        title="Actors"
      />

      <ActorDirectory />
    </div>
  );
}
