const fs = require('fs');

const file = 'components/HomeExperience.tsx';
let source = fs.readFileSync(file, 'utf8');

const oldNav = `const navItems = [\n  ["Home", "#top"], ["About", "#about"], ["Services", "#services"], ["Work", "#work"],\n  ["Shop", "/shop"], ["Solutions", "#services"], ["Resources", "#resources"], ["Contact", "#contact"],\n] as const;`;
const newNav = `const navItems = [\n  ["Work", "#work"], ["Services", "#services"], ["About", "/about"], ["Insights", "/insights"],\n  ["Shop", "/shop"], ["Contact", "/contact"],\n] as const;`;

if (source.includes(oldNav)) source = source.replace(oldNav, newNav);

const oldBrandProject = `{ id: "04", name: "BRAND IDENTITY", type: "Creative Design", description: "Brand systems that are memorable, disciplined and commercially useful.", visual: "brand", url: "#", caseStudyPath: "", focus: "Identity + visual systems", approach: "Distinctive, consistent, commercially usable" }`;
const newBrandProject = `{ id: "04", name: "GRAPHIC DESIGN PORTFOLIO", type: "Graphic Design / Brand Identity", description: "A curated archive of real JasonPro work across print, social campaigns, branding, product artwork and signage.", visual: "brand", url: "/work/graphic-design-portfolio", caseStudyPath: "/work/graphic-design-portfolio", focus: "Graphic design + identity + production", approach: "Print, social, branding, product artwork and signage" }`;
if (source.includes(oldBrandProject)) source = source.replace(oldBrandProject, newBrandProject);

const placeholderDigitalProduct = `  { id: "05", name: "DIGITAL PRODUCTS", type: "Commerce", description: "Scalable digital products, memberships and commerce experiences.", visual: "commerce", url: "#", caseStudyPath: "", focus: "Digital products + commerce", approach: "Productisation, conversion, scalable delivery" },\n`;
source = source.replace(placeholderDigitalProduct, '');
source = source.replace('{label}{label === "Solutions" && <sup>NEW</sup>}', '{label}');
source = source.replace(/\/ 05/g, '/ 04');
source = source.replace(/05 \/ 05/g, '04 / 04');
fs.writeFileSync(file, source);
console.log('Prepared production homepage navigation and selected work.');

const adminFile = 'components/admin/AdminDashboard.tsx';
let adminSource = fs.readFileSync(adminFile, 'utf8');
adminSource = adminSource.replace('<input type="hidden" name="client_id" value={selectedProject.client_id}/>', '');
adminSource = adminSource.replace('<label>File<input type="file" name="file" required/></label>', '<label>File<input type="file" name="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.zip,.txt,.doc,.docx,.xls,.xlsx" required/></label>');
fs.writeFileSync(adminFile, adminSource);
console.log('Prepared hardened admin invoice and upload controls.');
