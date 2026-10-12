import type { ReactNode } from 'react';
import { Heart, Sparkle, inkStroke } from './kit';

const SHADOW = 'rgba(46,42,59,0.14)';

function Frame({ children, bg, className }: { children: ReactNode; bg?: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`ill icon ${className ?? ''}`} aria-hidden="true" focusable="false">
      {bg && (
        <path
          d="M60 10 C 92 8 112 30 110 62 C 108 94 88 112 58 110 C 28 108 8 90 10 58 C 12 28 30 12 60 10 Z"
          fill={bg}
        />
      )}
      {children}
    </svg>
  );
}

/** Tlustá linka s inkoustovým obrysem (končetiny, rukojeti…). */
function Limb({ d, color, w = 10 }: { d: string; color: string; w?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth={w + 6} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

/** Tvar s posunutým stínem. */
function S({ d, fill, sw = 3 }: { d: string; fill: string; sw?: number }) {
  return (
    <>
      <path d={d} fill={SHADOW} transform="translate(4 4)" />
      <path d={d} fill={fill} {...inkStroke} strokeWidth={sw} />
    </>
  );
}

export function LogoMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="23" fill="var(--peach-soft)" />
      <path
        d="M19 42 C 13 42 11 36 12 30 C 13 23 16 18 20 16.5 C 25 15 28.5 19 28 25 C 27.6 29.5 26 32 26.4 36.5 C 26.8 40.5 24.5 42 19 42 Z"
        fill="var(--skin)"
        {...inkStroke}
        strokeWidth={2.2}
      />
      <g fill="var(--skin)" {...inkStroke} strokeWidth={2}>
        <circle cx="18.5" cy="10.5" r="3.6" />
        <circle cx="25" cy="9" r="2.8" />
        <circle cx="30" cy="11" r="2.4" />
        <circle cx="33.5" cy="15" r="2" />
      </g>
      <path
        transform="translate(36 31) scale(0.42)"
        d="M0 -6 C -3 -12 -12 -11 -12 -4 C -12 3 -4 8 0 12 C 4 8 12 3 12 -4 C 12 -11 3 -12 0 -6 Z"
        fill="var(--coral)"
      />
    </svg>
  );
}

/* ---------- Proč ---------- */

export function IconBend({ className }: { className?: string }) {
  return (
    <Frame bg="var(--peach-soft)" className={className}>
      <Limb d="M76 62 L 78 98 L 66 98" color="var(--sky)" w={9} />
      <Limb d="M70 64 L 70 96 L 58 98" color="var(--sky)" w={9} />
      <Limb d="M48 44 C 58 46 68 52 74 62" color="var(--sage)" w={16} />
      <Limb d="M50 48 C 50 60 52 70 56 80" color="var(--skin)" w={7} />
      <circle cx="39" cy="35" r="11" fill="var(--skin)" {...inkStroke} />
      <path d="M31 30 C 34 22 46 22 49 31" fill="#e8e3ee" {...inkStroke} strokeWidth={2.5} />
      <path d="M59 86 L 61 92" className="stroke" strokeDasharray="1 6" strokeWidth={3} />
      <g className="stroke" stroke="var(--coral-deep)" strokeWidth={3}>
        <path d="M86 46 L 92 40" />
        <path d="M89 55 L 98 53" />
        <path d="M86 64 L 92 70" />
      </g>
    </Frame>
  );
}

export function IconGlasses({ className }: { className?: string }) {
  return (
    <Frame bg="var(--sky-soft)" className={className}>
      <path d="M24 56 L 12 46 M 96 56 L 108 46" className="stroke" />
      <circle cx="43" cy="64" r="17" fill={SHADOW} transform="translate(4 4)" />
      <circle cx="79" cy="64" r="17" fill={SHADOW} transform="translate(4 4)" />
      <circle cx="41" cy="62" r="17" fill="#fff" {...inkStroke} />
      <circle cx="79" cy="62" r="17" fill="#fff" {...inkStroke} />
      <path d="M58 60 C 59 55 61 55 62 60" className="stroke" />
      <path d="M33 54 C 36 50 40 49 43 50" className="stroke" stroke="var(--sky)" strokeWidth={3} />
      <path d="M71 54 C 74 50 78 49 81 50" className="stroke" stroke="var(--sky)" strokeWidth={3} />
      <g className="stroke" stroke="var(--sky-deep)" strokeWidth={2.5} opacity={0.7}>
        <path d="M34 92 q 6 -4 12 0 t 12 0" />
        <path d="M62 98 q 6 -4 12 0 t 12 0" />
      </g>
    </Frame>
  );
}

