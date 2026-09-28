export function AdminTrendChart({
  points,
}: {
  points: { key: string; label: string; count: number }[];
}) {
  const width = 560;
  const height = 180;
  const max = Math.max(1, ...points.map((item) => item.count));
  const coords = points.map((item, index) => {
    const x = points.length === 1 ? width / 2 : (index / (points.length - 1)) * width;
    const y = height - (item.count / max) * (height - 16) - 8;
    return { x, y, ...item };
  });
  const path = coords.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const area = `${path} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" role="img" aria-label="Applications over the last six months">
      <path d={area} fill="rgba(196,165,116,0.18)" />
      <path d={path} fill="none" stroke="#c4a574" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {coords.map((point) => (
        <circle key={point.key} cx={point.x} cy={point.y} r="4" fill="#c4a574" />
      ))}
    </svg>
  );
}
