"use client";

import { useState } from "react";
import type { AdminSnapshot, Profile } from "@/lib/supabase/types";
import type { AdminOperationsData } from "@/lib/data/admin";
import { signOutAction } from "@/app/auth/actions";
import { updateBriefStatus, updateProductStatus, updateTicketStatus } from "@/app/admin/actions";

const sections = ["overview","products","leads","support"] as const;
type Section = (typeof sections)[number];

const briefStatuses = ["new","reviewing","qualified","quoted","won","lost","archived"];
const productStatuses = ["draft","active","archived"];
const ticketStatuses = ["open","in_progress","waiting_customer","resolved","closed"];

export function AdminDashboard({ snapshot, operations, profile, configured }: { snapshot: AdminSnapshot; operations: AdminOperationsData; profile?: Profile | null; configured: boolean }) {
  const [section, setSection] = useState<Section>("overview");

  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <div className="admin-brand"><span>JP</span><div><b>JASONPRO</b><small>CONTROL SYSTEM</small></div></div>
      <nav>{sections.map((item,index)=><button key={item} className={section===item?"active":""} onClick={()=>setSection(item)}><span>{String(index+1).padStart(2,"0")}</span>{item.toUpperCase()}</button>)}</nav>
      <div className="admin-env"><i/><span>{configured?"SUPABASE CONNECTED":"BACKEND FOUNDATION"}</span><small>{configured?"Live protected operations are enabled.":"Backend configuration required."}</small></div>
    </aside>

    <section className="admin-main">
      <header className="admin-topbar"><div><small>ADMIN / {section.toUpperCase()}</small><h1>{section==="overview"?"Operating overview.":section.charAt(0).toUpperCase()+section.slice(1)}</h1></div><div className="admin-user"><span>{profile?.role?.toUpperCase()||"ADMIN ACCESS"}</span><b>{profile?.email||"AUTH REQUIRED"}</b>{configured&&<form action={signOutAction}><button>SIGN OUT</button></form>}</div></header>

      {section==="overview"&&<>
        <div className="admin-metrics">{[["Products",snapshot.products],["Orders",snapshot.orders],["Project briefs",snapshot.briefs],["Active projects",snapshot.activeProjects],["Members",snapshot.members]].map(([label,value])=><article key={String(label)}><small>{label}</small><strong>{value??"—"}</strong><span>LIVE PROTECTED DATA</span></article>)}</div>
        <div className="admin-grid">
          <article className="admin-panel"><span>OPERATIONS</span><h2>Lead, catalogue and support controls are live.</h2><p>Use the navigation to qualify incoming project briefs, control which catalogue items are public, and manage client support ticket status.</p></article>
          <article className="admin-panel"><span>ACCESS</span><h2>Role protected.</h2><p>This control surface is available only to Admin and Content Manager roles, with database RLS enforcing record access.</p></article>
        </div>
      </>}

      {section==="products"&&<div className="admin-module"><span>CATALOGUE</span><h2>Public product status.</h2>{operations.products.length?<div className="portal-list">{operations.products.map(p=><article key={p.id}><div><b>{p.name}</b><small>{p.category} · {p.price_label||"Admin managed pricing"}</small></div><form action={updateProductStatus}><input type="hidden" name="id" value={p.id}/><select name="status" defaultValue={p.status}>{productStatuses.map(s=><option key={s} value={s}>{s}</option>)}</select><button>UPDATE</button></form></article>)}</div>:<div className="admin-empty"><strong>NO PRODUCTS</strong></div>}</div>}

      {section==="leads"&&<div className="admin-module"><span>PROJECT BRIEFS</span><h2>Incoming website leads.</h2>{operations.briefs.length?<div className="portal-list">{operations.briefs.map(b=><article key={b.id}><div><b>{b.full_name}</b><span>{b.email}</span><small>{b.service} · {new Date(b.created_at).toLocaleDateString()}</small></div><form action={updateBriefStatus}><input type="hidden" name="id" value={b.id}/><select name="status" defaultValue={b.status}>{briefStatuses.map(s=><option key={s} value={s}>{s}</option>)}</select><button>UPDATE</button></form></article>)}</div>:<div className="admin-empty"><strong>NO PROJECT BRIEFS YET</strong><span>New contact-form submissions will appear here.</span></div>}</div>}

      {section==="support"&&<div className="admin-module"><span>CLIENT SUPPORT</span><h2>Support queue.</h2>{operations.tickets.length?<div className="portal-list">{operations.tickets.map(t=><article key={t.id}><div><b>{t.subject}</b><span>{t.priority}</span><small>{new Date(t.created_at).toLocaleDateString()}</small></div><form action={updateTicketStatus}><input type="hidden" name="id" value={t.id}/><select name="status" defaultValue={t.status}>{ticketStatuses.map(s=><option key={s} value={s}>{s}</option>)}</select><button>UPDATE</button></form></article>)}</div>:<div className="admin-empty"><strong>NO SUPPORT TICKETS</strong><span>Client portal requests will appear here.</span></div>}</div>}
    </section>
  </div>;
}
