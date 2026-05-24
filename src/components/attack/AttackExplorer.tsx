"use client";

import { useMemo, useState } from "react";
import { Crosshair, Search, X } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { allTechniques } from "@/data/threat-actors";
import { buildFilterOptions, filterTechniques, type FilterOption } from "@/lib/threat-search";
import { cn } from "@/lib/utils";

const tacticFilters = buildFilterOptions(allTechniques.map((technique) => technique.tactic));

export function AttackExplorer() {
  const [query, setQuery] = useState("");
  const [tactic, setTactic] = useState<FilterOption<string>>("All");

  const filteredTechniques = useMemo(
    () => filterTechniques(allTechniques, { query, tactic }),
    [query, tactic],
  );

  const resetFilters = () => {
    setQuery("");
    setTactic("All");
  };

  return (
    <section className="space-y-5">
      <Card>
        <CardContent className="space-y-4 p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pr-10 pl-10"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search technique ID, tactic, actor"
                value={query}
              />
              {query ? (
                <Button
                  aria-label="Clear technique search"
                  className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setQuery("")}
                  size="icon"
                  variant="ghost"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              ) : null}
            </div>
            {(query || tactic !== "All") && (
              <Button onClick={resetFilters} size="sm" variant="outline">
                Reset filters
              </Button>
            )}
          </div>

          <div>
            <div className="text-xs font-semibold uppercase text-foreground">Tactic</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tacticFilters.map((item) => (
                <Button
                  aria-pressed={item === tactic}
                  className={cn(item === tactic && "bg-accent text-accent-foreground")}
                  key={item}
                  onClick={() => setTactic(item)}
                  size="sm"
                  variant="ghost"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-3 text-sm font-medium text-muted-foreground">
            Showing <span className="text-foreground">{filteredTechniques.length}</span> of{" "}
            <span className="text-foreground">{allTechniques.length}</span> mapped techniques
          </div>
        </CardContent>
      </Card>

      {filteredTechniques.length > 0 ? (
        <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTechniques.map((technique) => (
            <article
              className="rounded-lg border border-border/80 bg-card/95 p-4 shadow-panel ring-1 ring-white/[0.02] transition-colors hover:border-primary/25 hover:bg-card"
              key={`${technique.slug}-${technique.id}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{technique.id}</Badge>
                <Badge variant="outline">{technique.tactic}</Badge>
              </div>
              <h2 className="mt-3 text-base font-semibold leading-5 text-foreground">
                {technique.name}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {technique.description}
              </p>
              <div className="mt-4 flex min-w-0 flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="min-w-0 truncate text-xs font-medium text-muted-foreground">
                  Related actor: <span className="text-foreground">{technique.actor}</span>
                </span>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/actors/${technique.slug}`}>
                    <Crosshair className="h-4 w-4" aria-hidden="true" />
                    Profile
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-lg font-semibold text-foreground">No techniques found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different tactic or search phrase.
            </p>
            <Button className="mt-5" onClick={resetFilters} variant="outline">
              Reset filters
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
