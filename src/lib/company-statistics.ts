export const DEFAULT_STATISTICS = [
  { value: "50+", label: "Engineering Specialists" },
  { value: "30+", label: "Projects Delivered" },
  { value: "15+", label: "Partner Companies" },
  { value: "5+", label: "Years of Experience" },
];
export function parseStatistics(body?: string | null) {
  try {
    const values: unknown = JSON.parse(body || "");
    if (
      Array.isArray(values) &&
      values.length === 4 &&
      values.every(
        (value) =>
          typeof value === "string" && /^\d{1,9}(?:\.\d{1,2})?\+?$/.test(value),
      )
    )
      return DEFAULT_STATISTICS.map((stat, i) => ({
        ...stat,
        value: values[i] as string,
      }));
  } catch {}
  return DEFAULT_STATISTICS;
}
