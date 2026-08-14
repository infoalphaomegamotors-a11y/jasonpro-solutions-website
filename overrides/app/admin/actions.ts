"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const briefStatuses = new Set(["new","reviewing","qualified","quoted","won","lost","archived"]);
const productStatuses = new Set(["draft","active","archived"]);
const ticketStatuses = new Set(["open","in_progress","waiting_customer","resolved","closed"]);
const projectStatuses = new Set(["lead","discovery","strategy","design","development","review","launch","complete","on_hold"]);
const milestoneStatuses = new Set(["upcoming","active","review","approved","complete","blocked"]);
const invoiceStatuses = new Set(["draft","issued","part_paid","paid","overdue","cancelled","refunded"]);
const appRoles = new Set(["customer","member","client","content_manager","admin"]);

async function adminClient(roles: Array<"admin"|"content_manager"> = ["admin","content_manager"]) {
  const profile = await requireRole(roles, "/admin");
  if (!profile) throw new Error("Admin access required");
  return { profile, supabase: await createServerSupabaseClient() };
}
async function audit(supabase:any, actorId:string, action:string, resourceType:string, resourceId:string, metadata:Record<string,unknown>) {
  await supabase.from("audit_logs").insert({ actor_id: actorId, action, resource_type: resourceType, resource_id: resourceId, metadata });
}
export async function updateBriefStatus(formData: FormData) { const id=String(formData.get("id")||""); const status=String(formData.get("status")||""); if(!id||!briefStatuses.has(status))return; const {profile,supabase}=await adminClient(); const {error}=await supabase.from("project_briefs").update({status}).eq("id",id); if(error)throw new Error("Could not update project brief"); await audit(supabase,profile.id,"brief.status.updated","project_brief",id,{status}); revalidatePath("/admin"); }
export async function updateProductStatus(formData: FormData) { const id=String(formData.get("id")||""); const status=String(formData.get("status")||""); if(!id||!productStatuses.has(status))return; const {profile,supabase}=await adminClient(); const {error}=await supabase.from("products").update({status}).eq("id",id); if(error)throw new Error("Could not update product"); await audit(supabase,profile.id,"product.status.updated","product",id,{status}); revalidatePath("/admin"); }
export async function updateTicketStatus(formData: FormData) { const id=String(formData.get("id")||""); const status=String(formData.get("status")||""); if(!id||!ticketStatuses.has(status))return; const {profile,supabase}=await adminClient(); const {error}=await supabase.from("support_tickets").update({status}).eq("id",id); if(error)throw new Error("Could not update support ticket"); await audit(supabase,profile.id,"ticket.status.updated","support_ticket",id,{status}); revalidatePath("/admin"); }
export async function updateProjectStatus(formData: FormData) { const id=String(formData.get("id")||""); const status=String(formData.get("status")||""); if(!id||!projectStatuses.has(status))return; const {profile,supabase}=await adminClient(); const {error}=await supabase.from("client_projects").update({status}).eq("id",id); if(error)throw new Error("Could not update project"); await audit(supabase,profile.id,"project.status.updated","client_project",id,{status}); revalidatePath("/admin"); revalidatePath("/portal"); }
export async function createClientProject(formData: FormData) { const clientId=String(formData.get("client_id")||""); const name=String(formData.get("name")||"").trim().slice(0,160); const summary=String(formData.get("summary")||"").trim().slice(0,1200); if(!clientId||name.length<3)return; const {profile,supabase}=await adminClient(); const {data,error}=await supabase.from("client_projects").insert({client_id:clientId,name,summary:summary||null,status:"discovery"}).select("id").single(); if(error||!data)throw new Error("Could not create client project"); await audit(supabase,profile.id,"project.created","client_project",data.id,{client_id:clientId,name}); revalidatePath("/admin"); revalidatePath("/portal"); }
export async function updateUserRole(formData: FormData) { const id=String(formData.get("id")||""); const role=String(formData.get("role")||""); if(!id||!appRoles.has(role))return; const {profile,supabase}=await adminClient(["admin"]); if(id===profile.id)throw new Error("You cannot change your own admin role here."); const {error}=await supabase.from("profiles").update({role}).eq("id",id); if(error)throw new Error("Could not update user role"); await audit(supabase,profile.id,"profile.role.updated","profile",id,{role}); revalidatePath("/admin"); }

