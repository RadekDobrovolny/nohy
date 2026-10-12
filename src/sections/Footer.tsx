import { useScrollTo } from '../components/SmoothScroll';
import { LogoMark } from '../illustrations/Icons';
import './Footer.css';

const SOURCES = [
  {
    label: 'ČSÚ: Zdravotní stav obyvatelstva (diabetes léčený léky, 2024)',
    href: 'https://csu.gov.cz/zdravotni-stav-obyvatelstva',
  },
  {
    label: 'Armstrong, Boulton, Bus: Diabetic Foot Ulcers and Their Recurrence. NEJM, 2017',
    href: 'https://doi.org/10.1056/NEJMra1615439',
  },
  {
    label: 'IWGDF: International Working Group on the Diabetic Foot',
    href: 'https://iwgdfguidelines.org/',
  },
  { label: 'Česká diabetologická společnost ČLS JEP', href: 'https://www.diab.cz/' },
  { label: 'Česká podiatrická společnost', href: 'https://www.podiatrie.cz/' },
];

export function Footer() {
  const scrollTo = useScrollTo();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <a
              className="footer__logo"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#top');
              }}
            >
              <LogoMark />
              <span>
                Zkontroluj nohy <em>rodičům</em>
              </span>
            </a>
            <p>
              Osvětový web o tom, jak citlivě pomoct rodičům a prarodičům s péčí o nohy. Protože se na to dá přijít
              včas.
            </p>
          </div>

          <div className="footer__note">
            <h2>Důležité upozornění</h2>
            <p>
              Informace na tomto webu jsou obecné a nenahrazují vyšetření ani radu lékaře. Při jakýchkoli potížích s
              nohama se obraťte na praktického lékaře nebo specialistu.
            </p>
          </div>

          <div className="footer__sources">
            <h2>Zdroje</h2>
            <ul>
              {SOURCES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="sr-only"> (otevře se v novém okně)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Zkontroluj nohy rodičům. Ilustrace kreslené s péčí.</p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#top');
            }}
          >
            Zpět nahoru ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
