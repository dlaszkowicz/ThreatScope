import { ArrowUpRight, Clock3 } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { allCampaigns } from "@/data/threat-actors";
import { getSeverityTone } from "@/lib/severity";

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

export function RecentCampaigns() {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-kicker">Campaign stream</p>
            <CardTitle className="mt-2 text-xl">Recent Campaigns</CardTitle>
            <CardDescription>Mock report notes sorted by most recent activity</CardDescription>
          </div>
          <Badge className="shrink-0" variant="outline">
            {allCampaigns.length} notes
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        <ol className="space-y-3">
          {allCampaigns.slice(0, 5).map((campaign) => (
            <li
              className="group relative overflow-hidden rounded-lg border border-border/70 bg-muted/20 p-4 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-muted/30"
              key={`${campaign.title}-${campaign.date}`}
            >
              <div className="absolute inset-y-4 left-0 w-0.5 rounded-r-full bg-primary/60" />
              <div className="flex flex-wrap items-center gap-2">
                <time className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Clock3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {dateFormatter.format(new Date(`${campaign.date}T00:00:00Z`))}
                </time>
                <Badge variant={getSeverityTone(campaign.severity)}>{campaign.severity}</Badge>
                <Badge variant="outline">{campaign.actor}</Badge>
              </div>
              <h3 className="mt-2 text-[15px] font-semibold leading-5 text-foreground">
                <Link
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                  href={`/actors/${campaign.slug}`}
                >
                  {campaign.title}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {campaign.description}
              </p>
              <div className="mt-3 inline-flex rounded-md border border-border/60 bg-background/30 px-2 py-1 text-xs font-medium text-muted-foreground">
                Target: <span className="ml-1 text-foreground">{campaign.targetSector}</span>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
