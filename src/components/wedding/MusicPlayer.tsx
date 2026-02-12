import { weddingConfig } from "@/config/wedding";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export const MusicPlayer = () => {
  const { isPlaying, isMuted, toggle, toggleMute, audioRef } = useAudioPlayer(
    weddingConfig.backgroundMusic
  );

  // Don't render if no music is configured
  if (!weddingConfig.backgroundMusic) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} src={weddingConfig.backgroundMusic} />
      
      <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-gold shadow-lg hover:bg-gold/20 hover:border-gold transition-all duration-300 animate-pulse-soft"
          onClick={toggle}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-primary" />
          ) : (
            <Play className="w-5 h-5 text-primary ml-0.5" />
          )}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-gold shadow-lg hover:bg-gold/20 hover:border-gold transition-all duration-300"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-primary" />
          ) : (
            <Volume2 className="w-5 h-5 text-primary" />
          )}
        </Button>
      </div>
    </>
  );
};