export function IconDrop({ className, plus = false }: { className?: string; plus?: boolean }) {
  return (
    <Frame bg="var(--rose-soft)" className={className}>
      <S
        d="M56 16 C 68 34 80 50 80 66 C 80 80 69 90 56 90 C 43 90 32 80 32 66 C 32 50 44 34 56 16 Z"
        fill="var(--coral)"
      />
      <path d="M44 64 C 44 58 47 52 50 48" className="stroke" stroke="#fff" strokeWidth={4} opacity={0.8} />
      {plus ? (
        <g>
          <rect x="72" y="70" width="32" height="32" rx="9" fill="var(--paper)" {...inkStroke} />
          <path d="M88 78 V 94 M 80 86 H 96" className="stroke" stroke="var(--coral-deep)" strokeWidth={4} />
        </g>
      ) : (
        <g transform="rotate(-12 86 86)">
          <rect x="72" y="72" width="28" height="28" rx="5" fill="#fff" {...inkStroke} />
          <path d="M72 80 L 80 72 M 100 80 L 92 72" className="stroke" strokeWidth={2} opacity={0.4} />
          <g fill="var(--ink)" opacity={0.35}>
            <circle cx="80" cy="84" r="1.6" />
            <circle cx="88" cy="90" r="1.6" />
            <circle cx="92" cy="82" r="1.6" />
          </g>
        </g>
      )}
    </Frame>
  );
}

export function IconShy({ className }: { className?: string }) {
  return (
    <Frame bg="var(--butter-soft)" className={className}>
      <circle cx="54" cy="68" r="31" fill={SHADOW} transform="translate(4 4)" />
      <circle cx="54" cy="68" r="31" fill="var(--skin)" {...inkStroke} />
      <path
        d="M28 56 C 32 40 46 34 58 36 C 70 38 80 46 84 58 C 76 50 62 48 52 50 C 42 52 34 52 28 56 Z"
        fill="#e8e3ee"
        {...inkStroke}
        strokeWidth={2.5}
      />
      <path d="M40 66 q 4 4 8 0 M 60 66 q 4 4 8 0" className="stroke" strokeWidth={2.5} />
      <circle cx="38" cy="76" r="5" fill="var(--rose)" />
      <circle cx="71" cy="76" r="5" fill="var(--rose)" />
      <path d="M50 84 q 4 -3 8 0" className="stroke" strokeWidth={2.5} />
      <path
        d="M74 14 H 106 C 110 14 112 16 112 20 V 36 C 112 40 110 42 106 42 H 90 L 82 50 L 83 42 H 74 C 70 42 68 40 68 36 V 20 C 68 16 70 14 74 14 Z"
        fill="#fff"
        {...inkStroke}
        strokeWidth={2.5}
      />
      <g fill="var(--ink)">
        <circle cx="80" cy="28" r="2.6" />
        <circle cx="90" cy="28" r="2.6" />
        <circle cx="100" cy="28" r="2.6" />
      </g>
    </Frame>
  );
}

/* ---------- Co se může stát ---------- */

export function IconHeelCrack({ className }: { className?: string }) {
  return (
    <Frame bg="var(--peach-soft)" className={className}>
      <S d="M34 14 L 34 62 C 34 88 46 102 60 102 C 74 102 86 88 86 62 L 86 14" fill="var(--skin)" />
      <path d="M46 72 C 48 86 54 94 62 96" className="stroke" stroke="var(--skin-shade)" strokeWidth={4} />
      <g className="stroke" stroke="var(--coral-deep)" strokeWidth={2.5}>
        <path d="M52 100 l 3 -9 l -4 -6 l 4 -9" />
        <path d="M68 100 l -2 -8 l 4 -6" />
        <path d="M78 92 l -4 -6" />
      </g>
    </Frame>
  );
}

