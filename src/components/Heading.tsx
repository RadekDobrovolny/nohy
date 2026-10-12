import SplitText from './reactbits/SplitText';
import { reducedMotion } from '../lib/motion';

type Props = {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  align?: 'left' | 'center';
};

/** Nadpis sekce s animací po slovech (React Bits SplitText); při reduced motion statický. */
export function Heading({ text, as = 'h2', className = 'h2', align = 'left' }: Props) {
  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }
  return (
    <SplitText
      text={text}
      tag={as}
      className={className}
      splitType="words"
      delay={70}
      duration={0.9}
      ease="power3.out"
      from={{ opacity: 0, y: 36, rotate: 2 }}
      to={{ opacity: 1, y: 0, rotate: 0 }}
      threshold={0.15}
      rootMargin="-40px"
      textAlign={align}
    />
  );
}
