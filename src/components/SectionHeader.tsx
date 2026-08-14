import type { LucideIcon } from 'lucide-react';
import { useReveal } from '@/lib/useReveal';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export function SectionHeader({ title, subtitle, icon: Icon }: SectionHeaderProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ rootMargin: '-100px' });
  return (
    <div ref={ref} className="text-center mb-16">
      <div
        className={`reveal ${visible ? 'is-visible' : ''} inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium mb-4`}
      >
        <Icon size={16} />
        {subtitle}
      </div>
      <h2
        className={`reveal ${visible ? 'is-visible' : ''} text-4xl md:text-5xl font-bold text-slate-900 dark:text-white`}
        style={{ transitionDelay: '100ms' }}
      >
        {title}
      </h2>
      <div
        className={`reveal ${visible ? 'is-visible' : ''} w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-6 rounded-full`}
        style={{ transitionDelay: '300ms' }}
      />
    </div>
  );
}
