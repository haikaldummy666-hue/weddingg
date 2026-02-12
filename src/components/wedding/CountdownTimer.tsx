import { useRef } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { useInView } from "@/hooks/useInView";

interface CountdownBoxProps {
  value: number;
  label: string;
}

const CountdownBox = ({ value, label }: CountdownBoxProps) => (
  <div className="flex flex-col items-center group">
    <div className="w-16 h-16 md:w-20 md:h-20 glass-card rounded-xl flex items-center justify-center mb-2 shadow-lg group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-gold/30 transition-all duration-300">
      <span className="font-serif text-2xl md:text-3xl font-semibold text-primary group-hover:scale-110 transition-transform duration-300">
        {value.toString().padStart(2, "0")}
      </span>
    </div>
    <span className="text-xs md:text-sm font-sans uppercase tracking-wider text-primary/70">
      {label}
    </span>
  </div>
);

export const CountdownTimer = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const { days, hours, minutes, seconds, isExpired } = useCountdown();

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-primary/5" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-multiply" />
      
      <div
        className={`relative z-10 max-w-2xl mx-auto text-center transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="font-script text-4xl md:text-5xl text-primary mb-4 drop-shadow-sm">
          Menghitung Hari
        </h2>
        
        <p className="font-serif text-primary/80 mb-10 tracking-wide">
          Menuju hari bahagia kami
        </p>

        {isExpired ? (
          <div className="glass-card p-8 rounded-2xl border border-gold/50">
            <p className="font-script text-3xl text-primary">
              Hari Bahagia Telah Tiba! ✨
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 md:gap-6">
            <CountdownBox value={days} label="Hari" />
            <span className="text-2xl text-gold font-light mt-[-1.5rem] animate-pulse">:</span>
            <CountdownBox value={hours} label="Jam" />
            <span className="text-2xl text-gold font-light mt-[-1.5rem] animate-pulse">:</span>
            <CountdownBox value={minutes} label="Menit" />
            <span className="text-2xl text-gold font-light mt-[-1.5rem] animate-pulse">:</span>
            <CountdownBox value={seconds} label="Detik" />
          </div>
        )}

        {/* Decorative bottom */}
        <div className="flex items-center justify-center gap-4 mt-12 opacity-60">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-gold to-transparent" />
        </div>
      </div>
    </section>
  );
};
