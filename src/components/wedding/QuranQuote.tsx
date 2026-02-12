import { useRef } from "react";
import { weddingConfig } from "@/config/wedding";
import { useInView } from "@/hooks/useInView";

export const QuranQuote = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-soft-pink/20 to-transparent" />
      
      <div
        className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Decorative top */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-2xl">❀</span>
          <div className="h-px w-16 bg-rose-gold-light" />
          <span className="text-rose-gold">☪</span>
          <div className="h-px w-16 bg-rose-gold-light" />
          <span className="text-2xl">❀</span>
        </div>

        {/* Arabic text */}
        <p className="font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed mb-6 direction-rtl">
          {weddingConfig.quranQuote.arabic}
        </p>

        {/* Translation */}
        <p className="font-serif text-base md:text-lg text-muted-foreground italic leading-relaxed mb-6">
          "{weddingConfig.quranQuote.translation}"
        </p>

        {/* Surah reference */}
        <p className="font-sans text-sm text-primary font-medium">
          — {weddingConfig.quranQuote.surah} —
        </p>

        {/* Decorative bottom */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="h-px w-8 bg-rose-gold-light" />
          <span className="text-xl text-rose-gold-light">✦</span>
          <div className="h-px w-8 bg-rose-gold-light" />
        </div>
      </div>
    </section>
  );
};
