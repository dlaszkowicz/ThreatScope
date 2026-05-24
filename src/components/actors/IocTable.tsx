"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IndicatorOfCompromise } from "@/types/threat";

function confidenceVariant(confidence: IndicatorOfCompromise["confidence"]) {
  if (confidence === "High") {
    return "success";
  }

  if (confidence === "Medium") {
    return "medium";
  }

  return "outline";
}

export function IocTable({ iocs }: { iocs: IndicatorOfCompromise[] }) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);

  const copyIndicator = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyError(null);
      setCopiedValue(value);
      window.setTimeout(() => setCopiedValue(null), 1400);
    } catch {
      setCopiedValue(null);
      setCopyError(value);
      window.setTimeout(() => setCopyError(null), 1800);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>IOC Table</CardTitle>
        <CardDescription>Safe, defanged, or documentation-range indicators</CardDescription>
      </CardHeader>
      <CardContent className="min-w-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {iocs.map((ioc) => (
              <TableRow key={`${ioc.type}-${ioc.value}`}>
                <TableCell>
                  <Badge variant="outline">{ioc.type}</Badge>
                </TableCell>
                <TableCell className="max-w-[320px] break-all font-mono text-xs text-foreground">
                  {ioc.value}
                </TableCell>
                <TableCell>
                  <Badge variant={confidenceVariant(ioc.confidence)}>{ioc.confidence}</Badge>
                </TableCell>
                <TableCell className="min-w-[220px] text-muted-foreground">{ioc.note}</TableCell>
                <TableCell className="text-right">
                  <Button
                    aria-label={`Copy ${ioc.type} indicator`}
                    onClick={() => copyIndicator(ioc.value)}
                    size="sm"
                    variant="ghost"
                  >
                    {copiedValue === ioc.value ? (
                      <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                    {copiedValue === ioc.value ? "Copied" : copyError === ioc.value ? "Failed" : "Copy"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
