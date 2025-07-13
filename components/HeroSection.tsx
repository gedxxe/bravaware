
import React, { useMemo, useState, useEffect } from 'react';
import Button from './common/Button';
import { APP_NAME } from '../constants';
import VaraText from './common/VaraText';
import ShinyText from './common/ShinyText'; // Import the new ShinyText component

interface HeroSectionProps {
  onCTAClick: () => void;
  startAnimations: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCTAClick, startAnimations }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [elementsVisible, setElementsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)'); // Tailwind's md breakpoint is 768px
    const handleResize = () => setIsMobileView(mediaQuery.matches);
    
    handleResize(); // Set initial state
    mediaQuery.addEventListener('change', handleResize);
    
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const varaFontSettings = useMemo(() => ({
    fontSize: isMobileView ? 50 : 60,
    color: '#FFFFFF',
    strokeWidth: 0.7,
    duration: 2500,
    textAlign: isMobileView ? 'center' as 'center' : 'left' as 'left',
    letterSpacing: -3,
    x: isMobileView ? undefined : 10, 
  }), [isMobileView]);

  const varaContainerClassName = useMemo(() => {
    return `h-auto md:h-[100px] w-full flex items-center ${
      isMobileView ? 'justify-center' : 'justify-start' 
    }`;
  }, [isMobileView]);

  useEffect(() => {
    if (!startAnimations) {
      setElementsVisible(false);
      return;
    }
    // Start animations for subtitle and button after the VaraText title animation
    const animationStartDelay = (varaFontSettings.duration || 2500) - 500; // Start slightly before Vara fully finishes
    const timer = setTimeout(() => {
      setElementsVisible(true);
    }, animationStartDelay > 0 ? animationStartDelay : 0); // Ensure delay is not negative

    return () => clearTimeout(timer);
  }, [varaFontSettings.duration, startAnimations]);

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 py-16 sm:py-20 relative z-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Left Column: Text content & CTA */}
        <div className="md:w-1/2 lg:w-3/5 text-center md:text-left order-2 md:order-1">
          {startAnimations && (
            <VaraText
              id="hero-title-animation"
              text={APP_NAME}
              fontJsonUrl="https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json"
              fontSettings={varaFontSettings}
              containerClassName={varaContainerClassName}
            />
          )}
          {/* Subtitle - now using ShinyText, wrapped in a div for entrance animation */}
          <div className={`
            mt-2
            transition-all duration-1000 ease-out transform
            ${elementsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
          `}>
            <ShinyText
              tag="p" // Render as a paragraph element
              text="Advanced Breast Cancer Detection with Deep Learning Architecture."
              speed={8} // Adjust speed as desired (seconds per shine cycle)
              // Apply original subtitle styling (font size, max-width, margins) to ShinyText
              className="text-xl sm:text-2xl max-w-xl mx-auto md:mx-0" 
              baseTextColorClass="text-[#819A91]" // Base text color set to #819A91
            />
          </div>
          
          <div className={`
            mt-10 flex justify-center md:justify-start
            transition-all duration-1000 ease-out transform delay-300 
            ${elementsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
          `}>
            <Button 
              onClick={onCTAClick} 
              variant="primary" 
              size="lg"
              className="shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30 transform hover:scale-105"
              aria-label="Try the AI Demo"
            >
              Try the AI Demo
            </Button>
          </div>
        </div>

        {/* Right Column: Awareness Ribbon Logo */}
        <div className="md:w-[50%] flex items-center justify-center md:justify-end md:pr-4 lg:pr-8 order-1 md:order-2 py-0 md:py-0">
          <img
            src="https://i.imgur.com/pkI51sb.png" 
            alt="Bravaware Awareness Ribbon Logo"
            className="w-84 sm:w-50 md:w-170 h-auto drop-shadow-xl" 
          />
        </div>
      </div>
      
      {/* Scroll Down Arrow - kept at the bottom of the section */}
      <div className="absolute inset-x-0 bottom-2 flex justify-center items-center animate-bounce opacity-70">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
