import { useState, useEffect } from 'react';

export interface EnvironmentContext {
  locationType: 'urban' | 'wild';
  timeOfDay: 'morning' | 'day' | 'afternoon' | 'night';
  dimension: 'golden-hour' | 'city-lights' | 'midnight-serenity' | 'enchanted-garden';
}

export const useEnvironment = (): EnvironmentContext => {
  const [context, setContext] = useState<EnvironmentContext>({
    locationType: 'wild',
    timeOfDay: 'day',
    dimension: 'golden-hour',
  });

  useEffect(() => {
    // 1. Determine Time of Day
    const hour = new Date().getHours();
    let timeOfDay: EnvironmentContext['timeOfDay'] = 'day';
    if (hour >= 5 && hour < 11) timeOfDay = 'morning';
    else if (hour >= 11 && hour < 15) timeOfDay = 'day';
    else if (hour >= 15 && hour < 18) timeOfDay = 'afternoon';
    else timeOfDay = 'night';

    // 2. Determine Location (Mocked for demo, would use Reverse Geocoding in prod)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock logic: Use coordinate decimals to determine "urban" vs "wild" randomness
          const isUrban = (position.coords.latitude + position.coords.longitude) % 2 > 0.5;
          
          // Determine Singularity Dimension based on user data
          let dimension: EnvironmentContext['dimension'] = 'golden-hour';
        if (isUrban && timeOfDay === 'night') {
            dimension = 'city-lights'; 
        } else if (!isUrban && timeOfDay === 'night') {
            dimension = 'midnight-serenity'; 
        } else if (!isUrban && (timeOfDay === 'morning' || timeOfDay === 'day')) {
            dimension = 'enchanted-garden'; 
        } else {
             dimension = 'golden-hour'; 
        }

        setContext(prev => ({
          ...prev,
          timeOfDay,
          locationType: isUrban ? 'urban' : 'wild',
          dimension
        }));
        },
        (error) => {
          console.log("Geolocation permission denied or error, defaulting to wild.", error);
          setContext(prev => ({ ...prev, timeOfDay }));
        }
      );
    } else {
        setContext(prev => ({ ...prev, timeOfDay }));
    }
  }, []);

  return context;
};
