import { Check } from "lucide-react";
import type { StatusEvent } from "@/lib/db";

export default function Timeline({ steps, current, history }: { steps: readonly string[]; current: string; history: StatusEvent[] }) {
  const idx = steps.indexOf(current);
  return (
    <ol className="relative space-y-6">
      {steps.map((s, i) => {
        const done = i <= idx;
        const ev = [...history].reverse().find((h) => h.status === s);
        return (
          <li key={s} className="relative flex gap-4">
            {i < steps.length - 1 && (
              <span className={`absolute left-[15px] top-8 h-[calc(100%+0.5rem)] w-0.5 ${i < idx ? "bg-race-light" : "bg-line"}`} />
            )}
            <span
              className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 ${
                done ? "border-race-light bg-race text-white" : "border-line bg-ink text-gray-500"
              } ${i === idx ? "ring-4 ring-race/30" : ""}`}
            >
              {done ? <Check size={16} /> : <span className="text-xs">{i + 1}</span>}
            </span>
            <div className="pt-1">
              <p className={`font-display text-lg font-bold ${done ? "text-white" : "text-gray-500"}`}>{s}</p>
              {ev && (
                <p className="text-sm text-gray-400">
                  {new Date(ev.at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  {ev.note ? ` — ${ev.note}` : ""}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
