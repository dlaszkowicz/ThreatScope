import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, FileText, Layers3, ShieldCheck, Target } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReportBySlug, reportPreviews } from "@/data/reports";

export const dynamicParams = false;

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

function statusVariant(status: string) {
  if (status === "Ready") {
    return "success" as const;
  }

  if (status === "Draft") {
    return "medium" as const;
  }

  return "outline" as const;
}

export function generateStaticParams() {
  return reportPreviews.map((report) => ({
    slug: report.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = getReportBySlug(slug);

  if (!report) {
    return {
      title: "Report Not Found",
    };
  }

  return {
    title: report.title,
    description: report.description,
  };
}

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = getReportBySlug(slug);

  if (!report) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Button asChild variant="ghost">
        <Link href="/reports">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Reports
        </Link>
      </Button>

      <section className="panel relative overflow-hidden p-5 sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusVariant(report.status)}>{report.status}</Badge>
              <Badge variant="secondary">{report.focus}</Badge>
            </div>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              {report.title}
            </h1>
            <p className="mt-3 max-w-3xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              {report.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Published
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">
                {dateFormatter.format(new Date(`${report.date}T00:00:00Z`))}
              </div>
            </div>
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <Layers3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Sections
              </div>
              <div className="mt-1 font-mono text-lg font-semibold text-foreground">
                {report.sections.length}
              </div>
            </div>
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Source
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">Local Mock Brief</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {report.sections.map((section, index) => (
            <Card key={section.title}>
              <CardHeader className="border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 font-mono text-xs font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-5">
                <p className="text-pretty text-sm leading-6 text-muted-foreground">{section.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <p className="section-kicker">Brief controls</p>
            <CardTitle>Review Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <Target className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Focus
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">{report.focus}</div>
            </div>
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <FileText className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Artifact Type
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">Static local brief</div>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              This safe portfolio artifact is not a live threat report, production intelligence
              assessment, or operational security instruction.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
