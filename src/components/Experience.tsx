import { useState } from 'react';
import {
  Briefcase,
  FolderGit2,
  Calendar,
  ChevronRight,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import type { Experience as ExperienceType } from '@/lib/types';
import { SectionHeader } from './SectionHeader';
import { useReveal } from '@/lib/useReveal';

interface ExperienceProps {
  experience: ExperienceType[];
}

export function Experience({ experience }: ExperienceProps) {
  const work = experience.filter((e) => e.type === 'work');
  const projects = experience.filter((e) => e.type === 'project');

  return (
    <section className="py-24 relative bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        {work.length > 0 && (
          <>
            <SectionHeader title="Experience" subtitle="Work History" icon={Briefcase} />
            <div className="space-y-4 mb-24">
              {work.map((exp, i) => (
                <ExperienceRow key={exp.id} exp={exp} index={i} direction="left" />
              ))}
            </div>
          </>
        )}
        {projects.length > 0 && (
          <>
            <SectionHeader title="Projects" subtitle="What I've Built" icon={FolderGit2} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((exp, i) => (
                <ExperienceRow key={exp.id} exp={exp} index={i} direction="up" />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ExperienceRow({
  exp,
  index,
  direction,
}: {
  exp: ExperienceType;
  index: number;
  direction: 'left' | 'up';
}) {
  const { ref, visible } = useReveal<HTMLDivElement>({ rootMargin: '-50px' });
  const [open, setOpen] = useState(false);
  const isWork = exp.type === 'work';
  const Icon = (isWork ? Briefcase : FolderGit2) as LucideIcon;
  const iconBg = isWork
    ? 'bg-gradient-to-br from-blue-500 to-cyan-400'
    : 'bg-gradient-to-br from-violet-500 to-purple-400';

  return (
    <div
      ref={ref}
      className={`reveal ${direction === 'left' ? 'from-left' : ''} ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${100 * index}ms` }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        className={`cursor-pointer bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 ${
          open ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
              >
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {exp.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{exp.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {exp.start_date}
                {exp.end_date ? ` – ${exp.end_date}` : ' – Present'}
              </span>
            </div>
          </div>
          <div
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex-shrink-0"
            style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          >
            <ChevronRight size={16} />
          </div>
        </div>

        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: open ? '500px' : '0px', opacity: open ? 1 : 0 }}
        >
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700">
            {exp.description && (
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-sm">
                {exp.description}
              </p>
            )}
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {isWork && exp.title === 'UI/UX Designer' && (
              <a
                href="https://www.figma.com/design/VblPuAfL5Yu7ZU4P5akIv5/ProAcademy-website?node-id=0-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                <ExternalLink size={14} />
                View Figma Design
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
