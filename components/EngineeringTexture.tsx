// Background texture: an engineering schematic, not an atmosphere.
//
// EXPLICIT NON GOALS: no particle fields, no glowing neural networks, no
// floating 3D spheres, no stock futuristic gradients. Those are the generic AI
// aesthetic. This is thin routing lines, small nodes, coordinate ticks, and
// stage labels, so the empty space reads as a control room schematic that the
// products sit inside.
//
// Rendered as one inline SVG at low opacity, aria-hidden and pointer-events
// none. Pure markup: no JavaScript, and the two traced signals are CSS that
// stop under reduced motion. Labels are decorative repetition of terminology
// stated in real copy elsewhere, which is why hiding them from assistive tech
// loses nothing.
export function EngineeringTexture() {
  const labels = [
    { text: "INPUT", x: 60, y: 96 },
    { text: "MODEL", x: 300, y: 60 },
    { text: "POLICY", x: 560, y: 120 },
    { text: "ACTION", x: 820, y: 72 },
    { text: "OBSERVABILITY", x: 1010, y: 150 },
    { text: "HUMAN OVERRIDE", x: 380, y: 300 },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <svg
        viewBox="0 0 1280 460"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.5]"
        role="presentation"
      >
        <defs>
          {/* Fade the schematic toward the edges so it never competes with the
              content sitting on top of it. */}
          <linearGradient id="et-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="35%" stopColor="white" stopOpacity="0.85" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="et-mask">
            <rect width="1280" height="460" fill="url(#et-fade)" />
          </mask>
        </defs>

        <g
          mask="url(#et-mask)"
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          fill="none"
        >
          {/* Routing paths converging left to right, toward the products. */}
          <path d="M0 100 H180 L240 64 H520" />
          <path d="M0 210 H120 L180 124 H520" />
          <path d="M520 64 L600 124 H900" />
          <path d="M520 124 H1280" />
          <path d="M900 124 L980 154 H1280" />
          {/* The override path drops away and returns: every system has one. */}
          <path
            d="M600 124 V304 H860 V196"
            strokeDasharray="3 5"
            opacity="0.75"
          />

          {/* Coordinate ticks along the top, like a measured drawing. */}
          {Array.from({ length: 26 }, (_, i) => (
            <line
              key={`tick-${i}`}
              x1={i * 50}
              y1="18"
              x2={i * 50}
              y2={i % 5 === 0 ? "32" : "25"}
              opacity="0.5"
            />
          ))}

          {/* Junction nodes where paths meet. */}
          {[
            [180, 100],
            [240, 64],
            [520, 64],
            [180, 124],
            [520, 124],
            [600, 124],
            [900, 124],
            [980, 154],
            [860, 196],
          ].map(([cx, cy], i) => (
            <circle key={`node-${i}`} cx={cx} cy={cy} r="3" />
          ))}
        </g>

        {/* Stage labels in the schematic's own type: mono, tiny, tracked out. */}
        <g mask="url(#et-mask)" fill="var(--fg)" opacity="0.32">
          {labels.map((l) => (
            <text
              key={l.text}
              x={l.x}
              y={l.y}
              fontSize="9"
              letterSpacing="2.4"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {l.text}
            </text>
          ))}
        </g>
      </svg>

      {/* Two signals travelling the main horizontal run, offset in time so the
          schematic reads as live without becoming an animation showreel. */}
      <span
        className="trace-x absolute top-[27%] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-70 shadow-[0_0_8px_var(--accent)]"
        style={
          {
            "--trace-duration": "9s",
          } as React.CSSProperties
        }
      />
      <span
        className="trace-x absolute top-[34%] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-45 shadow-[0_0_8px_var(--accent)]"
        style={
          {
            "--trace-duration": "13s",
            "--trace-delay": "3s",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
