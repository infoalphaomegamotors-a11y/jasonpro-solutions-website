export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://xrhkiuwbsotejsonuyxt.supabase.co",
  publishableKey:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "sb_publishable_KRA4wLwK-huSKcDlTQutaw_vE-paY6b",
};

export const isSupabaseConfigured = Boolean(
  supabaseConfig.url && supabaseConfig.publishableKey,
);
