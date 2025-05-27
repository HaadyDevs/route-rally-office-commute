
import React from "react";
import { cn } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

type Stop = {
  name: string;
  eta: string; // e.g., "8:03 AM"
  id: string;
};

type RouteCardProps = {
  name: string;
  description: string;
  joined: boolean;
  onJoin: () => void;
  loading: boolean;
  stops: Stop[];
};

export function RouteCard({
  name,
  description,
  joined,
  onJoin,
  loading,
  stops,
}: RouteCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2 border hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-2">
        <span className="block rounded-full bg-accent/20 p-2">
          <Calendar className="w-5 h-5 text-primary" />
        </span>
        <span className="font-semibold text-lg text-gray-900">{name}</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>

      {/* Stops & ETA list --------------- */}
      <div className="mb-2 mt-2">
        <ul className="flex flex-col gap-1">
          {stops.map((stop, idx) => (
            <li
              key={stop.id}
              className={cn(
                "flex items-center rounded px-2 py-1 justify-between bg-orange-50/50",
                "transition-colors duration-300",
                "animate-fade-in"
              )}
              style={{
                animationDelay: `${idx * 40}ms`,
              }}
            >
              <span className="flex flex-col w-2/3 min-w-0">
                <span className="truncate text-gray-700 text-sm font-medium">{stop.name}</span>
              </span>
              <span className="flex items-center gap-1 text-primary font-semibold text-[15px] transition-all duration-300">
                <Clock className="w-4 h-4 mr-1 -ml-[2px] text-primary/80 animate-pulse" />
                <span
                  className="tabular-nums"
                  style={{
                    transition: "color 0.25s, font-weight 0.3s",
                  }}
                >
                  {stop.eta}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex">
        <button
          className={cn(
            "flex-1 font-semibold py-2 rounded-lg flex items-center justify-center transition-all",
            "bg-primary text-white hover:bg-orange-700 active:bg-orange-800",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "shadow-none",
            "disabled:opacity-60 disabled:pointer-events-none",
            "animate-button-pop"
          )}
          type="button"
          onClick={onJoin}
          disabled={joined || loading}
          style={{
            animation: loading ? "button-pop 0.18s" : undefined,
            background: joined
              ? "#bbb"
              : "#ba5600",
            color: "white",
          }}
        >
          {joined ? (
            <span className="flex items-center gap-1">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mr-1" style={{ color: "#fff" }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              Joined
            </span>
          ) : loading ? (
            <span className="flex items-center gap-1">
              <svg className="animate-spin h-5 w-5 mr-1" viewBox="0 0 24 24">
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" fill="none" />
                <path className="opacity-70" fill="#fff" d="M4 12a8 8 0 018-8v4l2-2-2-2v4A8 8 0 014 12z" />
              </svg>
              Joining...
            </span>
          ) : (
            <span>I’m joining today</span>
          )}
        </button>
      </div>
    </div>
  );
}

