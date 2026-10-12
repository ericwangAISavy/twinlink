// Date-only job deadlines include the whole UTC day, as guest submissions do.
export function applicationDeadlinePassed(
  deadline: string | null,
  now = Date.now(),
) {
  if (!deadline) return false;
  const end = Date.parse(`${deadline}T00:00:00.000Z`) + 86400000;
  return !Number.isFinite(end) || now >= end;
}
