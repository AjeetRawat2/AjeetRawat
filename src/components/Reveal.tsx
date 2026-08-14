import type { ReactNode, ElementType } from 'react';
import { useReveal } from '@/lib/useReveal';

type Direction = 'up' | 'left' | 'right' | 'scale';

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: ElementType;
  rootMargin?: string;
}

const directionClass: Record<Direction, string> = {
  up: 'reveal',
  left: 'reveal from-left',
  right: 'reveal from-right',
  scale: 'reveal scale',
};

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  as: Tag = 'div',
  rootMargin,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ rootMargin });
  return (
    <Tag
      ref={ref as never}
      className={`${directionClass[direction]} ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
