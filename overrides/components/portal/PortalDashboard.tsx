"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { Profile } from "@/lib/supabase/types";
import type { PortalData } from "@/lib/data/portal";
import { signOutAction } from "@/app/auth/actions";
import { createSupportTicket, updateProfileAction, type TicketState, type ProfileState } from "@/app/portal/actions";

const initialTicketState: TicketState = {};
const initialProfileState: ProfileState = {};

export default function PortalDashboard({ profile, data }: { profile: Profile; data: PortalData }) {
  const [tab,setTab]=useState("projects");
  const [ticketState,ticketAction,ticketPending]=useActionState(createSupportTicket, initialTicketState);
  const [profileState,profileAction,profilePending]=useActionState(updateProfileAction, initialProfileState);
  const project=data.projects[0];
  const projectMilestones=project?data.milestones.filter(m=>m.project_id===project.id):[];

  return <div className="portal-shell"><aside><span>CLIENT SPACE</span><h2>JASONPRO</h2>{["projects","files","invoices","support","account"].map(item=><button key={item} className={tab===item?"active":""} onClick={()=>setTab(item)}>{item.toUpperCase()}</button>)}<form action={signOutAction}><button className="portal-signout">SIGN OUT</button></form></aside><section><div className="portal-top"><div><small>{profile.company_name||profile.full_name||profile.email}</small><h1>{tab.charAt(0).toUpperCase()+tab.slice(1)}</h1></div><span>{profile.role.toUpperCase()} ACCESS</span></div>

  {tab==="projects"&&(project?<div className="portal-project"><small>{project.status.toUpperCase()}</small><h2>{project.name}</h2><p>{project.summary||"Project details and progress will appear here as the engagement develops."}</p><div className="portal-timeline">{projectMilestones.length?projectMilestones.map(m=><span key={m.id} className={`portal-milestone ${m.status}`}><i/><b>{m.title}</b><small>{m.status}</small></span>):<p>No milestones have been published yet.</p>}</div></div>:<div className="portal-placeholder"><b>NO ACTIVE PROJECTS</b><p>Once a JasonPro project is assigned to your account, its milestones, approvals and deliverables will appear here.</p></div>)}

  {tab==="files"&&(data.files.length?<div className="portal-list">{data.files.map(f=><article key={f.id}><div><b>{f.file_name}</b><span>{f.mime_type||"File"}</span><small>{new Date(f.created_at).toLocaleDateString()}</small></div><a href={`/portal/files/${f.id}`}>DOWNLOAD</a></article>)}</div>:<div className="portal-placeholder"><b>FILES + DELIVERABLES</b><p>No client-visible project files have been published yet.</p></div>)}

  {tab==="invoices"&&(data.invoices.length?<div className="portal-list">{data.invoices.map(i=><article key={i.id}><b>{i.invoice_number}</b><span>{i.status}</span><small>{i.currency} {Number(i.total_amount).toFixed(2)}</small></article>)}</div>:<div className="portal-placeholder"><b>INVOICES + PAYMENTS</b><p>No invoices are currently associated with this account.</p></div>)}

  {tab==="support"&&<div className="admin-grid"><article className="admin-panel"><span>NEW REQUEST</span><h2>Contact JasonPro support.</h2><form action={ticketAction} className="project-brief-form"><input type="hidden" name="project_id" value={project?.id||""}/><label>Subject<input name="subject" required minLength={3} placeholder="What do you need help with?"/></label><label>Message<textarea name="body" required minLength={10} rows={5} placeholder="Describe the request, issue or question."/></label><button disabled={ticketPending}>{ticketPending?"SENDING…":"SUBMIT SUPPORT REQUEST"}</button>{ticketState.error&&<p>{ticketState.error}</p>}{ticketState.success&&<p>{ticketState.success}</p>}</form></article><article className="admin-panel"><span>YOUR TICKETS</span><h2>Support history.</h2>{data.tickets.length?<div className="portal-list">{data.tickets.map(t=><article key={t.id}><b>{t.subject}</b><span>{t.status}</span><small>{t.priority}</small></article>)}</div>:<p>No support tickets yet.</p>}</article></div>}

  {tab==="account"&&<div className="admin-grid"><article className="admin-panel"><span>PROFILE</span><h2>Your account details.</h2><form action={profileAction} className="project-brief-form"><label>Full name<input name="full_name" required minLength={2} defaultValue={profile.full_name||""}/></label><label>Email<input value={profile.email||""} readOnly disabled/></label><label>Phone<input name="phone" defaultValue={profile.phone||""}/></label><label>Company<input name="company_name" defaultValue={profile.company_name||""}/></label><label>Country<input name="country" defaultValue={profile.country||"Botswana"}/></label><button disabled={profilePending}>{profilePending?"SAVING…":"SAVE PROFILE"}</button>{profileState.error&&<p>{profileState.error}</p>}{profileState.success&&<p>{profileState.success}</p>}</form></article><article className="admin-panel"><span>SECURITY</span><h2>Password & access.</h2><p>Your account role is <strong>{profile.role}</strong>. Email changes are intentionally not available from this screen.</p><p><Link href="/auth/update-password">Change password →</Link></p><p><Link href="/auth/forgot-password">Send password recovery email →</Link></p></article></div>}
  </section></div>;
}
