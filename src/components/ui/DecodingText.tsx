import React, { useState, useEffect, useRef } from 'react';

interface DecodingTextProps {
  text: string;
  className?: string;
  revealSpeed?: number; // ms per character
  scrambleSpeed?: number; // ms per update
  startDelay?: number;
  trigger?: boolean; // External trigger to start decoding
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&{}[]<>";

export const DecodingText: React.FC<DecodingTextProps> = ({ 
  text, 
  className = "", 
  revealSpeed = 50, 
  scrambleSpeed = 30,
  startDelay = 0,
  trigger = true
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const iterationRef = useRef(0);
  
  // Pad the initial display with random chars to match length
  useEffect(() => {
    setDisplayText(Array(text.length).fill(0).map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]).join(""));
  }, [text]);

  useEffect(() => {
    if (!trigger) return;

    const startDecoding = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setDisplayText(prev => {
          return text
            .split("")
            .map((char, index) => {
              if (index < iterationRef.current) {
                return text[index];
              }
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join("");
        });

        if (iterationRef.current >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        iterationRef.current += 1 / 3; // Slow down the reveal index increment relative to the scramble
      }, scrambleSpeed);
    };

    const timeout = setTimeout(startDecoding, startDelay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, trigger, startDelay, scrambleSpeed]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Scramble effect on hover
    let scrambleIter = 0;
    const scrambleInterval = setInterval(() => {
        setDisplayText(prev => 
            text.split("").map((char, index) => {
                if (index < text.length - scrambleIter) { // Scramble from right to left or random
                     return Math.random() > 0.5 ? CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)] : char;
                }
                return char;
            }).join("")
        );
        scrambleIter++;
        if (scrambleIter > 10) {
            clearInterval(scrambleInterval);
            setDisplayText(text); // Reset
        }
    }, 50);
  };

  return (
    <span 
        className={`${className} font-mono cursor-pointer transition-colors duration-300 ${isHovered ? 'text-gold' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
};
