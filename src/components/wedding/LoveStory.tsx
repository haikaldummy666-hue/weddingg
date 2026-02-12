import { useRef } from "react";
import { weddingConfig } from "@/config/wedding";
import { useInView } from "@/hooks/useInView";
import { Heart } from "lucide-react";

interface TimelineItemProps {
  item: typeof weddingConfig.loveStory[0];
  index: number;
  isLast: boolean;
}

const TimelineItem = ({ item, index, isLast }: TimelineItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex md:justify-center mb-24 last:mb-0 group ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Mobile Center Line (Hidden on Desktop) */}
      <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold via-gold/50 to-transparent md:hidden" />

      {/* Content Card */}
      <div 
        className={`relative w-full md:w-[45%] pl-12 md:pl-0 ${
          isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
        } transition-all duration-1000 ${
          isInView 
            ? "opacity-100 translate-x-0" 
            : isEven ? "opacity-0 -translate-x-20" : "opacity-0 translate-x-20"
        }`}
      >
        <div className="relative inline-block">
            {/* Date Tag */}
            <div className={`inline-block px-4 py-1 border border-gold/30 bg-black/40 backdrop-blur-md rounded-full mb-4 ${isEven ? "md:ml-auto" : "md:mr-auto"}`}>
                <span className="text-xs font-sans tracking-[0.2em] text-gold">{item.date}</span>
            </div>
            
            <h3 className="font-script text-4xl md:text-5xl text-white mb-4 drop-shadow-md">
                {item.title}
            </h3>
            
            <p className="font-serif text-white/70 leading-relaxed text-sm md:text-base border-t border-gold/20 pt-4">
                {item.description}
            </p>

            {/* Decorative Glow behind text */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-32 h-32 bg-gold/10 blur-3xl -z-10 rounded-full ${isEven ? "right-0" : "left-0"}`} />
        </div>
      </div>

      {/* Center Marker (Desktop) / Left Marker (Mobile) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
         {/* The Glowing Node */}
         <div className={`w-4 h-4 rounded-full bg-gold border-4 border-black shadow-[0_0_20px_#D4AF37] z-20 transition-all duration-700 delay-500 ${isInView ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} />
         
         {/* Pulse Effect */}
         <div className={`absolute w-12 h-12 rounded-full border border-gold/30 animate-ping opacity-50 ${isInView ? "block" : "hidden"}`} />
      </div>

      {/* Empty Space for Balance on Desktop */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
};

export const LoveStory = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} className="py-32 md:py-48 px-4 relative overflow-hidden bg-background">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20 mix-blend-overlay" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />

      {/* The Golden Thread (Central Line) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold to-transparent opacity-30 hidden md:block" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-24 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex justify-center mb-4">
             <Heart className="text-gold w-8 h-8 animate-pulse-slow fill-gold/20" />
          </div>
          <h2 className="font-script text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer mb-6">
            Our Journey
          </h2>
          <p className="font-serif text-white/60 tracking-widest uppercase text-xs md:text-sm max-w-md mx-auto">
            Every step that brought us here
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {weddingConfig.loveStory.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isLast={index === weddingConfig.loveStory.length - 1}
            />
          ))}
        </div>
        
        {/* Final "To Be Continued" */}
        <div className="text-center mt-24">
            <div className="inline-block px-8 py-3 border border-gold/30 bg-gold/5 rounded-full">
                <span className="font-serif text-gold text-lg italic">And so the adventure begins...</span>
            </div>
        </div>
      </div>
    </section>
  );
};
