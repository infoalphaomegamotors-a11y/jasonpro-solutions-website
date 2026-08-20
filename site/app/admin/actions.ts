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
const portfolioStatuses = new Set(["draft","published","archived"]);
const appRoles = new Set(["customer","member","client","content_manager","admin"]);

const allowedFileTypes: Record<string, Set<string>> = {
  "application/pdf": new Set(["pdf"]),
  "image/png": new Set(["png"]),
  "image/jpeg": new Set(["jpg","jpeg"]),
  "image/webp": new Set(["webp"]),
  "application/zip": new Set(["zip"]),
  "application/x-zip-compressed": new Set(["zip"]),
  "text/plain": new Set(["txt"]),
  "application/msword": new Set(["doc"]),
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": new Set(["docx"]),
  "application/vnd.ms-excel": new Set(["xls"]),
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": new Set(["xlsx"]),
};
const portfolioImageTypes: Record<string, Set<string>> = {
  "image/png": new Set(["png"]),
  "image/jpeg": new Set(["jpg","jpeg"]),
  "image/webp": new Set(["webp"]),
};

async function adminClient(roles: Array<"admin"|"content_manager"> = ["admin","content_manager"]) {
  const profile = await requireRole(roles, "/admin");
  if (!profile) throw new Error("Admin access required");
  return { profile, supabase: await createServerSupabaseClient() };
}
async function audit(supabase:any, actorId:string, action:string, resourceType:string, resourceId:string, metadata:Record<string,unknown>) {
  await supabase.from("audit_logs").insert({ actor_id: actorId, action, resource_type: resourceType, resource_id: resourceId, metadata });
}
function cleanText(formData:FormData,key:string,max:number){return String(formData.get(key)||"").trim().slice(0,max);}

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
  const submittedClientId=String(formData.get("client_id")||"");
  const projectId=String(formData.get("project_id")||"");
  const invoiceNumber=String(formData.get("invoice_number")||"").trim().slice(0,80);
  const total=Number(formData.get("total_amount")||0);
  const dueAt=String(formData.get("due_at")||"");
  if(!invoiceNumber||!Number.isFinite(total)||total<0)return;
  const {profile,supabase}=await adminClient();

  let clientId=submittedClientId;
  if(projectId){
    const {data:project,error:projectError}=await supabase.from("client_projects").select("id,client_id").eq("id",projectId).single();
    if(projectError||!project?.client_id)throw new Error("Could not verify invoice project");
    clientId=String(project.client_id);
  } else {
    if(!clientId)throw new Error("Invoice client is required");
    const {data:client,error:clientError}=await supabase.from("profiles").select("id").eq("id",clientId).single();
    if(clientError||!client)throw new Error("Could not verify invoice client");
  }

  const {data,error}=await supabase.from("invoices").insert({client_id:clientId,project_id:projectId||null,invoice_number:invoiceNumber,status:"draft",subtotal:total,tax_amount:0,total_amount:total,due_at:dueAt||null}).select("id").single();
  if(error||!data)throw new Error("Could not create invoice");
  await audit(supabase,profile.id,"invoice.created","invoice",data.id,{invoice_number:invoiceNumber,total_amount:total,project_id:projectId||null,client_id:clientId});
  revalidatePath("/admin"); revalidatePath("/portal");
}
export async function updateInvoiceStatus(formData: FormData) {
  const id=String(formData.get("id")||""); const status=String(formData.get("status")||""); if(!id||!invoiceStatuses.has(status))return; const {profile,supabase}=await adminClient(); const patch:any={status}; if(status==="issued")patch.issued_at=new Date().toISOString(); if(status==="paid")patch.paid_at=new Date().toISOString();
  const {error}=await supabase.from("invoices").update(patch).eq("id",id); if(error)throw new Error("Could not update invoice"); await audit(supabase,profile.id,"invoice.status.updated","invoice",id,{status}); revalidatePath("/admin"); revalidatePath("/portal");
}
export async function publishProjectFile(formData: FormData) {
  const projectId=String(formData.get("project_id")||"");
  const visibility=String(formData.get("visibility")||"client");
  const file=formData.get("file");
  if(!projectId||!(file instanceof File)||file.size===0||file.size>20*1024*1024)throw new Error("Select a valid file up to 20 MB");

  const rawType=(file.type||"").toLowerCase().trim();
  const extension=file.name.includes(".")?file.name.split(".").pop()!.toLowerCase():"";
  const allowedExtensions=allowedFileTypes[rawType];
  if(!allowedExtensions||!allowedExtensions.has(extension))throw new Error("This file type is not allowed or its extension does not match its declared type");
  if(/[\u0000-\u001f\u007f]/.test(file.name))throw new Error("Invalid file name");

  const {profile,supabase}=await adminClient();
  const {data:project,error:projectError}=await supabase.from("client_projects").select("id").eq("id",projectId).single();
  if(projectError||!project)throw new Error("Could not verify project before upload");

  const safeStem=file.name.replace(/\.[^.]+$/,"").replace(/[^a-zA-Z0-9_-]/g,"_").replace(/_+/g,"_").slice(0,120)||"file";
  const safeName=`${safeStem}.${extension}`;
  const storagePath=`${projectId}/${Date.now()}-${safeName}`;
  const {error:uploadError}=await supabase.storage.from("project-files").upload(storagePath,file,{contentType:rawType,upsert:false});
  if(uploadError)throw new Error("Could not upload project file");
  const {data,error}=await supabase.from("project_files").insert({project_id:projectId,uploaded_by:profile.id,storage_path:storagePath,file_name:file.name,mime_type:rawType,byte_size:file.size,visibility:visibility==="internal"?"internal":"client"}).select("id").single();
  if(error||!data){await supabase.storage.from("project-files").remove([storagePath]); throw new Error("Could not publish project file");}
  await audit(supabase,profile.id,"project_file.published","project_file",data.id,{project_id:projectId,file_name:file.name,mime_type:rawType,byte_size:file.size,visibility:visibility==="internal"?"internal":"client"});
  revalidatePath("/admin"); revalidatePath("/portal");
}

