import { useState, useRef, useCallback, useEffect } from "react";

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  isMuted: boolean;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  toggleMute: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const useAudioPlayer = (src: string | null): UseAudioPlayerReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = useCallback(() => {
    if (audioRef.current && src) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Audio play failed:", error);
      });
    }
  }, [src]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.5;
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return {
    isPlaying,
    isMuted,
    toggle,
    play,
    pause,
    toggleMute,
    audioRef,
  };
};
