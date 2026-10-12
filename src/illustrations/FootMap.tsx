import { inkStroke } from './kit';

export const FOOT_VIEWBOX = { x: 0, y: 70, w: 340, h: 500 };

const SKIN = 'var(--skin)';
const NAIL = '#fde9dc';
const SHADOW = 'rgba(46,42,59,0.14)';

/* pravá noha, pohled shora – palec vlevo */
const TOP_BODY =
  'M128 520 C 126 470 112 430 104 380 C 96 330 84 280 80 230 C 77 200 82 180 92 166 C 130 156 200 172 252 210 C 264 240 262 290 252 340 C 244 380 232 420 226 450 C 221 472 218 500 218 520 Z';

/* pravá noha, pohled zespodu (před zrcadlením) – místo nohy pata */
const SOLE_BODY =
  'M80 230 C 77 200 82 180 92 166 C 130 156 200 172 252 210 C 264 240 262 290 252 340 C 246 380 238 420 236 456 C 234 500 220 540 174 544 C 128 548 112 510 112 470 C 112 420 110 380 104 350 C 96 310 84 270 80 230 Z';

const TOES = [
  { cx: 112, cy: 142, rx: 31, ry: 40, r: -4 },
  { cx: 161, cy: 150, rx: 18, ry: 28, r: 3 },
  { cx: 196, cy: 164, rx: 16, ry: 24, r: 10 },
  { cx: 226, cy: 184, rx: 14.5, ry: 20, r: 18 },
  { cx: 249, cy: 208, rx: 12.5, ry: 16, r: 28 },
];

function Toes({ nails }: { nails: boolean }) {
  return (
    <g>
      {[...TOES].reverse().map((t, i) => (
        <g key={i} transform={`rotate(${t.r} ${t.cx} ${t.cy})`}>
          <ellipse cx={t.cx} cy={t.cy} rx={t.rx} ry={t.ry} fill={SKIN} {...inkStroke} />
          {nails ? (
            <ellipse
              cx={t.cx}
              cy={t.cy - t.ry * 0.42}
              rx={t.rx * 0.62}
              ry={t.ry * 0.45}
              fill={NAIL}
              {...inkStroke}
              strokeWidth={2}
            />
          ) : (
            <ellipse cx={t.cx} cy={t.cy - t.ry * 0.3} rx={t.rx * 0.62} ry={t.ry * 0.45} fill="#f9d8bf" />
          )}
        </g>
      ))}
    </g>
  );
}

export function FootTop() {
  return (
    <g>
      {/* stín */}
      <path d={TOP_BODY} fill={SHADOW} transform="translate(8 8)" />
      {/* noha */}
      <path d={TOP_BODY} fill={SKIN} {...inkStroke} />
      <Toes nails />
      {/* šlachy a kotníky */}
      <g className="stroke" stroke="var(--skin-shade)" strokeWidth={4} opacity={0.6}>
        <path d="M142 236 C 146 280 150 320 156 360" />
        <path d="M200 244 C 200 290 198 326 192 360" />
      </g>
      <path d="M100 430 C 112 422 124 426 128 438" className="stroke" strokeWidth={2.5} />
      <path d="M220 448 C 230 440 240 446 240 458" className="stroke" strokeWidth={2.5} />
      {/* nohavice */}
      <path d="M116 500 H 230 V 560 H 116 Z" fill="var(--sage-soft)" />
      <path
        d="M134 500 V 560 M 152 500 V 560 M 170 500 V 560 M 188 500 V 560 M 206 500 V 560"
        stroke="var(--sage)"
        strokeWidth={4}
      />
      <rect x="108" y="494" width="130" height="30" rx="12" fill="var(--sage)" {...inkStroke} />
      <path d="M116 500 V 560 M 230 500 V 560" className="stroke" />
    </g>
  );
}

