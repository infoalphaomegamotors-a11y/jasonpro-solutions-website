const fs = require('fs');
const path = require('path');

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
  {
    file: 'app/auth/actions.ts',
    from: 'const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";',
    to: 'const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jasonprosolutions.netlify.app";',
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

{
  const file = 'app/auth/callback/route.ts';
  let source = fs.readFileSync(file, 'utf8');
  const oldBlock = `  const code = searchParams.get("code");\n  const next = searchParams.get("next") ?? "/portal";\n  if (code && isSupabaseConfigured) {\n    const supabase = await createServerSupabaseClient();\n    await supabase.auth.exchangeCodeForSession(code);\n  }\n  return NextResponse.redirect(\`${'${origin}'}${'${next.startsWith("/") ? next : "/portal"}'}\`);`;
  const newBlock = `  const code = searchParams.get("code");\n  const next = searchParams.get("next") ?? "/portal";\n  const authError = searchParams.get("error_description") || searchParams.get("error");\n\n  if (authError) {\n    const url = new URL("/auth/sign-in", origin);\n    url.searchParams.set("error", authError);\n    return NextResponse.redirect(url);\n  }\n\n  if (code && isSupabaseConfigured) {\n    const supabase = await createServerSupabaseClient();\n    const { error } = await supabase.auth.exchangeCodeForSession(code);\n    if (error) {\n      const url = new URL("/auth/sign-in", origin);\n      url.searchParams.set("error", "Authentication link could not be completed. Please sign in again.");\n      return NextResponse.redirect(url);\n    }\n  }\n\n  return NextResponse.redirect(\`${'${origin}'}${'${next.startsWith("/") ? next : "/portal"}'}\`);`;
  if (!source.includes(oldBlock)) {
    console.error(`Expected callback patch target not found in ${file}`);
    process.exit(1);
  }
  source = source.replace(oldBlock, newBlock);
  fs.writeFileSync(file, source);
  console.log(`Patched ${file}`);
}

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

function applyOverrides(dir, root = dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const source = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      applyOverrides(source, root);
      continue;
    }
    const relative = path.relative(root, source);
    const target = path.join(process.cwd(), relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
    console.log(`Applied override ${relative}`);
  }
}

applyOverrides(path.join(process.cwd(), 'overrides'));
