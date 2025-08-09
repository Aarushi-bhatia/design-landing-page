import React, { useState, useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isCursorExpanded, setIsCursorExpanded] = useState(false);
  // State for cursor position
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative bg-white min-h-screen">
      {/* Custom cursor */}
      <div 
        className="fixed rounded-full bg-black mix-blend-difference z-50 pointer-events-none"
        style={{
          width: isCursorExpanded ? '80px' : '20px',
          height: isCursorExpanded ? '80px' : '20px',
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) translate(-50%, -50%)`,
          transition: 'width 0.3s ease, height 0.3s ease'
        }}
      />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40">
        <div 
          className="text-2xl font-normal"
          onMouseEnter={() => setIsCursorExpanded(true)}
          onMouseLeave={() => setIsCursorExpanded(false)}
        >
          cuberto
        </div>
        
        <div className="flex items-center">
          <span 
            className="mr-4 text-lg font-normal"
            onMouseEnter={() => setIsCursorExpanded(true)}
            onMouseLeave={() => setIsCursorExpanded(false)}
          >
            menu
          </span>
          <div 
            className="w-8 h-8 cursor-pointer flex flex-col justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={() => setIsCursorExpanded(true)}
            onMouseLeave={() => setIsCursorExpanded(false)}
          >
            <div className={`w-8 h-0.5 bg-black mb-1.5 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-8 h-0.5 bg-black transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-8 h-0.5 bg-black mt-1.5 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </div>
        </div>
      </header>
      
      {/* Full screen menu */}
      <div 
        className={`fixed inset-0 bg-white z-30 flex flex-col justify-center items-center transition-transform duration-500 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <nav className="text-6xl font-light flex flex-col space-y-6">
          {["Work", "About", "Services", "Contact"].map((item, index) => (
            <div 
              key={index}
              className="cursor-pointer hover:text-gray-500 transition-colors duration-300"
              onMouseEnter={() => setIsCursorExpanded(true)}
              onMouseLeave={() => setIsCursorExpanded(false)}
            >
              {item}
            </div>
          ))}
        </nav>
      </div>
      
      {/* Main content */}
      <main className="relative pt-32 px-8 md:px-16 lg:px-24">
        
        {/* Hero section with tagline */}
        <div className="flex flex-col">
          <h1 
            className="text-4xl md:text-4xl lg:text-7xl font-light leading-tight"
            onMouseEnter={() => setIsCursorExpanded(true)}
            onMouseLeave={() => setIsCursorExpanded(false)}
          >
            <div className="font-semibold">We are a digital</div>
            <div className="flex items-center">
              <div className="w-24 h-14 md:w-32 md:h-32 lg:w-35 lg:h-20 bg-gray-100 rounded-full mr-4 md:mr-6 lg:mr-8 relative overflow-hidden">  
              </div>
              <div className="italic">design </div><div className="font-semibold ml-5">  and</div> 
            </div>
            <div className="font-semibold">motion agency</div>
          </h1>
        </div>
        
        {/* Contact button */}
        <div 
          className="fixed bottom-8 right-8 w-32 h-32 rounded-full flex items-center justify-center"
          onMouseEnter={() => setIsCursorExpanded(true)}
          onMouseLeave={() => setIsCursorExpanded(false)}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/api/placeholder/80/80" 
                alt="Avatar" 
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            {/* Rotating text */}
        <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transform: `rotate(${rotation}deg)` }}>
          <path
            id="curve"
            d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0"
            fill="transparent"
          />
          <text dy="5" className="text-xs leading-tight font-medium text-gray-500">
            <textPath xlinkHref="#curve" startOffset="0%">
              contact · contact{" "}{" "} {" "} {" "}·  contact ·  contact · 
            </textPath>
          </text>
        </svg>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-8 bg-gray-200 z-10">
        {/* Empty footer for now, as per screenshot */}
      </footer>
    </div>
  );
};

export default Hero;