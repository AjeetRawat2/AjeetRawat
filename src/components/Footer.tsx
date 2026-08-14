import { Github, Mail, Instagram } from 'lucide-react';
import type { Profile } from '@/lib/types';
import { useReveal } from '@/lib/useReveal';

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ rootMargin: '-50px' });
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 bg-slate-900 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
          <h3 className="text-2xl font-bold text-white mb-2">Let's Connect</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Open to internships, collaborations, and exciting opportunities. Feel free to reach
            out!
          </p>
          <div className="flex justify-center flex-wrap gap-4 mb-8">
            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors text-sm font-medium"
              >
                <Github size={18} />
                GitHub
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors text-sm font-medium"
              >
                <Mail size={18} />
                {profile.email}
              </a>
            )}
            {profile.instagram_url && (
              <a
                href={profile.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-pink-600 hover:text-white transition-colors text-sm font-medium"
              >
                <Instagram size={18} />
                wanders_in_pics
              </a>
            )}
          </div>
          <p className="text-slate-500 text-sm">
            © {year} Ajeet Rawat. Built with React, Tailwind CSS & Vite.
          </p>
        </div>
      </div>
    </footer>
  );
}
