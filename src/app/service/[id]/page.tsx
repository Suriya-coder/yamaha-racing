import { notFound } from "next/navigation";
import { CheckCircle2, PartyPopper, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import Timeline from "@/components/Timeline";
import { SERVICE_STATUSES, getService } from "@/lib/db";
import { SERVICE_TYPES, formatINR } from "@/lib/bikes";
import FeedbackForm from "./FeedbackForm";

export const dynamic = "force-dynamic";

export default async function ServiceStatus({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ new?: string }>;
}) {
  const { id } = await params;
  const { new: isNew } = await searchParams;
  const s = getService(id);
  if (!s) notFound();
  const type = SERVICE_TYPES.find((t) => t.id === s.service_type);
  const done = s.status === "Completed";

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      {isNew && (
        <div className="card glow mb-8 flex items-start gap-4 border-emerald-500/40 p-6">
          <PartyPopper className="mt-1 shrink-0 text-emerald-400" />
          <div>
            <p className="font-display text-2xl font-bold text-white">Service booked!</p>
            <p className="text-gray-300">
              Your service ID is <span className="font-mono font-bold text-volt">{s.id}</span>. We&apos;ll update the status here as work progresses.
            </p>
          </div>
        </div>
      )}
      {done && (
        <div className="card glow mb-8 flex items-start gap-4 border-emerald-500/40 bg-emerald-500/5 p-6">
          <CheckCircle2 className="mt-1 shrink-0 text-emerald-400" size={28} />
          <div>
            <p className="font-display text-2xl font-bold text-white">Your bike is ready!</p>
            <p className="text-gray-300">
              Service on your {s.bike_model} ({s.reg_number}) is complete.{" "}
              {s.pickup ? "We'll drop it at your doorstep shortly." : "You can collect it from the service centre."}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400">Service ID</p>
          <h1 className="font-mono text-4xl font-bold text-white">{s.id}</h1>
        </div>
        <StatusBadge status={s.status} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-5">
        <div className="space-y-6 md:col-span-3">
          <div className="card p-6">
            <h2 className="font-display text-2xl font-bold text-white">Service progress</h2>
            <div className="mt-6">
              <Timeline steps={SERVICE_STATUSES} current={s.status} history={s.history} />
            </div>
          </div>
          {done && (
            <div className="card p-6">
              <h2 className="font-display text-2xl font-bold text-white">Your feedback</h2>
              {s.rating ? (
                <div className="mt-4">
                  <div className="flex gap-1 text-volt">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} size={24} fill={n <= (s.rating ?? 0) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-gray-300">
                    {s.liked ? <ThumbsUp size={18} className="text-emerald-400" /> : <ThumbsDown size={18} className="text-red-400" />}
                    {s.liked ? "You loved this service" : "You weren't happy with this service"}
                  </p>
                  {s.feedback && <p className="mt-2 italic text-gray-400">“{s.feedback}”</p>}
                  <p className="mt-4 text-sm text-emerald-300">Thanks for helping us improve!</p>
                </div>
              ) : (
                <div className="mt-4">
                  <FeedbackForm id={s.id} />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="card h-fit space-y-3 p-6 text-sm md:col-span-2">
          <Info k="Customer" v={s.name} />
          <Info k="Bike" v={`${s.bike_model} · ${s.reg_number}`} />
          <Info k="Service type" v={`${type?.name ?? s.service_type} (${formatINR(type?.price ?? 0)})`} />
          <Info k="Appointment" v={`${s.date}, ${s.slot}`} />
          <Info k="Pickup & drop" v={s.pickup ? "Yes" : "No"} />
          {s.notes && <Info k="Your notes" v={s.notes} />}
          {s.work_done && <Info k="Work done" v={s.work_done} />}
          {s.cost != null && <Info k="Final bill" v={formatINR(s.cost)} />}
        </div>
      </div>
    </div>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-b border-line pb-3 last:border-0">
      <p className="text-gray-400">{k}</p>
      <p className="font-semibold text-white">{v}</p>
    </div>
  );
}
