/** Abstract brand illustration: navy field, connected network, gold twin stripes. Decorative only. */
export function BrandIllustration({ className }: { className?: string }) {
  const nodes: [number, number][] = [[90, 120], [210, 70], [330, 150], [450, 90], [140, 260], [280, 300], [420, 250], [520, 330], [200, 400], [370, 410]];
  const links: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [1, 4], [2, 5], [4, 5], [5, 6], [3, 6], [6, 7], [4, 8], [5, 9], [8, 9], [9, 7], [2, 6]];
  return (
    <svg viewBox="0 0 600 480" className={className} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="bi-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#081a3a" />
          <stop offset="1" stopColor="#0f3570" />
        </linearGradient>
        <radialGradient id="bi-glow" cx=".8" cy=".15" r=".7">
          <stop offset="0" stopColor="#f2c14e" stopOpacity=".28" />
          <stop offset="1" stopColor="#f2c14e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bi-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset=".5" stopColor="#e8a913" />
          <stop offset="1" stopColor="#b97a06" />
        </linearGradient>
        <pattern id="bi-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#ffffff" strokeOpacity=".06" />
        </pattern>
      </defs>
      <rect width="600" height="480" rx="20" fill="url(#bi-bg)" />
      <rect width="600" height="480" rx="20" fill="url(#bi-grid)" />
      <rect width="600" height="480" rx="20" fill="url(#bi-glow)" />
      <g stroke="#9db7e8" strokeOpacity=".35" strokeWidth="1.5">
        {links.map(([a, b]) => <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />)}
      </g>
      {nodes.map(([x, y], i) => <g key={i}>
        <circle cx={x} cy={y} r={i % 3 === 0 ? 9 : 6} fill={i % 3 === 0 ? "#f2c14e" : "#dbe6fb"} fillOpacity={i % 3 === 0 ? 0.95 : 0.85} />
        <circle cx={x} cy={y} r={i % 3 === 0 ? 18 : 12} fill="none" stroke={i % 3 === 0 ? "#f2c14e" : "#dbe6fb"} strokeOpacity=".22" />
      </g>)}
      <g transform="translate(395 300) scale(5.2)" opacity=".95">
        <path fill="url(#bi-gold)" d="M4 20.5 12.2 6.8h5.2L9.2 20.5H4Zm7.4 0 8.2-13.7H25L16.6 20.5h-5.2Z" />
      </g>
    </svg>
  );
}
