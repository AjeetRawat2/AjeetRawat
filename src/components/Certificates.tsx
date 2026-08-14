import { Award, ExternalLink, Calendar } from 'lucide-react';
import type { Certificate } from '@/lib/types';
import { SectionHeader } from './SectionHeader';
import { useReveal } from '@/lib/useReveal';

const ISSUER_GRADIENTS: Record<string, string> = {
  Oracle: 'from-red-500 to-orange-500',
  'SKLZ TECT LLP': 'from-blue-500 to-cyan-500',
};

interface CertificatesProps {
  certificates: Certificate[];
}

export function Certificates({ certificates }: CertificatesProps) {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title="Certificates" subtitle="Credentials & Achievements" icon={Award} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <CertificateCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificateCard({ cert, index }: { cert: Certificate; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>({ rootMargin: '-50px' });
  const gradient = ISSUER_GRADIENTS[cert.issuer] ?? 'from-amber-500 to-orange-500';
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden`}
      style={{ transitionDelay: `${150 * index}ms` }}
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 rounded-bl-full" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
          >
            <Award size={24} className="text-white" />
          </div>
          {cert.url && (
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label={`View ${cert.title}`}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 leading-snug">
          {cert.title}
        </h3>
        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-3">{cert.issuer}</p>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-3">
          <Calendar size={12} />
          {cert.issue_date}
        </div>
        {cert.description && (
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            {cert.description}
          </p>
        )}
      </div>
    </div>
  );
}
