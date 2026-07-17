import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/google-sheets";
import { brandSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const result = brandSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, company, website, budget, message } = result.data;

  try {
    await appendToSheet("Brands", [
      new Date().toISOString(),
      name,
      email,
      company ?? "",
      website,
      budget,
      message ?? "",
    ]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 },
    );
  }
}