export function IconPlaster({ className }: { className?: string }) {
  return (
    <Frame bg="var(--butter-soft)" className={className}>
      <g transform="rotate(-35 60 60)">
        <rect x="22" y="46" width="80" height="30" rx="15" fill={SHADOW} transform="translate(4 4)" />
        <rect x="18" y="45" width="84" height="30" rx="15" fill="#f2cfa3" {...inkStroke} />
        <rect x="46" y="45" width="28" height="30" fill="var(--paper)" {...inkStroke} />
        <g fill="var(--ink)" opacity={0.35}>
          <circle cx="30" cy="55" r="1.8" />
          <circle cx="30" cy="65" r="1.8" />
          <circle cx="90" cy="55" r="1.8" />
          <circle cx="90" cy="65" r="1.8" />
        </g>
        <path d="M56 60 h 8" className="stroke" stroke="var(--coral)" strokeWidth={4} />
      </g>
    </Frame>
  );
}

export function IconGerm({ className }: { className?: string }) {
  const spikes = Array.from({ length: 9 }, (_, i) => (i / 9) * Math.PI * 2);
  return (
    <Frame bg="var(--sage-soft)" className={className}>
      {spikes.map((a, i) => {
        const x1 = 60 + Math.cos(a) * 26;
        const y1 = 62 + Math.sin(a) * 26;
        const x2 = 60 + Math.cos(a) * 40;
        const y2 = 62 + Math.sin(a) * 40;
        return (
          <g key={i}>
            <path d={`M${x1} ${y1} L ${x2} ${y2}`} className="stroke" />
            <circle cx={x2} cy={y2} r="5" fill="var(--sage)" {...inkStroke} strokeWidth={2.5} />
          </g>
        );
      })}
      <circle cx="60" cy="62" r="28" fill="var(--sage)" {...inkStroke} />
      <circle cx="50" cy="58" r="4" fill="var(--ink)" />
      <circle cx="70" cy="58" r="4" fill="var(--ink)" />
      <path d="M44 50 l 9 3 M 76 50 l -9 3" className="stroke" strokeWidth={2.5} />
      <path d="M52 74 q 8 -6 16 0" className="stroke" strokeWidth={2.5} />
    </Frame>
  );
}

export function IconHospital({ className }: { className?: string }) {
  return (
    <Frame bg="var(--sky-soft)" className={className}>
      <S d="M24 44 H 96 V 100 H 24 Z" fill="var(--paper)" />
      <S d="M42 22 H 78 V 44 H 42 Z" fill="var(--paper)" />
      <path d="M60 26 V 40 M 53 33 H 67" className="stroke" stroke="var(--coral-deep)" strokeWidth={4} />
      <g fill="var(--sky)" {...inkStroke} strokeWidth={2.5}>
        <rect x="32" y="54" width="14" height="12" rx="2" />
        <rect x="74" y="54" width="14" height="12" rx="2" />
        <rect x="32" y="74" width="14" height="12" rx="2" />
        <rect x="74" y="74" width="14" height="12" rx="2" />
      </g>
      <path d="M52 100 V 78 C 52 72 68 72 68 78 V 100" fill="var(--butter)" {...inkStroke} strokeWidth={2.5} />
    </Frame>
  );
}

export function IconHeartCheck({ className }: { className?: string }) {
  return (
    <Frame bg="var(--rose-soft)" className={className}>
      <S
        d="M60 42 C 52 24 24 26 24 50 C 24 72 46 86 60 98 C 74 86 96 72 96 50 C 96 26 68 24 60 42 Z"
        fill="var(--coral)"
      />
      <path d="M46 62 L 56 72 L 76 50" className="stroke" stroke="#fff" strokeWidth={6} />
      <g transform="translate(98 26)">
        <Sparkle x={0} y={0} s={0.7} />
      </g>
    </Frame>
  );
}

