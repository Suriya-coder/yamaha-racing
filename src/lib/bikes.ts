export type Bike = {
  id: string;
  name: string;
  category: "Supersport" | "Hyper Naked" | "Street" | "Scooter";
  tagline: string;
  price: number;
  engine: string;
  power: string;
  torque: string;
  weight: string;
  topSpeed: string;
  colors: { name: string; hex: string }[];
  features: string[];
};

export const BIKES: Bike[] = [
  {
    id: "r15-v4",
    name: "R15 V4",
    category: "Supersport",
    tagline: "Born from the track. Built for the street.",
    price: 182000,
    engine: "155cc, liquid-cooled, 4-valve, VVA",
    power: "18.4 PS @ 10,000 rpm",
    torque: "14.2 Nm @ 7,500 rpm",
    weight: "142 kg",
    topSpeed: "140 km/h",
    colors: [
      { name: "Racing Blue", hex: "#1d3fd8" },
      { name: "Metallic Red", hex: "#c8102e" },
      { name: "Dark Knight", hex: "#1f2937" },
    ],
    features: ["Quick shifter", "Traction control", "Dual-channel ABS", "Bluetooth connectivity"],
  },
  {
    id: "r3",
    name: "R3",
    category: "Supersport",
    tagline: "Twin-cylinder thrill, everyday usability.",
    price: 465000,
    engine: "321cc, parallel-twin, DOHC",
    power: "42 PS @ 10,750 rpm",
    torque: "29.5 Nm @ 9,000 rpm",
    weight: "169 kg",
    topSpeed: "180 km/h",
    colors: [
      { name: "Icon Blue", hex: "#1e40af" },
      { name: "Midnight Black", hex: "#111827" },
    ],
    features: ["USD front forks", "Dual-channel ABS", "LED lighting", "Digital cluster"],
  },
  {
    id: "r7",
    name: "R7",
    category: "Supersport",
    tagline: "Pure supersport DNA with crossplane character.",
    price: 990000,
    engine: "689cc, CP2 parallel-twin",
    power: "73.4 PS @ 8,750 rpm",
    torque: "67 Nm @ 6,500 rpm",
    weight: "188 kg",
    topSpeed: "210 km/h",
    colors: [
      { name: "Team Yamaha Blue", hex: "#2340e0" },
      { name: "Performance Black", hex: "#0b0f19" },
    ],
    features: ["Assist & slipper clutch", "Fully adjustable forks", "Radial brakes", "Aggressive ergonomics"],
  },
  {
    id: "r1",
    name: "R1",
    category: "Supersport",
    tagline: "MotoGP-derived. Uncompromising. Legendary.",
    price: 2450000,
    engine: "998cc, crossplane inline-4",
    power: "200 PS @ 13,500 rpm",
    torque: "113.3 Nm @ 11,500 rpm",
    weight: "201 kg",
    topSpeed: "299 km/h",
    colors: [
      { name: "Icon Blue", hex: "#1d3fd8" },
      { name: "Tech Black", hex: "#0f172a" },
    ],
    features: ["6-axis IMU", "Launch control", "Engine brake management", "Titanium con-rods"],
  },
  {
    id: "mt-15",
    name: "MT-15 V2",
    category: "Hyper Naked",
    tagline: "The dark side of Japan.",
    price: 168000,
    engine: "155cc, liquid-cooled, VVA",
    power: "18.4 PS @ 10,000 rpm",
    torque: "14.1 Nm @ 7,500 rpm",
    weight: "141 kg",
    topSpeed: "130 km/h",
    colors: [
      { name: "Cyan Storm", hex: "#0891b2" },
      { name: "Ice Fluo-Vermillion", hex: "#ef4444" },
      { name: "Metallic Black", hex: "#111827" },
    ],
    features: ["USD forks", "Traction control", "Assist & slipper clutch", "Y-Connect app"],
  },
  {
    id: "mt-09",
    name: "MT-09",
    category: "Hyper Naked",
    tagline: "Torque-packed triple. Instant adrenaline.",
    price: 1100000,
    engine: "890cc, CP3 inline-3",
    power: "119 PS @ 10,000 rpm",
    torque: "93 Nm @ 7,000 rpm",
    weight: "189 kg",
    topSpeed: "230 km/h",
    colors: [
      { name: "Icon Blue", hex: "#1e3a8a" },
      { name: "Tech Black", hex: "#0f172a" },
    ],
    features: ["6-axis IMU", "Cruise control", "Up/down quick shifter", "TFT display"],
  },
  {
    id: "fz-x",
    name: "FZ-X",
    category: "Street",
    tagline: "Neo-retro style for the modern rider.",
    price: 136000,
    engine: "149cc, air-cooled, FI",
    power: "12.4 PS @ 7,250 rpm",
    torque: "13.3 Nm @ 5,500 rpm",
    weight: "139 kg",
    topSpeed: "115 km/h",
    colors: [
      { name: "Matte Copper", hex: "#b45309" },
      { name: "Metallic Blue", hex: "#1d4ed8" },
    ],
    features: ["Traction control", "Single-channel ABS", "LED headlamp", "Bluetooth"],
  },
  {
    id: "aerox-155",
    name: "Aerox 155",
    category: "Scooter",
    tagline: "The maxi-sport scooter with R15 heart.",
    price: 150000,
    engine: "155cc, liquid-cooled, VVA",
    power: "15 PS @ 8,000 rpm",
    torque: "13.9 Nm @ 6,500 rpm",
    weight: "126 kg",
    topSpeed: "115 km/h",
    colors: [
      { name: "Racing Blue", hex: "#1d3fd8" },
      { name: "Silver", hex: "#94a3b8" },
    ],
    features: ["Smart key", "Traction control", "24.5L storage", "Stop & start system"],
  },
];

export const SHOWROOMS = [
  "Chennai - Anna Nagar",
  "Chennai - OMR",
  "Coimbatore - Avinashi Road",
  "Madurai - KK Nagar",
  "Bengaluru - Indiranagar",
  "Hyderabad - Banjara Hills",
];

export const SERVICE_TYPES = [
  { id: "general", name: "General Service", price: 999, desc: "Oil change, chain lube, brake check, 30-point inspection" },
  { id: "full", name: "Full Service", price: 2499, desc: "General service + air filter, spark plug, coolant top-up, wash" },
  { id: "repair", name: "Repair / Diagnosis", price: 499, desc: "Issue diagnosis by certified technicians (parts extra)" },
  { id: "track", name: "Track-Day Prep", price: 3999, desc: "Suspension setup, tyre pressure tuning, brake bleed, safety wiring" },
];

export const TIME_SLOTS = ["09:00 - 11:00", "11:00 - 13:00", "14:00 - 16:00", "16:00 - 18:00"];

export const getBike = (id: string) => BIKES.find((b) => b.id === id);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
