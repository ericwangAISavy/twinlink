import { getHiringStageLabel, getHiringStageOrder, HIRING_STAGES, isTerminalStage, parseHiringStage } from "@/lib/hiring-stages";
import type { HiringStage } from "@/lib/hiring-stages";
import { formatDate } from "@/lib/utils";

type HistoryItem = {
  toStage: string;
  changedAt: string;
  message?: string | null;
};

export function HiringTimeline({
  stage,
  appliedAt,
  history,
}: {
  stage: HiringStage;
  appliedAt: string;
  history: HistoryItem[];
}) {
  const currentOrder = getHiringStageOrder(stage);
  const terminal = isTerminalStage(stage);
  const reached = new Map<string, string>();
  for (const item of history) {
    if (!reached.has(item.toStage)) reached.set(item.toStage, item.changedAt);
  }
  if (!reached.has("applied")) reached.set("applied", appliedAt);

  return (
    <ol className="space-y-0" aria-label="Hiring progress">
      {HIRING_STAGES.map((step, index) => {
        const stepOrder = getHiringStageOrder(step);
        const when = reached.get(step);
        const state = terminal
          ? when
            ? "complete"
            : "pending"
          : stepOrder < currentOrder
            ? "complete"
            : stepOrder === currentOrder
              ? "current"
              : "pending";
        const marker = state === "complete" ? "✓" : state === "current" ? "●" : "○";
        return (
          <li key={step} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3" aria-current={state === "current" ? "step" : undefined}>
            <div className="flex flex-col items-center">
              <span
                className={
                  state === "pending"
                    ? "text-sm leading-6 text-[#b7aa98]"
                    : "text-sm leading-6 text-[#8a6a32]"
                }
                aria-hidden
              >
                {marker}
              </span>
              {index < HIRING_STAGES.length - 1 ? <span className="w-px flex-1 bg-[#eadfcd]" /> : null}
            </div>
            <div className="pb-4">
              <p className={state === "pending" ? "text-sm text-[#8d8274]" : "text-sm font-medium text-[#1c1916]"}>
                {getHiringStageLabel(step)}
                {state === "current" ? <span className="ml-2 text-xs font-normal text-[#8a6a32]">Current stage</span> : null}
                {state === "pending" ? <span className="sr-only"> Pending</span> : null}
                {state === "complete" ? <span className="sr-only"> Completed</span> : null}
              </p>
              {when && state !== "pending" ? <p className="text-xs text-[#8d8274]">{formatDate(when)}</p> : null}
            </div>
          </li>
        );
      })}
      {terminal ? (
        <li className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3" aria-current="step">
          <span className="text-sm leading-6 text-[#8a6a32]" aria-hidden>
            ●
          </span>
          <div>
            <p className="text-sm font-medium text-[#1c1916]">
              {getHiringStageLabel(stage)}
              <span className="ml-2 text-xs font-normal text-[#8a6a32]">Final outcome</span>
            </p>
            {reached.get(stage) ? <p className="text-xs text-[#8d8274]">{formatDate(reached.get(stage)!)}</p> : null}
          </div>
        </li>
      ) : null}
    </ol>
  );
}

export function stageFromHistory(value: string) {
  return parseHiringStage(value);
}