/* ---------- Péče doma ---------- */

export function IconBasin({ className }: { className?: string }) {
  return (
    <Frame bg="var(--sky-soft)" className={className}>
      <S d="M18 60 H 92 L 84 94 C 83 99 79 102 74 102 H 36 C 31 102 27 99 26 94 Z" fill="var(--sky)" />
      <rect x="14" y="54" width="82" height="10" rx="5" fill="var(--paper)" {...inkStroke} />
      <path d="M30 76 q 8 -5 16 0 t 16 0 t 16 0" className="stroke" stroke="#fff" strokeWidth={3} />
      <rect x="92" y="16" width="14" height="52" rx="7" fill="#fff" {...inkStroke} />
      <circle cx="99" cy="72" r="10" fill="var(--coral)" {...inkStroke} />
      <path d="M99 64 V 40" className="stroke" stroke="var(--coral)" strokeWidth={5} />
      <g className="stroke" stroke="var(--sky-deep)" strokeWidth={2.5} opacity={0.6}>
        <path d="M44 44 c -4 -6 4 -10 0 -16" />
        <path d="M60 44 c -4 -6 4 -10 0 -16" />
      </g>
    </Frame>
  );
}

export function IconTowel({ className }: { className?: string }) {
  return (
    <Frame bg="var(--rose-soft)" className={className}>
      <path d="M18 28 H 102" className="stroke" strokeWidth={5} />
      <S d="M34 28 V 96 C 34 100 37 102 41 102 H 79 C 83 102 86 100 86 96 V 28 Z" fill="var(--paper)" />
      <rect x="34" y="78" width="52" height="9" fill="var(--coral)" opacity={0.85} />
      <path d="M34 28 V 96 C 34 100 37 102 41 102 H 79 C 83 102 86 100 86 96 V 28" fill="none" {...inkStroke} />
      <path d="M48 28 V 68" className="stroke" strokeWidth={2} opacity={0.35} />
      <g fill="var(--sky-deep)" opacity={0.7}>
        <path d="M100 52 c 3 5 5 8 5 11 a 5 5 0 0 1 -10 0 c 0 -3 2 -6 5 -11 z" />
        <path d="M20 66 c 2 4 4 6 4 8 a 4 4 0 0 1 -8 0 c 0 -2 2 -4 4 -8 z" />
      </g>
    </Frame>
  );
}

export function IconCream({ className }: { className?: string }) {
  return (
    <Frame bg="var(--butter-soft)" className={className}>
      <path d="M40 40 C 38 26 50 18 60 24 C 70 18 82 26 80 40 Z" fill="#fff" {...inkStroke} />
      <path d="M52 32 C 56 28 64 28 68 32" className="stroke" strokeWidth={2.5} />
      <S
        d="M30 50 C 30 44 34 40 40 40 H 80 C 86 40 90 44 90 50 V 92 C 90 98 86 102 80 102 H 40 C 34 102 30 98 30 92 Z"
        fill="var(--paper)"
      />
      <rect x="26" y="40" width="68" height="14" rx="6" fill="var(--sage)" {...inkStroke} />
      <rect x="40" y="64" width="40" height="24" rx="10" fill="var(--sky-soft)" {...inkStroke} strokeWidth={2.5} />
      <Heart x={60} y={76} s={0.42} />
    </Frame>
  );
}

