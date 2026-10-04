import { cookies } from "next/headers";
import crypto from "node:crypto";

const PASSWORD = process.env.ADMIN_PASSWORD ?? "yamaha123";
export const ADMIN_COOKIE = "yr_admin";
export const adminToken = () => crypto.createHash("sha256").update(`yr:${PASSWORD}`).digest("hex");
export const checkPassword = (p: string) => p === PASSWORD;

export async function isAdmin() {
  const c = await cookies();
  return c.get(ADMIN_COOKIE)?.value === adminToken();
}
