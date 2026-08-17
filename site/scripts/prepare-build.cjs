const fs = require('fs');

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
