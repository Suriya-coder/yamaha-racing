import { createClient, type Client, type InArgs } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";

export const BOOKING_STATUSES = ["Booked", "Confirmed", "Dispatched", "Out for Delivery", "Delivered"] as const;
export const SERVICE_STATUSES = ["Requested", "In Progress", "Completed"] as const;

export type StatusEvent = { status: string; at: string; note?: string };

export type Booking = {
  id: string;
  bike_id: string;
  color: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  showroom: string;
  status: string;
  expected_delivery: string | null;
  history: StatusEvent[];
  created_at: string;
};

export type Service = {
  id: string;
  name: string;
  phone: string;
  bike_model: string;
  reg_number: string;
  service_type: string;
  date: string;
  slot: string;
  pickup: number;
  notes: string;
  status: string;
  work_done: string | null;
  cost: number | null;
  rating: number | null;
  liked: number | null;
  feedback: string | null;
  history: StatusEvent[];
  created_at: string;
};

// Online (Vercel): set TURSO_DATABASE_URL + TURSO_AUTH_TOKEN. Offline: a local file in ./data.
function makeClient(): Client {
  const url = process.env.TURSO_DATABASE_URL;
  if (url) return createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  const file = process.env.DB_PATH ?? path.join(process.cwd(), "data", "yamaha.db");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  return createClient({ url: `file:${file}` });
}

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    bike_id TEXT NOT NULL,
    color TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    showroom TEXT NOT NULL,
    status TEXT NOT NULL,
    expected_delivery TEXT,
    history TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    bike_model TEXT NOT NULL,
    reg_number TEXT NOT NULL,
    service_type TEXT NOT NULL,
    date TEXT NOT NULL,
    slot TEXT NOT NULL,
    pickup INTEGER NOT NULL DEFAULT 0,
    notes TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL,
    work_done TEXT,
    cost INTEGER,
    rating INTEGER,
    liked INTEGER,
    feedback TEXT,
    history TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`,
];

const g = globalThis as unknown as { dbReady?: Promise<Client> };

function getDb(): Promise<Client> {
  if (!g.dbReady) {
    g.dbReady = (async () => {
      const c = makeClient();
      await c.batch(SCHEMA, "write");
      return c;
    })().catch((e) => {
      g.dbReady = undefined;
      throw e;
    });
  }
  return g.dbReady;
}

type Row = Record<string, unknown> & { history: string };

async function all<T>(sql: string, args: InArgs = []): Promise<T[]> {
  const res = await (await getDb()).execute({ sql, args });
  return (res.rows as unknown as Row[]).map((r) => ({ ...r, history: JSON.parse(r.history) }) as T);
}
const one = async <T>(sql: string, args: InArgs = []) => (await all<T>(sql, args))[0];
const run = async (sql: string, args: InArgs = []) => {
  await (await getDb()).execute({ sql, args });
};

export function newId(prefix: string) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${s}`;
}

const now = () => new Date().toISOString();

export async function createBooking(b: Omit<Booking, "id" | "status" | "history" | "created_at" | "expected_delivery">) {
  const id = newId("YR");
  const created = now();
  const expected = new Date(Date.now() + 10 * 86400000).toISOString().slice(0, 10);
  const history: StatusEvent[] = [{ status: "Booked", at: created, note: "Booking received" }];
  await run(
    `INSERT INTO bookings (id, bike_id, color, name, phone, email, address, city, showroom, status, expected_delivery, history, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Booked', ?, ?, ?)`,
    [id, b.bike_id, b.color, b.name, b.phone, b.email, b.address, b.city, b.showroom, expected, JSON.stringify(history), created]
  );
  return id;
}

export const getBooking = (id: string) => one<Booking>("SELECT * FROM bookings WHERE id = ?", [id.trim().toUpperCase()]);
export const listBookings = () => all<Booking>("SELECT * FROM bookings ORDER BY created_at DESC");
export const bookingsByPhone = (phone: string) =>
  all<Booking>("SELECT * FROM bookings WHERE phone = ? ORDER BY created_at DESC", [phone]);

export async function updateBookingStatus(id: string, status: string, note: string, expected?: string) {
  const b = await getBooking(id);
  if (!b) return;
  const history = [...b.history, { status, at: now(), note: note || undefined }];
  await run("UPDATE bookings SET status = ?, history = ?, expected_delivery = COALESCE(?, expected_delivery) WHERE id = ?", [
    status,
    JSON.stringify(history),
    expected || null,
    b.id,
  ]);
}

export async function createService(
  s: Omit<Service, "id" | "status" | "history" | "created_at" | "work_done" | "cost" | "rating" | "liked" | "feedback">
) {
  const id = newId("SV");
  const created = now();
  const history: StatusEvent[] = [{ status: "Requested", at: created, note: "Service request received" }];
  await run(
    `INSERT INTO services (id, name, phone, bike_model, reg_number, service_type, date, slot, pickup, notes, status, history, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Requested', ?, ?)`,
    [id, s.name, s.phone, s.bike_model, s.reg_number, s.service_type, s.date, s.slot, s.pickup, s.notes, JSON.stringify(history), created]
  );
  return id;
}

export const getService = (id: string) => one<Service>("SELECT * FROM services WHERE id = ?", [id.trim().toUpperCase()]);
export const listServices = () => all<Service>("SELECT * FROM services ORDER BY created_at DESC");
export const servicesByPhone = (phone: string) =>
  all<Service>("SELECT * FROM services WHERE phone = ? ORDER BY created_at DESC", [phone]);

export async function updateServiceStatus(id: string, status: string, note: string, workDone?: string, cost?: number) {
  const s = await getService(id);
  if (!s) return;
  const history = [...s.history, { status, at: now(), note: note || undefined }];
  await run(
    "UPDATE services SET status = ?, history = ?, work_done = COALESCE(?, work_done), cost = COALESCE(?, cost) WHERE id = ?",
    [status, JSON.stringify(history), workDone || null, cost ?? null, s.id]
  );
}

export const saveFeedback = (id: string, rating: number, liked: boolean, feedback: string) =>
  run("UPDATE services SET rating = ?, liked = ?, feedback = ? WHERE id = ? AND status = 'Completed'", [
    rating,
    liked ? 1 : 0,
    feedback,
    id,
  ]);

export const recentReviews = (limit = 3) =>
  all<Service>(
    "SELECT * FROM services WHERE rating >= 4 AND feedback IS NOT NULL AND feedback != '' ORDER BY created_at DESC LIMIT ?",
    [limit]
  );
