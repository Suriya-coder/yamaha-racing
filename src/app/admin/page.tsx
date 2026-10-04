import Link from "next/link";
import { Bike, LogOut, Star, ThumbsDown, ThumbsUp, Wrench } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { isAdmin } from "@/lib/admin";
import { adminLogout, adminUpdateBooking, adminUpdateService } from "@/lib/actions";
import { BOOKING_STATUSES, SERVICE_STATUSES, listBookings, listServices } from "@/lib/db";
import { SERVICE_TYPES, getBike } from "@/lib/bikes";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  if (!(await isAdmin())) {
    return (
      <div className="mx-auto max-w-md px-4 py-24">
        <div className="card glow p-8">
          <h1 className="font-display text-3xl font-bold text-white">Showroom Admin</h1>
          <p className="mb-6 mt-1 text-sm text-gray-400">Staff only. Demo password: <code className="text-volt">yamaha123</code></p>
          <LoginForm />
        </div>
      </div>
    );
  }
  const { tab = "bookings" } = await searchParams;
  const bookings = listBookings();
  const services = listServices();
  const rated = services.filter((s) => s.rating);
  const avg = rated.length ? (rated.reduce((a, s) => a + (s.rating ?? 0), 0) / rated.length).toFixed(1) : "-";
  const likes = rated.filter((s) => s.liked).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl font-bold text-white">Showroom Dashboard</h1>
        <form action={adminLogout}>
          <button className="btn btn-ghost text-sm"><LogOut size={16} /> Sign out</button>
        </form>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={<Bike />} k="Active deliveries" v={bookings.filter((b) => b.status !== "Delivered").length} />
        <Kpi icon={<Wrench />} k="Open services" v={services.filter((s) => s.status !== "Completed").length} />
        <Kpi icon={<Star />} k="Avg. service rating" v={avg} />
        <Kpi icon={<ThumbsUp />} k="Customers who liked" v={`${likes}/${rated.length}`} />
      </div>
      <div className="mt-8 flex gap-2 border-b border-line">
        {[
          ["bookings", `Bookings (${bookings.length})`],
          ["services", `Services (${services.length})`],
          ["feedback", `Feedback (${rated.length})`],
        ].map(([id, label]) => (
          <Link
            key={id}
            href={`/admin?tab=${id}`}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-bold ${tab === id ? "border-race-light text-white" : "border-transparent text-gray-400 hover:text-white"}`}
          >
            {label}
          </Link>
        ))}
      </div>

      {tab === "bookings" && (
        <div className="mt-6 space-y-4">
          {bookings.length === 0 && <Empty text="No bookings yet." />}
          {bookings.map((b) => (
            <div key={b.id} className="card grid gap-4 p-5 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <Link href={`/booking/${b.id}`} className="font-mono font-bold text-race-light">{b.id}</Link>
                  <StatusBadge status={b.status} />
                </div>
                <p className="mt-2 font-display text-xl font-bold text-white">{getBike(b.bike_id)?.name} · {b.color}</p>
                <p className="text-sm text-gray-400">{b.name} · {b.phone} · {b.email}</p>
                <p className="text-sm text-gray-400">{b.address}, {b.city} · {b.showroom}</p>
              </div>
              <form action={adminUpdateBooking} className="grid gap-2 sm:grid-cols-2">
                <input type="hidden" name="id" value={b.id} />
                <select name="status" defaultValue={b.status} className="input">
                  {BOOKING_STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <input name="expected" type="date" defaultValue={b.expected_delivery ?? ""} className="input [color-scheme:dark]" title="Expected delivery date" />
                <input name="note" placeholder="Note for customer (e.g. Truck TN09 AB 1234)" className="input sm:col-span-2" />
                <button className="btn btn-primary sm:col-span-2">Update delivery</button>
              </form>
            </div>
          ))}
        </div>
      )}

      {tab === "services" && (
        <div className="mt-6 space-y-4">
          {services.length === 0 && <Empty text="No services yet." />}
          {services.map((s) => (
            <div key={s.id} className="card grid gap-4 p-5 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <Link href={`/service/${s.id}`} className="font-mono font-bold text-race-light">{s.id}</Link>
                  <StatusBadge status={s.status} />
                  {s.pickup ? <span className="text-xs text-amber-300">Pickup</span> : null}
                </div>
                <p className="mt-2 font-display text-xl font-bold text-white">{s.bike_model} · {s.reg_number}</p>
                <p className="text-sm text-gray-400">
                  {SERVICE_TYPES.find((t) => t.id === s.service_type)?.name} · {s.date} {s.slot}
                </p>
                <p className="text-sm text-gray-400">{s.name} · {s.phone}</p>
                {s.notes && <p className="mt-1 text-sm italic text-gray-500">“{s.notes}”</p>}
              </div>
              <form action={adminUpdateService} className="grid gap-2 sm:grid-cols-2">
                <input type="hidden" name="id" value={s.id} />
                <select name="status" defaultValue={s.status} className="input">
                  {SERVICE_STATUSES.map((x) => <option key={x}>{x}</option>)}
                </select>
                <input name="cost" type="number" min={0} placeholder="Final bill (₹)" defaultValue={s.cost ?? ""} className="input" />
                <input name="work_done" placeholder="Work done (e.g. Oil change, chain adjusted)" defaultValue={s.work_done ?? ""} className="input sm:col-span-2" />
                <input name="note" placeholder="Note for customer" className="input sm:col-span-2" />
                <button className="btn btn-primary sm:col-span-2">Update service</button>
              </form>
            </div>
          ))}
        </div>
      )}

      {tab === "feedback" && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {rated.length === 0 && <Empty text="No feedback yet." />}
          {rated.map((s) => (
            <div key={s.id} className="card p-5">
              <div className="flex items-center justify-between">
                <span className="text-volt">{"★".repeat(s.rating ?? 0)}{"☆".repeat(5 - (s.rating ?? 0))}</span>
                <span className={`flex items-center gap-1 text-sm ${s.liked ? "text-emerald-400" : "text-red-400"}`}>
                  {s.liked ? <ThumbsUp size={16} /> : <ThumbsDown size={16} />} {s.liked ? "Liked" : "Not happy"}
                </span>
              </div>
              <p className="mt-3 text-gray-200">{s.feedback || <i className="text-gray-500">No comment</i>}</p>
              <p className="mt-3 text-xs text-gray-500">{s.name} · {s.bike_model} · {s.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Kpi({ icon, k, v }: { icon: React.ReactNode; k: string; v: string | number }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-race/20 text-race-light">{icon}</span>
      <div>
        <p className="text-sm text-gray-400">{k}</p>
        <p className="font-display text-3xl font-bold text-white">{v}</p>
      </div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="card p-8 text-center text-gray-500">{text}</p>;
}
