import { Heading } from '../components/Heading';
import { Reveal } from '../components/Reveal';
import ScrollReveal from '../components/reactbits/ScrollReveal';
import { IconBend, IconDrop, IconGlasses, IconShy } from '../illustrations/Icons';
import './Why.css';

const REASONS = [
  {
    Icon: IconBend,
    title: 'Shýbnout se je čím dál těžší',
    text: 'Ztuhlá záda, bolavá kolena nebo nadváha. Na vlastní chodidla najednou není tak snadné dosáhnout a nehty se pak stříhají napůl naslepo.',
  },
  {
    Icon: IconGlasses,
    title: 'Oči už tolik nevidí',
    text: 'Se slabším zrakem se snadno přehlédne drobná ranka, puchýř nebo nehet, který začíná zarůstat.',
  },
  {
    Icon: IconDrop,
    title: 'Cukrovka nohy ztiší',
    text: 'Cukrovka často oslabí citlivost i prokrvení nohou. Otlak nebo kamínek v botě pak nebolí, tak ho nikdo neřeší. A rány se hojí pomaleji.',
  },
  {
    Icon: IconShy,
    title: 'Stud mluví za ně',
    text: '„Nechci nikoho obtěžovat.“ „To zvládnu.“ Nohy jsou intimní téma a přiznat, že na ně člověk sám nestačí, je pro mnoho lidí těžké.',
  },
];

const RISK_GROUPS = [
  's cukrovkou',
  's nadváhou nebo obezitou',
  's horším prokrvením nohou',
  's artrózou nebo revmatem',
  'se slabším zrakem',
  's omezenou pohyblivostí',
  'kteří berou léky na ředění krve',
  'kteří kouří',
];

export function Why() {
  return (
    <section className="section why" id="proc" tabIndex={-1} aria-labelledby="proc-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Proč na tom záleží</p>
          <div id="proc-title">
            <Heading text="Nohy je nosily celý život. Teď potřebují pomoct." />
          </div>
          <Reveal>
            <p className="lead">
              Péče o nohy vypadá jako drobnost, dokud jde sama. S věkem se ale sejde víc věcí najednou a z běžné hygieny
              je úkol, na který člověk sám nestačí.
            </p>
          </Reveal>
        </div>

        <Reveal as="ul" className="why__grid" stagger={0.12}>
          {REASONS.map(({ Icon, title, text }) => (
            <li key={title} className="why__card">
              <Icon className="why__icon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </Reveal>

        <Reveal className="why__risk">
          <h3>Zvýšenou pozornost potřebují lidé</h3>
          <ul>
            {RISK_GROUPS.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Statement() {
  return (
    <section className="section section--sand why__statement" aria-label="Hlavní myšlenka">
      <div className="container">
        <ScrollReveal
          as="blockquote"
          baseOpacity={0.12}
          enableBlur
          baseRotation={2}
          blurStrength={6}
          containerClassName="why__quote"
          wordAnimationEnd="center center"
          rotationEnd="center center"
        >
          Nikdo nechce přiznat, že si už nedosáhne na vlastní nohy. Proto je dobré, když se zeptáme my. Vlídně, bez
          výčitek a&nbsp;včas.
        </ScrollReveal>
      </div>
    </section>
  );
}
