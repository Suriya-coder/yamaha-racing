import Link from "next/link";
import BikeCard from "@/components/BikeCard";
import { BIKES } from "@/lib/bikes";

const CATS = ["All", "Supersport", "Hyper Naked", "Street", "Scooter"];

export default async function BikesPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat = "All" } = await searchParams;
  const list = cat === "All" ? BIKES : BIKES.filter((b) => b.category === cat);
  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <h1 className="font-display text-5xl font-bold text-white">Our Line-up</h1>
      <p className="mt-2 text-gray-400">Pick your weapon. Every bike can be booked online with doorstep delivery.</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <Link
            key={c}
            href={c === "All" ? "/bikes" : `/bikes?cat=${encodeURIComponent(c)}`}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              c === cat ? "bg-race text-white" : "border border-line text-gray-300 hover:border-race-light"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b) => (
          <BikeCard key={b.id} bike={b} />
        ))}
      </div>
    </div>
  );
}
