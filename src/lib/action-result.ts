export type ActionState = { error?: string; success?: string };

export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; error: string };

export function toActionState(result: ActionResult): ActionState {
  return result.ok ? { success: result.message } : { error: result.error };
}

export function ok(message?: string): ActionResult {
  return { ok: true, message };
}

export function fail(error: string): ActionResult {
  return { ok: false, error };
}
