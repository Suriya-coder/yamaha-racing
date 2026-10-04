import { Clock, ShieldCheck, Truck, Wrench } from "lucide-react";
import LookupForm from "@/components/LookupForm";
import ServiceForm from "./ServiceForm";

export const dynamic = "force-dynamic";

export default function ServicePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <h1 className="font-display text-5xl font-bold text-white">Service Centre</h1>
      <p className="mt-2 text-gray-400">Genuine parts, certified technicians and live progress updates.</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ServiceForm />
        </div>
        <div className="space-y-6 lg:col-span-2">
          <div className="card p-6">
            <h2 className="font-display text-xl font-bold text-white">Track a service</h2>
            <p className="mb-4 text-sm text-gray-400">Enter your service ID (SV-...) or mobile number.</p>
            <LookupForm placeholder="SV-XXXXXX or mobile" />
          </div>
          <div className="card space-y-5 p-6">
            {[
              { i: <ShieldCheck />, t: "Genuine Yamaha parts", d: "Every part is original and warranty-backed." },
              { i: <Wrench />, t: "Race-trained technicians", d: "Certified experts who know performance machines." },
              { i: <Truck />, t: "Free pickup & drop", d: "We collect your bike and bring it back serviced." },
              { i: <Clock />, t: "Live status updates", d: "Know when work starts and when your bike is ready." },
            ].map((x) => (
              <div key={x.t} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-race/20 text-race-light">{x.i}</span>
                <div>
                  <p className="font-bold text-white">{x.t}</p>
                  <p className="text-sm text-gray-400">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
