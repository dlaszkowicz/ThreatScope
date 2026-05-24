import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSeverityTone } from "@/lib/severity";
import type { ThreatActor } from "@/types/threat";

type ThreatActorCardProps = {
  actor: ThreatActor;
};

export function ThreatActorCard({ actor }: ThreatActorCardProps) {
  return (
    <Card className="surface-hover h-full">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{actor.type}</Badge>
          <Badge variant={getSeverityTone(actor.severity)}>{actor.severity}</Badge>
        </div>
        <div className="min-w-0 pt-2">
          <CardTitle className="text-xl leading-tight">{actor.name}</CardTitle>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {actor.attributedCountry}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{actor.summary}</p>
        <div className="flex flex-wrap gap-2 border-t border-border/70 pt-4">
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
