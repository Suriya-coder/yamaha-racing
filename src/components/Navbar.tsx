"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/bikes", label: "Bikes" },
  { href: "/book", label: "Book Now" },
  { href: "/track", label: "Track Delivery" },
  { href: "/service", label: "Service" },
  { href: "/my", label: "My Garage" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-race font-display text-xl font-bold text-white">YR</span>
          <span className="font-display text-xl font-bold tracking-widest text-white">
            YAMAHA<span className="text-race-light"> RACING</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                path.startsWith(l.href) ? "bg-race/20 text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/admin" className="ml-2 rounded-md border border-line px-3 py-2 text-xs font-semibold text-gray-400 hover:text-white">
            Admin
          </Link>
        </nav>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-line bg-ink px-4 py-3 md:hidden">
          {[...LINKS, { href: "/admin", label: "Admin" }].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 font-semibold text-gray-200 hover:bg-panel">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
