import { createHmac } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 24 * 60 * 60;

function getSecret(): string {
  return process.env.ADMIN_SECRET || "united-sports-default-secret-change-me";
}

export function createAdminSessionToken(): string {
  const payload = JSON.stringify({
    username: "united",
    exp: Date.now() + COOKIE_MAX_AGE * 1000,
    iat: Date.now(),
  });
  const b64payload = Buffer.from(payload).toString("base64url");
  const sig = createHmac("sha256", getSecret())
    .update(b64payload)
    .digest("base64url");
  return `${b64payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [b64payload, sig] = parts;
  const expectedSig = createHmac("sha256", getSecret())
    .update(b64payload)
    .digest("base64url");
  if (sig !== expectedSig) return null;
  try {
    const payload = JSON.parse(Buffer.from(b64payload, "base64url").toString());
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload.username || null;
  } catch {
    return null;
  }
}

export function validateCredentials(username: string, password: string): boolean {
  return (
    username === (process.env.ADMIN_USERNAME || "united") &&
    password === (process.env.ADMIN_PASSWORD || "")
  );
}

export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminSessionToken(token);
}

export const COOKIE_NAME_EXPORT = COOKIE_NAME;
export const COOKIE_MAX_AGE_EXPORT = COOKIE_MAX_AGE;
