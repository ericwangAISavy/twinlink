import { Badge } from "@/components/ui/badge";
import { APPLICATION_STATUS_LABELS, isTerminalApplicationStatus, parseApplicationStatus } from "@/lib/constants";
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
    const value = parseApplicationStatus(status);
    const variant = value === "accepted" ? "teal" : isTerminalApplicationStatus(value) ? "muted" : "outline";
    return <Badge variant={variant}>{APPLICATION_STATUS_LABELS[value]}</Badge>;
  }
  return <Badge variant="secondary">{status}</Badge>;
}
