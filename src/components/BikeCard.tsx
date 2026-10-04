import Link from "next/link";
import BikeArt from "./BikeArt";
import { formatINR, type Bike } from "@/lib/bikes";

export default function BikeCard({ bike }: { bike: Bike }) {
  return (
    <div className="card group overflow-hidden transition hover:-translate-y-1 hover:glow">
      <div className="racing-stripes relative bg-gradient-to-br from-race/20 to-transparent p-4">
        <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-race-light">
          {bike.category}
        </span>
        <BikeArt
          color={bike.colors[0].hex}
          naked={bike.category === "Hyper Naked" || bike.category === "Street"}
          scooter={bike.category === "Scooter"}
          className="mx-auto mt-6 h-40 w-full transition group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl font-bold text-white">{bike.name}</h3>
        <p className="mt-1 text-sm text-gray-400">{bike.tagline}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <Spec k="Power" v={bike.power.split(" @")[0]} />
          <Spec k="Engine" v={bike.engine.split(",")[0]} />
          <Spec k="Top" v={bike.topSpeed} />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Ex-showroom from</p>
            <p className="font-display text-xl font-bold text-white">{formatINR(bike.price)}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/bikes/${bike.id}`} className="btn btn-ghost px-3 py-2 text-sm">Details</Link>
            <Link href={`/book?bike=${bike.id}`} className="btn btn-primary px-3 py-2 text-sm">Book</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-ink/60 px-2 py-2">
      <p className="text-gray-500">{k}</p>
      <p className="font-semibold text-gray-100">{v}</p>
    </div>
  );
}
