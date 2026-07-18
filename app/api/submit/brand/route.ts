import { NextResponse } from "next/server";
import { insertBrand } from "@/lib/db";
import { brandSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const result = brandSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, company, website, budget, message } = result.data;

  try {
    await insertBrand({
      name,
      email,
      company: company ?? undefined,
      website,
      budget,
      message: message ?? undefined,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
