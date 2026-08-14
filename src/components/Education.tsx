import { GraduationCap, Calendar } from 'lucide-react';
import type { Education as EducationType } from '@/lib/types';
import { SectionHeader } from './SectionHeader';
import { useReveal } from '@/lib/useReveal';

interface EducationProps {
  education: EducationType[];
}

export function Education({ education }: EducationProps) {
  return (
    <section className="py-24 relative bg-gradient-to-b from-slate-50/50 to-transparent dark:from-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title="Education" subtitle="Academic Journey" icon={GraduationCap} />

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-400 md:-translate-x-px" />
          {education.map((edu, i) => (
            <EducationItem key={edu.id} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationItem({ edu, index }: { edu: EducationType; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>({ rootMargin: '-100px' });
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} relative flex items-start gap-8 mb-12 md:flex-row`}
      style={{ transitionDelay: `${200 * index}ms` }}
    >
      <div className="hidden md:block flex-1" />
      <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full border-4 border-white dark:border-slate-900 md:-translate-x-2 z-10" />
      <div className="ml-16 md:ml-0 flex-1">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <Calendar size={14} />
            {edu.start_date} – {edu.end_date || 'Present'}
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            {edu.institution}
          </h3>
          {edu.field && (
            <p className="text-slate-600 dark:text-slate-300 font-medium mb-3">
              {edu.degree} in {edu.field}
            </p>
          )}
          {!edu.field && (
            <p className="text-slate-600 dark:text-slate-300 font-medium mb-3">{edu.degree}</p>
          )}
          {edu.description && (
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {edu.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
