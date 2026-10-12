import { SmoothScroll } from './components/SmoothScroll';
import { Nav } from './components/Nav';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './sections/Hero';
import { Statement, Why } from './sections/Why';
import { Wave } from './components/Wave';
import { Risks } from './sections/Risks';
import { FootCheck } from './sections/FootCheck';
import { Conversation } from './sections/Conversation';
import { Help } from './sections/Help';
import { Closing } from './sections/Closing';
import { Footer } from './sections/Footer';

export function App() {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#proc">
        Přeskočit na obsah
      </a>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Why />
        <Wave from="var(--bg)" to="var(--bg-sand)" />
        <Statement />
        <Wave from="var(--bg-sand)" to="var(--ink)" shape={1} />
        <Risks />
        <Wave from="var(--ink)" to="var(--sage-soft)" shape={2} />
        <FootCheck />
        <Wave from="var(--sage-soft)" to="var(--bg)" />
        <Conversation />
        <Wave from="var(--bg)" to="var(--sky-soft)" shape={1} />
        <Help />
        <Wave from="var(--sky-soft)" to="var(--peach-soft)" shape={2} />
        <Closing />
      </main>
      <Wave from="var(--peach-soft)" to="var(--ink)" />
      <Footer />
    </SmoothScroll>
  );
}
