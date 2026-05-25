import {
  Activity,
  ArrowUpRight,
  ClipboardList,
  CircleDot,
  Clock3,
  Crosshair,
  Database,
  Gauge,
  Layers3,
  Network,
  RadioTower,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Target,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

import { RecentCampaigns } from "@/components/dashboard/RecentCampaigns";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ThreatActorCard } from "@/components/dashboard/ThreatActorCard";
import { ThreatLevelChart } from "@/components/dashboard/ThreatLevelChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  allCampaigns,
  allIndicators,
  allTechniques,
  dashboardStats,
  threatActors,
} from "@/data/threat-actors";

const lastUpdated = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
}).format(new Date("2026-05-24T00:00:00Z"));

export default function Home() {
  const featuredActors = threatActors.slice(0, 3);
  const latestCampaign = allCampaigns[0];
  const criticalActors = threatActors.filter((actor) => actor.severity === "Critical");
  const trackedSectors = new Set(threatActors.flatMap((actor) => actor.targetSectors)).size;
  const mappedTactics = new Set(allTechniques.map((technique) => technique.tactic)).size;
  const operationSteps = [
    {
      description: "Mock actor, campaign, IOC, and malware records stay local.",
      icon: Database,
      label: "Ingest",
      value: `${threatActors.length} profiles`,
    },
    {
      description: "Critical and high severity profiles surface first for review.",
      icon: ShieldAlert,
      label: "Prioritize",
      value: `${criticalActors.length} critical`,
    },
    {
      description: "Technique mappings group behavior into defensive coverage.",
      icon: Network,
      label: "Map",
      value: `${mappedTactics} tactics`,
    },
    {
      description: "Safe indicators and report briefs support analyst triage.",
      icon: ClipboardList,
      label: "Review",
      value: `${allIndicators.length} IOCs`,
    },
  ];

  return (
    <div className="mx-auto max-w-[1440px] space-y-6">
      <section className="panel relative overflow-hidden p-5 sm:p-6 lg:p-7" id="dashboard">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent" />
        <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] lg:items-end">
          <div className="min-w-0 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <p className="section-kicker">ThreatScope command center</p>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-200">
                <CircleDot className="h-3 w-3 fill-emerald-300 text-emerald-300" aria-hidden="true" />
                Monitoring
              </span>
            </div>
            <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl">
              Operational threat picture for analyst triage.
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-base leading-7 text-muted-foreground">
              Local defensive intelligence shaped for actor prioritization, campaign context,
              ATT&CK coverage, malware tracking, IOC review, and SOC-ready notes.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip">
                <ShieldAlert className="h-3.5 w-3.5 text-rose-200" aria-hidden="true" />
                {criticalActors.length} critical profiles
              </span>
              <span className="chip">
                <Target className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {trackedSectors} sectors represented
              </span>
              <span className="chip">
                <Clock3 className="h-3.5 w-3.5 text-amber-200" aria-hidden="true" />
                Updated {lastUpdated}
              </span>
            </div>
          </div>

          <div className="grid w-full min-w-0 gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1">
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <Gauge className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Posture
              </div>
              <div className="mt-1 font-semibold text-foreground">Elevated watch</div>
            </div>
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <RadioTower className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Latest signal
              </div>
              <div className="mt-1 truncate font-semibold text-foreground">
                {latestCampaign?.targetSector ?? "No campaign notes"}
              </div>
            </div>
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <UserCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Analyst mode
              </div>
              <div className="mt-1 font-semibold text-foreground">Defensive review</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4" aria-label="Operational workflow">
        {operationSteps.map((step, index) => (
          <Card className="surface-hover overflow-hidden" key={step.label}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs font-semibold uppercase text-primary">{step.label}</p>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{step.value}</div>
                  <p className="mt-2 text-pretty text-xs leading-5 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" id="stats">
        <StatsCard
          description="Local mock profiles"
          detail="Actor watchlist"
          icon={ShieldAlert}
          tone="primary"
          title="Tracked Actors"
          value={dashboardStats.trackedActors}
        />
        <StatsCard
          description="Highest analyst priority"
          detail="Requires coverage review"
          icon={Siren}
          tone="rose"
          title="Critical Threats"
          value={dashboardStats.criticalThreats}
        />
        <StatsCard
          description="Recent activity notes"
          detail="Sorted by date"
          icon={Activity}
          tone="amber"
          title="Active Campaigns"
          value={dashboardStats.activeCampaigns}
        />
        <StatsCard
          description="Safe sample indicators"
          detail="Defanged examples"
          icon={Database}
          tone="sky"
          title="Known IOCs"
          value={dashboardStats.knownIocs}
        />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Operations board</p>
            <h2 className="mt-1 text-2xl font-semibold text-foreground">Campaign and coverage posture</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="chip">
              <ScanLine className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {allCampaigns.length} campaign notes
            </span>
            <span className="chip">
              <Layers3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {allTechniques.length} mapped techniques
            </span>
          </div>
        </div>

        <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <RecentCampaigns />
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-1">
            <ThreatLevelChart />
            <Card className="overflow-hidden">
              <CardHeader className="border-b border-border/60 pb-4">
                <p className="section-kicker">Coverage workbench</p>
                <CardTitle className="text-xl">ATT&CK Explorer</CardTitle>
                <CardDescription>Review technique coverage by tactic and actor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="metadata-tile">
                    <div className="text-[11px] font-semibold uppercase text-muted-foreground">
                      Techniques
                    </div>
                    <div className="mt-1 font-mono text-lg font-semibold text-foreground">
                      {allTechniques.length}
                    </div>
                  </div>
                  <div className="metadata-tile">
                    <div className="text-[11px] font-semibold uppercase text-muted-foreground">
                      Sectors
                    </div>
                    <div className="mt-1 font-mono text-lg font-semibold text-foreground">
                      {trackedSectors}
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-border/60 bg-background/30 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    Review path
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Use mapped techniques to compare actor behavior against defensive monitoring
                    themes before opening profile-level notes.
                  </p>
                </div>
                <Button asChild className="w-full justify-between" variant="outline">
                  <Link href="/attack">
                    <Crosshair className="h-4 w-4" aria-hidden="true" />
                    Open ATT&CK explorer
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Priority actors</p>
            <h2 className="mt-1 text-2xl font-semibold text-foreground">Watchlist preview</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/actors">
              View all actors
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredActors.map((actor) => (
            <ThreatActorCard actor={actor} key={actor.slug} />
          ))}
        </div>
      </section>
    </div>
  );
}
