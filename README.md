# Zkontroluj nohy rodičům

Jednostránkový osvětový web o péči o nohy starších rodičů a prarodičů: proč na tom záleží, na co se dívat, jak téma
citlivě otevřít a kde hledat odbornou pomoc.

## Spuštění

```bash
npm install
npm run dev       # vývoj na http://localhost:5173
npm run build     # produkční build do dist/
npm run preview   # náhled buildu
npm run format    # Prettier
```

## Technologie

- **Vite + React 19 + TypeScript**
- **GSAP** (ScrollTrigger, SplitText, `@gsap/react`) pro animace vázané na scroll
- **Lenis** pro plynulý scroll, řízený tickerem GSAPu (`src/components/SmoothScroll.tsx`)
- **React Bits** (`src/components/reactbits/`): RotatingText, SplitText, ScrollReveal, CountUp, SpotlightCard.
  Staženo z registru reactbits.dev. ScrollReveal je upravený: původní verze při odmontování zabíjela všechny
  ScrollTriggery na stránce.
- Fonty Fraunces a Nunito přes Fontsource (s českou diakritikou, bez externích požadavků)

Při `prefers-reduced-motion` se vypne Lenis i animace a obsah se zobrazí staticky.

## Struktura

```
src/
  sections/        jednotlivé sekce stránky (texty jsou přímo v nich)
  illustrations/   ručně kreslené SVG ilustrace a ikony
  components/      navigace, nadpisy, reveal, vlnité předěly, React Bits
  lib/motion.ts    registrace GSAP pluginů
```

| Sekce | Soubor | Obsah |
| --- | --- | --- |
| Úvod | `Hero.tsx` | rotující „mámě / tátovi / babičce…“, ilustrace nohou v lavoru |
| Proč na tom záleží | `Why.tsx` | 4 důvody, rizikové skupiny, výrok odhalovaný scrollem |
| Co se může stát | `Risks.tsx` | časová osa od maličkosti ke komplikacím, statistiky |
| Na co se dívat | `FootCheck.tsx` | interaktivní mapa nohy (shora/zespodu), checklist, péče doma |
| Jak to otevřít | `Conversation.tsx` | 6 kroků (sticky karty), „co říct místo…“, tipy |
| Kde najít pomoc | `Help.tsx` | typy odborníků s odkazy, kdy jít hned k lékaři |
| Závěr | `Closing.tsx` | „Jak se ti chodí?“, připomínka do kalendáře (.ics), sdílení |

## Zdroje čísel

- 884 500 lidí užívajících léky na cukrovku: ČSÚ, Zdravotní stav obyvatelstva (2024)
- až 34 % lidí s cukrovkou se během života setká s vředem na noze: Armstrong, Boulton, Bus, NEJM 2017
- 85 % amputací u lidí s cukrovkou předchází vřed: IWGDF

Před spuštěním webu doporučuji nechat texty zkontrolovat odborníkem (podiatr, diabetolog).
