import React, { useEffect, useState, useRef } from "react";
import Canvas from "./Canvas";
import Data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import Rotate from "./rotate";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import PlusMinus from "./PlusMinus";
import SoundManager from "./SoundManager";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [showCanvas, setShowCanvas] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Start muted to avoid autoplay issues
  const scrollRef = useRef(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-reveal',
      smartphone: {
        smooth: true
      },
      tablet: {
        smooth: true
      }
    });

    // Update ScrollTrigger when locomotive scroll updates
    scroll.on('scroll', ScrollTrigger.update);
    
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: scrollRef.current.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  // Sound effect functions
  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  useGSAP(() => {
    // Custom cursor animation
    const cursor = document.querySelector('.cursor');
    
    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    // Hero section animations
    gsap.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.5
    });

    gsap.from(".hero-subtitle", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      delay: 1
    });

    // Navigation animation
    gsap.from(".nav", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      delay: 0.2
    });

    // Canvas entrance animation
    gsap.from(".canvas-container", {
      scale: 0.8,
      opacity: 0,
      duration: 2,
      ease: 'power4.out',
      delay: 1.5
    });

    // Scroll trigger for sections
    gsap.utils.toArray('.section').forEach((section, i) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);
  return (
    <div ref={scrollRef} data-scroll-container>
      {/* Sound Manager */}
      <SoundManager isMuted={isMuted} setIsMuted={setIsMuted} />

      {/* Custom Cursor */}
      <div className='cursor fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-50 mix-blend-difference'></div>

      {/* Navigation */}
      <div className="nav fixed top-0 w-full py-4 px-8 z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-xl font-bold text-white">ThirtySixStudio</div>
          <ul className="hidden md:flex gap-8 text-white">
            <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">What We Do</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">What We Are</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">How We Give Back</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">Talk To Us</a></li>
          </ul>
          <button 
            onClick={toggleSound}
            className="w-10 h-10 border-2 border-gray-600 rounded-full flex items-center justify-center text-white hover:border-white transition-colors duration-300"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden" data-scroll-section>
        <div className="text-center text-white z-20 relative">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6">
            THIRTYSIX
            <br />
            STUDIOS
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Digital production studio specializing in creative visual experiences
          </p>
          <div className="hero-cta">
            <button className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full">
              Explore Our Work
            </button>
          </div>
        </div>
        
        {/* Rotating text element */}
        <div className="absolute top-1/2 right-20 transform -translate-y-1/2">
          <Rotate />
        </div>
      </section>

      {/* Canvas Animation Sections */}
      <section className="section canvas-container min-h-screen relative" data-scroll-section>
        <div className="absolute top-10 left-10 text-white z-30">
          <h2 className="text-4xl font-bold mb-4">Creative Canvas</h2>
          <p className="text-lg max-w-md">Experience our dynamic visual storytelling through interactive canvas animations</p>
        </div>
        <div className="relative h-screen w-full flex flex-wrap gap-4">
          {showCanvas && Data[0].map((item, index) => (
            <Canvas key={index} details={item} />
          ))}
        </div>
      </section>

      <section className="section min-h-screen relative" data-scroll-section>
        <div className="absolute top-10 right-10 text-white z-30 text-right">
          <h2 className="text-4xl font-bold mb-4">Digital Artistry</h2>
          <p className="text-lg max-w-md">Pushing boundaries in digital design and motion graphics</p>
        </div>
        <div className="relative h-screen w-full flex flex-nowrap gap-4">
          {Data[0].map((item, index) => (
            <Canvas key={index} details={item} />
          ))}
        </div>
      </section>

      <section className="section min-h-screen relative" data-scroll-section>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-30 text-center">
          <h2 className="text-5xl font-bold mb-6">Innovation in Motion</h2>
          <p className="text-xl max-w-2xl">Where creativity meets technology to create unforgettable digital experiences</p>
        </div>
        <div className="relative h-screen w-full flex flex-nowrap gap-4">
          {Data[1].map((item, index) => (
            <Canvas key={index} details={item} />
          ))}
        </div>
      </section>

      <section className="section min-h-screen relative" data-scroll-section>
        <div className="relative h-screen w-full flex flex-nowrap gap-4">
          {Data[2].map((item, index) => (
            <Canvas key={index} details={item} />
          ))}
        </div>
        
        {/* Enhanced Plus/Minus Section */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PlusMinus />
        </div>

        {/* Main studio title overlay */}
        <div className="absolute bottom-20 left-0 right-0 text-center text-white border-b-2 border-gray-700">
          <h1 className="text-[8vw] md:text-[12vw] font-bold leading-none">ThirtySixStudios</h1>
        </div>
      </section>

      {/* Footer Section */}
      <section className="section min-h-screen bg-black text-white flex items-center justify-center" data-scroll-section>
        <div className="text-center max-w-4xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-8">Ready to Create Something Amazing?</h2>
          <p className="text-xl mb-12">Let's bring your vision to life with cutting-edge digital production</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors duration-300 rounded-full font-semibold">
              Start a Project
            </button>
            <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full font-semibold">
              View Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
