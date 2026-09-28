import { Badge } from "@/components/ui/badge";
import { APPLICATION_STATUS_LABELS, JOB_STATUS_LABELS } from "@/lib/constants";
import type { ApplicationStatus, JobStatus } from "@/lib/types";

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
    const value = status as ApplicationStatus;
    const variant =
      value === "HIRED" || value === "OFFER"
        ? "teal"
        : value === "REJECTED" || value === "WITHDRAWN"
          ? "muted"
          : "outline";
    return <Badge variant={variant}>{APPLICATION_STATUS_LABELS[value] ?? status}</Badge>;
  }
  return <Badge variant="secondary">{status}</Badge>;
}
