import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-panel/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-display text-xl font-bold tracking-widest text-white">YAMAHA RACING</p>
          <p className="mt-2 text-sm text-gray-400">Book, track and service your machine — all in one place.</p>
        </div>
        <div>
          <p className="label">Explore</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/bikes" className="hover:text-white">All Bikes</Link></li>
            <li><Link href="/book" className="hover:text-white">Book a Bike</Link></li>
          </ul>
        </div>
        <div>
          <p className="label">Owners</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/track" className="hover:text-white">Track Delivery</Link></li>
            <li><Link href="/service" className="hover:text-white">Book Service</Link></li>
            <li><Link href="/my" className="hover:text-white">My Garage</Link></li>
          </ul>
        </div>
        <div>
          <p className="label">Contact</p>
          <p className="text-sm text-gray-300">Mob: +91 81245 33940</p>
          <p className="text-sm text-gray-300">Email: aasuriyaprakash@gmail.com</p>
        </div>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-gray-500">
        Demo project for learning purpose.It was Built by Suriya.
      </p>
    </footer>
  );
}
