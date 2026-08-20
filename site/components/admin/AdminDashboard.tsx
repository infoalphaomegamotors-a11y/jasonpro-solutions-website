"use client";

import { useState } from "react";
import type { AdminSnapshot, Profile } from "@/lib/supabase/types";
import type { AdminOperationsData } from "@/lib/data/admin";
import { signOutAction } from "@/app/auth/actions";
import {
  createClientProject,
  createInvoice,
  createMilestone,
  createPortfolioItem,
  deletePortfolioItem,
  publishProjectFile,
  updateBriefStatus,
  updateInvoiceStatus,
  updateMilestoneStatus,
  updatePortfolioItem,
  updateProductStatus,
  updateProjectStatus,
  updateTicketStatus,
  updateUserRole,
} from "@/app/admin/actions";

const sections = ["overview","portfolio","products","leads","projects","users","support"] as const;
type Section = (typeof sections)[number];
const briefStatuses = ["new","reviewing","qualified","quoted","won","lost","archived"];
const productStatuses = ["draft","active","archived"];
const portfolioStatuses = ["published","draft","archived"];
const ticketStatuses = ["open","in_progress","waiting_customer","resolved","closed"];
const projectStatuses = ["lead","discovery","strategy","design","development","review","launch","complete","on_hold"];
const milestoneStatuses = ["upcoming","active","review","approved","complete","blocked"];
const invoiceStatuses = ["draft","issued","part_paid","paid","overdue","cancelled","refunded"];
const appRoles = ["customer","member","client","content_manager","admin"];
const portfolioCategories = ["Print & Promotional","Social Campaigns","Brand Identity","Product & Production","Web / UI","Photography","Other"];

