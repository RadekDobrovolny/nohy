import { useId, useRef } from 'react';
import { gsap, useGSAP, reducedMotion } from '../lib/motion';
import { HandFilter, Heart, Sparkle, inkStroke } from './kit';

const BLOB =
  'M300 40 C 430 34 556 122 568 262 C 580 404 492 552 330 566 C 170 580 44 492 32 350 C 20 206 152 46 300 40 Z';

/** Levé chodidlo pohledem shora; pravé vzniká zrcadlením kolem x = 300. */
function Foot() {
  return (
    <g className="foot">
      <path
        d="M220 230 C 214 276 206 318 206 350 C 206 372 214 386 226 390 L 286 392 C 298 388 303 374 301 356 C 297 320 279 278 268 230 Z"
        fill="var(--skin)"
        {...inkStroke}
      />
      <g className="toes">
        <ellipse cx="212" cy="387" rx="8" ry="10" fill="var(--skin)" {...inkStroke} strokeWidth={2.5} />
        <ellipse cx="225" cy="398" rx="9" ry="12" fill="var(--skin)" {...inkStroke} strokeWidth={2.5} />
        <ellipse cx="241" cy="404" rx="10" ry="13" fill="var(--skin)" {...inkStroke} strokeWidth={2.5} />
        <ellipse cx="259" cy="406" rx="11" ry="14" fill="var(--skin)" {...inkStroke} strokeWidth={2.5} />
        <ellipse cx="284" cy="399" rx="17" ry="20" fill="var(--skin)" {...inkStroke} />
        {/* nehty */}
        <ellipse cx="225" cy="404" rx="4.5" ry="4.5" fill="#fde9dc" />
        <ellipse cx="241" cy="411" rx="5" ry="5" fill="#fde9dc" />
        <ellipse cx="259" cy="413" rx="5.5" ry="5.5" fill="#fde9dc" />
        <ellipse cx="284" cy="409" rx="9" ry="8" fill="#fde9dc" />
      </g>
      {/* jemné stínování nártu */}
      <path
        d="M232 300 C 236 330 240 350 248 368"
        className="stroke"
        stroke="var(--skin-shade)"
        strokeWidth={3}
        opacity={0.8}
      />
    </g>
  );
}

function Leg() {
  return (
    <g className="leg">
      {/* holeň */}
      <rect x="220" y="90" width="48" height="160" fill="var(--skin)" />
      <path d="M220 90 L220 250 M268 90 L268 250" className="stroke" />
      {/* nohavice pyžama */}
      <rect x="207" y="-40" width="74" height="140" fill="var(--sage-soft)" stroke="var(--ink)" strokeWidth={3} />
      <path d="M223 -40 V 100 M238 -40 V 100 M253 -40 V 100 M268 -40 V 100" stroke="var(--sage)" strokeWidth={4} />
      <rect x="202" y="88" width="84" height="32" rx="13" fill="var(--sage)" {...inkStroke} />
      <path d="M214 104 H 274" className="stroke" stroke="var(--sage-deep)" strokeWidth={2} strokeDasharray="2 7" />
    </g>
  );
}

