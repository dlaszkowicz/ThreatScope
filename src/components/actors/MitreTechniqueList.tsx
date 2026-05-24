import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MitreTechnique } from "@/types/threat";

export function MitreTechniqueList({ techniques }: { techniques: MitreTechnique[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>MITRE ATT&CK Techniques</CardTitle>
        <CardDescription>Mapped behavior for defensive monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid min-w-0 gap-3 md:grid-cols-2">
          {techniques.map((technique) => (
            <article
              className="min-w-0 rounded-lg border border-border/80 bg-muted/30 p-4"
              key={technique.id}
            >
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{technique.id}</Badge>
                <Badge variant="outline">{technique.tactic}</Badge>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{technique.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {technique.description}
              </p>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
