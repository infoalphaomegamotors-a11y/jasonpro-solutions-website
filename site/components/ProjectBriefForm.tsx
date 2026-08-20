"use client";

import { useActionState } from "react";
import { submitProjectBrief, type BriefState } from "@/app/contact/actions";

const initialState: BriefState = { status: "idle" };

type Mode = "project" | "quote" | "consultation";

const services = [
  "Website / Web Application",
  "Business System / SaaS",
  "Graphic Design / Brand Identity",
  "AI / Automation",
  "Business Intelligence / Data",
  "E-commerce / Digital Product",
  "Photography / Visual Content",
  "Business Administration / Company Secretarial Support",
  "Vehicle Sourcing / Sales",
  "Custom Clothing / Printing",
  "Not sure yet",
];

const modeCopy: Record<Mode, { button: string; brief: string; briefPlaceholder: string }> = {
  project: {
    button: "SEND PROJECT BRIEF →",
    brief: "PROJECT BRIEF",
    briefPlaceholder: "What are you trying to achieve? What is not working today? What should the finished solution do?",
  },
  quote: {
    button: "REQUEST QUOTATION →",
    brief: "SCOPE / DELIVERABLES",
    briefPlaceholder: "List the pages, workflows, quantities, deliverables or functionality you already know you need.",
  },
  consultation: {
    button: "REQUEST CONSULTATION →",
    brief: "CURRENT PROBLEM",
    briefPlaceholder: "What happens today? Where is the friction? Who is affected and what would a better outcome look like?",
  },
};

export default function ProjectBriefForm({ mode = "project" }: { mode?: Mode }) {
  const [state, action, pending] = useActionState(submitProjectBrief, initialState);
  const copy = modeCopy[mode];

  return <form className="project-form" action={action}>
    <input type="hidden" name="intent" value={mode}/>
    <div className="form-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label>YOUR NAME<input required name="name" autoComplete="name" placeholder="Your name"/></label>
    <label>EMAIL<input required type="email" name="email" autoComplete="email" placeholder="you@company.com"/></label>
    <label>PHONE / WHATSAPP <small>OPTIONAL</small><input name="phone" autoComplete="tel" placeholder="+267 …"/></label>
    <label>COMPANY / ORGANISATION <small>OPTIONAL</small><input name="company" autoComplete="organization" placeholder="Company / organisation"/></label>
    <label>WHAT DO YOU NEED?<select name="service" defaultValue="" required><option value="" disabled>Select a capability</option>{services.map(service=><option key={service}>{service}</option>)}</select></label>
    <label>PROJECT STAGE<select name="project_stage" defaultValue=""><option value="" disabled>Select an option</option><option>New idea / starting from scratch</option><option>Replacing an existing solution</option><option>Improving something already live</option><option>Production / print-ready work</option><option>Not sure yet</option></select></label>
    <label>{copy.brief}<textarea required minLength={20} name="brief" rows={7} placeholder={copy.briefPlaceholder}/></label>
    {mode !== "consultation" && <label>EXISTING WEBSITE / SYSTEM <small>OPTIONAL</small><input name="existing_url" placeholder="https://… or describe what exists"/></label>}
    {mode === "quote" && <label>ASSETS / CONTENT STATUS<select name="assets_status" defaultValue=""><option value="" disabled>Select an option</option><option>Ready to provide</option><option>Partly ready</option><option>Need JasonPro to help create them</option><option>Not applicable / not sure</option></select></label>}
    {mode === "consultation" && <label>PREFERRED CONSULTATION METHOD<select name="consultation_method" defaultValue=""><option value="" disabled>Select an option</option><option>Phone call</option><option>WhatsApp call</option><option>Google Meet / video call</option><option>In-person discussion</option><option>No preference</option></select></label>}
    {mode === "consultation" && <label>PREFERRED DATE / TIME <small>OPTIONAL</small><input name="preferred_time" placeholder="e.g. weekday morning / 26 Aug after 14:00"/></label>}
    <label>BUDGET APPROACH<select name="budget" defaultValue=""><option value="" disabled>Select an option</option><option>I need a quotation</option><option>I have a defined budget</option><option>I want to discuss options first</option></select></label>
    <label>DEADLINE / TIMELINE <small>OPTIONAL</small><input name="timeline" placeholder="e.g. 4–8 weeks / 30 Sep / flexible"/></label>
    <label>HOW DID YOU FIND JASONPRO? <small>OPTIONAL</small><select name="referral_source" defaultValue=""><option value="" disabled>Select an option</option><option>Referral</option><option>Google / search</option><option>Facebook</option><option>WhatsApp</option><option>Existing client / previous work</option><option>Other</option></select></label>
    <label className="form-consent"><input required type="checkbox" name="privacy_consent" value="yes"/> I agree that JasonPro may use these details to respond to this enquiry. See the <a href="/privacy">Privacy Notice</a>.</label>
    <button type="submit" disabled={pending || state.status === "success"}>{pending ? "SENDING…" : state.status === "success" ? "RECEIVED ✓" : copy.button}</button>
    {state.message && <p className={`form-note ${state.status}`} role="status">{state.message}</p>}
  </form>;
}
