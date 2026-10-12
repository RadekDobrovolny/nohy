import { useRef, useState } from 'react';
import { Heading } from '../components/Heading';
import { Reveal } from '../components/Reveal';
import { FOOT_VIEWBOX, FootSole, FootTop, SPOTS, type Spot } from '../illustrations/FootMap';
import { IconBasin, IconCream, IconMirror, IconScissors, IconSock, IconTowel } from '../illustrations/Icons';
import { gsap, useGSAP, reducedMotion } from '../lib/motion';
import './FootCheck.css';

const CHECKLIST = [
  'Nehty: délka, barva, zarůstání',
  'Kůže mezi prsty',
  'Paty a chodidla (pomůže zrcátko)',
  'Ranky, puchýře, otlaky',
  'Barva, teplota a otoky',
  'Boty a ponožky: netlačí, sedí?',
];

const CARE = [
  {
    Icon: IconBasin,
    title: 'Umýt vlažnou vodou',
    text: 'Ne horkou a ne dlouho. Teplotu vyzkoušej rukou. Kdo má necitlivé nohy, opaření nemusí ucítit.',
  },
  {
    Icon: IconTowel,
    title: 'Pečlivě osušit',
    text: 'Hlavně mezi prsty. Vlhko svědčí plísním a rozmočená kůže snadno praská.',
  },
  {
    Icon: IconCream,
    title: 'Promazat',
    text: 'Paty a chodidla krémem s ureou (močovinou) proti suchosti a prasklinám. Mezi prsty ale krém nedávat.',
  },
  {
    Icon: IconScissors,
    title: 'Nehty stříhat rovně',
    text: 'Ne do obloučku a ne moc nakrátko, rohy jen lehce zapilovat. Zesílené nebo zarůstající nehty patří odborníkovi.',
  },
  {
    Icon: IconSock,
    title: 'Dobré ponožky a boty',
    text: 'Ponožky bez tlačících švů, prostorné pevné boty a bačkory, které drží na noze. A pokud možno nechodit naboso.',
  },
  {
    Icon: IconMirror,
    title: 'Nic neřezat, radši se dívat',
    text: 'Kuří oka ani ztvrdlou kůži neodstraňovat žiletkou. Na chodidla se podívat zrcátkem a s ostatním nechat pomoct.',
  },
];

