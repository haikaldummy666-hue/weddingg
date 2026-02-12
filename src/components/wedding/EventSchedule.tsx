import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

interface EventItemProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsLink: string;
  alignment: "left" | "right" | "center";
  delay?: number;
}

const EventItem = ({
  title,
  date,
  time,
  venue,
  address,
  mapsLink,
  alignment,
  delay = 0,
}: EventItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const isCenter = alignment === "center";

  return (
    <div
      ref={ref}
      className={`relative flex ${isCenter ? "justify-center" : "md:justify-center"} items-center w-full mb-16 md:mb-0 transition-all duration-1000 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Center Line Dot - Only for side alignments */}
      {!isCenter && (
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-gold rounded-full z-20 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
      )}

      {/* Content Card */}
      <div className={`w-full ${isCenter ? "max-w-3xl mx-auto" : "md:w-[45%]"} ${
        !isCenter ? (alignment === "left" ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12") : ""
      }`}>
        <Card className={`group overflow-hidden border-none shadow-none bg-transparent ${
          isCenter ? "text-center" : (alignment === "left" ? "md:text-right" : "md:text-left")
        } text-center`}>
          <CardContent className="p-0">
            <div className="inline-block mb-4 px-4 py-1 border border-gold/30 rounded-full bg-gold/5 backdrop-blur-sm">
               <span className="font-serif text-primary italic">{title}</span>
            </div>
            
            <h3 className="font-serif text-4xl md:text-5xl text-primary mb-4 leading-tight">
              {date.split(",")[1] || date}
            </h3>
            
            <p className="font-sans text-sm uppercase tracking-widest text-gold mb-6">
              {time}
            </p>

            <div className={`relative p-8 bg-white/50 backdrop-blur-md border border-white/40 shadow-xl rounded-sm transition-transform duration-500 group-hover:-translate-y-1 ${isCenter ? "max-w-2xl mx-auto" : ""}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
              
              <h4 className="font-serif text-xl font-bold text-primary mb-2">{venue}</h4>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {address}
              </p>
              
              <Button
                variant="outline"
                className="rounded-none border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 uppercase text-xs tracking-widest"
                asChild
              >
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mx-auto w-fit">
                  <MapPin className="w-3 h-3" />
                  Google Maps
                  <ArrowRight className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const EventSchedule = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  // Hardcoded data based on config to allow manual splitting if needed, or importing config

  return (
    <section id="acara" ref={ref} className="py-24 md:py-32 px-4 bg-primary/5 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-24 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="font-script text-4xl text-gold block mb-2">Save the Date</span>
          <h2 className="font-serif text-5xl md:text-7xl text-primary mb-6">
            Wedding Event
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line (Desktop) - Hidden for now as requested */}
          {/* <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gold/30 -translate-x-1/2" /> */}

          <div className="space-y-12 md:space-y-0">
            {/* 
            <EventItem
              title="Akad Nikah"
              date={weddingConfig.akad.date}
              time={weddingConfig.akad.time}
              venue={weddingConfig.akad.venue}
              address={weddingConfig.akad.address}
              mapsLink={weddingConfig.akad.mapsLink}
              alignment="left"
              delay={200}
            /> 
            */}
            
            <EventItem
              title="Resepsi Pernikahan"
              date={weddingConfig.resepsi.date}
              time={weddingConfig.resepsi.time}
              venue={weddingConfig.resepsi.venue}
              address={weddingConfig.resepsi.address}
              mapsLink={weddingConfig.resepsi.mapsLink}
              alignment="center"
              delay={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};