"use client";

import { useSyncExternalStore } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { actorTypeDistribution } from "@/data/threat-actors";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];
const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;
const totalActors = actorTypeDistribution.reduce((total, item) => total + item.value, 0);
const primaryType =
  actorTypeDistribution.length > 0
    ? actorTypeDistribution.reduce((top, item) => (item.value > top.value ? item : top))
    : null;

export function ThreatLevelChart() {
  const isClient = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border/60 pb-4">
        <p className="section-kicker">Dataset profile</p>
        <CardTitle className="text-xl">Actor Types</CardTitle>
        <CardDescription>Distribution of tracked profiles by category</CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="metadata-tile">
            <div className="text-[10px] font-semibold uppercase text-muted-foreground">Actors</div>
            <div className="mt-1 font-mono text-lg font-semibold text-foreground">{totalActors}</div>
          </div>
          <div className="metadata-tile">
            <div className="text-[10px] font-semibold uppercase text-muted-foreground">Categories</div>
            <div className="mt-1 font-mono text-lg font-semibold text-foreground">
              {actorTypeDistribution.length}
            </div>
          </div>
          <div className="metadata-tile">
            <div className="text-[10px] font-semibold uppercase text-muted-foreground">Dominant</div>
            <div className="mt-1 truncate text-sm font-semibold text-foreground">
              {primaryType?.name ?? "None"}
            </div>
          </div>
        </div>
        <div
          className="relative flex h-56 min-w-0 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-background/35 sm:h-60"
          aria-hidden="true"
        >
          {isClient ? (
            <ResponsiveContainer height="100%" width="100%">
              <PieChart margin={{ bottom: 8, left: 8, right: 8, top: 8 }}>
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 10px 28px rgba(0, 0, 0, 0.22)",
                    color: "hsl(var(--popover-foreground))",
                    fontSize: "12px",
                  }}
                  formatter={(value, name) => [`${value} actors`, name]}
                />
                <Pie
                  cx="50%"
                  cy="48%"
                  data={actorTypeDistribution}
                  dataKey="value"
                  innerRadius={58}
                  outerRadius={80}
                  paddingAngle={5}
                  stroke="hsl(var(--card))"
                  strokeWidth={4}
                >
                  {actorTypeDistribution.map((entry, index) => (
                    <Cell fill={colors[index % colors.length]} key={entry.name} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative h-36 w-36 animate-pulse rounded-full border-[22px] border-muted/80">
                <div className="absolute inset-8 rounded-full bg-card" />
                <span className="sr-only">Preparing actor type chart</span>
              </div>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-semibold leading-none text-foreground">{totalActors}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase text-muted-foreground">
                Actors
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2" aria-label="Actor type distribution">
          {actorTypeDistribution.map((item, index) => (
            <div
              className="flex items-center justify-between gap-3 rounded-md border border-border/60 bg-muted/20 px-3 py-2.5"
              key={item.name}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="truncate text-sm font-medium text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="font-mono text-foreground">{item.value}</span>
                <span className="rounded bg-background/60 px-1.5 py-0.5">
                  {totalActors > 0 ? Math.round((item.value / totalActors) * 100) : 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
        {primaryType ? (
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Dominant category: <span className="font-medium text-foreground">{primaryType.name}</span>
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
