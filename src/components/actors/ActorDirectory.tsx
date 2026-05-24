"use client";

import { useMemo, useRef, useState } from "react";
import { Search, SearchX, X } from "lucide-react";

import { ThreatActorCard } from "@/components/dashboard/ThreatActorCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { threatActors } from "@/data/threat-actors";
import { useDashboardSearch } from "@/lib/search-context";
import {
  buildFilterOptions,
  countActorsByFilter,
  filterThreatActors,
  type FilterOption,
} from "@/lib/threat-search";
import { cn } from "@/lib/utils";
import type { Severity, ThreatActorType } from "@/types/threat";

const severityFilters = buildFilterOptions(threatActors.map((actor) => actor.severity));
const typeFilters = buildFilterOptions(threatActors.map((actor) => actor.type));

export function ActorDirectory() {
  const [severity, setSeverity] = useState<FilterOption<Severity>>("All");
  const [actorType, setActorType] = useState<FilterOption<ThreatActorType>>("All");
  const { query, setQuery } = useDashboardSearch();
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredActors = useMemo(
    () => filterThreatActors(threatActors, { actorType, query, severity }),
    [actorType, query, severity],
  );

  const severityCounts = useMemo(
    () => countActorsByFilter(threatActors, severityFilters, (actor) => actor.severity),
    [],
  );

  const typeCounts = useMemo(
    () => countActorsByFilter(threatActors, typeFilters, (actor) => actor.type),
    [],
  );

  const resetFilters = () => {
    setQuery("");
    setSeverity("All");
    setActorType("All");
    searchRef.current?.focus();
  };

  return (
    <section className="space-y-5" id="actor-directory">
      <Card>
        <CardContent className="space-y-4 p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Button
                aria-label="Focus actor search"
                className="absolute left-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => searchRef.current?.focus()}
                size="icon"
                variant="ghost"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Input
                className="pr-10 pl-10"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search actors, aliases, IOCs, sectors"
                ref={searchRef}
                value={query}
              />
              {query ? (
                <Button
                  aria-label="Clear actor search"
                  className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setQuery("");
                    searchRef.current?.focus();
                  }}
                  size="icon"
                  variant="ghost"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {(query || severity !== "All" || actorType !== "All") && (
                <Button onClick={resetFilters} size="sm" variant="outline">
                  Reset filters
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="panel-muted p-3">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Severity</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {severityFilters.map((item) => (
                  <Button
                    aria-pressed={item === severity}
                    className={cn(item === severity && "filter-active")}
                    key={item}
                    onClick={() => setSeverity(item)}
                    size="sm"
                    variant="ghost"
                  >
                    {item}
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {severityCounts[item]}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
            <div className="panel-muted p-3">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Actor type</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {typeFilters.map((item) => (
                  <Button
                    aria-pressed={item === actorType}
                    className={cn(item === actorType && "filter-active")}
                    key={item}
                    onClick={() => setActorType(item)}
                    size="sm"
                    variant="ghost"
                  >
                    {item}
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {typeCounts[item]}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-3 text-sm font-medium text-muted-foreground">
            Showing <span className="text-foreground">{filteredActors.length}</span> of{" "}
            <span className="text-foreground">{threatActors.length}</span> actors
          </div>
        </CardContent>
      </Card>

      {filteredActors.length > 0 ? (
        <div className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredActors.map((actor) => (
            <ThreatActorCard actor={actor} key={actor.slug} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <SearchX className="mx-auto h-10 w-10 text-muted-foreground" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-foreground">No actors found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Adjust the search query or reset filters to return to the full local dataset.
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
