export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string | null;
  location: string | null;
  photo_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  resume_url: string | null;
  instagram_url: string | null;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  start_date: string | null;
  end_date: string | null;
  gpa: string | null;
  description: string | null;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string | null;
  expiry_date: string | null;
  url: string | null;
  description: string | null;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  type: 'work' | 'project';
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  technologies: string[] | null;
}

export interface PortfolioData {
  profile: Profile | null;
  skills: Skill[];
  education: Education[];
  certificates: Certificate[];
  experience: Experience[];
}
