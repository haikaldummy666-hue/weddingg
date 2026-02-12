import { useState, useEffect } from "react";

interface ScrollState {
  isScrolled: boolean;
  scrollY: number;
  direction: "up" | "down" | null;
}

export const useScrollAnimation = (threshold = 50): ScrollState => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    scrollY: 0,
    direction: null,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      
      setScrollState({
        isScrolled: currentScrollY > threshold,
        scrollY: currentScrollY,
        direction,
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollState;
};
