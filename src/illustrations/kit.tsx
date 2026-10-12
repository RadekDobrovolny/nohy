/** Jemné „roztřesení“ linek, aby ilustrace působily ručně kreslené. */
export function HandFilter({ id, scale = 2.2, seed = 4 }: { id: string; scale?: number; seed?: number }) {
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed} result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" />
    </filter>
  );
}

export const inkStroke = {
  stroke: 'var(--ink)',
  strokeWidth: 3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function Heart({
  x,
  y,
  s = 1,
  fill = 'var(--coral)',
  className,
}: {
  x: number;
  y: number;
  s?: number;
  fill?: string;
  className?: string;
}) {
  return (
    <path
      className={className}
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -6 C -3 -12 -12 -11 -12 -4 C -12 3 -4 8 0 12 C 4 8 12 3 12 -4 C 12 -11 3 -12 0 -6 Z"
      fill={fill}
      {...inkStroke}
      strokeWidth={2.5 / s}
    />
  );
}

export function Sparkle({ x, y, s = 1, className }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <path
      className={className}
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -12 C 1 -4 4 -1 12 0 C 4 1 1 4 0 12 C -1 4 -4 1 -12 0 C -4 -1 -1 -4 0 -12 Z"
      fill="var(--butter)"
      {...inkStroke}
      strokeWidth={2 / s}
    />
  );
}
