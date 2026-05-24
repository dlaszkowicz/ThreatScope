import { ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";
import { reportPreviews } from "@/data/reports";

export const metadata = {
  title: "Reports",
  description: "Static local mock intelligence briefs for the ThreatScope portfolio dashboard.",
};

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        description="Static portfolio-friendly reports built from local mock data. No backend, uploads, external feeds, or report generation is included in the current MVP."
        eyebrow="Reports"
        meta={[
          { label: "Briefs", value: reportPreviews.length },
          { label: "Source", value: "Static local data" },
          { label: "Scope", value: "Portfolio-safe" },
        ]}
        title="Mock intelligence briefs"
      />

      <section className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reportPreviews.map((report) => (
          <Card className="surface-hover h-full" key={report.title}>
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
              <Button asChild className="w-full justify-between" variant="outline">
                <Link href={`/reports/${report.slug}`}>
                  Open brief
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
