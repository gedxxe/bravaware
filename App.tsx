
import React, { useRef, useState } from 'react';
import HeroSection from './components/HeroSection';
import InteractiveToolSection from './components/InteractiveToolSection';
import AboutUsSection from './components/AboutUsSection';
import FooterSection from './components/FooterSection';
import BackgroundOrbs from './components/BackgroundOrbs';
import WhyItMattersSection from './components/WhyItMattersSection';
import SDGsSection from './components/SDGsSection';
import Header from './components/Header';
import Preloader from './components/Preloader';
import ArchitectureModal from './components/ArchitectureModal';

const App: React.FC = () => {
  const [isPreloading, setIsPreloading] = useState(true);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const interactiveToolRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const sdgsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null); // This will now point to the footer

  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    // The block 'start' ensures the top of the element aligns with the top of the viewport.
    // The padding/margin trick in the JSX handles the offset for the fixed header.
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const scrollToInteractiveTool = () => {
    interactiveToolRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePreloaderFinish = () => {
    setIsPreloading(false);
    // Add a delay before starting the main page animations
    setTimeout(() => {
      setAnimationsReady(true);
    }, 500); // 500ms pause
  };

  return (
    <>
      {isPreloading && <Preloader onLoaded={handlePreloaderFinish} />}

      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      <div className="relative min-h-screen overflow-x-hidden bg-[#0A0F1E] text-white">
        <BackgroundOrbs />
        
        <Header
          onMissionClick={() => handleScrollTo(missionRef)}
          onSdgsClick={() => handleScrollTo(sdgsRef)}
          onAboutClick={() => handleScrollTo(aboutRef)}
          onContactClick={() => handleScrollTo(contactRef)} // Points to footer
          onArchitectureClick={() => setIsArchitectureModalOpen(true)}
        />
        
        <div className="relative z-10">
          <HeroSection onCTAClick={scrollToInteractiveTool} startAnimations={animationsReady} />
          
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24 sm:space-y-32">
            <div ref={interactiveToolRef}>
              <InteractiveToolSection />
            </div>
            {/* The pt-24 and -mt-24 create an offset for the scroll target, so the title isn't hidden by the fixed header */}
            <div ref={missionRef} className="pt-24 -mt-24">
              <WhyItMattersSection />
            </div>
            <div ref={sdgsRef} className="pt-24 -mt-24">
              <SDGsSection />
            </div>
            <div ref={aboutRef} className="pt-24 -mt-24">
              <AboutUsSection />
            </div>
          </main>
          
          <div ref={contactRef}>
            <FooterSection 
              onMissionClick={() => handleScrollTo(missionRef)}
              onSdgsClick={() => handleScrollTo(sdgsRef)}
              onAboutClick={() => handleScrollTo(aboutRef)}
              onToolClick={scrollToInteractiveTool}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;