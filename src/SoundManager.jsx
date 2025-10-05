import React, { useRef, useEffect, useState } from 'react';

const SoundManager = ({ isMuted, setIsMuted }) => {
  const audioRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
      });

      // Start playing when loaded and not muted
      audio.addEventListener('loadeddata', () => {
        if (!isMuted) {
          audio.play().catch(e => console.log('Audio play failed:', e));
        }
      });
    }

    return () => {
      if (audio) {
        audio.removeEventListener('canplaythrough', () => {});
        audio.removeEventListener('loadeddata', () => {});
      }
    };
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isLoaded) {
      if (isMuted) {
        audio.pause();
      } else {
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
    }
  }, [isMuted, isLoaded]);

  return (
    <audio 
      ref={audioRef} 
      loop 
      preload="auto"
      style={{ display: 'none' }}
    >
      <source src="/world2.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default SoundManager;