import type { FormState } from "@/lib/actions";

export default function FormMessage({ state }: { state: FormState }) {
  if (state.error) return <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">{state.error}</p>;
  if (state.ok) return <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{state.ok}</p>;
  return null;
}