export function HeroScene({ className }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, '');
  const hand = `hand-${uid}`;
  const clip = `clip-${uid}`;

  useGSAP(
    () => {
      if (reducedMotion) return;
      const intro = gsap.timeline({ defaults: { ease: 'back.out(1.6)' } });
      intro
        .from('.blob', { scale: 0.85, opacity: 0, duration: 1.1, transformOrigin: '50% 50%', ease: 'power3.out' })
        .from('.basin', { scale: 0.7, opacity: 0, duration: 0.9, transformOrigin: '50% 50%' }, '-=0.7')
        .from('.legs', { y: -140, duration: 1.1, ease: 'power3.out' }, '-=0.6')
        .from(
          '.prop',
          { scale: 0, opacity: 0, rotate: -20, duration: 0.7, stagger: 0.09, transformOrigin: '50% 50%' },
          '-=0.6',
        )
        .from('.deco', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.06, transformOrigin: '50% 50%' }, '-=0.4');

      gsap.to('.toes', {
        rotate: 5,
        transformOrigin: '50% 0%',
        duration: 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.6,
        stagger: 0.25,
      });
      gsap.to('.legs-bob', { y: 4, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to('.bubble', {
        y: () => gsap.utils.random(-22, -6),
        scale: () => gsap.utils.random(0.75, 1.2),
        transformOrigin: '50% 50%',
        duration: () => gsap.utils.random(1.6, 2.8),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.15, from: 'random' },
      });
      gsap.fromTo(
        '.ripple',
        { scale: 0.85, opacity: 0.9, transformOrigin: '50% 50%' },
        { scale: 1.5, opacity: 0, duration: 2.6, ease: 'sine.out', repeat: -1, stagger: 0.65 },
      );
      gsap.to('.float', {
        y: -10,
        rotate: 6,
        transformOrigin: '50% 50%',
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });
      gsap.to('.twinkle', {
        scale: 0.6,
        rotate: 45,
        transformOrigin: '50% 50%',
        duration: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      className={`ill ${className ?? ''}`}
      viewBox="0 0 600 600"
      role="img"
      aria-label="Kreslená ilustrace: nohy v pyžamu namočené v lavoru s teplou vodou, vedle ručník, bačkory a krém."
    >
      <defs>
        <HandFilter id={hand} />
        <clipPath id={clip}>
          <path d={BLOB} />
        </clipPath>
      </defs>

      <g filter={`url(#${hand})`}>
        <path className="blob" d={BLOB} fill="var(--peach-soft)" />
        <circle
          className="deco"
          cx="300"
          cy="320"
          r="236"
          fill="none"
          stroke="var(--peach)"
          strokeWidth={2.5}
          strokeDasharray="3 12"
          strokeLinecap="round"
        />

        {/* lavor */}
        <g className="basin">
          <circle cx="309" cy="339" r="186" fill="rgba(46,42,59,0.14)" />
          <circle cx="300" cy="330" r="186" fill="var(--sky)" {...inkStroke} />
          <circle cx="300" cy="330" r="160" fill="#c9e3f3" {...inkStroke} strokeWidth={2.5} />
          <path d="M150 268 A 168 168 0 0 1 238 176" className="stroke" stroke="#fff" strokeWidth={6} opacity={0.7} />
        </g>

        {/* nohy */}
        <g clipPath={`url(#${clip})`}>
          <g className="legs-bob">
            <g className="legs">
              <g transform="translate(-12 0)">
                <Foot />
              </g>
              <g transform="translate(600 0) scale(-1 1) translate(-12 0)">
                <Foot />
              </g>
              {/* voda přes chodidla */}
              <circle cx="300" cy="330" r="158" fill="var(--sky)" opacity={0.2} pointerEvents="none" />
              <path d="M196 448 q 18 -8 36 0 t 36 0" className="stroke" stroke="#fff" strokeWidth={3} opacity={0.75} />
              <path d="M340 462 q 14 -6 28 0 t 28 0" className="stroke" stroke="#fff" strokeWidth={3} opacity={0.75} />
              <path d="M392 278 q 12 -6 24 0" className="stroke" stroke="#fff" strokeWidth={3} opacity={0.75} />
              <g transform="translate(-12 0)">
                <Leg />
              </g>
              <g transform="translate(600 0) scale(-1 1) translate(-12 0)">
                <Leg />
              </g>
              <ellipse className="ripple" cx="232" cy="250" rx="36" ry="10" fill="none" stroke="#fff" strokeWidth={3} />
              <ellipse className="ripple" cx="368" cy="250" rx="36" ry="10" fill="none" stroke="#fff" strokeWidth={3} />
              <ellipse className="ripple" cx="232" cy="250" rx="36" ry="10" fill="none" stroke="#fff" strokeWidth={3} />
              <ellipse className="ripple" cx="368" cy="250" rx="36" ry="10" fill="none" stroke="#fff" strokeWidth={3} />
            </g>
          </g>
        </g>

        {/* bublinky */}
        <g fill="#fff" stroke="var(--sky-deep)" strokeWidth={2} opacity={0.95}>
          {[
            [186, 300, 8],
            [204, 334, 4.5],
            [404, 300, 6],
            [418, 352, 9],
            [318, 448, 5],
            [276, 462, 8],
            [372, 478, 4.5],
            [178, 404, 6],
            [436, 418, 5.5],
            [300, 300, 4],
          ].map(([cx, cy, r], i) => (
            <circle key={i} className="bubble" cx={cx} cy={cy} r={r} />
          ))}
        </g>

        {/* ručník */}
        <g className="prop" transform="translate(40 470) rotate(-12)">
          <rect x="6" y="6" width="176" height="84" rx="16" fill="rgba(46,42,59,0.14)" />
          <rect width="176" height="84" rx="16" fill="var(--rose-soft)" {...inkStroke} />
          <rect x="20" y="0" width="14" height="84" fill="var(--coral)" opacity={0.85} />
          <rect x="142" y="0" width="14" height="84" fill="var(--coral)" opacity={0.85} />
          <rect width="176" height="84" rx="16" fill="none" {...inkStroke} />
          <path d="M0 42 H 176" className="stroke" strokeWidth={2} opacity={0.35} />
        </g>

        {/* bačkory */}
        <g className="prop" transform="translate(448 430) rotate(16)">
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${i * 74} ${i * 16})`}>
              <path
                d="M6 36 C 6 12 22 0 38 0 C 56 0 70 12 70 36 L 68 116 C 67 136 54 146 38 146 C 22 146 8 136 7 116 Z"
                fill="rgba(46,42,59,0.14)"
                transform="translate(5 5)"
              />
              <path
                d="M6 36 C 6 12 22 0 38 0 C 56 0 70 12 70 36 L 68 116 C 67 136 54 146 38 146 C 22 146 8 136 7 116 Z"
                fill="var(--peach)"
                {...inkStroke}
              />
              <path
                d="M7 50 C 8 18 22 6 38 6 C 54 6 68 18 69 50 C 52 62 24 62 7 50 Z"
                fill="var(--butter)"
                {...inkStroke}
              />
              <circle cx="38" cy="38" r="10" fill="var(--coral)" {...inkStroke} strokeWidth={2.5} />
            </g>
          ))}
        </g>

        {/* krém */}
        <g className="prop" transform="translate(54 176) rotate(-30)">
          <path
            d="M0 6 L 10 2 L 98 8 C 104 8 106 12 106 16 L 106 34 C 106 38 104 42 98 42 L 10 48 L 0 44 Z"
            fill="rgba(46,42,59,0.14)"
            transform="translate(5 5)"
          />
          <path
            d="M0 6 L 10 2 L 98 8 C 104 8 106 12 106 16 L 106 34 C 106 38 104 42 98 42 L 10 48 L 0 44 Z"
            fill="var(--paper)"
            {...inkStroke}
          />
          <rect x="106" y="13" width="24" height="24" rx="5" fill="var(--sage)" {...inkStroke} />
          <path d="M8 6 V 44 M 14 4 V 46" className="stroke" strokeWidth={2} />
          <rect x="34" y="15" width="50" height="20" rx="9" fill="var(--sky-soft)" {...inkStroke} strokeWidth={2} />
          <Heart x={59} y={25} s={0.42} />
        </g>

        {/* snítek */}
        <g className="prop" transform="translate(478 70)">
          <path d="M40 150 C 34 110 30 70 10 20" className="stroke" stroke="var(--sage-deep)" />
          {[
            [30, 120, -30],
            [26, 92, 40],
            [20, 66, -40],
            [18, 44, 30],
          ].map(([x, y, r], i) => (
            <ellipse
              key={i}
              cx={x + (r > 0 ? 16 : -16)}
              cy={y}
              rx="18"
              ry="9"
              transform={`rotate(${r} ${x} ${y})`}
              fill="var(--sage)"
              {...inkStroke}
              strokeWidth={2.5}
            />
          ))}
        </g>

        <g className="deco">
          <g className="float">
            <Heart x={476} y={232} s={1.2} />
          </g>
        </g>
        <g className="deco">
          <g className="float">
            <Heart x={140} y={96} s={0.85} fill="var(--rose)" />
          </g>
        </g>
        <g className="deco">
          <g className="twinkle">
            <Sparkle x={548} y={330} s={1.1} />
          </g>
        </g>
        <g className="deco">
          <g className="twinkle">
            <Sparkle x={70} y={360} s={0.9} />
          </g>
        </g>
        <g className="deco">
          <g className="twinkle">
            <Sparkle x={392} y={84} s={0.8} />
          </g>
        </g>
      </g>
    </svg>
  );
}
