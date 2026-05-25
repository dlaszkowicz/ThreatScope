import { ArrowUpRight, MapPin, ShieldAlert } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSeverityTone } from "@/lib/severity";
import { cn } from "@/lib/utils";
import type { ThreatActor } from "@/types/threat";

type ThreatActorCardProps = {
  actor: ThreatActor;
};

const severityRail = {
  Critical: "bg-rose-400",
  High: "bg-amber-300",
  Medium: "bg-sky-300",
  Low: "bg-slate-400",
};

export function ThreatActorCard({ actor }: ThreatActorCardProps) {
  const monogram = actor.name
    .split(/[\s/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <Card className="surface-hover group relative h-full overflow-hidden">
      <div className={cn("absolute inset-x-0 top-0 h-px", severityRail[actor.severity])} />
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 font-mono text-sm font-semibold text-primary">
              {monogram}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{actor.type}</Badge>
                <Badge variant={getSeverityTone(actor.severity)}>{actor.severity}</Badge>
              </div>
              <CardTitle className="mt-2 text-xl leading-tight">{actor.name}</CardTitle>
            </div>
          </div>
          <ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
        </div>
        <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {actor.attributedCountry}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{actor.summary}</p>
        <div className="grid grid-cols-2 gap-2 border-t border-border/70 pt-4 text-xs">
          <div className="metadata-tile">
            <div className="font-semibold uppercase text-muted-foreground">Techniques</div>
            <div className="mt-1 font-mono text-base font-semibold text-foreground">
              {actor.techniques.length}
            </div>
          </div>
          <div className="metadata-tile">
            <div className="font-semibold uppercase text-muted-foreground">Tooling</div>
            <div className="mt-1 font-mono text-base font-semibold text-foreground">
              {actor.malware.length}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {actor.targetSectors.slice(0, 3).map((sector) => (
            <span className="chip" key={sector}>
              {sector}
            </span>
          ))}
        </div>
        <Button asChild className="w-full justify-between" variant="outline">
          <Link href={`/actors/${actor.slug}`}>
            View profile
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
