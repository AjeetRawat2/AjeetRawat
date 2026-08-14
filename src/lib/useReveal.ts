import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element when it scrolls into view (once).
 * Mirrors Framer Motion's `whileInView` + `viewport: { once: true }`.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { rootMargin?: string; threshold?: number } = {}
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '-50px',
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, options.rootMargin, options.threshold]);

  return { ref, visible };
}
