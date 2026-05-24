import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatsCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
};

export function StatsCard({ title, value, description, icon: Icon }: StatsCardProps) {
  return (
    <Card className="surface-hover">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <CardTitle className="text-xs font-semibold uppercase leading-4 text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-md border border-primary/25 bg-primary/10 p-2.5 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-semibold leading-none text-foreground sm:text-[2.75rem]">
          {value}
        </div>
        <p className="mt-2 text-sm leading-5 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
