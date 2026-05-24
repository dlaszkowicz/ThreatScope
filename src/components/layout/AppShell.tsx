"use client";

import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { SearchProvider } from "@/lib/search-context";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-background">
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
          href="#main-content"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8" id="main-content">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SearchProvider>
  );
}