export async function createPortfolioItem(formData: FormData) {
  const title=cleanText(formData,"title",160);
  const category=cleanText(formData,"category",120);
  const caption=cleanText(formData,"caption",1200);
  const altText=cleanText(formData,"alt_text",300);
  const status=cleanText(formData,"status",30)||"published";
  const position=Math.max(0,Math.min(100000,Number(formData.get("position")||0)));
  const file=formData.get("image");
  if(title.length<2||category.length<2||altText.length<4)throw new Error("Title, category and useful alt text are required");
  if(!portfolioStatuses.has(status))throw new Error("Invalid portfolio status");
  if(!Number.isFinite(position))throw new Error("Invalid portfolio position");
  if(!(file instanceof File)||file.size===0||file.size>10*1024*1024)throw new Error("Choose a JPEG, PNG or WebP image up to 10 MB");

  const rawType=(file.type||"").toLowerCase().trim();
  const extension=file.name.includes(".")?file.name.split(".").pop()!.toLowerCase():"";
  const allowedExtensions=portfolioImageTypes[rawType];
  if(!allowedExtensions||!allowedExtensions.has(extension))throw new Error("Portfolio image type does not match its file extension");

  const {profile,supabase}=await adminClient();
  const safeStem=file.name.replace(/\.[^.]+$/,"").replace(/[^a-zA-Z0-9_-]/g,"_").replace(/_+/g,"_").slice(0,100)||"portfolio";
  const storagePath=`portfolio/${Date.now()}-${safeStem}.${extension}`;
  const {error:uploadError}=await supabase.storage.from("portfolio-assets").upload(storagePath,file,{contentType:rawType,upsert:false});
  if(uploadError)throw new Error("Could not upload portfolio image");
  const {data:publicUrlData}=supabase.storage.from("portfolio-assets").getPublicUrl(storagePath);
  const imageUrl=publicUrlData.publicUrl;
  const {data,error}=await supabase.from("portfolio_items").insert({title,category,caption:caption||null,alt_text:altText,image_url:imageUrl,storage_path:storagePath,status,position,created_by:profile.id}).select("id").single();
  if(error||!data){await supabase.storage.from("portfolio-assets").remove([storagePath]); throw new Error("Could not create portfolio item");}
  await audit(supabase,profile.id,"portfolio.created","portfolio_item",data.id,{title,category,status,position});
  revalidatePath("/admin"); revalidatePath("/work/graphic-design-portfolio");
}

export async function updatePortfolioItem(formData: FormData) {
  const id=cleanText(formData,"id",80);
  const title=cleanText(formData,"title",160);
  const category=cleanText(formData,"category",120);
  const caption=cleanText(formData,"caption",1200);
  const altText=cleanText(formData,"alt_text",300);
  const status=cleanText(formData,"status",30);
  const position=Math.max(0,Math.min(100000,Number(formData.get("position")||0)));
  if(!id||title.length<2||category.length<2||altText.length<4||!portfolioStatuses.has(status)||!Number.isFinite(position))throw new Error("Complete the portfolio item fields correctly");
  const {profile,supabase}=await adminClient();
  const {error}=await supabase.from("portfolio_items").update({title,category,caption:caption||null,alt_text:altText,status,position,updated_at:new Date().toISOString()}).eq("id",id);
  if(error)throw new Error("Could not update portfolio item");
  await audit(supabase,profile.id,"portfolio.updated","portfolio_item",id,{title,category,status,position});
  revalidatePath("/admin"); revalidatePath("/work/graphic-design-portfolio");
}

export async function deletePortfolioItem(formData: FormData) {
  const id=cleanText(formData,"id",80);
  if(!id)return;
  const {profile,supabase}=await adminClient();
  const {data:item,error:readError}=await supabase.from("portfolio_items").select("id,title,storage_path").eq("id",id).single();
  if(readError||!item)throw new Error("Portfolio item not found");
  const {error}=await supabase.from("portfolio_items").delete().eq("id",id);
  if(error)throw new Error("Could not delete portfolio item");
  if(item.storage_path)await supabase.storage.from("portfolio-assets").remove([item.storage_path]);
  await audit(supabase,profile.id,"portfolio.deleted","portfolio_item",id,{title:item.title});
  revalidatePath("/admin"); revalidatePath("/work/graphic-design-portfolio");
}
