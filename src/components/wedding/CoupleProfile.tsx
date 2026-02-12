import { weddingConfig } from "@/config/wedding";
import { Instagram } from "lucide-react";

export const CoupleProfile = () => {
  return (
    <section className="py-16 md:py-24 px-4 overflow-hidden relative">
      {/* Luxury Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      {/* Giant Watermark Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-5 pointer-events-none whitespace-nowrap">
        <h1 className="font-script text-[10rem] md:text-[20rem] text-gold animate-float-slow">Love</h1>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-24 relative">
          <p className="text-xs md:text-sm font-sans uppercase tracking-[0.5em] text-gold mb-4">Groom & Bride</p>
          <h2 className="font-serif text-3xl md:text-6xl text-white">The Happy Couple</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </div>

        {/* Editorial Layout - The "Vogue" Style */}
        <div className="flex flex-col gap-20 md:gap-32">
          
          {/* BRIDE SECTION - Left Aligned */}
          <div className="relative group">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-12">
              
              {/* Photo Area with Floating Elements */}
              <div className="relative w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="relative w-64 md:w-80">
                     {/* Decorative Box Behind */}
                     <div className="absolute -top-6 -left-6 w-full h-full border border-gold/30 -z-10 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2" />
                     
                     {/* Image Container */}
                     <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
                        <div className="absolute inset-0 bg-gold/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img 
                          src={weddingConfig.bride.photo} 
                          alt={weddingConfig.bride.name}
                          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 filter sepia-[0.2]"
                        />
                     </div>

                     {/* Floating Name (Overlapping) */}
                     <h2 className="absolute -bottom-4 right-0 md:-bottom-6 md:-right-16 font-script text-5xl md:text-7xl text-gold drop-shadow-lg z-20 mix-blend-screen opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 translate-y-0 md:translate-y-6 md:group-hover:translate-y-0">
                        {weddingConfig.bride.name}
                     </h2>
                </div>
              </div>

              {/* Text Info Area */}
              <div className="w-full md:w-1/2 text-center md:text-left md:pl-8">
                 <div className="inline-block border-b border-gold/50 pb-2 mb-4">
                    <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-white/60">THE BRIDE</span>
                 </div>
                 <h3 className="font-serif text-2xl md:text-4xl text-white mb-4 leading-tight">
                    {weddingConfig.bride.fullName}
                 </h3>
                 <p className="font-sans text-white/70 leading-relaxed mb-6 font-light text-sm md:text-base">
                    Putri dari Pasangan <br />
                    <span className="text-gold font-serif text-lg">{weddingConfig.bride.father}</span> <br />
                    & <br />
                    <span className="text-gold font-serif text-lg">{weddingConfig.bride.mother}</span>
                 </p>
              </div>
            </div>
          </div>

          {/* GROOM SECTION - Right Aligned (Reversed) */}
          <div className="relative group">
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-12">
              
              {/* Photo Area */}
              <div className="relative w-full md:w-1/2 flex justify-center md:justify-start">
                <div className="relative w-64 md:w-80">
                     {/* Decorative Box Behind */}
                     <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold/30 -z-10 transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2" />
                     
                     {/* Image Container */}
                     <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
                        <div className="absolute inset-0 bg-gold/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img 
                          src={weddingConfig.groom.photo} 
                          alt={weddingConfig.groom.name}
                          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 filter sepia-[0.2]"
                        />
                     </div>

                     {/* Floating Name (Overlapping) */}
                     <h2 className="absolute -top-4 left-0 md:-top-6 md:-left-16 font-script text-5xl md:text-7xl text-gold drop-shadow-lg z-20 mix-blend-screen opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 translate-y-0 md:-translate-y-6 md:group-hover:translate-y-0">
                        {weddingConfig.groom.name}
                     </h2>
                </div>
              </div>

              {/* Text Info Area */}
              <div className="w-full md:w-1/2 text-center md:text-right md:pr-8">
                 <div className="inline-block border-b border-gold/50 pb-2 mb-4">
                    <span className="font-sans text-xs tracking-[0.4em] text-white/60">THE GROOM</span>
                 </div>
                 <h3 className="font-serif text-2xl md:text-4xl text-white mb-4 leading-tight">
                    {weddingConfig.groom.fullName}
                 </h3>
                 <p className="font-sans text-white/70 leading-relaxed mb-6 font-light text-sm md:text-base">
                    Putra dari Pasangan <br />
                    <span className="text-gold font-serif text-lg">{weddingConfig.groom.father}</span> <br />
                    & <br />
                    <span className="text-gold font-serif text-lg">{weddingConfig.groom.mother}</span>
                 </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
