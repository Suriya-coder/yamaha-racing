"use client";

import { useActionState, useState } from "react";
import FormMessage from "@/components/FormMessage";
import SubmitButton from "@/components/SubmitButton";
import { bookService, type FormState } from "@/lib/actions";
import { BIKES, SERVICE_TYPES, TIME_SLOTS, formatINR } from "@/lib/bikes";

export default function ServiceForm() {
  const [state, action] = useActionState<FormState, FormData>(bookService, {});
  const [type, setType] = useState(SERVICE_TYPES[0].id);
  const today = new Date().toISOString().slice(0, 10);
  return (
    <form action={action} className="card glow space-y-5 p-6">
      <h2 className="font-display text-2xl font-bold text-white">Book a service</h2>
      <div>
        <p className="label">Service type</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICE_TYPES.map((s) => (
            <label
              key={s.id}
              className={`cursor-pointer rounded-xl border p-4 transition ${
                s.id === type ? "border-race-light bg-race/15" : "border-line hover:border-race-light/60"
              }`}
            >
              <input type="radio" name="service_type" value={s.id} checked={s.id === type} onChange={() => setType(s.id)} className="sr-only" />
              <div className="flex items-center justify-between">
                <p className="font-bold text-white">{s.name}</p>
                <p className="font-display font-bold text-race-light">{formatINR(s.price)}</p>
              </div>
              <p className="mt-1 text-xs text-gray-400">{s.desc}</p>
            </label>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">Full name</label>
          <input id="name" name="name" className="input" placeholder="Suriya Prakash" />
        </div>
        <div>
          <label className="label" htmlFor="phone">Mobile number</label>
          <input id="phone" name="phone" className="input" inputMode="numeric" placeholder="9876543210" />
        </div>
        <div>
          <label className="label" htmlFor="bike_model">Bike model</label>
          <select id="bike_model" name="bike_model" className="input" defaultValue="">
            <option value="" disabled>Select model</option>
            {BIKES.map((b) => (
              <option key={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="reg_number">Registration number</label>
          <input id="reg_number" name="reg_number" className="input uppercase" placeholder="TN01AB1234" />
        </div>
        <div>
          <label className="label" htmlFor="date">Preferred date</label>
          <input id="date" name="date" type="date" min={today} className="input [color-scheme:dark]" />
        </div>
        <div>
          <label className="label" htmlFor="slot">Time slot</label>
          <select id="slot" name="slot" className="input" defaultValue="">
            <option value="" disabled>Select slot</option>
            {TIME_SLOTS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="notes">Issues / notes (optional)</label>
        <textarea id="notes" name="notes" rows={3} className="input" placeholder="E.g. brake noise, chain loose..." />
      </div>
      <label className="flex items-center gap-3 text-sm text-gray-200">
        <input type="checkbox" name="pickup" className="h-5 w-5 accent-[#1d3fd8]" /> Free doorstep pickup & drop
      </label>
      <FormMessage state={state} />
      <SubmitButton className="w-full text-lg">Book service</SubmitButton>
    </form>
  );
}
