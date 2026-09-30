export const HIRING_STAGES = [
  "applied",
  "application_review",
  "recruiter_screen",
  "technical_interview",
  "final_interview",
  "decision",
  "offer",
  "hired",
] as const;

export const TERMINAL_STAGES = ["rejected", "withdrawn", "position_closed"] as const;

export const ALL_HIRING_STAGES = [...HIRING_STAGES, ...TERMINAL_STAGES] as const;

export type HiringStage = (typeof ALL_HIRING_STAGES)[number];

const LEGACY_STAGE: Record<string, HiringStage> = {
  submitted: "applied",
  under_review: "application_review",
  reviewing: "application_review",
  shortlisted: "recruiter_screen",
  interview: "technical_interview",
  accepted: "offer",
};

export const HIRING_STAGE_LABELS: Record<HiringStage, string> = {
  applied: "Applied",
  application_review: "Application review",
  recruiter_screen: "Recruiter screen",
  technical_interview: "Technical interview",
  final_interview: "Final interview",
  decision: "Decision",
  offer: "Offer",
  hired: "Hired",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
  position_closed: "Position closed",
};

const CANDIDATE_STAGE_COPY: Record<HiringStage, string> = {
  applied: "Your application has been received.",
  application_review: "Twinlink is reviewing your application.",
  recruiter_screen: "A recruiter will speak with you about the role.",
  technical_interview: "A technical interview is the current step.",
  final_interview: "You are in the final interview step.",
  decision: "The hiring team is making a decision.",
  offer: "An offer is available for this application.",
  hired: "You have been hired for this role.",
  rejected: "Twinlink will not be moving forward with this application.",
  withdrawn: "You withdrew this application.",
  position_closed: "This role was closed. Your application history is unchanged.",
};

export function parseHiringStage(value: string | null | undefined): HiringStage {
  const normalized = (value ?? "").trim().toLowerCase();
  if ((ALL_HIRING_STAGES as readonly string[]).includes(normalized)) return normalized as HiringStage;
  return LEGACY_STAGE[normalized] ?? "applied";
}

export function getHiringStageLabel(stage: HiringStage) {
  return HIRING_STAGE_LABELS[stage];
}

export function getHiringStageOrder(stage: HiringStage) {
  return HIRING_STAGES.indexOf(stage as (typeof HIRING_STAGES)[number]);
}

export function getCandidateVisibleStage(stage: HiringStage) {
  return {
    stage,
    label: getHiringStageLabel(stage),
    message: CANDIDATE_STAGE_COPY[stage],
  };
}

export function isTerminalStage(stage: HiringStage) {
  return (TERMINAL_STAGES as readonly string[]).includes(stage);
}

export function isActiveStage(stage: HiringStage) {
  return !isTerminalStage(stage) && stage !== "hired";
}

export function transitionNeedsConfirmation(from: HiringStage, to: HiringStage) {
  if (from === to) return false;
  if (isTerminalStage(to)) return true;
  const current = getHiringStageOrder(from);
  const next = getHiringStageOrder(to);
  if (current < 0 || next < 0) return true;
  return next !== current + 1;
}
