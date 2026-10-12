import { useEffect, useRef, useState } from 'react';
import { Heading } from '../components/Heading';
import { Reveal } from '../components/Reveal';
import SplitText from '../components/reactbits/SplitText';
import { IconPhone } from '../illustrations/Icons';
import { Heart, Sparkle } from '../illustrations/kit';
import { reducedMotion } from '../lib/motion';
import './Closing.css';

const SHARE_TEXT = 'Zkontroluj nohy rodičům: jak citlivě pomoct mámě, tátovi nebo prarodičům s péčí o nohy.';

/** Zalomení řádků ICS po 75 bajtech (RFC 5545). */
function fold(line: string) {
  const enc = new TextEncoder();
  const out: string[] = [];
  let cur = '';
  let bytes = 0;
  for (const ch of line) {
    const b = enc.encode(ch).length;
    if (bytes + b > 74) {
      out.push(cur);
      cur = ' ' + ch;
      bytes = 1 + b;
    } else {
      cur += ch;
      bytes += b;
    }
  }
  out.push(cur);
  return out.join('\r\n');
}

/** Měsíční připomínka do kalendáře, první v nejbližší sobotu v 10:00. */
function downloadReminder() {
  const d = new Date();
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
  const pad = (n: number) => String(n).padStart(2, '0');
  const day = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
  const url = window.location.href.split('#')[0];
  const description = [
    'Zavolej nebo se zastav a zeptej se: Jak se ti chodí?',
    'Nehty: délka, barva, zarůstání',
    'Kůže mezi prsty',
    'Paty a chodidla (pomůže zrcátko)',
    'Ranky, puchýře, otlaky',
    'Barva, teplota a otoky',
    'Boty a ponožky',
    url,
  ].join('\\n');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Zkontroluj nohy rodicum//CS',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${stamp}-nohy-rodicum@local`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${day}T100000`,
    `DTEND:${day}T103000`,
    'RRULE:FREQ=MONTHLY;COUNT=12',
    'SUMMARY:Zkontrolovat nohy rodičům',
    `DESCRIPTION:${description}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Zkontrolovat nohy rodičům',
    'TRIGGER:-PT1H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .map(fold)
    .join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'zkontrolovat-nohy-rodicum.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function Closing() {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const notify = (msg: string) => {
    setToast(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 3200);
  };

  const share = async () => {
    const url = window.location.href.split('#')[0];
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Zkontroluj nohy rodičům', text: SHARE_TEXT, url });
        return;
      } catch (err) {
        if ((err as DOMException).name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      notify('Odkaz je zkopírovaný. Pošli ho sourozencům.');
    } catch {
      notify(url);
    }
  };

  return (
    <section className="section section--peach closing" id="zacni" aria-labelledby="zacni-title">
      <div className="container closing__grid">
        <div>
          <p className="eyebrow">Kde začít</p>
          <div id="zacni-title">
            <Heading text="Stačí začít jednou otázkou" />
          </div>
          <Reveal>
            <p className="lead">
              Nemusí to být velký rozhovor. Zavolej, zeptej se a poslouchej. A až příště přijedeš na návštěvu, podívejte
              se na nohy spolu.
            </p>
          </Reveal>
          <Reveal className="closing__actions" stagger={0.1}>
            <button className="btn btn--coral" onClick={downloadReminder}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="5" width="17" height="15.5" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M3.5 10h17M8 3v4M16 3v4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Připomínka do kalendáře
            </button>
            <button className="btn btn--light" onClick={share}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 3v12M7 8l5-5 5 5M5 13v5.5A2.5 2.5 0 007.5 21h9a2.5 2.5 0 002.5-2.5V13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Poslat sourozencům
            </button>
          </Reveal>
          <p className="closing__note">Připomínka se opakuje jednou měsíčně, první vychází na nejbližší sobotu.</p>
        </div>

        <Reveal className="closing__art" delay={0.15}>
          <div className="closing__bubble">
            {reducedMotion ? (
              <p className="closing__question">„Jak se ti chodí?“</p>
            ) : (
              <SplitText
                text="„Jak se ti chodí?“"
                tag="p"
                className="closing__question"
                splitType="chars"
                delay={45}
                duration={0.7}
                ease="back.out(2)"
                from={{ opacity: 0, y: 30, rotate: -8 }}
                to={{ opacity: 1, y: 0, rotate: 0 }}
                threshold={0.2}
                rootMargin="-60px"
                textAlign="center"
              />
            )}
            <svg className="closing__deco" viewBox="0 0 120 60" aria-hidden="true">
              <Heart x={24} y={30} s={1.1} />
              <Sparkle x={70} y={22} s={0.8} />
              <Heart x={100} y={38} s={0.7} fill="var(--rose)" />
            </svg>
          </div>
          <IconPhone className="closing__phone" />
        </Reveal>
      </div>

      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </section>
  );
}
