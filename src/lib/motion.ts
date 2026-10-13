import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Zařízení s myší; na dotykových displejích vynecháváme efekty, které na nich nejsou vidět a jen stojí výkon. */
export const finePointer =
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Nekonečné smyčky (vytvořené s `paused: true`) běží jen tehdy, když je `trigger` na obrazovce.
 * Volat uvnitř useGSAP, aby se ScrollTrigger uklidil spolu s komponentou.
 */
export function playWhileVisible(trigger: Element | null, loops: gsap.core.Animation[]) {
  if (!trigger) return;
  ScrollTrigger.create({
    trigger,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => loops.forEach((loop) => (self.isActive ? loop.resume() : loop.pause())),
  });
}

export { gsap, ScrollTrigger, useGSAP };
