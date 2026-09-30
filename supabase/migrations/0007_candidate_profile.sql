-- Education, draft copies, and recruiter visibility for candidate profiles.

alter table public.candidate_profiles
  add column if not exists education jsonb not null default '[]'::jsonb,
  add column if not exists profile_draft jsonb,
  add column if not exists profile_visibility text not null default 'recruiters';

alter table public.candidate_profiles
  drop constraint if exists candidate_profiles_visibility_check;

alter table public.candidate_profiles
  add constraint candidate_profiles_visibility_check
  check (profile_visibility in ('recruiters', 'private'));
