# Yamaha Racing — Book, Track & Service

A demo motorcycle showroom website built with Next.js, Tailwind CSS and SQLite.

## Features
- **Bikes**: line-up with filters, specs and colours
- **Book a bike**: choose model, colour, showroom and delivery address → get a booking ID (`YR-XXXXXX`)
- **Track delivery**: Booked → Confirmed → Dispatched → Out for Delivery → Delivered timeline
- **Service**: book a service slot (with optional pickup) → get a service ID (`SV-XXXXXX`) and live progress
- **Service done + feedback**: customers are notified when service is completed and can like / rate / comment
- **My Garage**: look up everything by mobile number
- **Admin dashboard** (`/admin`, password `yamaha123` or `ADMIN_PASSWORD` env): update delivery status, complete services, read feedback

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
```
Data is stored in `data/yamaha.db` (created automatically).

## Where things live
- `src/app/` — pages (each folder is a URL)
- `src/lib/bikes.ts` — bike catalogue, showrooms, service prices
- `src/lib/db.ts` — database tables and queries
- `src/lib/actions.ts` — form handling (booking, service, feedback, admin updates)
- `src/components/` — reusable UI pieces

Demo project for learning — not affiliated with Yamaha Motor Co.
