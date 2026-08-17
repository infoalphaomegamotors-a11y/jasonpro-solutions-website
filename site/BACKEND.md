# JasonPro Solutions — Stage 13 Backend Foundation

## Included

- Supabase/Postgres schema for profiles, products, orders, memberships, entitlements, project briefs, client projects, milestones, files, invoices, support tickets and audit logs.
- RLS-first access policies.
- User profile creation trigger from Supabase Auth.
- Private `project-files` storage bucket and access policies.
- Initial catalogue/membership seed content based only on products already present in the UI.
- Supabase browser-client scaffold.
- Admin dashboard and sign-in UI foundations.

## Intentionally not connected

- Supabase project credentials.
- Live authentication/session handling.
- Server-side checkout/order creation.
- Payment provider and webhooks.
- Transactional email.
- Malware scanning for uploads.

These remain disabled until real provider/project configuration is supplied and verified.

## Migration order

1. `supabase/migrations/20260814_001_core_platform.sql`
2. `supabase/migrations/20260814_002_seed_catalog.sql`

## Security notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client-side code.
- Order and payment writes should be performed by validated server routes/actions, not directly from the browser.
- The public project-brief form should eventually call a server endpoint with rate limiting/spam controls rather than allowing anonymous direct table inserts.
- Project files are private; signed access should be created only after authorisation.
- Payment webhooks must be signed, idempotent and reconciled server-side after a Botswana-compatible provider is selected.

## Stage 14 — application binding layer

Stage 14 completes the code-side Supabase binding without assuming a project exists.

### Implemented

- SSR-safe Supabase server client using `@supabase/ssr`.
- Middleware session refresh using Supabase auth cookies.
- Password sign-in server action and secure sign-out action.
- OAuth/PKCE callback route foundation at `/auth/callback`.
- Route guards for `/portal` and `/admin`.
- Admin/content-manager role enforcement before admin data queries.
- Live portal loaders for authorised projects, milestones, client-visible files, invoices and support tickets.
- Live admin summary counts with no service-role key in the application.
- Persistent project-brief server action.
- Public project-brief INSERT policy with no anonymous read/update/delete access.
- Honeypot field and strict field length checks as baseline abuse reduction.

### Still required before production launch

1. Connect or create the intended Supabase project.
2. Apply migrations in order: `001`, `002`, `003`.
3. Configure the project URL and publishable/anon key in the deployment environment.
4. Configure Supabase Auth Site URL and redirect allow-list for the production domain.
5. Create the first administrator account and assign `profiles.role = 'admin'` through a secure operator workflow.
6. Add edge/network rate limiting and bot verification to public project-brief submission. The database policy intentionally grants INSERT-only anonymous access, but it is not a substitute for anti-spam controls.
7. Verify email confirmation/password reset templates and redirect URLs.
8. Run security and performance advisors after migrations.
9. Test RLS with separate customer/client/admin accounts before deployment.
10. Keep payment processing disconnected until a Botswana-compatible provider is selected and verified.

No `service_role` key is required by the website runtime in this stage. Privileged admin actions continue to rely on authenticated users plus RLS rather than shipping a broad database bypass credential into the app.

## Stage 15 live Supabase binding

Live project: `Jasonpro Solutions Official Website`
Project ref: `xrhkiuwbsotejsonuyxt`
Region: `eu-central-1`
API URL: `https://xrhkiuwbsotejsonuyxt.supabase.co`

Applied live migrations:
- `core_platform`
- `seed_catalog`
- `public_briefs`
- `security_and_rls_hardening`
- `foreign_key_indexes`

Security advisor after hardening: no lints.
Performance advisor after hardening: only unused-index informational notices remain. These are expected on a new database and the indexes are retained for planned foreign-key/query access paths.

The repository uses the Supabase publishable key only. No service-role secret is included in source.

Before deployment, set `NEXT_PUBLIC_SITE_URL` to the final Netlify/custom-domain origin and add that URL plus `/auth/callback` to Supabase Auth redirect configuration.

## Stage 16 production binding

The application now prefers `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. `NEXT_PUBLIC_SUPABASE_ANON_KEY` remains as a temporary compatibility fallback only. Production deployment should use the publishable-key variable name.

The existing Netlify target is `jasonprosolutions.netlify.app`. See `DEPLOYMENT.md` for production environment and authentication redirect requirements.
