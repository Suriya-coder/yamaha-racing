import Link from "next/link";
import { Bell, Bike, Wrench } from "lucide-react";
import LookupForm from "@/components/LookupForm";
import StatusBadge from "@/components/StatusBadge";
import { bookingsByPhone, servicesByPhone } from "@/lib/db";
import { getBike } from "@/lib/bikes";

export const dynamic = "force-dynamic";

export default async function MyGarage({ searchParams }: { searchParams: Promise<{ phone?: string }> }) {
  const { phone } = await searchParams;
  if (!phone) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-center font-display text-5xl font-bold text-white">My Garage</h1>
        <p className="mt-3 text-center text-gray-400">See all your bookings, services and notifications using your mobile number.</p>
        <div className="card glow mt-10 p-6">
          <LookupForm placeholder="Your 10-digit mobile number" />
        </div>
      </div>
    );
  }
  const bookings = bookingsByPhone(phone);
  const services = servicesByPhone(phone);
  const pendingFeedback = services.filter((s) => s.status === "Completed" && !s.rating);
  const name = bookings[0]?.name ?? services[0]?.name;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="font-display text-5xl font-bold text-white">{name ? `Hi, ${name.split(" ")[0]}` : "My Garage"}</h1>
      <p className="mt-2 text-gray-400">Showing records for +91 {phone}</p>

      {pendingFeedback.map((s) => (
        <div key={s.id} className="card glow mt-6 flex flex-wrap items-center justify-between gap-4 border-emerald-500/40 p-5">
          <div className="flex items-center gap-3">
            <Bell className="text-emerald-400" />
            <p className="text-gray-200">
              Your <b>{s.bike_model}</b> ({s.reg_number}) service is <b className="text-emerald-300">complete</b>! How did we do?
            </p>
          </div>
          <Link href={`/service/${s.id}`} className="btn btn-primary">Rate service</Link>
        </div>
      ))}

      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white"><Bike size={22} /> Bike bookings</h2>
        {bookings.length === 0 ? (
          <p className="mt-3 text-gray-500">No bookings yet. <Link href="/book" className="text-race-light">Book a bike →</Link></p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {bookings.map((b) => (
              <Link key={b.id} href={`/booking/${b.id}`} className="card p-5 transition hover:glow">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-400">{b.id}</span>
                  <StatusBadge status={b.status} />
                </div>
                <p className="mt-2 font-display text-2xl font-bold text-white">{getBike(b.bike_id)?.name}</p>
                <p className="text-sm text-gray-400">{b.color}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white"><Wrench size={22} /> Services</h2>
        {services.length === 0 ? (
          <p className="mt-3 text-gray-500">No services yet. <Link href="/service" className="text-race-light">Book a service →</Link></p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <Link key={s.id} href={`/service/${s.id}`} className="card p-5 transition hover:glow">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-400">{s.id}</span>
                  <StatusBadge status={s.status} />
                </div>
                <p className="mt-2 font-display text-2xl font-bold text-white">{s.bike_model}</p>
                <p className="text-sm text-gray-400">{s.reg_number} · {s.date} · {s.slot}</p>
                {s.rating ? <p className="mt-2 text-sm text-volt">{"★".repeat(s.rating)}{"☆".repeat(5 - s.rating)}</p> : null}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
