-- Mirrors the live Stage 15 hardening migration applied to Supabase.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth, pg_temp
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;
revoke all on function private.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function private.handle_new_user();

create or replace function private.is_admin()
returns boolean language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role in ('admin','content_manager'));
$$;
create or replace function private.is_project_client(project_uuid uuid)
returns boolean language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from public.client_projects where id = project_uuid and client_id = (select auth.uid()));
$$;
grant execute on function private.is_admin() to authenticated;
grant execute on function private.is_project_client(uuid) to authenticated;

-- Profiles
drop policy if exists "profiles self read" on public.profiles;
drop policy if exists "profiles self update" on public.profiles;
drop policy if exists "profiles admin manage" on public.profiles;
create policy "profiles read" on public.profiles for select to authenticated using (id = (select auth.uid()) or private.is_admin());
create policy "profiles update self" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "profiles admin insert" on public.profiles for insert to authenticated with check (private.is_admin());
create policy "profiles admin delete" on public.profiles for delete to authenticated using (private.is_admin());

-- Products
drop policy if exists "products public active read" on public.products;
drop policy if exists "products admin manage" on public.products;
create policy "products public read" on public.products for select to anon, authenticated using (status = 'active' or private.is_admin());
create policy "products admin insert" on public.products for insert to authenticated with check (private.is_admin());
create policy "products admin update" on public.products for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "products admin delete" on public.products for delete to authenticated using (private.is_admin());

-- Orders and items
drop policy if exists "orders owner read" on public.orders;
drop policy if exists "orders admin manage" on public.orders;
create policy "orders read" on public.orders for select to authenticated using (user_id = (select auth.uid()) or private.is_admin());
create policy "orders admin insert" on public.orders for insert to authenticated with check (private.is_admin());
create policy "orders admin update" on public.orders for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "orders admin delete" on public.orders for delete to authenticated using (private.is_admin());

drop policy if exists "order items owner read" on public.order_items;
drop policy if exists "order items admin manage" on public.order_items;
create policy "order items read" on public.order_items for select to authenticated using (
  exists(select 1 from public.orders o where o.id = order_id and (o.user_id = (select auth.uid()) or private.is_admin()))
);
create policy "order items admin insert" on public.order_items for insert to authenticated with check (private.is_admin());
create policy "order items admin update" on public.order_items for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "order items admin delete" on public.order_items for delete to authenticated using (private.is_admin());

-- Memberships
drop policy if exists "plans active read" on public.membership_plans;
drop policy if exists "plans admin manage" on public.membership_plans;
create policy "plans read" on public.membership_plans for select to anon, authenticated using (status = 'active' or private.is_admin());
create policy "plans admin insert" on public.membership_plans for insert to authenticated with check (private.is_admin());
create policy "plans admin update" on public.membership_plans for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "plans admin delete" on public.membership_plans for delete to authenticated using (private.is_admin());

drop policy if exists "memberships owner read" on public.memberships;
drop policy if exists "memberships admin manage" on public.memberships;
create policy "memberships read" on public.memberships for select to authenticated using (user_id = (select auth.uid()) or private.is_admin());
create policy "memberships admin insert" on public.memberships for insert to authenticated with check (private.is_admin());
create policy "memberships admin update" on public.memberships for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "memberships admin delete" on public.memberships for delete to authenticated using (private.is_admin());

drop policy if exists "entitlements owner read" on public.user_entitlements;
drop policy if exists "entitlements admin manage" on public.user_entitlements;
create policy "entitlements read" on public.user_entitlements for select to authenticated using (user_id = (select auth.uid()) or private.is_admin());
create policy "entitlements admin insert" on public.user_entitlements for insert to authenticated with check (private.is_admin());
create policy "entitlements admin update" on public.user_entitlements for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "entitlements admin delete" on public.user_entitlements for delete to authenticated using (private.is_admin());

-- Briefs
drop policy if exists "brief owner read" on public.project_briefs;
drop policy if exists "brief authenticated insert" on public.project_briefs;
drop policy if exists "brief admin manage" on public.project_briefs;
create policy "brief read" on public.project_briefs for select to authenticated using (user_id = (select auth.uid()) or private.is_admin());
create policy "brief authenticated insert" on public.project_briefs for insert to authenticated with check (user_id = (select auth.uid()) or private.is_admin());
create policy "brief admin update" on public.project_briefs for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "brief admin delete" on public.project_briefs for delete to authenticated using (private.is_admin());

