/*
# Create portfolio tables for Ajeet Rawat's portfolio replica

This migration creates the five tables that back the portfolio site:
profile, skills, education, certificates, and experience. They mirror
the structure of the original site so the replica behaves identically.

## Tables

1. `profile` — single row with name, title, bio, contact info, links, and photo URL.
   - id (uuid, pk)
   - name (text)
   - title (text)
   - bio (text)
   - email (text)
   - phone (text)
   - location (text)
   - photo_url (text)
   - github_url (text)
   - linkedin_url (text)
   - resume_url (text)
   - instagram_url (text)
   - created_at (timestamptz)

2. `skills` — technical and soft skills grouped by category with a proficiency 0-100.
   - id (uuid, pk)
   - name (text)
   - category (text)
   - proficiency (int)
   - icon (text)
   - created_at (timestamptz)

3. `education` — academic history, shown as a timeline.
   - id (uuid, pk)
   - institution (text)
   - degree (text)
   - field (text)
   - start_date (text)
   - end_date (text, nullable)
   - gpa (text, nullable)
   - description (text)
   - created_at (timestamptz)

4. `certificates` — certifications and achievements.
   - id (uuid, pk)
   - title (text)
   - issuer (text)
   - issue_date (text)
   - expiry_date (text, nullable)
   - url (text, nullable)
   - description (text)
   - created_at (timestamptz)

5. `experience` — work and project entries shown as expandable cards.
   - id (uuid, pk)
   - title (text)
   - company (text)
   - type (text)  -- 'work' or 'project'
   - start_date (text)
   - end_date (text, nullable)
   - description (text)
   - technologies (text[])
   - created_at (timestamptz)

## Security

- Single-tenant public portfolio: no sign-in screen. The frontend reads as anon.
- RLS enabled on every table.
- Read-only public access via `TO anon, authenticated` SELECT policies
  (USING (true) is correct here — the data is intentionally public).
- Full CRUD allowed for anon + authenticated so the data can be edited if needed later.
*/

CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  photo_url text,
  github_url text,
  linkedin_url text,
  resume_url text,
  instagram_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency int NOT NULL DEFAULT 0,
  icon text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution text NOT NULL,
  degree text NOT NULL,
  field text,
  start_date text,
  end_date text,
  gpa text,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  issue_date text,
  expiry_date text,
  url text,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  type text NOT NULL,
  start_date text,
  end_date text,
  description text,
  technologies text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- profile policies
DROP POLICY IF EXISTS "anon_select_profile" ON profile;
CREATE POLICY "anon_select_profile" ON profile FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_profile" ON profile;
CREATE POLICY "anon_insert_profile" ON profile FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_profile" ON profile;
CREATE POLICY "anon_update_profile" ON profile FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_profile" ON profile;
CREATE POLICY "anon_delete_profile" ON profile FOR DELETE
  TO anon, authenticated USING (true);

-- skills policies
DROP POLICY IF EXISTS "anon_select_skills" ON skills;
CREATE POLICY "anon_select_skills" ON skills FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_skills" ON skills;
CREATE POLICY "anon_insert_skills" ON skills FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_skills" ON skills;
CREATE POLICY "anon_update_skills" ON skills FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_skills" ON skills;
CREATE POLICY "anon_delete_skills" ON skills FOR DELETE
  TO anon, authenticated USING (true);

-- education policies
DROP POLICY IF EXISTS "anon_select_education" ON education;
CREATE POLICY "anon_select_education" ON education FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_education" ON education;
CREATE POLICY "anon_insert_education" ON education FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_education" ON education;
CREATE POLICY "anon_update_education" ON education FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_education" ON education;
CREATE POLICY "anon_delete_education" ON education FOR DELETE
  TO anon, authenticated USING (true);

