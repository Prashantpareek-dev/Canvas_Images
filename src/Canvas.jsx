import { useEffect, useRef, useState } from 'react';
import Images from './images';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Canvas = ({ details }) => {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;   
  const [index, setIndex] = useState({ value: startIndex });
  const canvasRef = useRef(null);
  const imageCache = useRef(new Map());

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      for (let i = startIndex; i < numImages; i++) {
        if (!imageCache.current.has(i)) {
          const img = new Image();
          img.src = Images[i];
          imageCache.current.set(i, img);
        }
      }
    };
    preloadImages();
  }, [startIndex, numImages]);

  useGSAP(() => {
    gsap.to(index, {
      value: numImages - 1,
      duration: duration,
      ease: 'none',
      repeat: -1,
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    });
  }, []);

  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const img = imageCache.current.get(index.value) || new Image();
    
    if (!imageCache.current.has(index.value)) {
      img.src = Images[index.value];
      imageCache.current.set(index.value, img);
    }
      
    const drawImage = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + 'px';
      canvas.style.height = canvas.offsetHeight + 'px';
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };

    if (img.complete) {
      drawImage();
    } else {
      img.onload = drawImage;
    }
  }, [index]);

  return (
    <canvas 
      ref={canvasRef} 
      className='absolute transition-all duration-1000 ease-out hover:scale-105' 
      data-scroll 
      data-scroll-speed={Math.random() * 2 - 1} // Random speed between -1 and 1
      style={{
        width: `${size}vh`, 
        height: `${size * 1.5}vh`,
        top: `${top}%`, 
        left: `${left}%`, 
        zIndex: zIndex,
        filter: 'brightness(0.9) contrast(1.1)',
        borderRadius: '8px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}
    />
  );
};

export default Canvas;