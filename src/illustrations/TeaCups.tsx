import { useId, useRef } from 'react';
import { gsap, useGSAP, reducedMotion, playWhileVisible } from '../lib/motion';
import { HandFilter, Heart, inkStroke } from './kit';

const SHADOW = 'rgba(46,42,59,0.14)';

function Cup({ x, color, handle }: { x: number; color: string; handle: 'left' | 'right' }) {
  const body = `M${x - 52} 150 H ${x + 52} C ${x + 52} 202 ${x + 32} 232 ${x} 232 C ${x - 32} 232 ${x - 52} 202 ${x - 52} 150 Z`;
  const h =
    handle === 'left'
      ? `M${x - 50} 168 C ${x - 80} 166 ${x - 80} 206 ${x - 44} 204`
      : `M${x + 50} 168 C ${x + 80} 166 ${x + 80} 206 ${x + 44} 204`;
  return (
    <g>
      <ellipse cx={x + 4} cy={240} rx={84} ry={15} fill={SHADOW} />
      <ellipse cx={x} cy={236} rx={84} ry={15} fill="var(--paper)" {...inkStroke} />
      <path d={h} fill="none" stroke="var(--ink)" strokeWidth={14} strokeLinecap="round" />
      <path d={h} fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" />
      <path d={body} fill={SHADOW} transform="translate(5 5)" />
      <path d={body} fill={color} {...inkStroke} />
      <ellipse cx={x} cy={150} rx={52} ry={11} fill="#c98a5c" {...inkStroke} />
      <ellipse cx={x - 12} cy={148} rx={16} ry={3} fill="#e0a77c" />
      <path
        d={`M${x - 30} 176 C ${x - 28} 196 ${x - 18} 210 ${x - 6} 216`}
        className="stroke"
        stroke="#fff"
        strokeWidth={4}
        opacity={0.6}
      />
    </g>
  );
}

export function TeaCups({ className }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);
  const hand = `hand-${useId().replace(/:/g, '')}`;

  useGSAP(
    () => {
      if (reducedMotion) return;
      // Pára a srdce jsou mimo SVG filtr a běží jen když jsou šálky vidět.
      const loops = [
        gsap.fromTo(
          '.steam',
          { strokeDashoffset: 0 },
          { strokeDashoffset: -40, duration: 2.2, ease: 'none', repeat: -1, paused: true },
        ),
        gsap.to('.steam', {
          opacity: 0.45,
          duration: 1.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.4,
          paused: true,
        }),
        gsap.to('.tea-heart', {
          y: -8,
          scale: 1.08,
          transformOrigin: '50% 50%',
          duration: 1.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          paused: true,
        }),
      ];
      playWhileVisible(root.current, loops);
      gsap.from('.bubble-l, .bubble-r', {
        scale: 0,
        transformOrigin: '50% 100%',
        duration: 0.7,
        ease: 'back.out(2)',
        stagger: 0.35,
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      });
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      className={`ill ${className ?? ''}`}
      viewBox="0 0 440 300"
      role="img"
      aria-label="Kreslená ilustrace: dva šálky čaje na stole, pára z nich se spojuje do srdce."
    >
      <defs>
        <HandFilter id={hand} />
      </defs>
      <g filter={`url(#${hand})`}>
        <path
          d="M20 250 C 120 236 320 236 420 250 C 430 262 424 280 410 284 C 300 296 140 296 30 284 C 16 280 10 262 20 250 Z"
          fill="var(--peach)"
          opacity={0.55}
        />

        <Cup x={130} color="var(--sky)" handle="left" />
        <Cup x={310} color="var(--butter)" handle="right" />

        {/* sušenky */}
        <ellipse cx={222} cy={262} rx={40} ry={9} fill="var(--paper)" {...inkStroke} strokeWidth={2.5} />
        {[204, 238].map((cx, i) => (
          <g key={cx} transform={`rotate(${i ? 8 : -6} ${cx} 250)`}>
            <ellipse cx={cx} cy={250} rx={18} ry={9} fill="#e2b07a" {...inkStroke} strokeWidth={2.5} />
            <circle cx={cx - 6} cy={248} r={2} fill="var(--ink)" />
            <circle cx={cx + 5} cy={252} r={2} fill="var(--ink)" />
            <circle cx={cx + 2} cy={246} r={1.6} fill="var(--ink)" />
          </g>
        ))}

        {/* bubliny */}
        <g className="bubble-l">
          <path
            d="M30 18 H 110 C 118 18 122 22 122 30 V 54 C 122 62 118 66 110 66 H 66 L 52 80 L 54 66 H 30 C 22 66 18 62 18 54 V 30 C 18 22 22 18 30 18 Z"
            fill="var(--paper)"
            {...inkStroke}
          />
          <path d="M36 36 H 100 M 36 48 H 84" className="stroke" stroke="var(--ink-soft)" strokeWidth={4} />
        </g>
        <g className="bubble-r">
          <path
            d="M330 8 H 410 C 418 8 422 12 422 20 V 44 C 422 52 418 56 410 56 H 396 L 398 70 L 384 56 H 330 C 322 56 318 52 318 44 V 20 C 318 12 322 8 330 8 Z"
            fill="var(--sage-soft)"
            {...inkStroke}
          />
          <Heart x={370} y={32} s={0.8} />
        </g>
      </g>

      {/* animovaná pára a srdce: mimo filtr */}
      <g fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" strokeDasharray="10 10" opacity={0.75}>
        <path className="steam" d="M118 132 C 104 112 132 100 120 80 C 112 66 130 54 150 58" />
        <path className="steam" d="M140 130 C 134 112 152 104 146 88 C 142 76 160 68 176 72" />
        <path className="steam" d="M322 132 C 336 112 308 100 320 80 C 328 66 310 54 290 58" />
        <path className="steam" d="M300 130 C 306 112 288 104 294 88 C 298 76 280 68 264 72" />
      </g>
      <g className="tea-heart">
        <Heart x={220} y={66} s={2.1} />
      </g>
    </svg>
  );
}
