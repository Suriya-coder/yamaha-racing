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

## Run it on your laptop (Windows / Mac / Linux)
1. Install **Node.js 20 LTS** from https://nodejs.org (one-time, needs internet).
2. Unzip this folder, e.g. to `C:\Projects\yamaha-racing`.
3. Open a terminal **inside the folder** (Windows: open the folder, type `cmd` in the address bar, press Enter).
4. Install packages (one-time, needs internet):
   ```bash
   npm install
   ```
5. Start the website:
   ```bash
   npm run dev
   ```
6. Open **http://localhost:3000** in your browser. Admin page: http://localhost:3000/admin (password `yamaha123`).
7. Press `Ctrl + C` in the terminal to stop it.

After step 4 it works **offline**. All bookings/services are saved in `data/yamaha.db`
(created automatically — delete it to start fresh).

### Accepting requests (admin)
Admin → **Services** tab → **Accept request** (status becomes *In Progress*) → **Mark as Done** (status *Completed*,
customer is asked to rate the service). Bookings work the same way with **Accept booking** → next status buttons.

## Where things live
- `src/app/` — pages (each folder is a URL)
- `src/lib/bikes.ts` — bike catalogue, showrooms, service prices
- `src/lib/db.ts` — database tables and queries
- `src/lib/actions.ts` — form handling (booking, service, feedback, admin updates)
- `src/components/` — reusable UI pieces

Demo project for learning — not affiliated with Yamaha Motor Co.
