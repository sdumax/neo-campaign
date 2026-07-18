import { NextResponse } from "next/server";
import { insertCreator } from "@/lib/db";
import { creatorSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const result = creatorSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, socialMedia, message } = result.data;

  try {
    await insertCreator({
      name,
      email,
      socialMedia,
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
