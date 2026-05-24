"use client";

import { useSyncExternalStore } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { actorTypeDistribution } from "@/data/threat-actors";

const colors = ["#2dd4bf", "#fb7185", "#38bdf8", "#a78bfa", "#f59e0b"];
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
    <Card>
      <CardHeader>
        <CardTitle>Actor Types</CardTitle>
        <CardDescription>Current local dataset by actor category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative flex h-56 min-w-0 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-background/35 sm:h-60">
          {isClient ? (
            <PieChart height={220} width={260}>
              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--popover-foreground))",
                  boxShadow: "0 10px 28px rgba(0, 0, 0, 0.22)",
                  fontSize: "12px",
                }}
                formatter={(value, name) => [`${value} actors`, name]}
              />
              <Pie
                cx={130}
                cy={106}
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
          ) : (
            <div className="flex h-full items-center justify-center text-xs font-medium text-muted-foreground">
              Preparing chart
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
        <div className="mt-4 space-y-2">
          {actorTypeDistribution.map((item, index) => (
            <div
              className="flex items-center justify-between gap-3 rounded-md border border-border/60 bg-muted/20 px-3 py-2"
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
                <span>{item.value}</span>
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
