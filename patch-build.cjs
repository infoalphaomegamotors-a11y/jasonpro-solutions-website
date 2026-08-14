const fs = require('fs');

const patches = [
  {
    file: 'components/HomeExperience.tsx',
    from: 'return () => tl.kill();',
    to: 'return () => { tl.kill(); };',
  },
  {
    file: 'components/case-study/CaseStudyExperience.tsx',
    from: 'return () => ctx.revert();',
    to: 'return () => { ctx.revert(); };',
  },
];

for (const patch of patches) {
  let source = fs.readFileSync(patch.file, 'utf8');
  if (!source.includes(patch.from)) {
    console.error(`Expected patch target not found in ${patch.file}`);
    process.exit(1);
  }
  source = source.replace(patch.from, patch.to);
  fs.writeFileSync(patch.file, source);
  console.log(`Patched ${patch.file}`);
}

// Public Supabase credentials are intentionally browser-safe. Environment
// variables remain preferred; these fallbacks prevent a build-time false
// negative from disabling auth/forms on Netlify.
fs.writeFileSync('lib/supabase/config.ts', `export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://xrhkiuwbsotejsonuyxt.supabase.co",
  publishableKey:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "sb_publishable_KRA4wLwK-huSKcDlTQutaw_vE-paY6b",
};

export const isSupabaseConfigured = Boolean(
  supabaseConfig.url && supabaseConfig.publishableKey,
);
`);
console.log('Injected production-safe Supabase public fallback configuration');