-- Projects and client records
drop policy if exists "projects client read" on public.client_projects;
drop policy if exists "projects admin manage" on public.client_projects;
create policy "projects read" on public.client_projects for select to authenticated using (client_id = (select auth.uid()) or private.is_admin());
create policy "projects admin insert" on public.client_projects for insert to authenticated with check (private.is_admin());
create policy "projects admin update" on public.client_projects for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "projects admin delete" on public.client_projects for delete to authenticated using (private.is_admin());

drop policy if exists "milestones client read" on public.project_milestones;
drop policy if exists "milestones admin manage" on public.project_milestones;
create policy "milestones read" on public.project_milestones for select to authenticated using (private.is_project_client(project_id) or private.is_admin());
create policy "milestones admin insert" on public.project_milestones for insert to authenticated with check (private.is_admin());
create policy "milestones admin update" on public.project_milestones for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "milestones admin delete" on public.project_milestones for delete to authenticated using (private.is_admin());

drop policy if exists "project files client read" on public.project_files;
drop policy if exists "project files admin manage" on public.project_files;
create policy "project files read" on public.project_files for select to authenticated using ((visibility = 'client' and private.is_project_client(project_id)) or private.is_admin());
create policy "project files admin insert" on public.project_files for insert to authenticated with check (private.is_admin());
create policy "project files admin update" on public.project_files for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "project files admin delete" on public.project_files for delete to authenticated using (private.is_admin());

-- Invoices
drop policy if exists "invoice client read" on public.invoices;
drop policy if exists "invoice admin manage" on public.invoices;
create policy "invoice read" on public.invoices for select to authenticated using (client_id = (select auth.uid()) or private.is_admin());
create policy "invoice admin insert" on public.invoices for insert to authenticated with check (private.is_admin());
create policy "invoice admin update" on public.invoices for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "invoice admin delete" on public.invoices for delete to authenticated using (private.is_admin());

-- Support tickets
drop policy if exists "tickets owner read" on public.support_tickets;
drop policy if exists "tickets owner insert" on public.support_tickets;
drop policy if exists "tickets owner update" on public.support_tickets;
drop policy if exists "tickets admin manage" on public.support_tickets;
create policy "tickets read" on public.support_tickets for select to authenticated using (user_id = (select auth.uid()) or private.is_admin());
create policy "tickets insert" on public.support_tickets for insert to authenticated with check (user_id = (select auth.uid()) or private.is_admin());
create policy "tickets update" on public.support_tickets for update to authenticated using (user_id = (select auth.uid()) or private.is_admin()) with check (user_id = (select auth.uid()) or private.is_admin());
create policy "tickets admin delete" on public.support_tickets for delete to authenticated using (private.is_admin());

-- Audit
drop policy if exists "audit admin read" on public.audit_logs;
drop policy if exists "audit admin insert" on public.audit_logs;
create policy "audit admin read" on public.audit_logs for select to authenticated using (private.is_admin());
create policy "audit admin insert" on public.audit_logs for insert to authenticated with check (private.is_admin());

-- Storage
drop policy if exists "project files storage read" on storage.objects;
drop policy if exists "project files storage admin write" on storage.objects;
drop policy if exists "project files storage admin update" on storage.objects;
drop policy if exists "project files storage admin delete" on storage.objects;
create policy "project files storage read" on storage.objects for select to authenticated using (
  bucket_id = 'project-files' and (
    private.is_admin() or exists (
      select 1 from public.project_files pf
      join public.client_projects cp on cp.id = pf.project_id
      where pf.storage_path = name and cp.client_id = (select auth.uid()) and pf.visibility = 'client'
    )
  )
);
create policy "project files storage admin write" on storage.objects for insert to authenticated with check (bucket_id = 'project-files' and private.is_admin());
create policy "project files storage admin update" on storage.objects for update to authenticated using (bucket_id = 'project-files' and private.is_admin()) with check (bucket_id = 'project-files' and private.is_admin());
create policy "project files storage admin delete" on storage.objects for delete to authenticated using (bucket_id = 'project-files' and private.is_admin());

drop function if exists public.is_admin();
drop function if exists public.is_project_client(uuid);
drop function if exists public.handle_new_user();
