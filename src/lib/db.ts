import Database from "better-sqlite3";
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

const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), "data", "yamaha.db");

const globalForDb = globalThis as unknown as { db?: Database.Database };

function init(): Database.Database {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
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
    );
    CREATE TABLE IF NOT EXISTS services (
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
    );
  `);
  return db;
}

export const db = globalForDb.db ?? init();
if (process.env.NODE_ENV !== "production") globalForDb.db = db;

type Row = Record<string, unknown> & { history: string };
const parse = <T>(row: Row | undefined): T | undefined =>
  row ? ({ ...row, history: JSON.parse(row.history) } as T) : undefined;

export function newId(prefix: string) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${s}`;
}

const now = () => new Date().toISOString();

export function createBooking(b: Omit<Booking, "id" | "status" | "history" | "created_at" | "expected_delivery">) {
  const id = newId("YR");
  const created = now();
  const expected = new Date(Date.now() + 10 * 86400000).toISOString().slice(0, 10);
  const history: StatusEvent[] = [{ status: "Booked", at: created, note: "Booking received" }];
  db.prepare(
    `INSERT INTO bookings (id, bike_id, color, name, phone, email, address, city, showroom, status, expected_delivery, history, created_at)
     VALUES (@id, @bike_id, @color, @name, @phone, @email, @address, @city, @showroom, 'Booked', @expected, @history, @created)`
  ).run({ ...b, id, expected, history: JSON.stringify(history), created });
  return id;
}

export const getBooking = (id: string) =>
  parse<Booking>(db.prepare("SELECT * FROM bookings WHERE id = ?").get(id.trim().toUpperCase()) as Row | undefined);

export const listBookings = () =>
  (db.prepare("SELECT * FROM bookings ORDER BY created_at DESC").all() as Row[]).map((r) => parse<Booking>(r)!);

export const bookingsByPhone = (phone: string) =>
  (db.prepare("SELECT * FROM bookings WHERE phone = ? ORDER BY created_at DESC").all(phone) as Row[]).map(
    (r) => parse<Booking>(r)!
  );

export function updateBookingStatus(id: string, status: string, note: string, expected?: string) {
  const b = getBooking(id);
  if (!b) return;
  const history = [...b.history, { status, at: now(), note: note || undefined }];
  db.prepare("UPDATE bookings SET status = ?, history = ?, expected_delivery = COALESCE(?, expected_delivery) WHERE id = ?").run(
    status,
    JSON.stringify(history),
    expected || null,
    b.id
  );
}

export function createService(
  s: Omit<Service, "id" | "status" | "history" | "created_at" | "work_done" | "cost" | "rating" | "liked" | "feedback">
) {
  const id = newId("SV");
  const created = now();
  const history: StatusEvent[] = [{ status: "Requested", at: created, note: "Service request received" }];
  db.prepare(
    `INSERT INTO services (id, name, phone, bike_model, reg_number, service_type, date, slot, pickup, notes, status, history, created_at)
     VALUES (@id, @name, @phone, @bike_model, @reg_number, @service_type, @date, @slot, @pickup, @notes, 'Requested', @history, @created)`
  ).run({ ...s, id, history: JSON.stringify(history), created });
  return id;
}

export const getService = (id: string) =>
  parse<Service>(db.prepare("SELECT * FROM services WHERE id = ?").get(id.trim().toUpperCase()) as Row | undefined);

export const listServices = () =>
  (db.prepare("SELECT * FROM services ORDER BY created_at DESC").all() as Row[]).map((r) => parse<Service>(r)!);

export const servicesByPhone = (phone: string) =>
  (db.prepare("SELECT * FROM services WHERE phone = ? ORDER BY created_at DESC").all(phone) as Row[]).map(
    (r) => parse<Service>(r)!
  );

export function updateServiceStatus(id: string, status: string, note: string, workDone?: string, cost?: number) {
  const s = getService(id);
  if (!s) return;
  const history = [...s.history, { status, at: now(), note: note || undefined }];
  db.prepare(
    "UPDATE services SET status = ?, history = ?, work_done = COALESCE(?, work_done), cost = COALESCE(?, cost) WHERE id = ?"
  ).run(status, JSON.stringify(history), workDone || null, cost ?? null, s.id);
}

export function saveFeedback(id: string, rating: number, liked: boolean, feedback: string) {
  db.prepare("UPDATE services SET rating = ?, liked = ?, feedback = ? WHERE id = ? AND status = 'Completed'").run(
    rating,
    liked ? 1 : 0,
    feedback,
    id
  );
}

export const recentReviews = (limit = 3) =>
  (
    db
      .prepare("SELECT * FROM services WHERE rating >= 4 AND feedback IS NOT NULL AND feedback != '' ORDER BY created_at DESC LIMIT ?")
      .all(limit) as Row[]
  ).map((r) => parse<Service>(r)!);
