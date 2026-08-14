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
