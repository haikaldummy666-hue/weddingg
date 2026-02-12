import { useState, useEffect, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { weddingConfig } from "@/config/wedding";
import { Heart } from "lucide-react";

// Lazy load heavy 3D component
const ElegantBackground = lazy(() => import("./3d/ElegantBackground"));

interface OpeningScreenProps {
  onOpen: () => void;
  onStartOpening?: () => void;
  guestName?: string;
}

export const OpeningScreen = ({ onOpen, onStartOpening, guestName }: OpeningScreenProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    setIsOpening(true);
    if (onStartOpening) onStartOpening();

    setTimeout(() => {
      onOpen();
    }, 2500); 
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
      isOpening ? "bg-transparent pointer-events-none" : "bg-black"
    }`}>
      
      {/* 3D ELEGANT BACKGROUND */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isOpening ? "opacity-0" : "opacity-100"}`}>
        <Suspense fallback={<div className="w-full h-full bg-background" />}>
            <ElegantBackground theme="mahogany" isOpening={isOpening} />
        </Suspense>
      </div>
      
      {/* Overlay Gradient for Text Readability */}
      <div className={`absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 z-10 transition-opacity duration-1000 ${isOpening ? "opacity-0" : "opacity-100"}`} />

      {/* MYSTICAL LIGHT BURST (Kept for transition but softer) */}
      <div 
        className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-all duration-[2500ms] ease-in-out ${
        isOpening ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={`w-[2px] h-full bg-gold shadow-[0_0_100px_60px_rgba(212,175,55,0.5)] transition-all duration-[2500ms] ease-in-out ${
            isOpening ? "scale-x-[500] opacity-0" : "scale-x-100 opacity-100"
        }`} />
      </div>

      {/* Content Container */}
      <div 
        className={`relative z-20 w-full h-full flex flex-col items-center justify-between py-12 md:py-20 transition-all duration-[2000ms] ease-in ${
          isOpening ? "opacity-0 scale-[1.5] translate-y-[20px] blur-sm" : "opacity-100 scale-100 translate-y-0 blur-0"
        }`}
      >
        

      
        {/* CINEMATIC ANIMATED FRAME (Carved Wood Style) */}
        <div className="absolute inset-4 md:inset-8 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Animated Golden Border Path */}
            <path 
              d="M5,5 L95,5 L95,95 L5,95 Z" 
              fill="none" 
              stroke="url(#goldGradient)"
              strokeWidth="0.5"
              className={`transition-all duration-[3000ms] ease-out ${mounted ? "opacity-100" : "opacity-0"}`}
              style={{ strokeDasharray: 400, strokeDashoffset: mounted ? 0 : 400, transition: "stroke-dashoffset 3s ease-out" }}
            />
            {/* Corner Flourishes */}
            <path d="M5,20 L5,5 L20,5" fill="none" stroke="#D4AF37" strokeWidth="1" />
            <path d="M95,20 L95,5 L80,5" fill="none" stroke="#D4AF37" strokeWidth="1" />
            <path d="M5,80 L5,95 L20,95" fill="none" stroke="#D4AF37" strokeWidth="1" />
            <path d="M95,80 L95,95 L80,95" fill="none" stroke="#D4AF37" strokeWidth="1" />
            
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#FFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Top Section: The Wedding Of (Elegant Fade) */}
        <div className="relative z-20 text-center animate-zoom-fade">
          <p className="text-sm md:text-base font-cinzel uppercase tracking-[0.3em] mb-2 drop-shadow-md text-gold/90">
            The Wedding Celebration Of
          </p>
          <div className="w-12 h-[1px] bg-gold mx-auto" />
        </div>
        
        {/* Middle Section: Names (Classic Elegant) */}
        <div className="relative z-20 text-center px-4 w-full">
          <div className="font-great-vibes text-6xl sm:text-7xl md:text-9xl mb-4 p-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] transition-all duration-[2000ms] text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer" style={{ clipPath: mounted ? 'inset(-20% -20% -20% -20%)' : 'inset(100% 0 0 0)' }}>
            {weddingConfig.bride.name}
          </div>
          
          <div className="flex items-center justify-center gap-6 my-2 opacity-90">
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <Heart className="text-gold fill-gold w-6 h-6 animate-pulse-glow" />
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
          </div>
          
          <div className="font-great-vibes text-6xl sm:text-7xl md:text-9xl mb-4 p-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] transition-all duration-[2000ms] delay-500 text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer" style={{ clipPath: mounted ? 'inset(-20% -20% -20% -20%)' : 'inset(100% 0 0 0)' }}>
             {weddingConfig.groom.name}
          </div>
        </div>

        {/* Bottom Section: Info & Button */}
        <div className="relative z-20 text-center w-full max-w-md mx-auto px-6">
           {/* Date Display */}
           <div className="flex items-center justify-center gap-4 mb-8 text-white/90 font-serif tracking-widest border-y border-gold/30 py-2">
             <span>{weddingConfig.resepsi.date.split(',')[1]}</span>
           </div>

          {/* Guest name */}
          {guestName && (
            <div className="mb-8 relative group">
               <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-gold/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <p className="text-xs text-gold/80 mb-2 uppercase tracking-widest">Dear Special Guest</p>
               <h3 className="font-serif text-3xl font-medium text-white drop-shadow-md">
                 {guestName}
               </h3>
            </div>
          )}
  
          {/* Open button */}
          <Button
            onClick={handleOpen}
            className="group relative w-full md:w-auto px-16 py-8 text-lg rounded-sm overflow-hidden transition-all duration-500 hover:scale-105 border border-gold/30 bg-black/20 hover:bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.1)]"
            variant="ghost"
          >
            {/* Button Shine Effect */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 group-hover:animate-shine" />
            
            <span className="relative z-10 flex flex-col items-center text-white font-serif tracking-[0.15em]">
              <span className="text-xl">BUKA UNDANGAN</span>
            </span>
            
            {/* Button Corner Borders */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold" />
          </Button>
        </div>
      </div>
    </div>
  );
};
