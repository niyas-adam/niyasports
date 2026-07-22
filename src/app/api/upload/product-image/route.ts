import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/upload-product-image`;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 5MB" },
        { status: 400 }
      );
    }

    const edgeFormData = new FormData();
    edgeFormData.append("image", file);

    const edgeRes = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      body: edgeFormData,
    });

    const data = await edgeRes.json();

    if (!edgeRes.ok) {
      return NextResponse.json(
        { error: data.error || "Upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, url: data.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