export function FootCheck() {
  const ref = useRef<HTMLElement>(null);
  const footRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<Spot['view']>('top');
  const [activeId, setActiveId] = useState('nehty');
  const [checked, setChecked] = useState<boolean[]>(() => CHECKLIST.map(() => false));

  const spots = SPOTS.filter((s) => s.view === view);
  const active = SPOTS.find((s) => s.id === activeId) ?? spots[0];
  const done = checked.filter(Boolean).length;
  const { contextSafe } = useGSAP({ scope: ref });

  const switchView = contextSafe((next: Spot['view']) => {
    if (next === view) return;
    const firstSpot = SPOTS.find((s) => s.view === next)!;
    if (reducedMotion || !footRef.current) {
      setView(next);
      setActiveId(firstSpot.id);
      return;
    }
    gsap
      .timeline()
      .to(footRef.current, { rotateY: 90, scale: 0.94, duration: 0.28, ease: 'power2.in' })
      .add(() => {
        setView(next);
        setActiveId(firstSpot.id);
      })
      .set(footRef.current, { rotateY: -90 })
      .to(footRef.current, { rotateY: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' });
  });

  const selectSpot = contextSafe((id: string) => {
    setActiveId(id);
    if (reducedMotion) return;
    gsap.fromTo('.check__panel-inner', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
  });

  const toggle = contextSafe((i: number) => {
    setChecked((c) => c.map((v, j) => (j === i ? !v : v)));
  });

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('.check__spot', {
        scale: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(2.2)',
        delay: 0.2,
        scrollTrigger: { trigger: '.check__stage', start: 'top 75%', once: true },
      });
    },
    { scope: ref, dependencies: [view] },
  );

  useGSAP(
    () => {
      gsap.to('.check__progress-fill', {
        scaleX: done / CHECKLIST.length,
        duration: reducedMotion ? 0 : 0.6,
        ease: 'power3.out',
      });
    },
    { scope: ref, dependencies: [done] },
  );

  return (
    <section
      className="section section--sage check"
      id="kontrola"
      ref={ref}
      tabIndex={-1}
      aria-labelledby="kontrola-title"
    >
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Na co se dívat</p>
          <div id="kontrola-title">
            <Heading text="Pět minut, které stojí za to" />
          </div>
          <Reveal>
            <p className="lead">
              Při příští návštěvě si najděte chvilku v klidu. Klikni na místa na noze a uvidíš, čeho si všímat. A
              nezapomeň se podívat i zespodu.
            </p>
          </Reveal>
        </div>

        <div className="check__grid">
          <Reveal className="check__map">
            <div className="check__toggle" role="group" aria-label="Pohled na nohu">
              <button aria-pressed={view === 'top'} onClick={() => switchView('top')}>
                Shora
              </button>
              <button aria-pressed={view === 'sole'} onClick={() => switchView('sole')}>
                Zespodu
              </button>
              <span className={`check__toggle-pill ${view === 'sole' ? 'is-right' : ''}`} aria-hidden="true" />
            </div>

            <div className="check__stage">
              <div className="check__foot" ref={footRef}>
                <svg
                  className="ill"
                  viewBox={`${FOOT_VIEWBOX.x} ${FOOT_VIEWBOX.y} ${FOOT_VIEWBOX.w} ${FOOT_VIEWBOX.h}`}
                  role="img"
                  aria-label={view === 'top' ? 'Pravá noha při pohledu shora' : 'Pravé chodidlo při pohledu zespodu'}
                >
                  {view === 'top' ? <FootTop /> : <FootSole />}
                </svg>
                {spots.map((s, i) => (
                  <button
                    key={s.id}
                    className={`check__spot ${s.id === active.id ? 'is-active' : ''}`}
                    style={{
                      left: `${((s.x - FOOT_VIEWBOX.x) / FOOT_VIEWBOX.w) * 100}%`,
                      top: `${((s.y - FOOT_VIEWBOX.y) / FOOT_VIEWBOX.h) * 100}%`,
                    }}
                    aria-pressed={s.id === active.id}
                    aria-controls="check-panel"
                    onClick={() => selectSpot(s.id)}
                  >
                    <span className="sr-only">{s.title}</span>
                    <span aria-hidden="true">{i + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="check__side">
            <Reveal className="check__panel" id="check-panel">
              <div className="check__panel-inner" aria-live="polite">
                <p className="check__panel-kicker">
                  {view === 'top' ? 'Shora' : 'Zespodu'} · {spots.findIndex((s) => s.id === active.id) + 1}/
                  {spots.length}
                </p>
                <h3>{active.title}</h3>
                <div className="check__panel-row">
                  <span className="check__badge check__badge--look">Čeho si všímat</span>
                  <p>{active.look}</p>
                </div>
                <div className="check__panel-row">
                  <span className="check__badge check__badge--tip">Co s tím</span>
                  <p>{active.tip}</p>
                </div>
              </div>
              <div className="check__chips">
                {spots.map((s, i) => (
                  <button
                    key={s.id}
                    className={s.id === active.id ? 'is-active' : undefined}
                    aria-pressed={s.id === active.id}
                    onClick={() => selectSpot(s.id)}
                  >
                    <span aria-hidden="true">{i + 1}</span> {s.title}
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal className="check__list">
              <div className="check__list-head">
                <h3>Kontrolní seznam na návštěvu</h3>
                <p aria-live="polite">
                  {done === CHECKLIST.length ? 'Hotovo. Díky, že se díváš.' : `${done} z ${CHECKLIST.length}`}
                </p>
              </div>
              <div className="check__progress" aria-hidden="true">
                <span className="check__progress-fill" />
              </div>
              <ul>
                {CHECKLIST.map((item, i) => (
                  <li key={item}>
                    <label className={checked[i] ? 'is-checked' : undefined}>
                      <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} />
                      <span className="check__box" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </span>
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="care">
          <div className="care__head">
            <Heading as="h3" className="care__title" text="Jak o nohy pečovat doma" />
            <Reveal>
              <p>Pár jednoduchých zvyků, se kterými můžeš rodičům pomoct, nebo jim je připomenout.</p>
            </Reveal>
          </div>
          <Reveal as="ul" className="care__grid" stagger={0.08}>
            {CARE.map(({ Icon, title, text }) => (
              <li key={title}>
                <Icon className="care__icon" />
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
