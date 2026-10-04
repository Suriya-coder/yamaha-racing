import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-display text-8xl font-bold text-race-light">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-white">Wrong turn, rider.</h1>
      <p className="mt-2 text-gray-400">We couldn&apos;t find that page, booking or service ID.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn btn-primary">Home</Link>
        <Link href="/track" className="btn btn-ghost">Track again</Link>
      </div>
    </div>
  );
}
