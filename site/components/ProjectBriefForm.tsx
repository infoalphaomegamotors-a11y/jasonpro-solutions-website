"use client";

import { useActionState } from "react";
import { submitProjectBrief, type BriefState } from "@/app/contact/actions";

const initialState: BriefState = { status: "idle" };

export default function ProjectBriefForm() {
  const [state, action, pending] = useActionState(submitProjectBrief, initialState);
  return <form className="project-form" action={action}>
    <div className="form-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label>YOUR NAME<input required name="name" placeholder="Name / company"/></label>
    <label>EMAIL<input required type="email" name="email" placeholder="you@company.com"/></label>
    <label>PHONE <small>OPTIONAL</small><input name="phone" placeholder="+267 …"/></label>
    <label>COMPANY <small>OPTIONAL</small><input name="company" placeholder="Company / organisation"/></label>
    <label>WHAT DO YOU NEED?<select name="service" defaultValue="" required><option value="" disabled>Select a capability</option><option>Website / Web Application</option><option>Business System / SaaS</option><option>Brand Identity / Graphic Design</option><option>AI / Automation</option><option>Business Intelligence</option><option>E-commerce / Digital Product</option><option>Not sure yet</option></select></label>
    <label>PROJECT BRIEF<textarea required minLength={20} name="brief" rows={7} placeholder="What are you trying to achieve? What is not working today? What should the finished solution do?"/></label>
    <label>BUDGET APPROACH<select name="budget" defaultValue=""><option value="" disabled>Select an option</option><option>I need a quotation</option><option>I have a defined budget</option><option>I want to discuss options first</option></select></label>
    <label>TIMELINE <small>OPTIONAL</small><input name="timeline" placeholder="e.g. 4–8 weeks / flexible"/></label>
    <button type="submit" disabled={pending || state.status === "success"}>{pending ? "SENDING…" : state.status === "success" ? "BRIEF RECEIVED ✓" : "SEND PROJECT BRIEF →"}</button>
    {state.message && <p className={`form-note ${state.status}`} role="status">{state.message}</p>}
  </form>;
}
