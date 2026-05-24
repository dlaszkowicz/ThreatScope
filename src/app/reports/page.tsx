import { ArrowUpRight, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { reportPreviews } from "@/data/reports";

export const metadata = {
  title: "Reports | ThreatScope",
  description: "Placeholder report module for future local mock intelligence briefs.",
};

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-lg border border-border/85 bg-card/95 p-5 shadow-panel ring-1 ring-white/[0.025]">
        <p className="text-xs font-semibold uppercase text-primary">Reports</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Reports module coming later
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          This route is reserved for future portfolio-friendly intelligence briefs. No backend,
          uploads, external feeds, or report generation is included in the current MVP.
        </p>
      </section>

      <section className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reportPreviews.map((report) => (
          <Card className="h-full hover:border-primary/25 hover:bg-card" key={report.title}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-md border border-primary/25 bg-primary/10 p-2 text-primary">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                </span>
                <Badge variant="outline">{report.status}</Badge>
              </div>
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                Static placeholder, no report workflow yet
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
