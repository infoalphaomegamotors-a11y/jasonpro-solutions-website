import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/auth/sign-in?next=/portal", process.env.NEXT_PUBLIC_SITE_URL || "https://jasonprosolutions.netlify.app"));

  const { data: file, error } = await supabase.from("project_files").select("storage_path,file_name").eq("id", id).maybeSingle();
  if (error || !file) return new NextResponse("File not found", { status: 404 });

  const { data, error: signedError } = await supabase.storage.from("project-files").createSignedUrl(file.storage_path, 60, { download: file.file_name });
  if (signedError || !data?.signedUrl) return new NextResponse("Download unavailable", { status: 404 });
  return NextResponse.redirect(data.signedUrl);
}
