const fs = require('fs');
const path = require('path');

const file = 'components/HomeExperience.tsx';
let source = fs.readFileSync(file, 'utf8');

const oldNav = `const navItems = [\n  ["Home", "#top"], ["About", "#about"], ["Services", "#services"], ["Work", "#work"],\n  ["Shop", "/shop"], ["Solutions", "#services"], ["Resources", "#resources"], ["Contact", "#contact"],\n] as const;`;
const newNav = `const navItems = [\n  ["Home", "#top"], ["About", "/about"], ["Services", "#services"], ["Work", "#work"],\n  ["Graphic Portfolio", "/work/graphic-design-portfolio"], ["Shop", "/shop"], ["Resources", "#resources"], ["Contact", "#contact"],\n] as const;`;

if (source.includes(oldNav)) {
  source = source.replace(oldNav, newNav);
}

const oldBrandProject = `{ id: "04", name: "BRAND IDENTITY", type: "Creative Design", description: "Brand systems that are memorable, disciplined and commercially useful.", visual: "brand", url: "#", caseStudyPath: "", focus: "Identity + visual systems", approach: "Distinctive, consistent, commercially usable" }`;
const newBrandProject = `{ id: "04", name: "GRAPHIC DESIGN PORTFOLIO", type: "Graphic Design / Brand Identity", description: "A curated archive of real JasonPro work across print, social campaigns, branding, product artwork and signage.", visual: "brand", url: "/work/graphic-design-portfolio", caseStudyPath: "/work/graphic-design-portfolio", focus: "Graphic design + identity + production", approach: "Print, social, branding, product artwork and signage" }`;

if (source.includes(oldBrandProject)) {
  source = source.replace(oldBrandProject, newBrandProject);
}

source = source.replace('{label}{label === "Solutions" && <sup>NEW</sup>}', '{label}');
fs.writeFileSync(file, source);
console.log('Prepared homepage navigation and graphic portfolio entry.');

// Decode the curated portfolio grid from the legacy data-URI module into a normal
// public WebP asset. Browsers and CDNs handle this far more reliably than a large
// inline data URL embedded in the rendered HTML.
const assetModule = 'lib/assets/graphicPortfolioGrid.ts';
const assetSource = fs.readFileSync(assetModule, 'utf8');
const match = assetSource.match(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/);
if (!match) {
  console.error('Could not extract graphic portfolio WebP payload.');
  process.exit(1);
}
const publicDir = path.join('public', 'portfolio');
fs.mkdirSync(publicDir, { recursive: true });
const portfolioAssetPath = path.join(publicDir, 'graphic-design-portfolio.webp');
fs.writeFileSync(portfolioAssetPath, Buffer.from(match[1], 'base64'));
console.log(`Wrote ${portfolioAssetPath}`);

const portfolioPage = 'app/work/graphic-design-portfolio/page.tsx';
let portfolioSource = fs.readFileSync(portfolioPage, 'utf8');
portfolioSource = portfolioSource.replace('import { graphicPortfolioGrid } from "@/lib/assets/graphicPortfolioGrid";\n', '');
portfolioSource = portfolioSource.replace('src={graphicPortfolioGrid}', 'src="/portfolio/graphic-design-portfolio.webp"');
fs.writeFileSync(portfolioPage, portfolioSource);
console.log('Updated graphic design portfolio page to use a public WebP asset.');
