import { useEffect, useRef, type ReactNode } from 'react';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import { gsap, ScrollTrigger, reducedMotion } from '../lib/motion';

/** Lenis řízený tickerem GSAPu, aby ScrollTrigger a plynulý scroll běžely v jednom snímku. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.11 }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

/** Plynulý posun na kotvu; bez Lenisu (reduced motion) použije nativní scroll. */
export function useScrollTo() {
  const lenis = useLenis();
  return (selector: string) => {
    const target = document.querySelector<HTMLElement>(selector);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -8, duration: 1.4 });
    } else {
      target.scrollIntoView({ block: 'start' });
    }
    target.focus({ preventScroll: true });
  };
}
