
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * AnimatedBackground uses SVG and CSS for a performant, visually appealing effect.
 */
function AnimatedBackground() {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-[#fff3e6] opacity-90 transition-all duration-1000" />
      {/* Animated SVG blob shapes */}
      <svg
        className="absolute left-[-20%] top-[-24%] w-[140vw] h-[80vw] opacity-70 animate-[move-blobs_16s_ease-in-out_infinite]"
        style={{
          filter: "blur(32px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
        viewBox="0 0 900 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bg-main" x1="0" x2="900" y1="0" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffe5c7" />
            <stop offset="1" stopColor="#ba5600" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <ellipse
          cx="300"
          cy="140"
          rx="290"
          ry="110"
          fill="url(#bg-main)"
        />
        <ellipse
          cx="670"
          cy="160"
          rx="180"
          ry="80"
          fill="#ff915313"
        />
        <ellipse
          cx="580"
          cy="80"
          rx="100"
          ry="48"
          fill="#ffc89e33"
        />
      </svg>
      {/* Keyframes for the blob SVG */}
      <style>
        {`@keyframes move-blobs {
          0%,100% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-12px) scale(1.03); }
          60% { transform: translateY(4px) scale(0.97); }
        }`}
      </style>
    </div>
  );
}

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-white">
      <AnimatedBackground />
      <main className="z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center gap-7 animate-fade-in">
        {/* Title */}
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 drop-shadow-sm">
          Office Transport Opt-In
        </h1>
        {/* Description */}
        <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto animate-fade-in opacity-80">
          Effortlessly join your daily office shuttle.
          <br />
          Pick your preferred route, tap to join, and ride—fast, easy, and made for your team.
        </p>
        {/* CTA Button */}
        <button
          className="mt-4 px-7 py-3 rounded-full bg-[#ba5600] text-white font-semibold text-lg shadow-lg ring-2 ring-primary/5 hover:bg-orange-700 active:bg-orange-800 hover:scale-105 transition-all duration-150 animate-button-pop focus:outline-none focus:ring-2 focus:ring-primary/70"
          onClick={() => navigate("/")}
        >
          Get Started
        </button>
      </main>
      {/* Footer: minimal */}
      <footer className="mt-12 text-xs text-gray-400 opacity-80 animate-fade-in">
        &copy; {new Date().getFullYear()} Office Transport • Made with <span className="text-[#ba5600] font-bold">♥</span>
      </footer>
    </div>
  );
};

export default Landing;
