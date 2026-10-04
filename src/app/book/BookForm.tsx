"use client";

import { useActionState, useState } from "react";
import BikeArt from "@/components/BikeArt";
import FormMessage from "@/components/FormMessage";
import SubmitButton from "@/components/SubmitButton";
import { bookBike, type FormState } from "@/lib/actions";
import { BIKES, SHOWROOMS, formatINR } from "@/lib/bikes";

export default function BookForm({ initialBike }: { initialBike?: string }) {
  const [state, action] = useActionState<FormState, FormData>(bookBike, {});
  const [bikeId, setBikeId] = useState(initialBike && BIKES.some((b) => b.id === initialBike) ? initialBike : BIKES[0].id);
  const bike = BIKES.find((b) => b.id === bikeId)!;
  const [color, setColor] = useState(bike.colors[0].name);
  const hex = bike.colors.find((c) => c.name === color)?.hex ?? bike.colors[0].hex;

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <section className="card p-6">
          <h2 className="font-display text-2xl font-bold text-white">1. Choose your bike</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {BIKES.map((b) => (
              <label
                key={b.id}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  b.id === bikeId ? "border-race-light bg-race/15" : "border-line hover:border-race-light/60"
                }`}
              >
                <input
                  type="radio"
                  name="bike_id"
                  value={b.id}
                  checked={b.id === bikeId}
                  onChange={() => {
                    setBikeId(b.id);
                    setColor(b.colors[0].name);
                  }}
                  className="sr-only"
                />
                <p className="font-display text-lg font-bold text-white">{b.name}</p>
                <p className="text-sm text-gray-400">{formatINR(b.price)}</p>
              </label>
            ))}
          </div>
          <p className="label mt-6">Colour</p>
          <div className="flex flex-wrap gap-3">
            {bike.colors.map((c) => (
              <label
                key={c.name}
                className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm ${
                  c.name === color ? "border-race-light bg-race/15 text-white" : "border-line text-gray-300"
                }`}
              >
                <input type="radio" name="color" value={c.name} checked={c.name === color} onChange={() => setColor(c.name)} className="sr-only" />
                <span className="h-5 w-5 rounded-full border border-white/30" style={{ background: c.hex }} />
                {c.name}
              </label>
            ))}
          </div>
        </section>

        <section className="card p-6">
          <h2 className="font-display text-2xl font-bold text-white">2. Your details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" placeholder="Suriya Prakash" />
            <Field label="Mobile number" name="phone" placeholder="9876543210" inputMode="numeric" />
            <Field label="Email" name="email" type="email" placeholder="you@example.com" className="sm:col-span-2" />
          </div>
        </section>

        <section className="card p-6">
          <h2 className="font-display text-2xl font-bold text-white">3. Delivery details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label" htmlFor="address">Delivery address</label>
              <textarea id="address" name="address" rows={3} className="input" placeholder="House no, street, area, pincode" />
            </div>
            <Field label="City" name="city" placeholder="Chennai" />
            <div>
              <label className="label" htmlFor="showroom">Nearest showroom</label>
              <select id="showroom" name="showroom" className="input" defaultValue="">
                <option value="" disabled>Select showroom</option>
                {SHOWROOMS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </section>
      </div>

      <aside className="lg:col-span-2">
        <div className="card glow sticky top-24 overflow-hidden">
          <div className="racing-stripes bg-gradient-to-br from-race/25 to-transparent p-6">
            <BikeArt
              color={hex}
              naked={bike.category === "Hyper Naked" || bike.category === "Street"}
              scooter={bike.category === "Scooter"}
              className="w-full"
            />
          </div>
          <div className="space-y-3 p-6">
            <h3 className="font-display text-3xl font-bold text-white">{bike.name}</h3>
            <p className="text-sm text-gray-400">{color}</p>
            <div className="flex justify-between border-t border-line pt-3 text-sm">
              <span className="text-gray-400">Ex-showroom price</span>
              <span className="font-semibold text-white">{formatINR(bike.price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Booking amount (refundable)</span>
              <span className="font-semibold text-white">{formatINR(5000)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Estimated delivery</span>
              <span className="font-semibold text-white">7–10 days</span>
            </div>
            <FormMessage state={state} />
            <SubmitButton className="w-full text-lg">Confirm booking</SubmitButton>
            <p className="text-center text-xs text-gray-500">Payment is collected at the showroom. No online payment in this demo.</p>
          </div>
        </div>
      </aside>
    </form>
  );
}

function Field({ label, name, className = "", ...rest }: { label: string; name: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="label" htmlFor={name}>{label}</label>
      <input id={name} name={name} className="input" {...rest} />
    </div>
  );
}
