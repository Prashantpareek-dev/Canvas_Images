import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const PlusMinus = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const services = [
    { 
      category: "Creative Direction", 
      items: ["Art Direction", "Brand Strategy", "Visual Identity"] 
    },
    { 
      category: "Digital Design", 
      items: ["UI/UX Design", "Web Development", "Mobile Apps"] 
    },
    { 
      category: "Motion Graphics", 
      items: ["2D Animation", "3D Modeling", "Video Production"] 
    },
    { 
      category: "Interactive Media", 
      items: ["Canvas Animation", "WebGL", "AR/VR Experiences"] 
    },
    { 
      category: "Brand Experience", 
      items: ["Campaign Design", "Content Creation", "Social Media"] 
    },
    { 
      category: "Technology", 
      items: ["Custom Development", "API Integration", "Performance Optimization"] 
    }
  ];

  useGSAP(() => {
    gsap.fromTo(".service-item", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: "power3.out"
      }
    );
  }, []);

  const toggleService = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-8">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-4">Our Services</h2>
        <p className="text-xl text-gray-300">Comprehensive digital solutions for modern brands</p>
      </div>
      
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <div 
              className={`flex items-center justify-between p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                activeIndex === index ? 'bg-white/10 backdrop-blur-sm' : 'bg-white/5 hover:bg-white/8'
              }`}
              onClick={() => toggleService(index)}
            >
              <h3 className="text-2xl font-semibold text-white">{service.category}</h3>
              <div 
                className={`w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-white text-xl transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-45 bg-white text-black' : 'hover:bg-white hover:text-black'
                }`}
              >
                +
              </div>
            </div>
            
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {service.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className="p-4 bg-white/5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlusMinus;