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

// Decode the freshly rebuilt portfolio grid into a normal public WebP asset.
const rebuiltAsset = 'lib/assets/graphicPortfolioGridFixed.part0.txt';
const rebuiltBase64 = fs.readFileSync(rebuiltAsset, 'utf8').trim();
if (!rebuiltBase64 || !rebuiltBase64.startsWith('UklGR')) {
  console.error('Rebuilt graphic portfolio payload is missing or invalid.');
  process.exit(1);
}
const publicDir = path.join('public', 'portfolio');
fs.mkdirSync(publicDir, { recursive: true });
const portfolioAssetPath = path.join(publicDir, 'graphic-design-portfolio.webp');
fs.writeFileSync(portfolioAssetPath, Buffer.from(rebuiltBase64, 'base64'));
console.log(`Wrote rebuilt ${portfolioAssetPath}`);

const portfolioPage = 'app/work/graphic-design-portfolio/page.tsx';
let portfolioSource = fs.readFileSync(portfolioPage, 'utf8');
portfolioSource = portfolioSource.replace('import { graphicPortfolioGrid } from "@/lib/assets/graphicPortfolioGrid";\n', '');
portfolioSource = portfolioSource.replace('src={graphicPortfolioGrid}', 'src="/portfolio/graphic-design-portfolio.webp"');
fs.writeFileSync(portfolioPage, portfolioSource);
console.log('Updated graphic design portfolio page to use the rebuilt public WebP asset.');
