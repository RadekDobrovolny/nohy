import { useEffect, useState, type MouseEvent } from 'react';
import { useScrollTo } from './SmoothScroll';
import { LogoMark } from '../illustrations/Icons';
import './Nav.css';

export const NAV_ITEMS = [
  { id: 'proc', label: 'Proč na tom záleží' },
  { id: 'kontrola', label: 'Na co se dívat' },
  { id: 'rozhovor', label: 'Jak to otevřít' },
  { id: 'pomoc', label: 'Kde najít pomoc' },
];

export function Nav() {
  const scrollTo = useScrollTo();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // „rizika“ patří obsahově pod „Proč na tom záleží“, ostatní sekce mimo menu zvýraznění ruší
    const alias: Record<string, string> = { rizika: 'proc' };
    const ids = new Set(NAV_ITEMS.map((i) => i.id));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = alias[e.target.id] ?? e.target.id;
          setActive(ids.has(id) ? id : null);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e: MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(`#${id}`);
  };

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container nav__inner">
        <a className="nav__logo" href="#top" onClick={(e) => go(e, 'top')}>
          <LogoMark />
          <span>
            Nohy <em>rodičům</em>
          </span>
        </a>

        <nav aria-label="Hlavní navigace">
          <button
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav__burger" aria-hidden="true">
              <span />
              <span />
            </span>
            {open ? 'Zavřít' : 'Menu'}
          </button>
          <ul id="nav-menu" className="nav__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={active === item.id ? 'is-active' : undefined}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={(e) => go(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
