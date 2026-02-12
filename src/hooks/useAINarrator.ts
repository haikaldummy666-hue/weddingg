import { useCallback, useEffect, useState } from 'react';

export const useAINarrator = () => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  const [rate, setRate] = useState(0.85); // Slower, more storytelling-like
  const [pitch, setPitch] = useState(1.0); // Natural pitch

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  const speak = useCallback((text: string, name?: string) => {
    if (!supported) return;

    // Cancel any current speech
    window.speechSynthesis.cancel();

    const personalizedText = name 
        ? text.replace('[Name]', name) 
        : text.replace('[Name]', 'Tamu Terhormat');

    const utterance = new SpeechSynthesisUtterance(personalizedText);
    
    // Select a suitable voice (prefer Indonesian or warm English)
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(v => v.lang.includes('id'));
    if (indonesianVoice) utterance.voice = indonesianVoice;
    
    utterance.rate = rate; 
    utterance.pitch = pitch; 

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [supported, rate, pitch]);

  const stop = useCallback(() => {
    if (supported) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [supported]);

  return { speak, stop, speaking, supported, setRate, setPitch };
};
