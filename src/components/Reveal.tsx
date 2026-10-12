import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, useGSAP, reducedMotion } from '../lib/motion';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animuje přímé potomky postupně místo celého bloku. */
  stagger?: number;
  y?: number;
  delay?: number;
  id?: string;
};

/** Jemné vyjetí obsahu při scrollu. */
export function Reveal({ children, as: Tag = 'div', className, stagger, y = 40, delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;
      const targets = stagger ? Array.from(ref.current.children) : ref.current;
      // fromTo s explicitním cílem: v StrictMode by from() načetlo rozpracovaný CSS přechod jako cílovou hodnotu
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          stagger: stagger ?? 0,
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
