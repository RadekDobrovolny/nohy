import { useRef } from 'react';
import RotatingText from '../components/reactbits/RotatingText';
import { useScrollTo } from '../components/SmoothScroll';
import { HeroScene } from '../illustrations/HeroScene';
import { gsap, useGSAP, reducedMotion } from '../lib/motion';
import './Hero.css';

const WHO = ['rodičům', 'mámě', 'tátovi', 'babičce', 'dědovi'];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.hero__eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo('.hero__line', { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.12 }, '-=0.4')
        .fromTo('.hero__lead', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo(
          '.hero__actions > *',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, clearProps: 'transform,opacity' },
          '-=0.5',
        )
        .fromTo('.hero__chips li', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, '-=0.3');

      gsap.to('.hero__art', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to('.hero__steps path', {
        opacity: 1,
        duration: 0.35,
        stagger: { each: 0.35, repeat: -1, yoyo: true },
        ease: 'sine.inOut',
      });
    },
    { scope: ref },
  );

  return (
    <section className="hero" id="top" ref={ref} tabIndex={-1}>
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">Malá kontrola, velký rozdíl</p>
          <h1 className="hero__title">
            <span className="sr-only">Zkontroluj nohy rodičům</span>
            <span aria-hidden="true">
              <span className="hero__mask">
                <span className="hero__line">Zkontroluj nohy</span>
              </span>
              <span className="hero__mask">
                <span className="hero__line">
                  <RotatingText
                    texts={WHO}
                    auto={!reducedMotion}
                    mainClassName="hero__rotator"
                    splitLevelClassName="hero__rotator-split"
                    staggerFrom="last"
                    staggerDuration={0.025}
                    rotationInterval={2600}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-120%', opacity: 0 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  />
                </span>
              </span>
            </span>
          </h1>
          <p className="hero__lead">
            S přibývajícím věkem je čím dál těžší dosáhnout si na vlastní chodidla. Ostříhat nehty, promazat paty,
            všimnout si drobné ranky. A&nbsp;říct si o&nbsp;pomoc bývá ještě těžší. Pojďme jim s&nbsp;tím pomoct —
            citlivě a&nbsp;bez studu.
          </p>
          <div className="hero__actions">
            <a
              className="btn btn--coral"
              href="#rozhovor"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#rozhovor');
              }}
            >
              Jak to s rodiči otevřít
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              className="link-arrow"
              href="#proc"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#proc');
              }}
            >
              Proč na tom záleží
            </a>
          </div>
          <ul className="hero__chips" aria-label="Ve zkratce">
            <li>
              <span style={{ background: 'var(--sage)' }} />
              Kontrola zabere pár minut
            </li>
            <li>
              <span style={{ background: 'var(--butter)' }} />
              Citlivě, bez výčitek
            </li>
            <li>
              <span style={{ background: 'var(--sky)' }} />S pomocí odborníků
            </li>
          </ul>
        </div>

        <div className="hero__art">
          <HeroScene />
        </div>
      </div>

      <a
        className="hero__scroll"
        href="#proc"
        onClick={(e) => {
          e.preventDefault();
          scrollTo('#proc');
        }}
      >
        <svg className="hero__steps" viewBox="0 0 40 64" aria-hidden="true">
          <path d="M12 6c-3 0-5 3-5 7s2 7 5 7 4-3 4-7-1-7-4-7z" />
          <path d="M28 22c-3 0-5 3-5 7s2 7 5 7 4-3 4-7-1-7-4-7z" />
          <path d="M12 38c-3 0-5 3-5 7s2 7 5 7 4-3 4-7-1-7-4-7z" />
        </svg>
        <span>Pokračuj dolů</span>
      </a>
    </section>
  );
}
