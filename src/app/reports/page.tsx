import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  Gauge,
  Layers3,
  RadioTower,
  ShieldCheck,
  Target,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { reportPreviews, type ReportPreview } from "@/data/reports";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Reports",
  description: "Static local mock intelligence briefs for the ThreatScope portfolio dashboard.",
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

const totalSections = reportPreviews.reduce((total, report) => total + report.sections.length, 0);
const coverageAreas = Array.from(new Set(reportPreviews.map((report) => report.focus)));
const statusCounts = reportPreviews.reduce<Record<string, number>>((counts, report) => {
  counts[report.status] = (counts[report.status] ?? 0) + 1;
  return counts;
}, {});

function statusVariant(status: string) {
  if (status === "Ready") {
    return "success" as const;
  }

  if (status === "Draft") {
    return "medium" as const;
  }

  return "outline" as const;
}

function ReportBriefCard({
  featured = false,
  report,
}: {
  featured?: boolean;
  report: ReportPreview;
}) {
  const leadSection = report.sections[0];

  return (
    <Card
      className={cn(
        "surface-hover h-full overflow-hidden",
        featured && "border-primary/25 bg-card/95",
      )}
    >
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <Badge variant={statusVariant(report.status)}>{report.status}</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {dateFormatter.format(new Date(`${report.date}T00:00:00Z`))}
          </span>
          <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
          <span>{report.focus}</span>
        </div>
        <CardTitle className={cn("leading-tight", featured ? "text-2xl" : "text-lg")}>
          {report.title}
        </CardTitle>
        <CardDescription>{report.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        {leadSection ? (
          <p className={cn("text-pretty text-sm leading-6 text-muted-foreground", featured && "line-clamp-4")}>
            {leadSection.body}
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-3">
          <div className="metadata-tile">
            <div className="text-[11px] font-semibold uppercase text-muted-foreground">Sections</div>
            <div className="mt-1 font-mono text-lg font-semibold text-foreground">
              {report.sections.length}
            </div>
          </div>
          <div className="metadata-tile">
            <div className="text-[11px] font-semibold uppercase text-muted-foreground">Format</div>
            <div className="mt-1 truncate text-sm font-semibold text-foreground">Local Brief</div>
          </div>
        </div>

        <Button asChild className="w-full justify-between" variant={featured ? "default" : "outline"}>
          <Link href={`/reports/${report.slug}`}>
            Open Brief
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ReportsPage() {
  const [featuredReport, ...supportingReports] = reportPreviews;

  return (
    <div className="mx-auto max-w-[1440px] space-y-6">
      <section className="panel relative overflow-hidden p-5 sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent" />
        <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] xl:items-end">
          <div className="min-w-0">
            <p className="section-kicker">Intelligence reports</p>
            <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Briefing room for defensive decision support.
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-base leading-7 text-muted-foreground">
              Curated local briefs turn the actor dataset into portfolio-safe summaries for risk
              review, technique coverage, and executive-ready context.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <FileText className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Briefs
              </div>
              <div className="mt-1 font-mono text-lg font-semibold text-foreground">
                {reportPreviews.length}
              </div>
            </div>
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <Layers3 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Sections
              </div>
              <div className="mt-1 font-mono text-lg font-semibold text-foreground">
                {totalSections}
              </div>
            </div>
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Scope
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">Static local data</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border/60 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Briefing queue</p>
                <CardTitle className="mt-2 text-xl">Report Readiness</CardTitle>
                <CardDescription>Static briefs organized like an analyst handoff board</CardDescription>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            {reportPreviews.map((report, index) => (
              <div
                className="grid gap-3 rounded-lg border border-border/70 bg-muted/20 p-4 md:grid-cols-[48px_minmax(0,1fr)_auto] md:items-center"
                key={report.slug}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-background/35 font-mono text-xs font-semibold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={statusVariant(report.status)}>{report.status}</Badge>
                    <span className="text-xs font-medium text-muted-foreground">{report.focus}</span>
                  </div>
                  <h2 className="mt-2 text-base font-semibold leading-tight text-foreground">
                    {report.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{report.description}</p>
                </div>
                <Button asChild className="justify-between md:w-36" size="sm" variant="outline">
                  <Link href={`/reports/${report.slug}`}>
                    Open
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border/60 pb-4">
            <p className="section-kicker">Readiness</p>
            <CardTitle className="text-xl">Briefing Health</CardTitle>
            <CardDescription>Portfolio-safe report status at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div className="metadata-tile" key={status}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    {status}
                  </div>
                  <Badge variant={statusVariant(status)}>{count}</Badge>
                </div>
              </div>
            ))}
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <Gauge className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Review mode
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">Static analyst briefs</div>
            </div>
            <div className="metadata-tile">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                <RadioTower className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                External feeds
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">None connected</div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        {featuredReport ? <ReportBriefCard featured report={featuredReport} /> : null}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
          {supportingReports.map((report) => (
            <ReportBriefCard key={report.slug} report={report} />
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <p className="section-kicker">Coverage</p>
            <CardTitle>Brief Focus Areas</CardTitle>
            <CardDescription>Mapped from the local report set</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {coverageAreas.map((area) => (
              <span className="chip" key={area}>
                <Target className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {area}
              </span>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="section-kicker">Composition</p>
            <CardTitle>Analyst-Readable Structure</CardTitle>
            <CardDescription>Every brief uses repeatable sections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Purpose frames the decision context.</p>
            <p>Analyst notes capture defensive interpretation.</p>
            <p>Follow-up turns the brief into review work.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="section-kicker">Guardrails</p>
            <CardTitle>Portfolio-Safe Output</CardTitle>
            <CardDescription>No feeds, uploads, or generated reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Report content is static and sourced from the local mock dataset.</p>
            <p>Indicators remain defanged or documentation-range for safe display.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
