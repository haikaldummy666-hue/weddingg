import { useEffect, useState, useMemo } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

export const FallingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals: Petal[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
      size: 0.2 + Math.random() * 0.3,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal absolute bg-gold rounded-full shadow-[0_0_5px_rgba(212,175,55,0.8)]"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s, ${petal.duration / 2}s`,
            width: `${petal.size}rem`,
            height: `${petal.size}rem`,
            opacity: petal.opacity,
          }}
        />
      ))}
    </div>
  );
};
