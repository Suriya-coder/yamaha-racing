import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, MapPin, PartyPopper, Store } from "lucide-react";
import BikeArt from "@/components/BikeArt";
import StatusBadge from "@/components/StatusBadge";
import Timeline from "@/components/Timeline";
import { BOOKING_STATUSES, getBooking } from "@/lib/db";
import { formatINR, getBike } from "@/lib/bikes";

export const dynamic = "force-dynamic";

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ new?: string }>;
}) {
  const { id } = await params;
  const { new: isNew } = await searchParams;
  const b = await getBooking(id);
  if (!b) notFound();
  const bike = getBike(b.bike_id)!;
  const hex = bike.colors.find((c) => c.name === b.color)?.hex;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      {isNew && (
        <div className="card glow mb-8 flex items-start gap-4 border-emerald-500/40 p-6">
          <PartyPopper className="mt-1 shrink-0 text-emerald-400" />
          <div>
            <p className="font-display text-2xl font-bold text-white">Booking confirmed!</p>
            <p className="text-gray-300">
              Save your booking ID <span className="font-mono font-bold text-volt">{b.id}</span> — use it any time to track your delivery.
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400">Booking ID</p>
          <h1 className="font-mono text-4xl font-bold text-white">{b.id}</h1>
        </div>
        <StatusBadge status={b.status} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-5">
        <div className="card p-6 md:col-span-3">
          <h2 className="font-display text-2xl font-bold text-white">Delivery status</h2>
          <div className="mt-6">
            <Timeline steps={BOOKING_STATUSES} current={b.status} history={b.history} />
          </div>
        </div>
        <div className="space-y-6 md:col-span-2">
          <div className="card overflow-hidden">
            <div className="racing-stripes p-4">
              <BikeArt
                color={hex}
                naked={bike.category === "Hyper Naked" || bike.category === "Street"}
                scooter={bike.category === "Scooter"}
                spin={b.status === "Out for Delivery"}
                className="w-full"
              />
            </div>
            <div className="p-5">
              <p className="font-display text-2xl font-bold text-white">{bike.name}</p>
              <p className="text-sm text-gray-400">{b.color} · {formatINR(bike.price)}</p>
            </div>
          </div>
          <div className="card space-y-3 p-5 text-sm">
            <Row icon={<CalendarClock size={16} />} k="Expected delivery" v={b.status === "Delivered" ? "Delivered" : b.expected_delivery ?? "-"} />
            <Row icon={<MapPin size={16} />} k="Deliver to" v={`${b.address}, ${b.city}`} />
            <Row icon={<Store size={16} />} k="Showroom" v={b.showroom} />
          </div>
          <Link href="/service" className="btn btn-ghost w-full">Book first free service</Link>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, k, v }: { icon: React.ReactNode; k: string; v: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-race-light">{icon}</span>
      <div>
        <p className="text-gray-400">{k}</p>
        <p className="font-semibold text-white">{v}</p>
      </div>
    </div>
  );
}
