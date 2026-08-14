import { Code2, FolderGit2, Award, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Skill, Experience, Certificate } from '@/lib/types';
import { Counter } from './Counter';
import { Reveal } from './Reveal';

interface StatsProps {
  skills: Skill[];
  experience: Experience[];
  certificates: Certificate[];
}

interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  suffix: string;
}

export function Stats({ skills, experience, certificates }: StatsProps) {
  const items: StatItem[] = [
    { label: 'Skills', value: skills.length, icon: Code2, suffix: '+' },
    {
      label: 'Projects',
      value: experience.filter((e) => e.type === 'project').length,
      icon: FolderGit2,
      suffix: '',
    },
    { label: 'Certificates', value: certificates.length, icon: Award, suffix: '' },
    {
      label: 'Experience',
      value: experience.filter((e) => e.type === 'work').length,
      icon: Briefcase,
      suffix: '+',
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 100}>
              <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  <Counter value={item.value} suffix={item.suffix} />
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {item.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
