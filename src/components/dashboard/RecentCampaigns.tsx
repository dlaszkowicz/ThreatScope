import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { allCampaigns } from "@/data/threat-actors";
import Link from "next/link";

export function RecentCampaigns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Campaigns</CardTitle>
        <CardDescription>Latest campaign notes from local mock data</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-4 border-l border-border pl-5">
          {allCampaigns.slice(0, 4).map((campaign) => (
            <li className="relative rounded-md border border-transparent p-2 transition-colors hover:border-border/70 hover:bg-muted/20" key={`${campaign.title}-${campaign.date}`}>
              <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border border-background bg-primary" />
              <div className="flex flex-wrap items-center gap-2">
                <time className="text-xs font-medium text-muted-foreground">{campaign.date}</time>
                <Badge variant="outline">{campaign.actor}</Badge>
              </div>
              <h3 className="mt-2 text-[15px] font-semibold leading-5 text-foreground">
                <Link className="transition-colors hover:text-primary" href={`/actors/${campaign.slug}`}>
                  {campaign.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {campaign.description}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
