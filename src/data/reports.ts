export type ReportPreview = {
  slug: string;
  title: string;
  status: string;
  description: string;
  date: string;
  focus: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export const reportPreviews: ReportPreview[] = [
  {
    slug: "quarterly-actor-watchlist",
    title: "Quarterly Actor Watchlist",
    status: "Ready",
    description: "A compact actor risk summary assembled from local profile signals.",
    date: "2026-05-24",
    focus: "Actor prioritization",
    sections: [
      {
        title: "Purpose",
        body: "This mock brief demonstrates how a SOC team could summarize priority actors using local profile data, severity, target sectors, and recent campaign context.",
      },
      {
        title: "Analyst Notes",
        body: "Use actor severity, sector relevance, and identity telemetry patterns to decide which profiles deserve deeper review. This is a safe portfolio example, not production intelligence.",
      },
      {
        title: "Recommended Follow-Up",
        body: "Review actor profiles, validate detection coverage for mapped techniques, and keep IOC examples clearly defanged or documentation-range.",
      },
    ],
  },
  {
    slug: "ransomware-exposure-brief",
    title: "Ransomware Exposure Brief",
    status: "Draft",
    description: "Defensive executive context for identity abuse, staging signals, and impact risk.",
    date: "2026-05-24",
    focus: "Ransomware risk context",
    sections: [
      {
        title: "Purpose",
        body: "This mock brief frames ransomware exposure through defensive signals such as valid-account abuse, data staging, remote access anomalies, and backup access changes.",
      },
      {
        title: "Analyst Notes",
        body: "The brief stays high-level and avoids operational details. It is intended to show how portfolio UI can communicate risk without enabling misuse.",
      },
      {
        title: "Recommended Follow-Up",
        body: "Correlate identity events, endpoint detections, file server activity, and DLP alerts inside approved defensive tooling.",
      },
    ],
  },
  {
    slug: "attack-coverage-notes",
    title: "ATT&CK Coverage Notes",
    status: "Planned",
    description: "Mapped technique coverage notes for prioritizing monitoring gaps.",
    date: "2026-05-24",
    focus: "Technique coverage",
    sections: [
      {
        title: "Purpose",
        body: "This mock brief summarizes local ATT&CK-style technique mappings so reviewers can understand how actor behavior connects to defensive monitoring themes.",
      },
      {
        title: "Analyst Notes",
        body: "Mapped techniques should be treated as educational labels for dashboard exploration, not as claims about live actor infrastructure or current operations.",
      },
      {
        title: "Recommended Follow-Up",
        body: "Prioritize coverage for initial access, credential access, lateral movement, exfiltration, and impact categories represented in the mock dataset.",
      },
    ],
  },
];

export function getReportBySlug(slug: string) {
  return reportPreviews.find((report) => report.slug === slug);
}
