import { PackageCheck, Truck, Warehouse, BadgeCheck, Home } from "lucide-react";
import LookupForm from "@/components/LookupForm";

export default function TrackPage() {
  const steps = [
    { icon: <BadgeCheck />, t: "Booked" },
    { icon: <PackageCheck />, t: "Confirmed" },
    { icon: <Warehouse />, t: "Dispatched" },
    { icon: <Truck />, t: "Out for Delivery" },
    { icon: <Home />, t: "Delivered" },
  ];
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-center font-display text-5xl font-bold text-white">Track your delivery</h1>
      <p className="mt-3 text-center text-gray-400">Enter your booking ID (e.g. YR-AB12CD) or the mobile number you booked with.</p>
      <div className="card glow mt-10 p-6">
        <LookupForm />
      </div>
      <div className="mt-12 grid grid-cols-5 gap-2 text-center">
        {steps.map((s) => (
          <div key={s.t} className="flex flex-col items-center gap-2">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-race/15 text-race-light">{s.icon}</span>
            <span className="text-xs text-gray-400">{s.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
