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
    <Card className="h-full hover:border-primary/25 hover:bg-card">
      <CardHeader>
        <div className="flex flex-wrap gap-2">
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
        <div className="flex flex-wrap gap-2">
          {actor.targetSectors.slice(0, 3).map((sector) => (
            <span
              className="rounded-md border border-border/80 bg-muted/40 px-2 py-1 text-xs font-medium text-muted-foreground"
              key={sector}
            >
              {sector}
            </span>
          ))}
        </div>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/actors/${actor.slug}`}>
            View profile
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
