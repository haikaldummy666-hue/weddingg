import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { weddingConfig } from "@/config/wedding";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import {
  OpeningScreen,
  FallingPetals,
  HeroSection,
  QuranQuote,
  CoupleProfile,
  CountdownTimer,
  EventSchedule,
  LoveStory,
  PhotoGallery,
  RSVPSection,
  WeddingGift,
  ClosingSection,
  MusicPlayer,
  BottomNavigation,
} from "@/components/wedding";

import { GoldCursor } from "@/components/wedding/GoldCursor";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [isOpened, setIsOpened] = useState(false); // Controls if OpeningScreen is mounted/visible
  const [isAnimating, setIsAnimating] = useState(false); // Controls the "Zoom In" animation of main content
  const guestName = searchParams.get("to") || searchParams.get("guest") || undefined;
  
  const { play, audioRef } = useAudioPlayer(weddingConfig.backgroundMusic);

  const handleStartOpening = () => {
    setIsAnimating(true);
    // Play music immediately when animation starts
    if (weddingConfig.backgroundMusic) {
      play();
    }
  };

  const handleOpen = () => {
    setIsOpened(true);
  };

  // Prevent scroll when opening screen is visible
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpened]);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Custom Luxury Cursor */}
      <GoldCursor />

      {/* Hidden audio element for background music */}
      {weddingConfig.backgroundMusic && (
        <audio ref={audioRef} src={weddingConfig.backgroundMusic} loop />
      )}

      {/* Opening screen */}
      {!isOpened && (
        <OpeningScreen 
          onOpen={handleOpen} 
          onStartOpening={handleStartOpening}
          guestName={guestName} 
        />
      )}

      {/* Main content - Always rendered but animated */}
      <div className={`transition-all duration-[2500ms] ease-out ${
        isAnimating ? "scale-100 opacity-100 blur-0" : "scale-[0.8] opacity-0 blur-sm"
      }`}>
          {/* Falling petals effect */}
          <FallingPetals />

          {/* All sections */}
          <main className="pb-20">
            <HeroSection />
            <QuranQuote />
            <CoupleProfile />
            <CountdownTimer />
            <EventSchedule />
            <LoveStory />
            <PhotoGallery />
            <RSVPSection />
            <WeddingGift />
            <ClosingSection />
          </main>

          {/* Music player */}
          <MusicPlayer />

          {/* Bottom navigation */}
          <BottomNavigation />
      </div>
    </div>
  );
};

export default Index;
