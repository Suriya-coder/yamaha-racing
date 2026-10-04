"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  BOOKING_STATUSES,
  SERVICE_STATUSES,
  createBooking,
  createService,
  getBooking,
  getService,
  saveFeedback,
  updateBookingStatus,
  updateServiceStatus,
} from "./db";
import { BIKES, SERVICE_TYPES, SHOWROOMS, TIME_SLOTS, getBike } from "./bikes";
import { ADMIN_COOKIE, adminToken, checkPassword, isAdmin } from "./admin";

export type FormState = { error?: string; ok?: string };

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function bookBike(_: FormState, f: FormData): Promise<FormState> {
  const data = {
    bike_id: str(f, "bike_id"),
    color: str(f, "color"),
    name: str(f, "name"),
    phone: str(f, "phone").replace(/\D/g, "").slice(-10),
    email: str(f, "email"),
    address: str(f, "address"),
    city: str(f, "city"),
    showroom: str(f, "showroom"),
  };
  const bike = getBike(data.bike_id);
  if (!bike) return { error: "Please choose a bike." };
  if (!bike.colors.some((c) => c.name === data.color)) return { error: "Please choose a colour." };
  if (data.name.length < 2) return { error: "Please enter your full name." };
  if (!PHONE_RE.test(data.phone)) return { error: "Enter a valid 10-digit mobile number." };
  if (!EMAIL_RE.test(data.email)) return { error: "Enter a valid email address." };
  if (data.address.length < 8) return { error: "Please enter your full delivery address." };
  if (!data.city) return { error: "Please enter your city." };
  if (!SHOWROOMS.includes(data.showroom)) return { error: "Please choose a showroom." };
  const id = createBooking(data);
  redirect(`/booking/${id}?new=1`);
}

export async function bookService(_: FormState, f: FormData): Promise<FormState> {
  const data = {
    name: str(f, "name"),
    phone: str(f, "phone").replace(/\D/g, "").slice(-10),
    bike_model: str(f, "bike_model"),
    reg_number: str(f, "reg_number").toUpperCase(),
    service_type: str(f, "service_type"),
    date: str(f, "date"),
    slot: str(f, "slot"),
    pickup: f.get("pickup") ? 1 : 0,
    notes: str(f, "notes"),
  };
  if (data.name.length < 2) return { error: "Please enter your full name." };
  if (!PHONE_RE.test(data.phone)) return { error: "Enter a valid 10-digit mobile number." };
  if (!BIKES.some((b) => b.name === data.bike_model)) return { error: "Please choose your bike model." };
  if (data.reg_number.length < 6) return { error: "Enter your bike registration number (e.g. TN01AB1234)." };
  if (!SERVICE_TYPES.some((s) => s.id === data.service_type)) return { error: "Please choose a service type." };
  const today = new Date().toISOString().slice(0, 10);
  if (!data.date || data.date < today) return { error: "Please choose today or a future date." };
  if (!TIME_SLOTS.includes(data.slot)) return { error: "Please choose a time slot." };
  const id = createService(data);
  redirect(`/service/${id}?new=1`);
}

export async function lookup(_: FormState, f: FormData): Promise<FormState> {
  const q = str(f, "q").toUpperCase();
  if (!q) return { error: "Enter a booking ID, service ID or mobile number." };
  if (q.startsWith("YR-")) {
    if (!getBooking(q)) return { error: `No booking found with ID ${q}.` };
    redirect(`/booking/${q}`);
  }
  if (q.startsWith("SV-")) {
    if (!getService(q)) return { error: `No service found with ID ${q}.` };
    redirect(`/service/${q}`);
  }
  const phone = q.replace(/\D/g, "").slice(-10);
  if (PHONE_RE.test(phone)) redirect(`/my?phone=${phone}`);
  return { error: "That doesn't look like a booking ID (YR-...), service ID (SV-...) or mobile number." };
}

export async function submitFeedback(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "id");
  const rating = Number(f.get("rating"));
  const liked = str(f, "liked") === "yes";
  const feedback = str(f, "feedback").slice(0, 500);
  const s = getService(id);
  if (!s || s.status !== "Completed") return { error: "Feedback can only be given after the service is completed." };
  if (!(rating >= 1 && rating <= 5)) return { error: "Please select a star rating." };
  saveFeedback(s.id, rating, liked, feedback);
  revalidatePath(`/service/${s.id}`);
  revalidatePath("/");
  return { ok: "Thank you for your feedback!" };
}

export async function adminLogin(_: FormState, f: FormData): Promise<FormState> {
  if (!checkPassword(str(f, "password"))) return { error: "Wrong password." };
  (await cookies()).set(ADMIN_COOKIE, adminToken(), { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  redirect("/admin");
}

export async function adminLogout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin");
}

export async function adminUpdateBooking(f: FormData) {
  if (!(await isAdmin())) return;
  const status = str(f, "status");
  if (!(BOOKING_STATUSES as readonly string[]).includes(status)) return;
  updateBookingStatus(str(f, "id"), status, str(f, "note"), str(f, "expected") || undefined);
  revalidatePath("/admin");
}

export async function adminUpdateService(f: FormData) {
  if (!(await isAdmin())) return;
  const status = str(f, "status");
  if (!(SERVICE_STATUSES as readonly string[]).includes(status)) return;
  const cost = str(f, "cost") ? Number(str(f, "cost")) : undefined;
  updateServiceStatus(str(f, "id"), status, str(f, "note"), str(f, "work_done") || undefined, Number.isFinite(cost) ? cost : undefined);
  revalidatePath("/admin");
}
