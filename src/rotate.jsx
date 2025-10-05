import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const text = 'THIRTYSIXSTUDIO — FOR ALL THINGS DIGITAL PRODUCTION —';
const textArray = text.split('');

const Rotate = () => {
  useGSAP(() => {
    gsap.to('.circular-text', {
      rotate: "360deg",
      duration: 20,
      opacity: 1,
      repeat: -1,
      ease: 'none',
    });

    // Hover effect for individual characters
    gsap.set('.char', { transformOrigin: 'center center' });
    
    document.querySelectorAll('.char').forEach((char, index) => {
      char.addEventListener('mouseenter', () => {
        gsap.to(char, {
          scale: 1.5,
          color: '#ff6b6b',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      char.addEventListener('mouseleave', () => {
        gsap.to(char, {
          scale: 1,
          color: '#ffffff',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  });

  return (
    <div className="circular-text-container relative">
      <div
        className="circular-text"
        style={{
          position: 'relative',
          width: '200px',
          height: '200px',
        }}
      >
        <div
          aria-label="THIRTYSIXSTUDIO — FOR ALL THINGS DIGITAL PRODUCTION —"
          style={{ 
            position: 'relative', 
            width: '100%',
            height: '100%',
            color: 'white' 
          }}
        >
          {textArray.map((char, index) => {
            const angle = (index / textArray.length) * 360;
            return (
              <span
                key={index}
                className="char absolute"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translateX(-50%) translateY(-50%) rotate(${angle}deg) translateY(-100px)`,
                  transformOrigin: 'center center',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rotate;