-- certificates policies
DROP POLICY IF EXISTS "anon_select_certificates" ON certificates;
CREATE POLICY "anon_select_certificates" ON certificates FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_certificates" ON certificates;
CREATE POLICY "anon_insert_certificates" ON certificates FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_certificates" ON certificates;
CREATE POLICY "anon_update_certificates" ON certificates FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_certificates" ON certificates;
CREATE POLICY "anon_delete_certificates" ON certificates FOR DELETE
  TO anon, authenticated USING (true);

-- experience policies
DROP POLICY IF EXISTS "anon_select_experience" ON experience;
CREATE POLICY "anon_select_experience" ON experience FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_experience" ON experience;
CREATE POLICY "anon_insert_experience" ON experience FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_experience" ON experience;
CREATE POLICY "anon_update_experience" ON experience FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_experience" ON experience;
CREATE POLICY "anon_delete_experience" ON experience FOR DELETE
  TO anon, authenticated USING (true);

-- Seed profile
INSERT INTO profile (id, name, title, bio, email, phone, location, photo_url, github_url, linkedin_url, resume_url, instagram_url)
VALUES (
  'ace3208f-3d5d-4f94-8f04-57fe37756d9e',
  'Ajeet Rawat',
  'B.Tech CSE Student & UI/UX Designer',
  'Highly motivated Second-year B.Tech CSE student with a strong foundation in problem-solving and a passion for technology. Eager to apply academic knowledge to real-world challenges and contribute to innovative projects. Skilled in Python, web development, and UI/UX design.',
  'rawatajeet287@gmail.com',
  '9868631055',
  'Sector-37c, Gurugram',
  '/profile.png',
  'https://github.com/AjeetRawat2',
  'https://github.com/AjeetRawat2',
  '/resume.pdf',
  'https://www.instagram.com/wanders_in_pics'
)
ON CONFLICT (id) DO NOTHING;

-- Seed skills
INSERT INTO skills (id, name, category, proficiency, icon) VALUES
  ('55e3f9d7-4f09-41b3-9b5c-1bdb1859eb05', 'Python', 'Languages', 85, 'python'),
  ('56558b89-d0df-48f8-a2a5-98d38d66bff8', 'HTML', 'Languages', 90, 'html'),
  ('ec663572-1b1b-4cbc-b052-c9cb5c75728e', 'CSS', 'Languages', 85, 'css'),
  ('e4e92569-df50-4606-af3f-297854582288', 'JavaScript', 'Languages', 80, 'javascript'),
  ('f314ff3b-97ec-4208-934e-e0fd1321df9e', 'Node.js', 'Backend', 75, 'nodejs'),
  ('03935461-d23b-4247-bd17-3041bc4a05f4', 'Django', 'Backend', 75, 'django'),
  ('a79a9cd9-3d91-4d3b-a078-470faf2c961b', 'Flask', 'Backend', 70, 'flask'),
  ('4fcc1e44-0e74-44d7-af6a-1b70f794fd36', 'SQL', 'Database', 75, 'sql'),
  ('cd0adc1c-57ce-4089-bb52-609e32b934e0', 'Cloud Fundamentals', 'Cloud', 65, 'cloud'),
  ('c261ff72-d44c-4527-a0b6-577575a548fe', 'UI/UX Designing', 'Design', 85, 'figma'),
  ('becf4425-fffc-4daa-9901-0680d1a1fd8b', 'Problem Solving', 'Soft Skills', 90, 'brain'),
  ('866ac615-1301-4bc0-b00a-a3ae874070c4', 'Team Collaboration', 'Soft Skills', 88, 'users'),
  ('2b6bba25-1afc-4b1d-b70a-0501521f0f52', 'Photography & Editing', 'Creative', 80, 'camera'),
  ('3d8c92cf-cfa5-4dff-89cb-dfd6c7de1956', 'Adaptability', 'Soft Skills', 90, 'zap')
ON CONFLICT (id) DO NOTHING;

