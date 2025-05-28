
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Enhanced AnimatedBackground with multiple layers and dynamic animations
 */
function AnimatedBackground() {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-[#fff3e6] opacity-90 transition-all duration-1000" />
      
      {/* Primary animated blob layer */}
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

      {/* Secondary floating elements */}
      <svg
        className="absolute right-[-10%] top-[20%] w-[60vw] h-[40vw] opacity-40 animate-[float-secondary_20s_ease-in-out_infinite_reverse]"
        style={{
          filter: "blur(24px)",
          zIndex: 1,
        }}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="150" cy="200" r="80" fill="#ba560015" />
        <circle cx="280" cy="120" r="60" fill="#ff915320" />
      </svg>

      {/* Tertiary subtle particles */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-[15%] left-[10%] w-3 h-3 bg-primary/20 rounded-full animate-[pulse-particle_8s_ease-in-out_infinite]"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute top-[25%] right-[15%] w-2 h-2 bg-orange-300/30 rounded-full animate-[pulse-particle_6s_ease-in-out_infinite]"
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute bottom-[30%] left-[20%] w-4 h-4 bg-primary/10 rounded-full animate-[pulse-particle_10s_ease-in-out_infinite]"
          style={{ animationDelay: '4s' }}
        />
        <div 
          className="absolute bottom-[20%] right-[25%] w-2.5 h-2.5 bg-orange-200/40 rounded-full animate-[pulse-particle_7s_ease-in-out_infinite]"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Enhanced keyframe animations */}
      <style>
        {`
          @keyframes move-blobs {
            0%, 100% { 
              transform: translateY(0) scale(1) rotate(0deg); 
              opacity: 0.7;
            }
            25% { 
              transform: translateY(-8px) scale(1.02) rotate(1deg); 
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-12px) scale(1.04) rotate(0deg); 
              opacity: 0.75;
            }
            75% { 
              transform: translateY(4px) scale(0.98) rotate(-1deg); 
              opacity: 0.8;
            }
          }

          @keyframes float-secondary {
            0%, 100% { 
              transform: translateX(0) translateY(0) scale(1); 
              opacity: 0.4;
            }
            33% { 
              transform: translateX(-15px) translateY(-10px) scale(1.05); 
              opacity: 0.5;
            }
            66% { 
              transform: translateX(10px) translateY(8px) scale(0.95); 
              opacity: 0.3;
            }
          }

          @keyframes pulse-particle {
            0%, 100% { 
              transform: scale(1) translateY(0);
              opacity: 0.3;
            }
            50% { 
              transform: scale(1.5) translateY(-5px);
              opacity: 0.6;
            }
          }

          @keyframes fade-in {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes button-pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.06); }
            100% { transform: scale(1); }
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }

          .animate-button-pop {
            animation: button-pop 0.18s cubic-bezier(0.4,0,0.6,1);
          }
        `}
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
