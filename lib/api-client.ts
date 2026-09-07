/**
 * Centralized authenticated fetch client.
 * Intercepts 401 Unauthorized responses across the application and redirects to /mylogin in one place.
 */
export async function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const res = await fetch(input, init);
  if (res.status === 401 && typeof window !== "undefined") {
    window.location.replace("/mylogin");
  }
  return res;
}
