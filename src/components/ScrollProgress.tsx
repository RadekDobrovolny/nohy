import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/motion';

/** Tenká linka nahoře ukazující, kolik stránky je přečteno. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    });
  });
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
