import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "session_token";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const validUser = process.env.DASHBOARD_USER;
  const validPassword = process.env.DASHBOARD_PASSWORD;

  if (!validUser || !validPassword) return false;
  return username === validUser && password === validPassword;
}

export async function createSession(): Promise<string> {
  return crypto.randomUUID();
}

export async function getSession(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE)?.value ?? null;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(req?: NextRequest | Request): Promise<boolean> {
  if (req) {
    if ("cookies" in req && typeof (req as NextRequest).cookies?.get === "function") {
      const token = (req as NextRequest).cookies.get(SESSION_COOKIE)?.value;
      if (token) return true;
    }
    const cookieHeader = req.headers?.get("cookie");
    if (cookieHeader && cookieHeader.includes(`${SESSION_COOKIE}=`)) {
      return true;
    }
  }

  const token = await getSession();
  return token !== null;
}
