import { useRef, useState, type CSSProperties } from 'react';
import { Heading } from '../components/Heading';
import { Reveal } from '../components/Reveal';
import { TeaCups } from '../illustrations/TeaCups';
import { gsap, useGSAP, reducedMotion } from '../lib/motion';
import './Conversation.css';

const STEPS = [
  {
    title: 'Vyber klidnou chvíli',
    text: 'Mezi čtyřma očima, bez spěchu a bez publika. Ne u nedělního oběda s celou rodinou, ale třeba u kávy nebo na procházce.',
    quote: 'Mami, dáme si spolu kafe? Jen tak, v klidu.',
    color: 'var(--paper)',
  },
  {
    title: 'Začni u sebe',
    text: 'Když o péči o nohy mluvíš jako o něčem, co děláš i ty, přestane to znít jako diagnóza.',
    quote: 'Chodím teď na pedikúru a je to taková úleva. Nechceš to zkusit taky?',
    color: 'var(--butter-soft)',
  },
  {
    title: 'Mluv o pohodlí, ne o selhání',
    text: 'Nejde o to, co už nezvládají. Jde o to, aby je nic nebolelo a chodilo se jim dobře.',
    quote: 'Chci, aby tě nic netlačilo, až půjdeš na zahrádku.',
    color: 'var(--sky-soft)',
  },
  {
    title: 'Nabídni konkrétní pomoc',
    text: 'Obecné „kdyby něco, řekni“ skoro nikdy nefunguje. Konkrétní nabídka se odmítá mnohem hůř.',
    quote: 'V úterý tě objednám na pedikúru a odvezu tě tam. Platí?',
    color: 'var(--rose-soft)',
  },
  {
    title: 'Udělej z toho společnou chvíli',
    text: 'Teplá koupel nohou, krém, pomalá masáž. Péče, která nepůsobí jako kontrola, ale jako čas strávený spolu.',
    quote: 'Uvařím čaj a namažu ti nohy. Ty si sedni a vyprávěj.',
    color: 'var(--sage-soft)',
  },
  {
    title: 'Respektuj, když řeknou ne',
    text: 'Napoprvé to nemusí vyjít. Nenaléhej a zkus to jindy, jinak nebo přes někoho jiného. Hlavní je, že téma už není tabu.',
    quote: 'Dobře, nechám to být. Ale nabídka platí, kdykoli budeš chtít.',
    color: 'var(--peach-soft)',
  },
];

const PHRASES = [
  {
    no: 'Ty máš ale hrozné nehty.',
    yes: 'Nechceš s nehty pomoct? Mně to vůbec nevadí.',
  },
  {
    no: 'Tohle už nezvládáš.',
    yes: 'Shýbat se je otrava, co? Pojď, udělám to já a ty mi zatím povídej.',
  },
  {
    no: 'Musíš okamžitě k doktorovi!',
    yes: 'Trochu se mi to nelíbí. Zajdeme se na to podívat spolu, ať máme klid?',
  },
  {
    no: 'Proč mi nic neříkáš?',
    yes: 'Děkuju, že mi to ukazuješ. Vyřešíme to spolu.',
  },
  {
    no: 'Fuj, to je nechutné.',
    yes: 'Nohy jsou prostě nohy. Mně to nevadí, jsem tu pro tebe.',
  },
  {
    no: 'Musíš o sebe víc dbát.',
    yes: 'Zasloužíš si, aby tě nic nebolelo. Dovol mi s tím trochu pomoct.',
  },
];

const TIPS = [
  {
    title: 'Když to nejde od tebe',
    text: 'Někdy je snazší, když to řekne někdo jiný: praktický lékař, sourozenec, vnouče nebo pedikérka. Klidně předem popros lékaře, ať se při prohlídce podívá i na nohy.',
  },
  {
    title: 'Když bydlíš daleko',
    text: 'Zavolej a zeptej se, jak se jim chodí. Domluv mobilní pedikúru, která přijede až domů, nebo popros sousedku či pečovatelskou službu, ať se občas podívají.',
  },
  {
    title: 'Dárek, který dává smysl',
    text: 'Poukaz na zdravotní pedikúru k narozeninám nebo k Vánocům. Praktický, příjemný a nikoho neponíží. Nejlépe i s nabídkou odvozu.',
  },
];

function PhraseCard({ no, yes }: { no: string; yes: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <li>
      <button
        className={`phrase ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
      >
        <span className="phrase__inner">
          <span className="phrase__face phrase__face--no" aria-hidden={flipped}>
            <span className="phrase__label">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
              Místo
            </span>
            <span className="phrase__text">„{no}“</span>
            <span className="phrase__hint">Klikni pro lepší verzi</span>
          </span>
          <span className="phrase__face phrase__face--yes" aria-hidden={!flipped}>
            <span className="phrase__label">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              Zkus
            </span>
            <span className="phrase__text">„{yes}“</span>
          </span>
        </span>
      </button>
    </li>
  );
}

export function Conversation() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;
      const cards = gsap.utils.toArray<HTMLElement>('.steps__card');
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.fromTo(
          card,
          { scale: 1 },
          {
            scale: 0.92 + i * 0.01,
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: 'top 30%',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section className="section convo" id="rozhovor" ref={ref} tabIndex={-1} aria-labelledby="rozhovor-title">
      <div className="container">
        <div className="convo__head">
          <div>
            <p className="eyebrow">Jak to otevřít</p>
            <div id="rozhovor-title">
              <Heading text="Jak o tom mluvit, aby se nikdo necítil trapně" />
            </div>
            <Reveal>
              <p className="lead">
                Pro mnoho rodičů je těžké přijmout pomoc od vlastních dětí. Vždyť se celý život starali oni o tebe.
                Nejde o to je přesvědčit. Jde o to, aby věděli, že v tom nejsou sami.
              </p>
            </Reveal>
          </div>
          <Reveal className="convo__art" delay={0.2}>
            <TeaCups />
          </Reveal>
        </div>

        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="steps__card" style={{ '--card-bg': s.color, '--i': i } as CSSProperties}>
              <span className="steps__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="steps__body">
                <h3>
                  <span className="sr-only">Krok {i + 1}: </span>
                  {s.title}
                </h3>
                <p>{s.text}</p>
              </div>
              <blockquote className="steps__quote">
                <p>„{s.quote}“</p>
              </blockquote>
            </li>
          ))}
        </ol>

        <div className="phrases">
          <div className="phrases__head">
            <Heading as="h3" className="phrases__title" text="Co říct místo…" />
            <Reveal>
              <p>Slova umí ublížit, i když to myslíme dobře. Klikni na kartu a uvidíš, jak to říct laskavěji.</p>
            </Reveal>
          </div>
          <Reveal as="ul" className="phrases__grid" stagger={0.08}>
            {PHRASES.map((p) => (
              <PhraseCard key={p.no} {...p} />
            ))}
          </Reveal>
        </div>

        <Reveal as="ul" className="tips" stagger={0.1}>
          {TIPS.map((t) => (
            <li key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
