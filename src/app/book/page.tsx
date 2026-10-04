import BookForm from "./BookForm";

export default async function BookPage({ searchParams }: { searchParams: Promise<{ bike?: string }> }) {
  const { bike } = await searchParams;
  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <h1 className="font-display text-5xl font-bold text-white">Book your Yamaha</h1>
      <p className="mt-2 text-gray-400">Three quick steps. You&apos;ll get a booking ID to track your delivery.</p>
      <div className="mt-10">
        <BookForm initialBike={bike} />
      </div>
    </div>
  );
}
