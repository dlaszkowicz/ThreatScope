"use client";

import { useRef, useState } from "react";
import { Activity, Database, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navItems } from "@/components/layout/nav-items";
import { cn } from "@/lib/utils";

export function Topbar() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const showDashboardResults = () => {
    const trimmedQuery = query.trim();
    const target = trimmedQuery
      ? `/actors?q=${encodeURIComponent(trimmedQuery)}#actor-directory`
      : "/actors#actor-directory";

    if (pathname === "/actors") {
      router.replace(target, { scroll: false });
      window.requestAnimationFrame(() => {
        document.getElementById("actor-directory")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    router.push(target);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/82 backdrop-blur-xl">
      <div className="flex flex-col gap-3 px-4 py-3 sm:min-h-16 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0 lg:px-8 xl:px-10">
        <div className="min-w-0 shrink-0">
          <div className="truncate text-sm font-semibold text-foreground xl:hidden">ThreatScope</div>
          <div className="flex min-w-0 items-center gap-2 truncate text-xs font-medium text-muted-foreground">
            <Activity className="hidden h-3.5 w-3.5 text-primary sm:block" aria-hidden="true" />
            SOC intelligence console
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <form
            className="relative min-w-0 w-full sm:max-w-md"
            onSubmit={(event) => {
              event.preventDefault();
              showDashboardResults();
            }}
          >
            <Button
              aria-label="Show search results"
              className="absolute left-0 top-0 text-muted-foreground hover:text-foreground"
              type="submit"
              size="icon"
              variant="ghost"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Input
              aria-label="Search threat intelligence"
              autoComplete="off"
              className="pr-10 pl-10"
              name="global-threat-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search actors, sectors, IOCs…"
              ref={inputRef}
              spellCheck={false}
              value={query}
            />
            {query ? (
              <Button
                aria-label="Clear search"
                className="absolute right-0 top-0 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                size="icon"
                variant="ghost"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : null}
          </form>
          <Badge className="hidden shrink-0 items-center gap-1.5 sm:inline-flex" variant="outline">
            <Database className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Local Intel
          </Badge>
        </div>
      </div>
      <nav className="grid grid-cols-4 gap-1 border-t border-border/70 px-2 py-2 xl:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium text-muted-foreground transition-[background-color,border-color,color] duration-200 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                isActive && "border border-primary/25 bg-accent text-foreground shadow-panel",
              )}
              href={item.href}
              key={item.label}
            >
              <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