export function AdminDashboard({ snapshot, operations, profile, configured }: { snapshot: AdminSnapshot; operations: AdminOperationsData; profile?: Profile | null; configured: boolean }) {
  const [section, setSection] = useState<Section>("overview");
  const [projectId, setProjectId] = useState(operations.projects[0]?.id || "");
  const selectedProject = operations.projects.find(p => p.id === projectId) || operations.projects[0];
  const selectedClient = selectedProject ? operations.profiles.find(p => p.id === selectedProject.client_id) : null;
  const projectMilestones = selectedProject ? operations.milestones.filter(m => m.project_id === selectedProject.id) : [];
  const projectInvoices = selectedProject ? operations.invoices.filter(i => i.project_id === selectedProject.id) : [];
  const projectFiles = selectedProject ? operations.files.filter(f => f.project_id === selectedProject.id) : [];

  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <div className="admin-brand"><span>JP</span><div><b>JASONPRO</b><small>CONTROL SYSTEM</small></div></div>
      <nav>{sections.map((item,index)=><button key={item} className={section===item?"active":""} onClick={()=>setSection(item)}><span>{String(index+1).padStart(2,"0")}</span>{item.toUpperCase()}</button>)}</nav>
      <div className="admin-env"><i/><span>{configured?"SUPABASE CONNECTED":"BACKEND FOUNDATION"}</span><small>{configured?"Live protected operations are enabled.":"Backend configuration required."}</small></div>
    </aside>

    <section className="admin-main">
      <header className="admin-topbar"><div><small>ADMIN / {section.toUpperCase()}</small><h1>{section==="overview"?"Operating overview.":section.charAt(0).toUpperCase()+section.slice(1)}</h1></div><div className="admin-user"><span>{profile?.role?.toUpperCase()||"ADMIN ACCESS"}</span><b>{profile?.email||"AUTH REQUIRED"}</b>{configured&&<form action={signOutAction}><button>SIGN OUT</button></form>}</div></header>

      {section==="overview"&&<>
        <div className="admin-metrics">{[["Products",snapshot.products],["Portfolio items",operations.portfolio.length],["Project briefs",snapshot.briefs],["Active projects",snapshot.activeProjects],["Members",snapshot.members]].map(([label,value])=><article key={String(label)}><small>{label}</small><strong>{value??"—"}</strong><span>LIVE PROTECTED DATA</span></article>)}</div>
        <div className="admin-grid"><article className="admin-panel"><span>OPERATIONS</span><h2>Portfolio, leads, catalogue, projects, users and support are controlled here.</h2><p>Public graphic-design work is now managed from the Portfolio section instead of hard-coded page assets.</p></article><article className="admin-panel"><span>ACCESS</span><h2>Role protected.</h2><p>Database RLS remains the enforcement layer; UI visibility is not treated as security.</p></article></div>
      </>}

      {section==="portfolio"&&<div className="admin-module">
        <span>GRAPHIC DESIGN PORTFOLIO</span><h2>Add, publish, reorder or remove portfolio work.</h2>
        <div className="admin-grid">
          <article className="admin-panel">
            <span>ADD PORTFOLIO ITEM</span>
            <form action={createPortfolioItem} encType="multipart/form-data" className="project-brief-form">
              <label>Title<input name="title" required minLength={2} placeholder="Campaign / project title"/></label>
              <label>Category<select name="category" defaultValue="Print & Promotional">{portfolioCategories.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
              <label>Caption<textarea name="caption" rows={4} placeholder="Brief factual context about the work"/></label>
              <label>Alt text<input name="alt_text" required minLength={4} placeholder="Describe what is visible in the image"/></label>
              <label>Display order<input name="position" type="number" min="0" step="1" defaultValue={operations.portfolio.length?Math.max(...operations.portfolio.map(item=>Number(item.position)||0))+10:10}/></label>
              <label>Status<select name="status" defaultValue="published">{portfolioStatuses.map(s=><option key={s} value={s}>{s}</option>)}</select></label>
              <label>Image<input type="file" name="image" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" required/></label>
              <small>JPEG, PNG or WebP · maximum 10 MB. Published items appear on the public Graphic Design Portfolio page.</small>
              <button>ADD PORTFOLIO ITEM</button>
            </form>
          </article>
          <article className="admin-panel"><span>HOW IT WORKS</span><h2>{operations.portfolio.length} item{operations.portfolio.length===1?"":"s"} currently managed.</h2><p>Use lower display-order numbers to move work earlier. Set an item to Draft to hide it without deleting it. Delete permanently removes the database record and any image uploaded through this dashboard.</p></article>
        </div>

        {operations.portfolio.length?<div className="admin-portfolio-list">{operations.portfolio.map(item=><article className="admin-portfolio-item" key={item.id}>
          <div className="admin-portfolio-preview"><img src={item.image_url} alt={item.alt_text}/></div>
          <form action={updatePortfolioItem} className="project-brief-form admin-portfolio-edit">
            <input type="hidden" name="id" value={item.id}/>
            <label>Title<input name="title" defaultValue={item.title} required minLength={2}/></label>
            <label>Category<select name="category" defaultValue={item.category}>{Array.from(new Set([...portfolioCategories,item.category])).map(c=><option key={c} value={c}>{c}</option>)}</select></label>
            <label>Caption<textarea name="caption" defaultValue={item.caption||""} rows={3}/></label>
            <label>Alt text<input name="alt_text" defaultValue={item.alt_text} required minLength={4}/></label>
            <div className="admin-grid"><label>Order<input name="position" type="number" min="0" step="1" defaultValue={item.position}/></label><label>Status<select name="status" defaultValue={item.status}>{portfolioStatuses.map(s=><option key={s} value={s}>{s}</option>)}</select></label></div>
            <button>UPDATE ITEM</button>
          </form>
          <form action={deletePortfolioItem} className="admin-danger-form"><input type="hidden" name="id" value={item.id}/><button className="admin-danger">DELETE ITEM</button></form>
        </article>)}</div>:<div className="admin-empty"><strong>NO PORTFOLIO ITEMS</strong><span>Add the first item above.</span></div>}
      </div>}

      {section==="products"&&<div className="admin-module"><span>CATALOGUE</span><h2>Public product status.</h2>{operations.products.length?<div className="portal-list">{operations.products.map(p=><article key={p.id}><div><b>{p.name}</b><small>{p.category} · {p.price_label||"Admin managed pricing"}</small></div><form action={updateProductStatus}><input type="hidden" name="id" value={p.id}/><select name="status" defaultValue={p.status}>{productStatuses.map(s=><option key={s} value={s}>{s}</option>)}</select><button>UPDATE</button></form></article>)}</div>:<div className="admin-empty"><strong>NO PRODUCTS</strong></div>}</div>}

      {section==="leads"&&<div className="admin-module"><span>PROJECT BRIEFS</span><h2>Incoming website leads.</h2>{operations.briefs.length?<div className="portal-list">{operations.briefs.map(b=><article key={b.id}><div><b>{b.full_name}</b><span>{b.email}</span><small>{b.service} · {new Date(b.created_at).toLocaleDateString()}</small></div><form action={updateBriefStatus}><input type="hidden" name="id" value={b.id}/><select name="status" defaultValue={b.status}>{briefStatuses.map(s=><option key={s} value={s}>{s}</option>)}</select><button>UPDATE</button></form></article>)}</div>:<div className="admin-empty"><strong>NO PROJECT BRIEFS YET</strong><span>New contact-form submissions will appear here.</span></div>}</div>}

      {section==="projects"&&<div className="admin-module"><span>CLIENT DELIVERY</span><h2>Projects, milestones, invoices and files.</h2>
        <div className="admin-grid"><article className="admin-panel"><span>NEW PROJECT</span><form action={createClientProject} className="project-brief-form"><label>Client<select name="client_id" required defaultValue=""><option value="" disabled>Select account</option>{operations.profiles.map(p=><option key={p.id} value={p.id}>{p.full_name||p.email||p.id} · {p.role}</option>)}</select></label><label>Project name<input name="name" required minLength={3}/></label><label>Summary<textarea name="summary" rows={4}/></label><button>CREATE PROJECT</button></form></article>
        <article className="admin-panel"><span>PROJECT SELECTOR</span>{operations.projects.length?<><select value={selectedProject?.id||""} onChange={e=>setProjectId(e.target.value)}>{operations.projects.map(p=><option key={p.id} value={p.id}>{p.name} · {p.status}</option>)}</select>{selectedProject&&<form action={updateProjectStatus}><input type="hidden" name="id" value={selectedProject.id}/><select name="status" defaultValue={selectedProject.status}>{projectStatuses.map(s=><option key={s} value={s}>{s}</option>)}</select><button>UPDATE PROJECT STATUS</button></form>}</>:<p>No client projects yet.</p>}</article></div>

        {selectedProject&&<><div className="admin-grid"><article className="admin-panel"><span>MILESTONES</span><form action={createMilestone} className="project-brief-form"><input type="hidden" name="project_id" value={selectedProject.id}/><label>Title<input name="title" required minLength={2}/></label><label>Due date<input type="datetime-local" name="due_at"/></label><button>ADD MILESTONE</button></form>{projectMilestones.length?<div className="portal-list">{projectMilestones.map(m=><article key={m.id}><div><b>{m.title}</b><small>{m.due_at?new Date(m.due_at).toLocaleDateString():"No due date"}</small></div><form action={updateMilestoneStatus}><input type="hidden" name="id" value={m.id}/><select name="status" defaultValue={m.status}>{milestoneStatuses.map(s=><option key={s} value={s}>{s}</option>)}</select><button>UPDATE</button></form></article>)}</div>:<p>No milestones yet.</p>}</article>
        <article className="admin-panel"><span>INVOICES</span><form action={createInvoice} className="project-brief-form"><input type="hidden" name="project_id" value={selectedProject.id}/><label>Invoice number<input name="invoice_number" required placeholder="JPS-2026-001"/></label><label>Total amount (BWP)<input name="total_amount" type="number" min="0" step="0.01" required/></label><label>Due date<input name="due_at" type="datetime-local"/></label><button>CREATE INVOICE</button></form>{projectInvoices.length?<div className="portal-list">{projectInvoices.map(i=><article key={i.id}><div><b>{i.invoice_number}</b><span>{i.currency} {Number(i.total_amount).toFixed(2)}</span><small>{i.due_at?new Date(i.due_at).toLocaleDateString():"No due date"}</small></div><form action={updateInvoiceStatus}><input type="hidden" name="id" value={i.id}/><select name="status" defaultValue={i.status}>{invoiceStatuses.map(s=><option key={s} value={s}>{s}</option>)}</select><button>UPDATE</button></form></article>)}</div>:<p>No invoices yet.</p>}</article></div>

        <div className="admin-grid"><article className="admin-panel"><span>CLIENT FILES</span><form action={publishProjectFile} encType="multipart/form-data" className="project-brief-form"><input type="hidden" name="project_id" value={selectedProject.id}/><label>Visibility<select name="visibility" defaultValue="client"><option value="client">Client visible</option><option value="internal">Internal only</option></select></label><label>File<input type="file" name="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.zip,.txt,.doc,.docx,.xls,.xlsx" required/></label><button>PUBLISH FILE</button></form><small>Maximum file size: 20 MB. Client files are delivered through signed private URLs.</small></article>
        <article className="admin-panel"><span>PUBLISHED FILES</span>{projectFiles.length?<div className="portal-list">{projectFiles.map(f=><article key={f.id}><div><b>{f.file_name}</b><span>{f.visibility}</span><small>{f.byte_size?`${Math.ceil(f.byte_size/1024)} KB`:"Size unavailable"}</small></div></article>)}</div>:<p>No files published yet.</p>}</article></div>
        <div className="admin-panel"><span>CLIENT</span><h2>{selectedClient?.full_name||selectedClient?.email||"Assigned account"}</h2><p>{selectedProject.summary||"No project summary yet."}</p></div></>}
      </div>}

      {section==="users"&&<div className="admin-module"><span>ACCOUNTS + ROLES</span><h2>Control application access.</h2>{operations.profiles.length?<div className="portal-list">{operations.profiles.map(p=><article key={p.id}><div><b>{p.full_name||p.email||"Unnamed account"}</b><span>{p.company_name||p.email}</span><small>{new Date(p.created_at).toLocaleDateString()}</small></div>{p.id===profile?.id?<strong>YOUR ADMIN ACCOUNT</strong>:<form action={updateUserRole}><input type="hidden" name="id" value={p.id}/><select name="role" defaultValue={p.role}>{appRoles.map(r=><option key={r} value={r}>{r}</option>)}</select><button>UPDATE</button></form>}</article>)}</div>:<div className="admin-empty"><strong>NO ACCOUNTS</strong></div>}</div>}

      {section==="support"&&<div className="admin-module"><span>CLIENT SUPPORT</span><h2>Support queue.</h2>{operations.tickets.length?<div className="portal-list">{operations.tickets.map(t=><article key={t.id}><div><b>{t.subject}</b><span>{t.priority}</span><small>{new Date(t.created_at).toLocaleDateString()}</small></div><form action={updateTicketStatus}><input type="hidden" name="id" value={t.id}/><select name="status" defaultValue={t.status}>{ticketStatuses.map(s=><option key={s} value={s}>{s}</option>)}</select><button>UPDATE</button></form></article>)}</div>:<div className="admin-empty"><strong>NO SUPPORT TICKETS</strong><span>Client portal requests will appear here.</span></div>}</div>}
    </section>
    <style jsx>{`
      .admin-portfolio-list{display:grid;gap:18px;margin-top:28px}.admin-portfolio-item{display:grid;grid-template-columns:minmax(220px,.55fr) 1.45fr;gap:24px;padding:22px;border:1px solid #2a2a2a;background:#111;position:relative}.admin-portfolio-preview{background:#050505;min-height:240px;display:flex;align-items:center;justify-content:center;overflow:hidden}.admin-portfolio-preview img{width:100%;height:100%;max-height:460px;object-fit:contain;display:block}.admin-portfolio-edit{min-width:0}.admin-danger-form{grid-column:2}.admin-danger{background:#3a1114!important;border-color:#7c252b!important;color:#fff!important}.admin-danger:hover{background:#641b21!important}@media(max-width:900px){.admin-portfolio-item{grid-template-columns:1fr}.admin-danger-form{grid-column:auto}.admin-portfolio-preview{min-height:200px}}
    `}</style>
  </div>;
}
