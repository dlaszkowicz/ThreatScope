import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  detail?: string;
  tone?: "primary" | "rose" | "amber" | "sky";
};

const toneStyles = {
  primary: {
    icon: "border-primary/30 bg-primary/10 text-primary",
    rail: "from-primary/70",
  },
  rose: {
    icon: "border-rose-500/30 bg-rose-500/10 text-rose-200",
    rail: "from-rose-400/75",
  },
  amber: {
    icon: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    rail: "from-amber-300/75",
  },
  sky: {
    icon: "border-sky-500/30 bg-sky-500/10 text-sky-200",
    rail: "from-sky-300/75",
  },
};

export function StatsCard({
  title,
  value,
  description,
  detail,
  icon: Icon,
  tone = "primary",
}: StatsCardProps) {
  const styles = toneStyles[tone];

  return (
    <Card className="surface-hover relative overflow-hidden">
      <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent", styles.rail)} />
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <CardTitle className="text-xs font-semibold uppercase leading-4 text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("rounded-md border p-2.5", styles.icon)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="font-mono text-4xl font-semibold leading-none text-foreground sm:text-[2.65rem]">
          {value}
        </div>
        <p className="mt-2 text-sm leading-5 text-muted-foreground">{description}</p>
        {detail ? (
          <div className="mt-4 rounded-md border border-border/60 bg-background/30 px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
            {detail}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
