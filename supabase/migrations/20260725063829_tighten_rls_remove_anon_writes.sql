/*
# Tighten RLS: remove anon write access on portfolio tables

## Problem
The original migration created INSERT/UPDATE/DELETE policies scoped
`TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)` on every
table. The frontend uses the anon key (embedded in client-side JS, visible to
anyone who opens the site), so any visitor could insert, update, or delete
portfolio data. The security scanner flagged all 15 of these as
"RLS Policy Always True" bypasses.

## Fix
- SELECT policies stay `TO anon, authenticated USING (true)` — the portfolio
  is intentionally public-readable (single-tenant, no sign-in). This is correct
  and stays as-is.
- INSERT / UPDATE / DELETE policies are replaced with `TO authenticated`-only
  variants. The anon key can no longer mutate data. Authenticated users (the
  portfolio owner signing in) remain able to manage content, leaving the door
  open for a future admin flow without re-opening the anon hole.

## Why `true` is acceptable on the authenticated write policies
These are single-tenant portfolio-content tables (one person's skills,
education, certificates, experience). There is no per-row `user_id`/ownership
column because the rows do not belong to different users — they are one
owner's curated content. An authenticated user IS the authorized editor, so a
trivial predicate is the only sensible one here. The actual exposure (anon
writing via the exposed key) is closed.

## Tables affected (all 5)
profile, skills, education, certificates, experience

## Security changes
- Dropped 15 `anon_*` write policies (insert/update/delete x 5 tables).
- Added 15 `auth_*` write policies scoped `TO authenticated`.
- SELECT policies unchanged.
*/

-- ============ profile ============
DROP POLICY IF EXISTS "anon_insert_profile" ON profile;
DROP POLICY IF EXISTS "anon_update_profile" ON profile;
DROP POLICY IF EXISTS "anon_delete_profile" ON profile;

CREATE POLICY "auth_insert_profile" ON profile FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_profile" ON profile FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_delete_profile" ON profile FOR DELETE
  TO authenticated USING (true);

-- ============ skills ============
DROP POLICY IF EXISTS "anon_insert_skills" ON skills;
DROP POLICY IF EXISTS "anon_update_skills" ON skills;
DROP POLICY IF EXISTS "anon_delete_skills" ON skills;

CREATE POLICY "auth_insert_skills" ON skills FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_skills" ON skills FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_delete_skills" ON skills FOR DELETE
  TO authenticated USING (true);

-- ============ education ============
DROP POLICY IF EXISTS "anon_insert_education" ON education;
DROP POLICY IF EXISTS "anon_update_education" ON education;
DROP POLICY IF EXISTS "anon_delete_education" ON education;

CREATE POLICY "auth_insert_education" ON education FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_education" ON education FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_delete_education" ON education FOR DELETE
  TO authenticated USING (true);

-- ============ certificates ============
DROP POLICY IF EXISTS "anon_insert_certificates" ON certificates;
DROP POLICY IF EXISTS "anon_update_certificates" ON certificates;
DROP POLICY IF EXISTS "anon_delete_certificates" ON certificates;

CREATE POLICY "auth_insert_certificates" ON certificates FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_certificates" ON certificates FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_delete_certificates" ON certificates FOR DELETE
  TO authenticated USING (true);

-- ============ experience ============
DROP POLICY IF EXISTS "anon_insert_experience" ON experience;
DROP POLICY IF EXISTS "anon_update_experience" ON experience;
DROP POLICY IF EXISTS "anon_delete_experience" ON experience;

CREATE POLICY "auth_insert_experience" ON experience FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_experience" ON experience FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_delete_experience" ON experience FOR DELETE
  TO authenticated USING (true);
