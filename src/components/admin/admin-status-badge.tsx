import { Badge } from "@/components/ui/badge";
import { getHiringStageLabel, isTerminalStage, parseHiringStage } from "@/lib/hiring-stages";
import { JOB_STATUS_LABELS } from "@/lib/constants";
import type { JobStatus } from "@/lib/types";

export function AdminStatusBadge({
  status,
  kind,
}: {
  status: string;
  kind: "job" | "application" | "generic";
}) {
  if (kind === "job") {
    const value = status as JobStatus;
    const variant =
      value === "PUBLISHED" ? "teal" : value === "DRAFT" ? "secondary" : value === "PAUSED" ? "outline" : "muted";
    return <Badge variant={variant}>{JOB_STATUS_LABELS[value] ?? status}</Badge>;
  }
  if (kind === "application") {
    const value = parseHiringStage(status);
    const variant =
      value === "hired" || value === "offer"
        ? "teal"
        : isTerminalStage(value)
          ? "muted"
          : "outline";
    return <Badge variant={variant}>{getHiringStageLabel(value)}</Badge>;
  }
  return <Badge variant="secondary">{status}</Badge>;
}
