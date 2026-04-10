import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { weddingConfig } from "@/config/wedding";
import { useInView } from "@/hooks/useInView";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PhotoGallery = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightboxImageError, setLightboxImageError] = useState(false);

  const selectedPhoto = useMemo(() => {
    if (selectedIndex === null) return null;
    return weddingConfig.gallery[selectedIndex] ?? null;
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    if (typeof window === "undefined") return;
    if (typeof document === "undefined") return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    const scrollY = window.scrollY;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = previousOverflow;
      body.style.position = previousPosition;
      body.style.top = previousTop;
      body.style.width = previousWidth;

      const topValue = Number.parseInt(previousTop || "0", 10);
      const restoredScrollY = Number.isFinite(topValue) ? -topValue : scrollY;
      window.scrollTo(0, restoredScrollY);
    };
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    if (selectedPhoto === null) {
      setSelectedIndex(null);
      return;
    }

    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
        return;
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((current) => {
          if (current === null) return current;
          return current === 0 ? weddingConfig.gallery.length - 1 : current - 1;
        });
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((current) => {
          if (current === null) return current;
          return current === weddingConfig.gallery.length - 1 ? 0 : current + 1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, selectedPhoto]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const current = weddingConfig.gallery[selectedIndex];
    if (!current) return;

    const nextIndex =
      selectedIndex === weddingConfig.gallery.length - 1 ? 0 : selectedIndex + 1;
    const prevIndex =
      selectedIndex === 0 ? weddingConfig.gallery.length - 1 : selectedIndex - 1;

    const preload = (src: string | undefined) => {
      if (!src) return;
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    };

    preload(current);
    preload(weddingConfig.gallery[nextIndex]);
    preload(weddingConfig.gallery[prevIndex]);
  }, [selectedIndex]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxImageError(false);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setLightboxImageError(false);
  };

  const goToPrevious = (e: MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? weddingConfig.gallery.length - 1 : selectedIndex - 1
      );
    }
  };

  const goToNext = (e: MouseEvent) => {
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
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale-[0.2] group-hover:grayscale-0"
                />
                
                {/* Hover Content */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                  <div className="w-16 h-16 rounded-full bg-background/60 backdrop-blur-md border border-border/60 flex items-center justify-center text-foreground">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
                
                {/* Border effect */}
                <div className="absolute inset-4 border border-border/60 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 z-10 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && selectedPhoto !== null && (
        <div
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-none md:backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in overscroll-contain"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-primary hover:bg-primary/10 z-50 rounded-full w-12 h-12"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
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
            {lightboxImageError ? (
              <div className="w-full h-full bg-background flex items-center justify-center px-6 text-center">
                <div className="space-y-4">
                  <div className="font-serif text-xl text-foreground">Gagal memuat foto</div>
                  <div className="text-sm text-muted-foreground">
                    Coba ulangi, atau buka foto berikutnya.
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImageError(false);
                      }}
                    >
                      Coba lagi
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImageError(false);
                        setSelectedIndex((current) => {
                          if (current === null) return current;
                          return current === weddingConfig.gallery.length - 1
                            ? 0
                            : current + 1;
                        });
                      }}
                    >
                      Foto berikutnya
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={selectedPhoto}
                alt="Gallery Preview"
                loading="eager"
                decoding="async"
                onError={() => setLightboxImageError(true)}
                className="w-full h-full object-contain bg-background"
              />
            )}
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 text-center text-primary font-sans text-sm tracking-widest">
            {selectedIndex + 1} / {weddingConfig.gallery.length}
          </div>
        </div>
      )}
    </section>
  );
};
