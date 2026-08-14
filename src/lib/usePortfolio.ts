import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { PortfolioData } from './types';

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [profile, skills, education, certificates, experience] =
          await Promise.all([
            supabase.from('profile').select('*').maybeSingle(),
            supabase
              .from('skills')
              .select('*')
              .order('proficiency', { ascending: false }),
            supabase
              .from('education')
              .select('*')
              .order('start_date', { ascending: false }),
            supabase
              .from('certificates')
              .select('*')
              .order('issue_date', { ascending: false }),
            supabase
              .from('experience')
              .select('*')
              .order('start_date', { ascending: false }),
          ]);

        if (!active) return;

        if (profile.error) throw profile.error;
        if (skills.error) throw skills.error;
        if (education.error) throw education.error;
        if (certificates.error) throw certificates.error;
        if (experience.error) throw experience.error;

        setData({
          profile: profile.data,
          skills: skills.data ?? [],
          education: education.data ?? [],
          certificates: certificates.data ?? [],
          experience: experience.data ?? [],
        });
      } catch (e) {
        console.error('Error fetching data:', e);
        if (active) setError('Failed to load portfolio data.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