export function IconScissors({ className }: { className?: string }) {
  return (
    <Frame bg="var(--sage-soft)" className={className}>
      <Limb d="M44 90 L 84 22" color="#dfe6ee" w={5} />
      <Limb d="M76 90 L 36 22" color="#dfe6ee" w={5} />
      <circle cx="40" cy="96" r="12" fill="var(--coral)" {...inkStroke} />
      <circle cx="80" cy="96" r="12" fill="var(--coral)" {...inkStroke} />
      <circle cx="40" cy="96" r="5" fill="var(--sage-soft)" {...inkStroke} strokeWidth={2.5} />
      <circle cx="80" cy="96" r="5" fill="var(--sage-soft)" {...inkStroke} strokeWidth={2.5} />
      <circle cx="60" cy="56" r="4" fill="var(--ink)" />
      <path d="M92 40 H 108 M 92 48 H 108" className="stroke" strokeWidth={2.5} strokeDasharray="2 6" />
    </Frame>
  );
}

export function IconSock({ className }: { className?: string }) {
  return (
    <Frame bg="var(--peach-soft)" className={className}>
      <S
        d="M40 14 H 74 V 60 C 74 66 78 70 84 73 C 100 81 100 104 82 104 H 54 C 44 104 38 96 39 86 Z"
        fill="var(--butter)"
      />
      <rect x="38" y="14" width="38" height="16" rx="4" fill="var(--coral)" {...inkStroke} />
      <path d="M40 46 H 74 M 40 56 H 74" className="stroke" stroke="var(--coral)" strokeWidth={5} />
      <path d="M78 104 C 74 96 76 88 84 84" className="stroke" strokeWidth={2.5} opacity={0.5} />
    </Frame>
  );
}

export function IconMirror({ className }: { className?: string }) {
  return (
    <Frame bg="var(--sky-soft)" className={className}>
      <Limb d="M76 78 L 98 104" color="var(--peach)" w={10} />
      <circle cx="56" cy="54" r="33" fill={SHADOW} transform="translate(4 4)" />
      <circle cx="56" cy="54" r="33" fill="var(--peach)" {...inkStroke} />
      <circle cx="56" cy="54" r="25" fill="#e9f4fb" {...inkStroke} strokeWidth={2.5} />
      <path d="M40 46 C 42 40 46 36 52 34 M 42 56 L 58 38" className="stroke" stroke="#fff" strokeWidth={4} />
    </Frame>
  );
}

/* ---------- Kde najít pomoc ---------- */

export function IconStethoscope({ className }: { className?: string }) {
  return (
    <Frame bg="var(--sky-soft)" className={className}>
      <Limb d="M36 18 V 42 C 36 58 46 68 56 68 C 66 68 76 58 76 42 V 18" color="var(--sky-deep)" w={4} />
      <Limb d="M56 68 V 84 C 56 98 70 102 80 96" color="var(--sky-deep)" w={4} />
      <circle cx="36" cy="16" r="5" fill="var(--paper)" {...inkStroke} strokeWidth={2.5} />
      <circle cx="76" cy="16" r="5" fill="var(--paper)" {...inkStroke} strokeWidth={2.5} />
      <circle cx="90" cy="90" r="16" fill={SHADOW} transform="translate(4 4)" />
      <circle cx="90" cy="90" r="16" fill="var(--paper)" {...inkStroke} />
      <circle cx="90" cy="90" r="8" fill="var(--sky)" {...inkStroke} strokeWidth={2.5} />
    </Frame>
  );
}

function FootprintShape({ fill = 'var(--skin)' }: { fill?: string }) {
  return (
    <g>
      <path
        d="M46 102 C 34 102 30 90 32 78 C 34 64 40 54 48 51 C 58 48 65 56 64 67 C 63 76 60 82 61 91 C 62 99 57 102 46 102 Z"
        fill={SHADOW}
        transform="translate(4 4)"
      />
      <path
        d="M46 102 C 34 102 30 90 32 78 C 34 64 40 54 48 51 C 58 48 65 56 64 67 C 63 76 60 82 61 91 C 62 99 57 102 46 102 Z"
        fill={fill}
        {...inkStroke}
      />
      <g fill={fill} {...inkStroke} strokeWidth={2.5}>
        <ellipse cx="44" cy="38" rx="7" ry="8" />
        <circle cx="56" cy="34" r="5" />
        <circle cx="65" cy="38" r="4.4" />
        <circle cx="71" cy="45" r="3.8" />
      </g>
    </g>
  );
}

