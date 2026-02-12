import { useRef } from "react";
import { weddingConfig } from "@/config/wedding";
import { useInView } from "@/hooks/useInView";

export const ClosingSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section
      ref={ref}
      className="py-32 md:py-48 px-4 relative overflow-hidden bg-primary text-primary-foreground"
    >
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      {/* Large Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-script text-[15rem] md:text-[25rem] text-white/5 whitespace-nowrap pointer-events-none blur-sm">
        Thank You
      </div>

      <div
        className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="w-1 h-24 bg-gradient-to-b from-transparent to-gold mx-auto mb-12" />

        <p className="font-serif text-xl md:text-2xl text-primary-foreground/90 mb-10 leading-relaxed max-w-2xl mx-auto italic">
          "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami."
        </p>
        
        <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold mb-16">
          Kami yang berbahagia
        </p>

        {/* Names */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-16">
          <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-white">
            {weddingConfig.bride.name}
          </h2>
          <span className="font-serif text-3xl text-gold italic">&</span>
          <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-white">
            {weddingConfig.groom.name}
          </h2>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-12 mt-12">
          <p className="font-sans text-xs text-white/40 tracking-widest">
            CREATED WITH LOVE FOR THE WEDDING OF {weddingConfig.bride.name.toUpperCase()} & {weddingConfig.groom.name.toUpperCase()}
          </p>
          <p className="font-sans text-xs text-gold/60 mt-2 tracking-widest">
            26 . 04 . 2026
          </p>
        </div>
      </div>
    </section>
  );
};