-- Seed education
INSERT INTO education (id, institution, degree, field, start_date, end_date, description) VALUES
  ('cb3ecd56-1c19-44a9-8ea5-e4fc6ce9a502', 'Starex University', 'Bachelor of Technology (B.Tech)', 'Computer Science Engineering', '2024', NULL, 'Currently pursuing B.Tech in Computer Science Engineering. Focused on software development, data structures, algorithms, and modern web technologies. Actively working on projects and internships alongside academics.')
ON CONFLICT (id) DO NOTHING;

-- Seed certificates
INSERT INTO certificates (id, title, issuer, issue_date, url, description) VALUES
  ('53a0c647-4ccf-40e0-bcbf-6b5c22756277', 'Oracle Cloud Infrastructure 2025: Foundation Associate', 'Oracle', '2025', 'https://www.oracle.com', 'Certified in Oracle Cloud Infrastructure fundamentals, covering core OCI services including compute, networking, storage, and database solutions.'),
  ('465ced0c-a0bf-4dfe-ab7e-3002533d3ccd', 'Python Palette: Visualizing Insight', 'SKLZ TECT LLP', '2025', 'https://sklztect.com', 'Completed training on data visualization using Python, covering libraries and techniques for transforming data into actionable visual insights.'),
  ('01760d5b-9d59-4207-a67f-1a6b5cf1df1e', 'Azure Insights: Data and Cloud Foundation', 'SKLZ TECT LLP', '2025', 'https://sklztect.com', 'Completed course on Microsoft Azure fundamentals covering data services, cloud architecture, and core Azure platform concepts.')
ON CONFLICT (id) DO NOTHING;

-- Seed experience
INSERT INTO experience (id, title, company, type, start_date, end_date, description, technologies) VALUES
  ('ddb380aa-dd9a-401a-82d9-91473fcbdd1c', 'UI/UX Designer', 'SKLZ TECT LLP', 'work', 'July 2025', 'August 2025', 'Designed a full website for ProAcademy — an ed-tech platform — with complete prototyping using Figma. Delivered end-to-end UI/UX design covering wireframes, user flows, component design, and interactive prototype. The design focused on clean layouts, intuitive navigation, and a modern educational aesthetic.', ARRAY['Figma','UI/UX Design','Prototyping','Wireframing']),
  ('bacd6e34-5f39-4d75-b13a-65e0b4e0e237', 'Tweet App', 'Personal Project', 'project', '2024', NULL, 'Built a Twitter-inspired web application using Django. Features include user authentication, creating and viewing tweets, and a clean responsive interface. Available on GitHub at https://github.com/AjeetRawat2/MyDjangoTweet', ARRAY['Python','Django','HTML','CSS','SQL']),
  ('c03dd273-b652-4e80-aa85-1565726e09c7', 'AQI Checker', 'Personal Project', 'project', '2024', NULL, 'Developed an Air Quality Index checker web app using Flask and a third-party weather/air quality API. Users can search any city and instantly view real-time AQI data. Available at https://github.com/AjeetRawat2/AQI-check', ARRAY['Python','Flask','REST API','HTML','CSS','JavaScript']),
  ('f21e171c-15ba-4181-973e-b9bce3989363', 'iOS Theme Calculator', 'Personal Project', 'project', '2024', NULL, 'Built a fully functional calculator with an iOS-inspired design using Python. Clean, pixel-perfect UI replicating the Apple calculator aesthetic. Available at https://github.com/AjeetRawat2/IOS-theme-calculator', ARRAY['Python']),
  ('22eaa770-47bd-4327-913b-73dec56399b5', 'Portfolio Website', 'Personal Project', 'project', '2024', NULL, 'Designed and built a personal portfolio website from scratch using frontend technologies to showcase projects, skills, and experience. Available at https://github.com/AjeetRawat2/MyPortfolio-web', ARRAY['HTML','CSS','JavaScript'])
ON CONFLICT (id) DO NOTHING;
