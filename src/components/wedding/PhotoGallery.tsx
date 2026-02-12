import { useRef, useState } from "react";
import { weddingConfig } from "@/config/wedding";
import { useInView } from "@/hooks/useInView";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PhotoGallery = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? weddingConfig.gallery.length - 1 : selectedIndex - 1
      );
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === weddingConfig.gallery.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  return (
    <section id="galeri" ref={ref} className="py-24 md:py-32 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <span className="font-script text-3xl text-gold mb-2 block">Our Memories</span>
            <h2 className="font-serif text-5xl md:text-6xl text-primary leading-none">
              Captured Moments
            </h2>
          </div>
          <div className="max-w-xs text-muted-foreground font-sans text-sm tracking-wide leading-relaxed md:text-right">
             Setiap detik bersamamu adalah memori indah yang ingin kuabadikan selamanya.
          </div>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {weddingConfig.gallery.map((photo, index) => {
            // Create an interesting masonry pattern
            // First item large, others vary
            const isLarge = index === 0 || index === 5;
            const isWide = index === 3;
            // Adjust layout for 7 items to be "pas"
            // Item 6 (index 6) will be normal 1x1 to fill the gap left by Item 5 (2x2) in a 3-col grid
            const colSpan = isLarge ? "md:col-span-2 md:row-span-2" : isWide ? "md:col-span-2" : "md:col-span-1";
            
            return (
              <div
                key={index}
                className={`relative overflow-hidden group cursor-pointer ${colSpan} rounded-sm`}
                style={{ 
                  transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  transitionDelay: `${index * 100}ms`,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(40px)"
                }}
                onClick={() => openLightbox(index)}
              >
                <div className="absolute inset-0 bg-primary/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <img
                  src={photo}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale-[0.2] group-hover:grayscale-0"
                />
                
                {/* Hover Content */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/50 flex items-center justify-center text-white">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
                
                {/* Border effect */}
                <div className="absolute inset-4 border border-white/30 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 z-10 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-primary hover:bg-primary/10 z-50 rounded-full w-12 h-12"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/10 z-50 rounded-full w-12 h-12 hidden md:flex"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:bg-primary/10 z-50 rounded-full w-12 h-12 hidden md:flex"
            onClick={goToNext}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          <div className="relative max-w-5xl w-full max-h-[85vh] aspect-[3/4] md:aspect-[16/9] shadow-2xl overflow-hidden rounded-sm" onClick={(e) => e.stopPropagation()}>
            <img
              src={weddingConfig.gallery[selectedIndex]}
              alt="Gallery Preview"
              className="w-full h-full object-contain bg-black/5"
            />
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 text-center text-primary font-sans text-sm tracking-widest">
            {selectedIndex + 1} / {weddingConfig.gallery.length}
          </div>
        </div>
      )}
    </section>
  );
};