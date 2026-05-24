import { ClipboardCheck } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DetectionNotes({ notes }: { notes: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detection Notes</CardTitle>
        <CardDescription>Safe SOC analyst guidance for monitoring and triage</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {notes.map((note) => (
            <li
              className="flex min-w-0 gap-3 rounded-lg border border-border/80 bg-muted/30 p-4 text-sm leading-6 text-muted-foreground"
              key={note}
            >
              <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
