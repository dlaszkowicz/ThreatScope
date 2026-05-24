import { AttackExplorer } from "@/components/attack/AttackExplorer";
import { PageHeader } from "@/components/layout/PageHeader";
import { allTechniques } from "@/data/threat-actors";

export const metadata = {
  title: "MITRE ATT&CK Explorer",
  description: "Explore locally mapped MITRE ATT&CK techniques across tracked actors.",
};

export default function AttackPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        description="Review defensive behavior mappings from the local dataset. Filter by tactic, search by technique ID, and jump back into the related actor profile."
        eyebrow="MITRE ATT&CK explorer"
        meta={[
          { label: "Mapped techniques", value: allTechniques.length },
          { label: "Data source", value: "Local mock" },
          { label: "Use case", value: "Coverage review" },
        ]}
        title="Technique Explorer"
      />

      <AttackExplorer />
    </div>
  );
}
