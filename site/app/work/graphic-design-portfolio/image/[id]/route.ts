import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function parseDataImage(value: string) {
  const match = value.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=\r\n]+)$/i);
  if (!match) return null;
  const contentType = match[1].toLowerCase();
  if (!allowedImageTypes.has(contentType)) return null;
  try {
    const body = Buffer.from(match[2].replace(/\s+/g, ""), "base64");
    if (!body.length || body.length > 12 * 1024 * 1024) return null;
    return { contentType, body };
  } catch {
    return null;
  }
}

function safeExternalUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    if (!url.hostname.endsWith("supabase.co")) return null;
    return url;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new NextResponse("Not found", { status: 404 });

  const supabase = await createServerSupabaseClient();
  const { data: item, error } = await supabase
    .from("portfolio_items")
    .select("image_url,status")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error || !item?.image_url) return new NextResponse("Not found", { status: 404 });

  const rawUrl = String(item.image_url);
  const embedded = parseDataImage(rawUrl);
  if (embedded) {
    return new NextResponse(embedded.body, {
      status: 200,
      headers: {
        "Content-Type": embedded.contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  const external = safeExternalUrl(rawUrl);
  if (external) return NextResponse.redirect(external, 307);

  if (rawUrl.startsWith("/") && !rawUrl.startsWith("//")) {
    return NextResponse.redirect(new URL(rawUrl, request.url), 307);
  }

  return new NextResponse("Image unavailable", { status: 404 });
}
