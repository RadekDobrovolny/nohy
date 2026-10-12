import type { CSSProperties, ReactElement } from 'react';
import { Heading } from '../components/Heading';
import { Reveal } from '../components/Reveal';
import SpotlightCard from '../components/reactbits/SpotlightCard';
import {
  IconCarHome,
  IconDrop,
  IconHouseHeart,
  IconPedicure,
  IconPodiatry,
  IconStethoscope,
} from '../illustrations/Icons';
import './Help.css';

type HelpItem = {
  Icon: (p: { className?: string }) => ReactElement;
  tag: string;
  title: string;
  text: string;
  link?: { href: string; label: string };
};

const HELP: HelpItem[] = [
  {
    Icon: IconStethoscope,
    tag: 'První krok',
    title: 'Praktický lékař',
    text: 'Prohlédne nohy, posoudí rizika a případně doporučí ke specialistovi. O kontrolu nohou si klidně řekněte při preventivní prohlídce.',
  },
  {
    Icon: (p) => <IconDrop {...p} plus />,
    tag: 'Pro lidi s cukrovkou',
    title: 'Diabetolog',
    text: 'Lidé s cukrovkou by měli mít nohy pravidelně zkontrolované lékařem, alespoň jednou ročně. Když se to při kontrole nestane, řekněte si o to.',
  },
  {
    Icon: IconPodiatry,
    tag: 'Rány a rizikové nohy',
    title: 'Podiatrická ambulance',
    text: 'Specializovaná péče o diabetickou nohu, rány, které se nehojí, a nohy s vysokým rizikem. Obvykle na doporučení lékaře.',
    link: {
      href: 'https://www.diab.cz/',
      label: 'Česká diabetologická společnost',
    },
  },
  {
    Icon: IconPedicure,
    tag: 'Nehty, kůže, otlaky',
    title: 'Zdravotní pedikúra',
    text: 'Pedikéři se zaměřením na rizikové nohy ošetří zesílené i zarůstající nehty, ztvrdlou kůži a kuří oka. Některé pojišťovny lidem s cukrovkou přispívají z preventivních programů, zeptejte se té své.',
    link: {
      href: 'https://www.podiatrie.cz/cz/registr-cps/registr-poskytovatelu-sluzeb/',
      label: 'Registr České podiatrické společnosti',
    },
  },
  {
    Icon: IconCarHome,
    tag: 'Když je cesta náročná',
    title: 'Mobilní pedikúra',
    text: 'Pedikérka nebo pedikér přijede až domů. Ideální pro rodiče, kteří špatně chodí nebo nechtějí nikam jezdit. Hledejte „mobilní pedikúra“ a název obce.',
  },
  {
    Icon: IconHouseHeart,
    tag: 'Pravidelná pomoc doma',
    title: 'Pečovatelská služba a domácí péče',
    text: 'Pečovatelka pomůže s hygienou včetně péče o nohy. Na ošetřování ran může lékař předepsat zdravotní sestru domů, kterou hradí pojišťovna.',
    link: {
      href: 'https://www.mpsv.cz/registr-poskytovatelu-sluzeb',
      label: 'Registr sociálních služeb (MPSV)',
    },
  },
];

const URGENT = [
  'Rána, puchýř nebo vřed, který se do pár dnů nezačne hojit. U lidí s cukrovkou jakákoli rána na noze.',
  'Zarudnutí, otok, teplo nebo hnis v okolí rány či nehtu.',
  'Změna barvy prstu nebo části nohy: zbělání, zmodrání, zčernání.',
  'Horečka nebo zimnice spolu s potížemi s nohou.',
  'Náhlá silná bolest, nebo naopak nově vzniklá necitlivost.',
];

export function Help() {
  return (
    <section className="section section--sky help" id="pomoc" tabIndex={-1} aria-labelledby="pomoc-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Kde najít pomoc</p>
          <div id="pomoc-title">
            <Heading text="Na to nemusíte být sami" />
          </div>
          <Reveal>
            <p className="lead">
              O nohy se starají odborníci, kteří vědí, jak na to, a kteří se ničemu nediví. Tady je přehled, kam se
              obrátit.
            </p>
          </Reveal>
        </div>

        <Reveal as="ul" className="help__grid" stagger={0.08}>
          {HELP.map(({ Icon, tag, title, text, link }) => (
            <li key={title}>
              <SpotlightCard
                className="help__card"
                theme="light"
                spotlightColor="#e2704f"
                intensity={0.35}
                spotlightSize={280}
                borderGlow={0.9}
                style={
                  {
                    '--spotlight-card-surface': 'var(--paper)',
                  } as CSSProperties
                }
              >
                <div className="help__top">
                  <Icon className="help__icon" />
                  <span className="help__tag">{tag}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                {link && (
                  <a className="link-arrow help__link" href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <span className="sr-only"> (otevře se v novém okně)</span>
                  </a>
                )}
              </SpotlightCard>
            </li>
          ))}
        </Reveal>

        <Reveal className="urgent" as="aside">
          <div className="urgent__head">
            <span className="urgent__icon" aria-hidden="true">
              !
            </span>
            <div>
              <h3>Kdy nečekat a jít k lékaři hned</h3>
              <p>Tyhle příznaky nejsou na „počkáme, jestli to přejde“.</p>
            </div>
          </div>
          <ul>
            {URGENT.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
          <div className="urgent__call">
            <p>
              Mimo ordinační hodiny pomůže <strong>lékařská pohotovost</strong>. Při ohrožení života volejte{' '}
              <strong>155</strong>.
            </p>
            <a className="btn btn--coral" href="tel:155">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6.6 3.5l2.6.4 1.3 4-1.9 1.4a12 12 0 006.1 6.1l1.4-1.9 4 1.3.4 2.6c.1.9-.6 1.7-1.5 1.8C10 20 4 14 3.8 5c.1-.9.9-1.6 1.8-1.5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              Zavolat 155
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