export async function createMilestone(formData: FormData) {
  const projectId=String(formData.get("project_id")||""); const title=String(formData.get("title")||"").trim().slice(0,160); const dueAt=String(formData.get("due_at")||"");
  if(!projectId||title.length<2)return; const {profile,supabase}=await adminClient();
  const {data,error}=await supabase.from("project_milestones").insert({project_id:projectId,title,status:"upcoming",due_at:dueAt||null}).select("id").single();
  if(error||!data)throw new Error("Could not create milestone"); await audit(supabase,profile.id,"milestone.created","project_milestone",data.id,{project_id:projectId,title}); revalidatePath("/admin"); revalidatePath("/portal");
}
export async function updateMilestoneStatus(formData: FormData) {
  const id=String(formData.get("id")||""); const status=String(formData.get("status")||""); if(!id||!milestoneStatuses.has(status))return; const {profile,supabase}=await adminClient();
  const patch:any={status}; if(status==="complete")patch.completed_at=new Date().toISOString();
  const {error}=await supabase.from("project_milestones").update(patch).eq("id",id); if(error)throw new Error("Could not update milestone"); await audit(supabase,profile.id,"milestone.status.updated","project_milestone",id,{status}); revalidatePath("/admin"); revalidatePath("/portal");
}
export async function createInvoice(formData: FormData) {
  const clientId=String(formData.get("client_id")||""); const projectId=String(formData.get("project_id")||""); const invoiceNumber=String(formData.get("invoice_number")||"").trim().slice(0,80); const total=Number(formData.get("total_amount")||0); const dueAt=String(formData.get("due_at")||"");
  if(!clientId||!invoiceNumber||!Number.isFinite(total)||total<0)return; const {profile,supabase}=await adminClient();
  const {data,error}=await supabase.from("invoices").insert({client_id:clientId,project_id:projectId||null,invoice_number:invoiceNumber,status:"draft",subtotal:total,tax_amount:0,total_amount:total,due_at:dueAt||null}).select("id").single();
  if(error||!data)throw new Error("Could not create invoice"); await audit(supabase,profile.id,"invoice.created","invoice",data.id,{invoice_number:invoiceNumber,total_amount:total}); revalidatePath("/admin"); revalidatePath("/portal");
}
export async function updateInvoiceStatus(formData: FormData) {
  const id=String(formData.get("id")||""); const status=String(formData.get("status")||""); if(!id||!invoiceStatuses.has(status))return; const {profile,supabase}=await adminClient(); const patch:any={status}; if(status==="issued")patch.issued_at=new Date().toISOString(); if(status==="paid")patch.paid_at=new Date().toISOString();
  const {error}=await supabase.from("invoices").update(patch).eq("id",id); if(error)throw new Error("Could not update invoice"); await audit(supabase,profile.id,"invoice.status.updated","invoice",id,{status}); revalidatePath("/admin"); revalidatePath("/portal");
}
export async function publishProjectFile(formData: FormData) {
  const projectId=String(formData.get("project_id")||""); const visibility=String(formData.get("visibility")||"client"); const file=formData.get("file");
  if(!projectId||!(file instanceof File)||file.size===0||file.size>20*1024*1024)return; const {profile,supabase}=await adminClient();
  const safeName=file.name.replace(/[^a-zA-Z0-9._-]/g,"_"); const storagePath=`${projectId}/${Date.now()}-${safeName}`;
  const {error:uploadError}=await supabase.storage.from("project-files").upload(storagePath,file,{contentType:file.type||"application/octet-stream",upsert:false}); if(uploadError)throw new Error("Could not upload project file");
  const {data,error}=await supabase.from("project_files").insert({project_id:projectId,uploaded_by:profile.id,storage_path:storagePath,file_name:file.name,mime_type:file.type||null,byte_size:file.size,visibility:visibility==="internal"?"internal":"client"}).select("id").single();
  if(error||!data){await supabase.storage.from("project-files").remove([storagePath]); throw new Error("Could not publish project file");}
  await audit(supabase,profile.id,"project_file.published","project_file",data.id,{project_id:projectId,file_name:file.name,visibility}); revalidatePath("/admin"); revalidatePath("/portal");
}
