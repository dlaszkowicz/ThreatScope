import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, FileText } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReportBySlug, reportPreviews } from "@/data/reports";

export const dynamicParams = false;

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
    <div className="mx-auto max-w-5xl space-y-6">
      <Button asChild variant="ghost">
        <Link href="/reports">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to reports
        </Link>
      </Button>

      <section className="panel p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{report.status}</Badge>
          <Badge variant="secondary">{report.focus}</Badge>
        </div>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {report.title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
          {report.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-background/30 px-2 py-1">
            <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {report.date}
          </span>
          <span className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-background/30 px-2 py-1">
            <FileText className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Static local mock brief
          </span>
        </div>
      </section>

      <section className="space-y-4">
        {report.sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{section.body}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardContent className="p-5 text-sm leading-6 text-muted-foreground">
          This brief is a safe portfolio artifact based on local mock data only. It is not a live
          threat report, production intelligence assessment, or operational security instruction.
        </CardContent>
      </Card>
    </div>
  );
}
