# JasonPro Solutions — Stage 16 Deployment

## Production target

Existing Netlify site: `jasonprosolutions.netlify.app`

Live Supabase project: `Jasonpro Solutions Official Website`

Netlify supports current Next.js App Router/SSR deployments through its built-in OpenNext adapter, so no legacy Next.js plugin is declared in `netlify.toml`.

## Required Netlify production environment variables

- `NEXT_PUBLIC_SUPABASE_URL` — the live Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — the project's browser-safe publishable key.
- `NEXT_PUBLIC_SITE_URL=https://jasonprosolutions.netlify.app`

Do not add a Supabase service-role key to this Next.js frontend/runtime.

## Authentication redirect configuration

In Supabase Auth URL Configuration, set the production Site URL to:

`https://jasonprosolutions.netlify.app`

Add this redirect URL:

`https://jasonprosolutions.netlify.app/auth/callback`

If a custom JasonPro domain is connected later, add that origin and callback before switching the primary Site URL.

## First administrator bootstrap

1. Deploy the Stage 16 source.
2. Visit `/auth/sign-up` and create the intended owner account.
3. Confirm the email if email confirmation is enabled.
4. Verify the corresponding `public.profiles` row exists.
5. Promote that single profile from `customer` to `admin` through an authenticated administrative/database operation.
6. Sign out and sign back in before testing `/admin`.

Never create an admin by inserting directly into `auth.users`.

## Verified live backend state

- Core schema and seed migrations are applied.
- Row Level Security is enabled on all application tables.
- Anonymous visitors can read active catalogue products.
- Anonymous visitors can insert valid website project briefs, but cannot read submitted briefs.
- Private project files are stored in the non-public `project-files` bucket.
- Supabase security advisor returned zero security lints after hardening.

## Deployment safety

Do not trigger the existing Netlify site's deploy until this Stage 16 source is actually linked to that site/repository. Triggering a deploy on an older linked source would simply redeploy the old build.
