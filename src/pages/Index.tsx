
import React, { useState } from "react";
import { RouteCard } from "../components/RouteCard";
import { Calendar } from "lucide-react";

const routesData = [
  {
    id: "1a",
    name: "North Campus Shuttle",
    description: "Departs 8:00 AM, stops at North/Main/IT Park",
  },
  {
    id: "2b",
    name: "Central Express",
    description: "Departs 8:15 AM, express to HQ only",
  },
  {
    id: "3c",
    name: "East Side Loop",
    description: "Departs 8:25 AM, stops at Eastside, Market, HQ",
  },
];

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

  // Handler for joining (locally, for now)
  const handleJoin = (routeId: string) => {
    setLoading((p) => ({ ...p, [routeId]: true }));
    setTimeout(() => {
      setLoading((p) => ({ ...p, [routeId]: false }));
      setJoinedRoutes((prev) => ({ ...prev, [routeId]: true }));
      if (typeof window !== "undefined") {
        // Optionally, use shadcn toast or sonner
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
