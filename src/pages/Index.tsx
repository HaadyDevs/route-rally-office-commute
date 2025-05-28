
import React, { useState, useEffect } from "react";
import { RouteCard } from "../components/RouteCard";
import { Calendar } from "lucide-react";

// Define routes and stops (for demo)
const routesData = [
  {
    id: "1a",
    name: "North Campus Shuttle",
    description: "Departs 8:00 AM, stops at North/Main/IT Park",
    stops: [
      { id: "1a-a", name: "North Entrance" },
      { id: "1a-b", name: "Main Building" },
      { id: "1a-c", name: "IT Park" }
    ],
    baseDeparture: [8, 0], // [hour, minute]
  },
  {
    id: "2b",
    name: "Central Express",
    description: "Departs 8:15 AM, express to HQ only",
    stops: [
      { id: "2b-a", name: "Central Plaza" },
      { id: "2b-b", name: "HQ" },
    ],
    baseDeparture: [8, 15],
  },
  {
    id: "3c",
    name: "East Side Loop",
    description: "Departs 8:25 AM, stops at Eastside, Market, HQ",
    stops: [
      { id: "3c-a", name: "Eastside Flats" },
      { id: "3c-b", name: "Market Cross" },
      { id: "3c-c", name: "HQ" },
    ],
    baseDeparture: [8, 25],
  },
];

// Helper: generate a future time (adds mm minutes)
function addMinutes(base: [number, number], mm: number) {
  const dt = new Date();
  dt.setHours(base[0]);
  dt.setMinutes(base[1] + mm);
  return dt;
}

// Helper: format as "h:mm AM/PM"
function formatTime(dt: Date) {
  return dt
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/^0/, "");
}

// Mock ETA calculation: increment by 4–7 mins per stop; add some "live" noise per interval
function getSimulatedEtas(base: [number, number], stopCount: number, tick: number): string[] {
  return Array.from({ length: stopCount }).map((_, i) => {
    const offset = 4 + i * 3 + ((tick + i) % 2); // simulate "live" jitter
    const noise = ((tick + i * 17) % 3) - 1;
    const time = addMinutes(base, offset + noise);
    return formatTime(time);
  });
}

function getTodayDisplay() {
  const today = new Date();
  return today.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const Index = () => {
  const [joinedRoutes, setJoinedRoutes] = useState<{ [id: string]: boolean }>({});
  const [loading, setLoading] = useState<{ [id: string]: boolean }>({});
  // Live ETA state: { [routeId]: string[] }
  const [etas, setEtas] = useState<{ [routeId: string]: string[] }>({});
  // "Tick" for simulated API polling
  const [tick, setTick] = useState(0);

  // Simulate API polling for ETAs
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 4500); // update every 4.5s
    return () => clearInterval(interval);
  }, []);

  // Update ETAs whenever tick changes
  useEffect(() => {
    const nextEtas: { [routeId: string]: string[] } = {};
    for (const route of routesData) {
      nextEtas[route.id] = getSimulatedEtas(route.baseDeparture as [number, number], route.stops.length, tick);
    }
    setEtas(nextEtas);
  }, [tick]);

  // Handler for joining (locally, for now)
  const handleJoin = (routeId: string) => {
    setLoading((p) => ({ ...p, [routeId]: true }));
    setTimeout(() => {
      setLoading((p) => ({ ...p, [routeId]: false }));
      setJoinedRoutes((prev) => ({ ...prev, [routeId]: true }));
      if (typeof window !== "undefined") {
        // Optionally, use shadcn toast or sonner
        (window as any).toast?.({
          title: "Joined!",
          description: "You have joined this route for today.",
        });
      }
    }, 600); // Subtle delay for micro-animation
  };

  return (
    <main className="min-h-screen bg-white font-sans flex flex-col items-center px-2 py-5">
      {/* Date header */}
      <section className="w-full max-w-md mx-auto flex flex-col gap-2 items-center mb-6">
        <div className="flex items-center gap-2 mb-1 animate-fade-in">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2">
            <Calendar className="w-6 h-6 text-primary" />
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Office Transport • <span className="text-primary">{getTodayDisplay()}</span>
          </h1>
        </div>
        <p className="text-gray-500 text-sm">Select your transport for today. Tap “Join” below your preferred route!</p>
      </section>
      {/* List of routes */}
      <section className="w-full max-w-md space-y-5">
        {routesData.map((route) => (
          <RouteCard
            key={route.id}
            name={route.name}
            description={route.description}
            joined={!!joinedRoutes[route.id]}
            onJoin={() => handleJoin(route.id)}
            loading={!!loading[route.id]}
            stops={route.stops.map((stop, idx) => ({
              ...stop,
              eta: etas[route.id]?.[idx] || "--:--",
            }))}
          />
        ))}
      </section>
      {/* Footer: minimal, for mobile */}
      <footer className="mt-10 text-center text-xs text-gray-400">
        Made with <span className="text-primary font-bold">♥</span> by your office team.
      </footer>
    </main>
  );
};

export default Index;

