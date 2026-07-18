import { cookies } from "next/headers";

const SESSION_COOKIE = "session_token";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

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
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
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

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSession();
  return token !== null;
}
