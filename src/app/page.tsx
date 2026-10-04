import Link from "next/link";
import { ArrowRight, CalendarCheck, PackageCheck, Star, ThumbsUp, Truck, Wrench } from "lucide-react";
import BikeArt from "@/components/BikeArt";
import BikeCard from "@/components/BikeCard";
import { BIKES } from "@/lib/bikes";
import { recentReviews } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function Home() {
  const featured = BIKES.filter((b) => ["r15-v4", "r7", "mt-15"].includes(b.id));
  const reviews = recentReviews(3);
  return (
    <>
      {/* Hero */}
      <section className="racing-stripes relative overflow-hidden border-b border-line">
        <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-race/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="inline-block rounded-full border border-race-light/40 bg-race/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-race-light">
              Revs your heart
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl">
              Race-bred machines.
              <br />
              <span className="text-gradient">Delivered to your door.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-gray-300">
              Book your Yamaha online in under two minutes, follow every step of its journey to you, and keep it
              race-ready with doorstep service.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="btn btn-primary text-lg">
                Book your bike <ArrowRight size={18} />
              </Link>
              <Link href="/service" className="btn btn-ghost text-lg">
                <Wrench size={18} /> Book a service
              </Link>
            </div>
            <div className="mt-10 flex gap-8 text-sm">
              <Stat n="50K+" l="Happy riders" />
              <Stat n="120+" l="Service centres" />
              <Stat n="4.8★" l="Service rating" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-x-10 bottom-6 h-10 rounded-full bg-race/40 blur-2xl" />
            <BikeArt color="#1d3fd8" spin className="animate-ride relative w-full drop-shadow-2xl" />
            <p className="mt-2 text-center font-display text-sm tracking-[0.3em] text-gray-500">R-SERIES · SUPERSPORT</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="font-display text-4xl font-bold text-white">Everything in one place</h2>
        <p className="mt-2 text-gray-400">From booking to your first service — track it all online.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Feature icon={<CalendarCheck />} title="Book online" text="Choose your model, colour and showroom. Get an instant booking ID." href="/book" />
          <Feature icon={<Truck />} title="Live delivery tracking" text="See every step — confirmed, dispatched, out for delivery, delivered." href="/track" />
          <Feature icon={<Wrench />} title="Easy service booking" text="Pick a slot, opt for free pickup and follow your service progress." href="/service" />
          <Feature icon={<ThumbsUp />} title="Rate your service" text="Get notified when service is done and tell us how we did." href="/my" />
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-4xl font-bold text-white">Featured machines</h2>
            <p className="mt-2 text-gray-400">Track-proven performance for every rider.</p>
          </div>
          <Link href="/bikes" className="hidden items-center gap-1 font-semibold text-race-light hover:text-white sm:flex">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((b) => (
            <BikeCard key={b.id} bike={b} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <h2 className="font-display text-4xl font-bold text-white">What riders say</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {(reviews.length
            ? reviews.map((r) => ({ name: r.name, bike: r.bike_model, rating: r.rating ?? 5, text: r.feedback ?? "" }))
            : [
                { name: "Arjun K.", bike: "R15 V4", rating: 5, text: "Booked online, tracked the truck and my R15 arrived two days early. Superb!" },
                { name: "Priya S.", bike: "MT-15 V2", rating: 5, text: "Free pickup for service and live updates. They even washed the bike." },
                { name: "Rahul M.", bike: "R3", rating: 4, text: "Track-day prep was spot on. Suspension setup felt incredible at MMRT." },
              ]
          ).map((r, i) => (
            <figure key={i} className="card p-6">
              <div className="flex gap-1 text-volt">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} fill={j < r.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <blockquote className="mt-4 text-gray-200">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm text-gray-400">
                {r.name} · {r.bike}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <div className="card racing-stripes glow flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-3xl font-bold text-white">Already booked? Track your bike.</h3>
            <p className="mt-2 text-gray-400">Enter your booking ID or mobile number to see live status.</p>
          </div>
          <Link href="/track" className="btn btn-primary">
            <PackageCheck size={18} /> Track delivery
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold text-white">{n}</p>
      <p className="text-gray-400">{l}</p>
    </div>
  );
}

function Feature({ icon, title, text, href }: { icon: React.ReactNode; title: string; text: string; href: string }) {
  return (
    <Link href={href} className="card group p-6 transition hover:glow">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-race/20 text-race-light transition group-hover:bg-race group-hover:text-white">
        {icon}
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-400">{text}</p>
    </Link>
  );
}
