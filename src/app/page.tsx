import {
  Activity,
  ArrowUpRight,
  CircleDot,
  Clock3,
  Crosshair,
  Database,
  RadioTower,
  ShieldAlert,
  Siren,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

import { RecentCampaigns } from "@/components/dashboard/RecentCampaigns";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ThreatActorCard } from "@/components/dashboard/ThreatActorCard";
import { ThreatLevelChart } from "@/components/dashboard/ThreatLevelChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats, threatActors } from "@/data/threat-actors";

export default function Home() {
  const featuredActors = threatActors.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
      <section className="panel overflow-hidden p-5 sm:p-6" id="dashboard">
        <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <p className="section-kicker">Threat intelligence overview</p>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-200">
                <CircleDot className="h-3 w-3 fill-emerald-300 text-emerald-300" aria-hidden="true" />
                Tracking
              </span>
            </div>
            <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl">
              ThreatScope Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              A defensive threat intelligence overview for actor tracking, campaign context,
              ATT&CK mappings, malware notes, IOCs, and SOC analyst guidance.
            </p>
          </div>

          <div className="grid w-full min-w-0 gap-3 text-sm sm:grid-cols-3 lg:w-[420px] lg:grid-cols-1 xl:w-[460px] xl:grid-cols-3">
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <UserCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Analyst
              </div>
              <div className="mt-1 font-medium text-foreground">Monitoring</div>
            </div>
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <RadioTower className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Dataset
              </div>
              <div className="mt-1 font-medium text-foreground">Local mock</div>
            </div>
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Updated
              </div>
              <div className="mt-1 font-medium text-foreground">May 24</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" id="stats">
        <StatsCard
          description="Local mock profiles"
          icon={ShieldAlert}
          title="Tracked Actors"
          value={dashboardStats.trackedActors}
        />
        <StatsCard
          description="Highest analyst priority"
          icon={Siren}
          title="Critical Threats"
          value={dashboardStats.criticalThreats}
        />
        <StatsCard
          description="Recent activity notes"
          icon={Activity}
          title="Active Campaigns"
          value={dashboardStats.activeCampaigns}
        />
        <StatsCard
          description="Safe sample indicators"
          icon={Database}
          title="Known IOCs"
          value={dashboardStats.knownIocs}
        />
      </section>

      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
        <RecentCampaigns />
        <div className="space-y-5">
          <ThreatLevelChart />
          <Card>
            <CardHeader>
              <CardTitle>ATT&CK Explorer</CardTitle>
              <CardDescription>Browse mapped techniques by tactic and actor</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/attack">
                  <Crosshair className="h-4 w-4" aria-hidden="true" />
                  Open ATT&CK explorer
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Priority actors</p>
            <h2 className="mt-1 text-2xl font-semibold text-foreground">Tracked actor preview</h2>
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
