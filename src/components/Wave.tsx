const SHAPES = [
  'M0 48 C 160 18 320 14 480 34 C 640 54 760 74 920 60 C 1080 46 1220 10 1440 30 L 1440 80 L 0 80 Z',
  'M0 26 C 200 60 380 70 600 46 C 820 22 980 8 1180 26 C 1300 37 1380 50 1440 44 L 1440 80 L 0 80 Z',
  'M0 56 C 240 64 360 20 620 22 C 880 24 1000 66 1220 58 C 1320 54 1390 40 1440 34 L 1440 80 L 0 80 Z',
];

/** Vlnitý předěl mezi dvěma barevnými sekcemi. */
export function Wave({ from, to, shape = 0 }: { from: string; to: string; shape?: 0 | 1 | 2 }) {
  return (
    <svg
      className="wave"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ background: from }}
    >
      <path d={SHAPES[shape]} fill={to} />
    </svg>
  );
}
