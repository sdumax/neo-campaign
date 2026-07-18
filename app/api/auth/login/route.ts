import { NextResponse } from "next/server";
import {
  verifyCredentials,
  createSession,
  setSessionCookie,
} from "@/lib/auth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { username, password } = body as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 }
    );
  }

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.length > 50 ||
    password.length > 100
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const valid = await verifyCredentials(username, password);
  if (!valid) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const token = await createSession();
  await setSessionCookie(token);

  return NextResponse.json({ success: true });
}
