-- JasonPro Solutions — Stage 13 core platform schema
-- Designed for Supabase/Postgres with RLS-first access control.

create extension if not exists pgcrypto;

create type public.app_role as enum ('customer','member','client','content_manager','admin');
create type public.order_status as enum ('draft','pending','confirmed','paid','fulfilled','cancelled','refunded');
create type public.project_status as enum ('lead','discovery','strategy','design','development','review','launch','complete','on_hold');
create type public.invoice_status as enum ('draft','issued','part_paid','paid','overdue','cancelled','refunded');
create type public.ticket_status as enum ('open','in_progress','waiting_customer','resolved','closed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  company_name text,
  country text default 'Botswana',
  role public.app_role not null default 'customer',
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  description text,
  product_type text not null check (product_type in ('service','digital','physical','membership')),
  status text not null default 'draft' check (status in ('draft','active','archived')),
  price_amount numeric(12,2),
  currency char(3) not null default 'BWP',
  price_label text,
  inventory_quantity integer,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_status_category_idx on public.products(status, category);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity unique,
  user_id uuid references public.profiles(id) on delete set null,
  email text not null,
  full_name text,
  phone text,
  country text,
  status public.order_status not null default 'pending',
  currency char(3) not null default 'BWP',
  subtotal numeric(12,2),
  tax_amount numeric(12,2),
  delivery_amount numeric(12,2),
  total_amount numeric(12,2),
  payment_provider text,
  payment_reference text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_user_created_idx on public.orders(user_id, created_at desc);
create index orders_status_created_idx on public.orders(status, created_at desc);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_amount numeric(12,2),
  line_amount numeric(12,2),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index order_items_order_idx on public.order_items(order_id);

create table public.membership_plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  status text not null default 'draft' check (status in ('draft','active','archived')),
  billing_interval text check (billing_interval in ('month','year','one_time')),
  price_amount numeric(12,2),
  currency char(3) not null default 'BWP',
  entitlements jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan_id uuid not null references public.membership_plans(id) on delete restrict,
  status text not null check (status in ('trial','active','past_due','cancelled','expired')),
  starts_at timestamptz not null default now(),
  renews_at timestamptz,
  ends_at timestamptz,
  provider_customer_ref text,
  provider_subscription_ref text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, plan_id)
);
create index memberships_user_status_idx on public.memberships(user_id, status);

create table public.user_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  entitlement_key text not null,
  source text not null default 'manual',
  expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(user_id, entitlement_key)
);

create table public.project_briefs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  company_name text,
  service text not null,
  budget_range text,
  timeline text,
  brief text not null,
  source text default 'website',
  status text not null default 'new' check (status in ('new','reviewing','qualified','quoted','won','lost','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index project_briefs_status_created_idx on public.project_briefs(status, created_at desc);

create table public.client_projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete restrict,
  brief_id uuid references public.project_briefs(id) on delete set null,
  name text not null,
  slug text unique,
  status public.project_status not null default 'discovery',
  summary text,
  start_date date,
  target_launch_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index client_projects_client_status_idx on public.client_projects(client_id, status);

create table public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.client_projects(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'upcoming' check (status in ('upcoming','active','review','approved','complete','blocked')),
  position integer not null default 0,
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);
create index milestones_project_position_idx on public.project_milestones(project_id, position);

create table public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.client_projects(id) on delete cascade,
  uploaded_by uuid references public.profiles(id) on delete set null,
  storage_path text not null,
  file_name text not null,
  mime_type text,
  byte_size bigint,
  visibility text not null default 'client' check (visibility in ('internal','client')),
  created_at timestamptz not null default now()
);
create index project_files_project_created_idx on public.project_files(project_id, created_at desc);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.client_projects(id) on delete set null,
  client_id uuid not null references public.profiles(id) on delete restrict,
  invoice_number text not null unique,
  status public.invoice_status not null default 'draft',
  currency char(3) not null default 'BWP',
  subtotal numeric(12,2) not null default 0,
  tax_amount numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null default 0,
  amount_paid numeric(12,2) not null default 0,
  issued_at timestamptz,
  due_at timestamptz,
  paid_at timestamptz,
  provider_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index invoices_client_status_idx on public.invoices(client_id, status);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.client_projects(id) on delete set null,
  subject text not null,
  body text not null,
  status public.ticket_status not null default 'open',
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index support_tickets_user_status_idx on public.support_tickets(user_id, status);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_logs_resource_idx on public.audit_logs(resource_type, resource_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger orders_updated_at before update on public.orders for each row execute function public.set_updated_at();
create trigger membership_plans_updated_at before update on public.membership_plans for each row execute function public.set_updated_at();
create trigger memberships_updated_at before update on public.memberships for each row execute function public.set_updated_at();
create trigger project_briefs_updated_at before update on public.project_briefs for each row execute function public.set_updated_at();
create trigger client_projects_updated_at before update on public.client_projects for each row execute function public.set_updated_at();
create trigger invoices_updated_at before update on public.invoices for each row execute function public.set_updated_at();
create trigger support_tickets_updated_at before update on public.support_tickets for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','content_manager')
  );
$$;

create or replace function public.is_project_client(project_uuid uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.client_projects
    where id = project_uuid and client_id = auth.uid()
  );
$$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.membership_plans enable row level security;
alter table public.memberships enable row level security;
alter table public.user_entitlements enable row level security;
alter table public.project_briefs enable row level security;
alter table public.client_projects enable row level security;
alter table public.project_milestones enable row level security;
alter table public.project_files enable row level security;
alter table public.invoices enable row level security;
alter table public.support_tickets enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles self read" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles self update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles admin manage" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

create policy "products public active read" on public.products for select using (status = 'active' or public.is_admin());
create policy "products admin manage" on public.products for all using (public.is_admin()) with check (public.is_admin());

create policy "orders owner read" on public.orders for select using (user_id = auth.uid() or public.is_admin());
create policy "orders admin manage" on public.orders for all using (public.is_admin()) with check (public.is_admin());
create policy "order items owner read" on public.order_items for select using (
  exists(select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin()))
);
create policy "order items admin manage" on public.order_items for all using (public.is_admin()) with check (public.is_admin());

