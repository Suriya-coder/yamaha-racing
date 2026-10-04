import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import BikeArt from "@/components/BikeArt";
import { BIKES, formatINR, getBike } from "@/lib/bikes";

export function generateStaticParams() {
  return BIKES.map((b) => ({ id: b.id }));
}

export default async function BikeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bike = getBike(id);
  if (!bike) notFound();
  const specs = [
    ["Engine", bike.engine],
    ["Max Power", bike.power],
    ["Max Torque", bike.torque],
    ["Kerb Weight", bike.weight],
    ["Top Speed", bike.topSpeed],
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <Link href="/bikes" className="text-sm text-gray-400 hover:text-white">← All bikes</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="card racing-stripes relative flex items-center justify-center p-8">
          <BikeArt
            color={bike.colors[0].hex}
            naked={bike.category === "Hyper Naked" || bike.category === "Street"}
            scooter={bike.category === "Scooter"}
            spin
            className="w-full"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-race-light">{bike.category}</p>
          <h1 className="mt-2 font-display text-6xl font-bold text-white">{bike.name}</h1>
          <p className="mt-3 text-lg text-gray-300">{bike.tagline}</p>
          <p className="mt-6 text-sm text-gray-500">Ex-showroom price</p>
          <p className="font-display text-4xl font-bold text-white">{formatINR(bike.price)}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-gray-400">Colours:</span>
            {bike.colors.map((c) => (
              <span key={c.name} title={c.name} className="h-7 w-7 rounded-full border-2 border-white/20" style={{ background: c.hex }} />
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Link href={`/book?bike=${bike.id}`} className="btn btn-primary text-lg">Book this bike</Link>
            <Link href="/service" className="btn btn-ghost text-lg">Service info</Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="card p-5">
              <p className="label">Specifications</p>
              <dl className="space-y-3 text-sm">
                {specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line pb-2 last:border-0">
                    <dt className="text-gray-400">{k}</dt>
                    <dd className="text-right font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="card p-5">
              <p className="label">Key features</p>
              <ul className="space-y-3 text-sm">
                {bike.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-200">
                    <CheckCircle2 size={16} className="text-race-light" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
