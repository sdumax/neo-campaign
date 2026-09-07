import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getCollaborationBrands,
  createCollaborationBrand,
  createCollaborationBrandsBulk,
} from "@/lib/db";

export async function GET(req: NextRequest) {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const brands = await getCollaborationBrands();
    return NextResponse.json({ brands });
  } catch (error) {
    console.error("Error fetching collaboration brands:", error);
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Bulk creation support
    if (Array.isArray(body.brands) && body.brands.length > 0) {
      const createdBrands = await createCollaborationBrandsBulk(body.brands);
      return NextResponse.json({ success: true, brands: createdBrands });
    }

    // Single creation support
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { error: "Brand name is required" },
        { status: 400 }
      );
    }

    const brand = await createCollaborationBrand({
      name: body.name.trim(),
      logo: body.logo,
    });

    return NextResponse.json({ success: true, brand });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create brand";
    console.error("Error creating brand:", error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