export function IconPodiatry({ className }: { className?: string }) {
  return (
    <Frame bg="var(--sage-soft)" className={className}>
      <FootprintShape />
      <circle cx="86" cy="80" r="18" fill="var(--paper)" {...inkStroke} />
      <path d="M86 70 V 90 M 76 80 H 96" className="stroke" stroke="var(--coral-deep)" strokeWidth={5} />
    </Frame>
  );
}

export function IconPedicure({ className }: { className?: string }) {
  return (
    <Frame bg="var(--peach-soft)" className={className}>
      <FootprintShape />
      <g transform="rotate(35 88 64)">
        <rect x="80" y="26" width="14" height="72" rx="7" fill={SHADOW} transform="translate(4 4)" />
        <rect x="80" y="26" width="14" height="72" rx="7" fill="var(--rose)" {...inkStroke} />
        <path d="M84 36 H 90 M 84 44 H 90 M 84 52 H 90 M 84 60 H 90" className="stroke" strokeWidth={2} opacity={0.5} />
        <rect x="80" y="74" width="14" height="24" rx="7" fill="var(--coral)" {...inkStroke} />
      </g>
      <g transform="translate(26 26)">
        <Sparkle x={0} y={0} s={0.6} />
      </g>
    </Frame>
  );
}

export function IconCarHome({ className }: { className?: string }) {
  return (
    <Frame bg="var(--butter-soft)" className={className}>
      <S
        d="M20 70 C 20 64 24 60 30 60 L 40 42 C 42 38 46 36 50 36 H 72 C 76 36 80 38 82 42 L 92 60 C 98 60 102 64 102 70 V 82 C 102 86 100 88 96 88 H 26 C 22 88 20 86 20 82 Z"
        fill="var(--sky)"
      />
      <path
        d="M44 58 L 51 44 H 59 V 58 Z M 65 58 V 44 H 72 L 79 58 Z"
        fill="#e9f4fb"
        {...inkStroke}
        strokeWidth={2.5}
      />
      <circle cx="40" cy="88" r="10" fill="var(--ink)" />
      <circle cx="82" cy="88" r="10" fill="var(--ink)" />
      <circle cx="40" cy="88" r="4" fill="var(--paper)" />
      <circle cx="82" cy="88" r="4" fill="var(--paper)" />
      <Heart x={61} y={72} s={0.55} />
      <g className="stroke" strokeWidth={2.5} opacity={0.5}>
        <path d="M8 66 H 14 M 4 76 H 12" />
      </g>
    </Frame>
  );
}

export function IconHouseHeart({ className }: { className?: string }) {
  return (
    <Frame bg="var(--rose-soft)" className={className}>
      <S d="M28 56 L 60 28 L 92 56 V 98 C 92 100 90 102 88 102 H 32 C 30 102 28 100 28 98 Z" fill="var(--paper)" />
      <path d="M20 60 L 60 24 L 100 60" className="stroke" strokeWidth={5} stroke="var(--coral-deep)" />
      <Heart x={60} y={66} s={0.9} />
      <path
        d="M50 102 V 86 C 50 82 54 80 60 80 C 66 80 70 82 70 86 V 102"
        fill="var(--butter)"
        {...inkStroke}
        strokeWidth={2.5}
      />
    </Frame>
  );
}

export function IconPhone({ className }: { className?: string }) {
  return (
    <Frame bg="var(--sage-soft)" className={className}>
      <S
        d="M36 18 C 36 14 39 12 43 12 H 71 C 75 12 78 14 78 18 V 102 C 78 106 75 108 71 108 H 43 C 39 108 36 106 36 102 Z"
        fill="var(--ink)"
      />
      <rect x="41" y="22" width="32" height="74" rx="4" fill="var(--sky-soft)" />
      <Heart x={57} y={56} s={0.8} />
      <path d="M86 30 c 6 6 6 16 0 22 M 94 24 c 10 10 10 24 0 34" className="stroke" stroke="var(--coral-deep)" />
    </Frame>
  );
}
