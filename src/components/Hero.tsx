import { Cpu, Github, FileText, Mail, Phone, MapPin, ArrowDown } from 'lucide-react';
import type { Profile } from '@/lib/types';
import { useReveal } from '@/lib/useReveal';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const { ref: leftRef, visible: leftVisible } = useReveal<HTMLDivElement>({ rootMargin: '-50px' });
  const { ref: rightRef, visible: rightVisible } = useReveal<HTMLDivElement>({ rootMargin: '-50px' });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div
          ref={leftRef}
          className={`order-2 md:order-1 reveal from-left ${leftVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Cpu size={14} />
            {profile.title}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Ajeet
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-lg">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:scale-105 transition-transform"
              >
                <Github size={18} />
                GitHub
              </a>
            )}
            {profile.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:scale-105 transition-transform"
              >
                <FileText size={18} />
                Resume
              </a>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-5 text-slate-500 dark:text-slate-400 text-sm">
            {profile.email && (
              <span className="flex items-center gap-2">
                <Mail size={15} />
                {profile.email}
              </span>
            )}
            {profile.phone && (
              <span className="flex items-center gap-2">
                <Phone size={15} />
                {profile.phone}
              </span>
            )}
            {profile.location && (
              <span className="flex items-center gap-2">
                <MapPin size={15} />
                {profile.location}
              </span>
            )}
          </div>
        </div>

        {/* Photo */}
        <div
          ref={rightRef}
          className={`order-1 md:order-2 flex justify-center reveal scale ${rightVisible ? 'is-visible' : ''}`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl rotate-6 opacity-20" />
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={profile.photo_url ?? ''}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg animate-float">
              <Cpu size={32} className="text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg animate-float-alt">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                2nd Year CSE
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-down">
        <ArrowDown size={32} className="text-slate-400" />
      </div>
    </section>
  );
}
