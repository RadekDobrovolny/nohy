import { useRef } from 'react';
import { Heading } from '../components/Heading';
import { Reveal } from '../components/Reveal';
import CountUp from '../components/reactbits/CountUp';
import { IconGerm, IconHeartCheck, IconHeelCrack, IconHospital, IconPlaster } from '../illustrations/Icons';
import { gsap, useGSAP, reducedMotion } from '../lib/motion';
import './Risks.css';

const STEPS = [
  {
    Icon: IconHeelCrack,
    title: 'Začne to maličkostí',
    text: 'Ztvrdlá kůže, prasklá pata, otlak od bot nebo nehet, který začíná zarůstat. Nic, kvůli čemu by se chodilo k doktorovi.',
  },
  {
    Icon: IconPlaster,
    title: 'Ranka, kterou nikdo nevidí',
    text: 'Drobné poranění, které nebolí nebo na které není vidět. Několik dní zůstane bez ošetření.',
  },
  {
    Icon: IconGerm,
    title: 'Přijde infekce',
    text: 'U lidí s cukrovkou nebo horším prokrvením se může šířit rychle a hojit se týdny i měsíce.',
  },
  {
    Icon: IconHospital,
    title: 'Vážné komplikace',
    text: 'Vřed, nemocnice a v nejhorším případě amputace. Je to krajní scénář, kterému se ale dá často předejít.',
  },
];

const STATS = [
  {
    to: 884500,
    separator: ' ',
    prefix: '',
    suffix: '',
    label: 'lidí v Česku užívá léky na cukrovku',
    source: 'ČSÚ, 2024',
  },
  {
    to: 34,
    prefix: 'až ',
    suffix: ' %',
    label: 'lidí s cukrovkou se během života setká s vředem na noze',
    source: 'Armstrong a kol., NEJM 2017',
  },
  {
    to: 85,
    prefix: '',
    suffix: ' %',
    label: 'amputací u lidí s cukrovkou začíná vředem na noze',
    source: 'IWGDF',
  },
];

export function Risks() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.fromTo(
        '.risk__line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.risk__timeline', start: 'top 60%', end: 'bottom 60%', scrub: 0.6 },
        },
      );
      gsap.utils.toArray<HTMLElement>('.risk__step').forEach((step) => {
        gsap.to(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 62%',
            toggleClass: 'is-active',
          },
        });
        gsap.from(step.querySelector('.risk__icon'), {
          scale: 0.5,
          rotate: -15,
          duration: 0.8,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: step, start: 'top 75%', once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section className="section section--ink risk" id="rizika" ref={ref} aria-labelledby="rizika-title">
      <div className="container risk__grid">
        <div className="risk__head">
          <p className="eyebrow">Co se může stát</p>
          <div id="rizika-title">
            <Heading text="Z maličkosti může být vážný problém" />
          </div>
          <Reveal>
            <p className="lead">
              Zanedbaná péče o nohy se nezhorší ze dne na den. Většinou to začne nenápadně, a právě proto má smysl dívat
              se včas.
            </p>
          </Reveal>
        </div>

        <div className="risk__timeline">
          <span className="risk__line" aria-hidden="true">
            <span className="risk__line-fill" />
          </span>
          <ol className="risk__list">
            {STEPS.map(({ Icon, title, text }, i) => (
              <li key={title} className="risk__step">
                <div className="risk__icon">
                  <Icon />
                </div>
                <div className="risk__body">
                  <span className="risk__num">Krok {i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
            <li className="risk__step risk__step--good">
              <div className="risk__icon">
                <IconHeartCheck />
              </div>
              <div className="risk__body">
                <span className="risk__num">Dobrá zpráva</span>
                <h3>Dá se tomu předejít</h3>
                <p>
                  Většina potíží začíná nenápadně, takže se dá zachytit včas. Stačí se pravidelně dívat a nebát se říct
                  si o&nbsp;pomoc.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className="container">
        <Reveal as="ul" className="risk__stats" stagger={0.12}>
          {STATS.map((s) => (
            <li key={s.label}>
              <p className="risk__stat-num">
                {s.prefix}
                <CountUp to={s.to} separator={s.separator} duration={2} />
                {s.suffix}
              </p>
              <p className="risk__stat-label">{s.label}</p>
              <p className="risk__stat-source">Zdroj: {s.source}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
