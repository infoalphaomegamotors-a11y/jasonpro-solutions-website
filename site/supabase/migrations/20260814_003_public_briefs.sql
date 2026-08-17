-- Stage 14 — allow public project-brief intake without exposing submitted briefs.
-- This policy permits INSERT only. Anonymous visitors cannot SELECT, UPDATE or DELETE briefs.
-- Production launch should add edge/network rate limiting and bot verification in front of this endpoint.

create policy "brief public website insert"
on public.project_briefs
for insert
to anon
with check (
  user_id is null
  and source = 'website'
  and length(trim(full_name)) between 2 and 160
  and length(trim(email)) between 5 and 320
  and length(trim(service)) between 2 and 160
  and length(trim(brief)) between 20 and 10000
);
