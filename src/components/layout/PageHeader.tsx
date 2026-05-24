import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  meta?: Array<{
    label: string;
    value: string | number;
  }>;
  className?: string;
};

export function PageHeader({ actions, className, description, eyebrow, meta, title }: PageHeaderProps) {
  return (
    <section className={cn("panel p-5 sm:p-6", className)}>
      <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="section-kicker">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {description}
          </p>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>

      {meta ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {meta.map((item) => (
            <div className="metadata-tile" key={item.label}>
              <div className="text-[11px] font-semibold uppercase text-muted-foreground">
                {item.label}
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">{item.value}</div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
