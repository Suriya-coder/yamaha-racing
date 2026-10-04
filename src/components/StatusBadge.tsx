const COLORS: Record<string, string> = {
  Booked: "bg-gray-500/20 text-gray-200",
  Confirmed: "bg-sky-500/20 text-sky-300",
  Dispatched: "bg-indigo-500/20 text-indigo-300",
  "Out for Delivery": "bg-amber-500/20 text-amber-300",
  Delivered: "bg-emerald-500/20 text-emerald-300",
  Requested: "bg-gray-500/20 text-gray-200",
  "In Progress": "bg-amber-500/20 text-amber-300",
  Completed: "bg-emerald-500/20 text-emerald-300",
};

export default function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${COLORS[status] ?? "bg-gray-500/20"}`}>{status}</span>;
}