export function FootSole() {
  return (
    <g transform={`translate(${FOOT_VIEWBOX.w} 0) scale(-1 1)`}>
      <path d={SOLE_BODY} fill={SHADOW} transform="translate(-8 8)" />
      <path d={SOLE_BODY} fill={SKIN} {...inkStroke} />
      <Toes nails={false} />
      {/* bříška pod prsty */}
      <path
        d="M96 214 C 110 186 220 192 244 226 C 250 248 228 262 196 258 C 160 254 120 262 102 248 C 92 240 90 226 96 214 Z"
        fill="#f2b896"
        opacity={0.55}
      />
      {/* vnější hrana */}
      <path d="M236 270 C 238 330 228 390 222 440" className="stroke" stroke="#f2b896" strokeWidth={14} opacity={0.6} />
      {/* klenba – světlejší, nedotýká se země */}
      <path
        d="M100 300 C 120 300 150 330 152 380 C 154 420 136 440 116 444 C 112 400 108 340 100 300 Z"
        fill="#fde3d0"
      />
      {/* pata */}
      <ellipse cx="172" cy="482" rx="50" ry="50" fill="#f2b896" opacity={0.55} />
      <g className="stroke" stroke="var(--skin-shade)" strokeWidth={2.5}>
        <path d="M150 498 c 6 6 14 8 22 8" />
        <path d="M124 260 c 10 6 24 8 38 6" />
      </g>
    </g>
  );
}

export type Spot = {
  id: string;
  view: 'top' | 'sole';
  x: number;
  y: number;
  title: string;
  look: string;
  tip: string;
};

export const SPOTS: Spot[] = [
  {
    id: 'nehty',
    view: 'top',
    x: 112,
    y: 124,
    title: 'Nehty',
    look: 'Jsou nehty moc dlouhé, zesílené nebo zažloutlé? Zarůstají do kůže, je kolem nich zarudnutí?',
    tip: 'Stříhat rovně a ne moc nakrátko. Zesílené, zažloutlé nebo zarůstající nehty patří k pedikérovi či lékaři. Často za nimi bývá plíseň.',
  },
  {
    id: 'mezi-prsty',
    view: 'top',
    x: 179,
    y: 172,
    title: 'Mezi prsty',
    look: 'Bílá rozmočená kůže, praskliny, svědění nebo zápach. To vše mohou být příznaky plísně.',
    tip: 'Po mytí pečlivě osušit i mezi prsty. Krém sem nedávat, vlhko plísním svědčí.',
  },
  {
    id: 'hrbet',
    view: 'top',
    x: 172,
    y: 300,
    title: 'Hřbet nohy a prsty',
    look: 'Otlaky a puchýře od bot, kuří oka, zarudlá místa, zkřivené prsty nebo vbočený palec.',
    tip: 'Prohlédni i boty. Nejsou malé nebo tvrdé? Netlačí švy? Nemá v nich někdo kamínek?',
  },
  {
    id: 'kotniky',
    view: 'top',
    x: 112,
    y: 444,
    title: 'Kotníky a lýtka',
    look: 'Otoky, změna barvy, studená nebo naopak horká kůže, lesklá kůže bez chloupků.',
    tip: 'Náhlý otok jedné nohy, bolest lýtka nebo zmodrání je důvod jít rychle k lékaři.',
  },
  {
    id: 'pod-prsty',
    view: 'sole',
    x: 168,
    y: 228,
    title: 'Chodidlo pod prsty',
    look: 'Mozoly, kuří oka a ztvrdlá místa tam, kde noha nejvíc tlačí.',
    tip: 'Nic neodstraňovat žiletkou ani náplastmi na kuří oka, zvlášť u cukrovky. To je práce pro pedikéra.',
  },
  {
    id: 'chodidlo',
    view: 'sole',
    x: 214,
    y: 370,
    title: 'Klenba a celé chodidlo',
    look: 'Ranky, puchýře, zarudnutí, teplejší místo nebo zapíchnutý střípek, který člověk necítí.',
    tip: 'Chodidla sám člověk skoro nevidí. Pomůže zrcátko, nebo tvoje oči. Ranka, která nebolí, není o nic méně vážná.',
  },
  {
    id: 'pata',
    view: 'sole',
    x: 168,
    y: 482,
    title: 'Paty',
    look: 'Suchá, ztvrdlá kůže a praskliny. Ty mohou být hluboké a bolestivé.',
    tip: 'Pravidelně promazávat krémem s ureou (močovinou). Hluboké praskliny nechat ošetřit odborníkem.',
  },
];
