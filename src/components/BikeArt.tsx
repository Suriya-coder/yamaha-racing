type Props = { color?: string; naked?: boolean; scooter?: boolean; spin?: boolean; className?: string };

function Wheel({ cx, spin }: { cx: number; spin?: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={160} r={44} fill="#0b0b0f" />
      <circle cx={cx} cy={160} r={34} fill="none" stroke="#2b2f3a" strokeWidth={4} />
      <g className={spin ? "wheel-spin" : undefined}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line
            key={a}
            x1={cx}
            y1={160}
            x2={cx + 30 * Math.cos((a * Math.PI) / 180)}
            y2={160 + 30 * Math.sin((a * Math.PI) / 180)}
            stroke="#9ca3af"
            strokeWidth={3}
          />
        ))}
        <circle cx={cx} cy={160} r={30} fill="none" stroke="#6b7280" strokeWidth={1.5} strokeDasharray="6 5" />
      </g>
      <circle cx={cx} cy={160} r={7} fill="#d1d5db" />
    </g>
  );
}

export default function BikeArt({ color = "#1d3fd8", naked, scooter, spin, className }: Props) {
  return (
    <svg viewBox="0 0 420 220" className={className} role="img" aria-label="Motorcycle illustration">
      <defs>
        <linearGradient id={`body-${color}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor="#05070f" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="206" rx="170" ry="8" fill="#000" opacity="0.5" />
      <Wheel cx={92} spin={spin} />
      <Wheel cx={330} spin={spin} />
      {/* swingarm & forks */}
      <path d="M92 160 L190 140" stroke="#4b5563" strokeWidth={8} strokeLinecap="round" />
      <path d="M330 160 L300 70" stroke="#d4a017" strokeWidth={7} strokeLinecap="round" />
      {/* engine */}
      <rect x="170" y="118" width="70" height="44" rx="8" fill="#1f2937" stroke="#374151" />
      <path d="M180 162 Q150 182 110 176" stroke="#9ca3af" strokeWidth={6} fill="none" strokeLinecap="round" />
      {scooter ? (
        <path d="M120 120 Q130 90 180 92 L250 92 Q270 92 280 70 L300 60 L312 70 L296 120 Q280 150 240 150 L150 150 Q118 150 120 120 Z" fill={`url(#body-${color})`} stroke="#ffffff22" />
      ) : naked ? (
        <>
          <path d="M150 104 Q170 78 230 80 L262 86 Q276 92 268 108 L240 120 L170 120 Z" fill={`url(#body-${color})`} stroke="#ffffff22" />
          <path d="M80 100 L150 96 L170 112 L100 116 Z" fill="#111827" />
          <circle cx="302" cy="84" r="12" fill="#0ea5e9" opacity="0.9" />
        </>
      ) : (
        <>
          {/* full fairing */}
          <path
            d="M70 104 L150 92 Q175 70 230 72 L270 76 L300 56 L330 60 Q350 78 340 100 L318 132 Q300 156 262 158 L190 158 Q170 140 160 120 L90 118 Z"
            fill={`url(#body-${color})`}
            stroke="#ffffff22"
          />
          <path d="M300 56 L326 40 L336 58 Z" fill="#93c5fd" opacity="0.55" />
          <path d="M200 120 L300 112" stroke="#ffffff" strokeOpacity="0.5" strokeWidth={3} />
          <path d="M322 82 L340 86" stroke="#e6ff00" strokeWidth={4} strokeLinecap="round" />
        </>
      )}
      {!scooter && <path d="M150 92 Q160 86 196 84 L198 96 L152 102 Z" fill="#0b0f19" />}
    </svg>
  );
}