create policy "plans active read" on public.membership_plans for select using (status = 'active' or public.is_admin());
create policy "plans admin manage" on public.membership_plans for all using (public.is_admin()) with check (public.is_admin());
create policy "memberships owner read" on public.memberships for select using (user_id = auth.uid() or public.is_admin());
create policy "memberships admin manage" on public.memberships for all using (public.is_admin()) with check (public.is_admin());
create policy "entitlements owner read" on public.user_entitlements for select using (user_id = auth.uid() or public.is_admin());
create policy "entitlements admin manage" on public.user_entitlements for all using (public.is_admin()) with check (public.is_admin());

create policy "brief owner read" on public.project_briefs for select using (user_id = auth.uid() or public.is_admin());
create policy "brief authenticated insert" on public.project_briefs for insert to authenticated with check (user_id = auth.uid());
create policy "brief admin manage" on public.project_briefs for all using (public.is_admin()) with check (public.is_admin());

create policy "projects client read" on public.client_projects for select using (client_id = auth.uid() or public.is_admin());
create policy "projects admin manage" on public.client_projects for all using (public.is_admin()) with check (public.is_admin());
create policy "milestones client read" on public.project_milestones for select using (public.is_project_client(project_id) or public.is_admin());
create policy "milestones admin manage" on public.project_milestones for all using (public.is_admin()) with check (public.is_admin());
create policy "project files client read" on public.project_files for select using (
  (visibility = 'client' and public.is_project_client(project_id)) or public.is_admin()
);
create policy "project files admin manage" on public.project_files for all using (public.is_admin()) with check (public.is_admin());

create policy "invoice client read" on public.invoices for select using (client_id = auth.uid() or public.is_admin());
create policy "invoice admin manage" on public.invoices for all using (public.is_admin()) with check (public.is_admin());

create policy "tickets owner read" on public.support_tickets for select using (user_id = auth.uid() or public.is_admin());
create policy "tickets owner insert" on public.support_tickets for insert to authenticated with check (user_id = auth.uid());
create policy "tickets owner update" on public.support_tickets for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "tickets admin manage" on public.support_tickets for all using (public.is_admin()) with check (public.is_admin());

create policy "audit admin read" on public.audit_logs for select using (public.is_admin());
create policy "audit admin insert" on public.audit_logs for insert with check (public.is_admin());

-- Storage bucket for signed client deliverables. Public access intentionally disabled.
insert into storage.buckets (id, name, public, file_size_limit)
values ('project-files', 'project-files', false, 52428800)
on conflict (id) do nothing;

create policy "project files storage read" on storage.objects for select to authenticated using (
  bucket_id = 'project-files' and (
    public.is_admin() or exists (
      select 1 from public.project_files pf
      join public.client_projects cp on cp.id = pf.project_id
      where pf.storage_path = name and cp.client_id = auth.uid() and pf.visibility = 'client'
    )
  )
);

create policy "project files storage admin write" on storage.objects for insert to authenticated with check (
  bucket_id = 'project-files' and public.is_admin()
);
create policy "project files storage admin update" on storage.objects for update to authenticated using (
  bucket_id = 'project-files' and public.is_admin()
) with check (bucket_id = 'project-files' and public.is_admin());
create policy "project files storage admin delete" on storage.objects for delete to authenticated using (
  bucket_id = 'project-files' and public.is_admin()
);
