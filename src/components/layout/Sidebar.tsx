"use client";

import { Activity, Database, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/components/layout/nav-items";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 border-r border-border/70 bg-background/80 backdrop-blur-xl xl:flex xl:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-border/70 px-5">
        <span className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-primary/35 bg-primary/10 text-primary shadow-panel">
          <span className="absolute inset-1 rounded-md border border-primary/15" aria-hidden="true" />
          <Shield className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <div className="truncate text-base font-semibold leading-5 text-foreground">ThreatScope</div>
          <div className="truncate text-xs font-medium text-muted-foreground">Intelligence operations</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Primary navigation">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase text-muted-foreground">
          Command
        </div>
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-[background-color,border-color,color] duration-200 hover:bg-accent/80 hover:text-foreground",
                isActive && "border border-primary/25 bg-accent/85 text-foreground shadow-panel",
              )}
              href={item.href}
              key={item.label}
            >
              {isActive ? (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
              ) : null}
              <item.icon
                className={cn("h-4 w-4 transition-colors group-hover:text-primary", isActive && "text-primary")}
                aria-hidden="true"
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="rounded-lg border border-border/70 bg-card/70 p-3 ring-1 ring-white/[0.025]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
              <Activity className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Sensor Mode
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.45)]" />
          </div>
          <div className="mt-2 text-sm font-semibold text-foreground">Local Intel Lab</div>
          <div className="mt-3 flex items-center gap-2 rounded-md border border-border/60 bg-background/35 px-2 py-1.5 text-xs text-muted-foreground">
            <Database className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Static dataset, no live feeds
          </div>
        </div>
      </div>
    </aside>
  );
}
