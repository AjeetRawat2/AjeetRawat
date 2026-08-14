import { usePortfolio } from '@/lib/usePortfolio';
import { ParticleBackground } from '@/components/ParticleBackground';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Skills } from '@/components/Skills';
import { Education } from '@/components/Education';
import { Certificates } from '@/components/Certificates';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';

function App() {
  const { data, loading, error } = usePortfolio();

  if (loading) return <LoadingScreen />;

  if (error || !data || !data.profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-slate-500">{error ?? 'Failed to load portfolio data.'}</p>
      </div>
    );
  }

  return (
    <main className="relative bg-slate-50 dark:bg-slate-950 min-h-screen">
      <ParticleBackground />
      <ThemeToggle />
      <div className="relative z-10">
        <Hero profile={data.profile} />
        <Stats
          skills={data.skills}
          experience={data.experience}
          certificates={data.certificates}
        />
        <Skills skills={data.skills} />
        <Education education={data.education} />
        <Certificates certificates={data.certificates} />
        <Experience experience={data.experience} />
        <Footer profile={data.profile} />
      </div>
    </main>
  );
}

export default App;
