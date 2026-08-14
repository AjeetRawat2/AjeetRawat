import { useMemo, useState } from 'react';
import {
  Code2,
  Server,
  Database,
  Cloud,
  Palette,
  Brain,
  BrainCircuit,
  Camera,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import type { Skill } from '@/lib/types';
import { SectionHeader } from './SectionHeader';
import { useReveal } from '@/lib/useReveal';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Languages: Code2,
  Backend: Server,
  Database: Database,
  Cloud: Cloud,
  Design: Palette,
  'Soft Skills': Brain,
  Creative: Camera,
  'AI/ML': BrainCircuit,
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  Languages: 'from-amber-500 to-orange-500',
  Backend: 'from-emerald-500 to-teal-600',
  Database: 'from-violet-500 to-purple-600',
  Cloud: 'from-sky-500 to-blue-600',
  Design: 'from-rose-500 to-pink-500',
  'Soft Skills': 'from-cyan-500 to-indigo-500',
  Creative: 'from-fuchsia-500 to-purple-500',
  'AI/ML': 'from-green-500 to-emerald-600',
};

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const categories = useMemo(
    () => Array.from(new Set(skills.map((s) => s.category))),
    [skills]
  );
  const [active, setActive] = useState(categories[0] ?? '');
  const filtered = skills.filter((s) => s.category === active);
  const gradient = CATEGORY_GRADIENTS[active] ?? 'from-blue-500 to-cyan-400';

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title="Technical Skills" subtitle="What I Know" icon={Sparkles} />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] ?? Code2;
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon size={16} />
                {cat}
              </button>
            );
          })}
        </div>

        <div key={active} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((skill, i) => {
            const Icon = CATEGORY_ICONS[skill.category] ?? Code2;
            const g = CATEGORY_GRADIENTS[skill.category] ?? 'from-blue-500 to-cyan-400';
            return (
              <SkillBar
                key={skill.id}
                skill={skill}
                icon={Icon}
                gradient={g}
                delay={i * 100}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillBar({
  skill,
  icon: Icon,
  gradient,
  delay,
}: {
  skill: Skill;
  icon: LucideIcon;
  gradient: string;
  delay: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>({ rootMargin: '-50px' });
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            <Icon size={18} className="text-white" />
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">{skill.name}</span>
        </div>
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
          {skill.proficiency}%
        </span>
      </div>
      <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`bar-fill h-full rounded-full bg-gradient-to-r ${gradient}`}
          style={{ width: visible ? `${skill.proficiency}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export { CATEGORY_GRADIENTS, CATEGORY_ICONS };
