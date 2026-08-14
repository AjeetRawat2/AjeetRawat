import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/lib/useReveal';

interface CounterProps {
  value: number;
  suffix?: string;
}

export function Counter({ value, suffix = '' }: CounterProps) {
  const { ref, visible } = useReveal<HTMLSpanElement>({ rootMargin: '-50px' });
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!visible || startedRef.current) return;
    startedRef.current = true;
    const duration = 1500;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [visible, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
