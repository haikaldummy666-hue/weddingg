import { useEffect, useState } from "react";

export const GoldCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      setTrail((prev) => [...prev.slice(-15), newPoint]); // Keep last 15 points
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Main Cursor Glow */}
      <div 
        className="fixed w-8 h-8 rounded-full border border-gold/50 bg-gold/10 backdrop-blur-sm -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out z-50 pointer-events-none"
        style={{ left: position.x, top: position.y }}
      />
      
      {/* Center Dot */}
      <div 
        className="fixed w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#D4AF37] -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        style={{ left: position.x, top: position.y }}
      />

      {/* Magical Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed w-1 h-1 rounded-full bg-gold/60"
          style={{
            left: point.x,
            top: point.y,
            transform: `scale(${1 - index / trail.length})`,
            opacity: index / trail.length,
            transition: "opacity 0.5s",
          }}
        />
      ))}
    </div>
  );
};