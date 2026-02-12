import { weddingConfig } from "@/config/wedding";
import { Heart } from "lucide-react";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-12 md:py-20 px-4 overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20 blur-sm scale-110"
        style={{ backgroundImage: `url('${weddingConfig.couplePhoto}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      
      {/* Decorative Gold Dust Particles (CSS) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse-slow" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24">
        
        {/* Left Column: Text (Desktop) / Top (Mobile) */}
        <div className="text-center md:text-right order-2 md:order-1 flex-1 space-y-4 md:space-y-6">
           <p className="text-xs md:text-sm font-sans uppercase tracking-[0.4em] text-gold/80 animate-fade-in">
            The Wedding Of
          </p>
          <h1 className="font-script text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer drop-shadow-lg">
            {weddingConfig.bride.name}
          </h1>
        </div>

        {/* Center: The Floating Royal Portrait */}
        <div className="order-1 md:order-2 relative group perspective-1000">
           {/* Back Glow */}
           <div className="absolute -inset-4 bg-gold/30 blur-2xl rounded-lg opacity-0 group-hover:opacity-60 transition-opacity duration-1000" />
           
           {/* Floating Container */}
           <div className="relative w-64 h-[24rem] md:w-80 md:h-[32rem] animate-float-slow transform-style-3d transition-transform duration-700 group-hover:rotate-y-6">
              
              {/* Gold Border Frame (Behind) */}
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-full h-full border-2 border-gold/40 rounded-sm z-0" />
              <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-full h-full border-2 border-gold/40 rounded-sm z-0" />

              {/* Main Image Card */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm p-2 border border-gold/50 shadow-2xl z-10">
                 <div className="relative w-full h-full overflow-hidden border border-gold/20">
                    <img
                      src={weddingConfig.couplePhoto}
                      alt="The Couple"
                      className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
                    />
                    {/* Inner Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    
                    {/* Watermark / Logo */}
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                       <div className="inline-block px-4 py-1 border-y border-gold/50 backdrop-blur-md">
                          <span className="text-[10px] tracking-[0.4em] text-gold uppercase">Est. 2026</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Corner Ornaments */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold z-20" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-gold z-20" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-gold z-20" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold z-20" />
           </div>
        </div>

        {/* Right Column: Text (Desktop) / Bottom (Mobile) */}
        <div className="text-center md:text-left order-3 flex-1 space-y-4 md:space-y-6">
           <div className="flex items-center justify-center md:justify-start gap-4 md:hidden">
              <div className="h-[1px] w-12 bg-gold/50" />
              <Heart className="text-gold w-4 h-4" />
              <div className="h-[1px] w-12 bg-gold/50" />
           </div>
           
           <h1 className="font-script text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer drop-shadow-lg" style={{ animationDelay: "1s" }}>
            {weddingConfig.groom.name}
          </h1>
           <p className="font-serif text-lg md:text-2xl tracking-widest text-white/80 border-t border-b border-gold/30 py-2 inline-block">
            {weddingConfig.resepsi.date}
          </p>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
         <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold to-transparent" />
      </div>
    </section>
  );
};
