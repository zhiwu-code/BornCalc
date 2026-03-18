export default function BornLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Børn"
    >
      {/* Letter B */}
      <path
        d="M10 90V12h22c8 0 14 1.5 18 4.5S55 23 55 28c0 4-1 7-3.5 9.5S46 41 42 42v.5c5 .8 9 2.5 12 5s4.5 6.5 4.5 11c0 6.5-2.2 11.5-6.5 15S42 80 34 80H20
        M24 44v32h11c7 0 12-1.5 15.5-4.5S54 65 54 59.5c0-5-1.5-9-4.5-11.5S42 44 35 44H24z
        M24 16v24h9c6.5 0 11.5-1.3 14.5-4s5-6.5 5-11c0-4-1.5-7-4.5-9S41 16 35 16H24z"
        fill="#4a4a4a"
      />

      {/* Letter ø (o with stroke) — with crown inside */}
      <g transform="translate(72, 0)">
        {/* The 'o' shape */}
        <path
          d="M45 50c0-14-8-25-20-25S5 36 5 50s8 25 20 25 20-11 20-25z
          M45 50c0 16.5-9 29-20 29S5 66.5 5 50 14 21 25 21s20 12.5 20 29z"
          fill="#4a4a4a"
          fillRule="evenodd"
        />
        {/* Outer circle */}
        <ellipse cx="25" cy="50" rx="23" ry="30" fill="none" stroke="#4a4a4a" strokeWidth="4" />
        {/* Inner cutout */}
        <ellipse cx="25" cy="50" rx="15" ry="22" fill="#f5f0eb" />

        {/* Crown inside the o */}
        <g transform="translate(14, 38)" fill="#4a4a4a">
          {/* Crown base */}
          <rect x="1" y="16" width="20" height="3" rx="0.5" />
          {/* Crown body — 5 points */}
          <path d="M1 16 L1 8 L5 12 L8 5 L11 10 L14 5 L17 12 L21 8 L21 16Z" />
          {/* Crown jewel dots */}
          <circle cx="5" cy="14" r="1" fill="#f5f0eb" />
          <circle cx="11" cy="14" r="1" fill="#f5f0eb" />
          <circle cx="17" cy="14" r="1" fill="#f5f0eb" />
          {/* Top jewel */}
          <circle cx="11" cy="7" r="1.2" fill="#f5f0eb" />
        </g>

        {/* Diagonal stroke through o */}
        <line x1="8" y1="72" x2="42" y2="28" stroke="#4a4a4a" strokeWidth="3.5" />
      </g>

      {/* Letter r */}
      <path
        d="M128 90V42c0-6 1.5-11 4.5-14.5s7-5 12.5-5c2 0 3.5.2 5 .7l-1 4c-1.2-.4-2.5-.5-4-.5-4 0-7 1.5-9 4s-3 6.5-3 11.5V90h-5z"
        fill="#4a4a4a"
      />

      {/* Letter n */}
      <path
        d="M162 90V46c0-7 1.8-12.5 5.5-16s8.5-5.5 15-5.5c6 0 10.5 2 14 5.5s5 8.5 5 15V90h-5V46c0-5.5-1.5-9.5-4-12.5s-6.5-4.5-11-4.5c-5 0-9 1.5-11.5 5s-4 8-4 14V90h-4z"
        fill="#4a4a4a"
      />

      {/* Registered trademark ® */}
      <circle cx="210" cy="16" r="5" fill="none" stroke="#4a4a4a" strokeWidth="0.8" />
      <text x="210" y="19" textAnchor="middle" fontSize="8" fill="#4a4a4a" fontFamily="serif">R</text>
    </svg>
  );
}
