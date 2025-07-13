
import React from 'react';

interface OrbProps {
  colorClass: string;
  sizeClass: string;
  animationClass: string;
  initialPositionClasses: string;
  opacityClass?: string;
  blurClass?: string;
}

const Orb: React.FC<OrbProps> = ({ 
  colorClass, 
  sizeClass, 
  animationClass, 
  initialPositionClasses,
  opacityClass = 'opacity-30', 
  blurClass = 'blur-3xl' 
}) => (
  <div
    className={`absolute ${sizeClass} ${colorClass} rounded-full filter ${blurClass} ${opacityClass} ${animationClass} ${initialPositionClasses} pointer-events-none`}
  />
);

const BackgroundOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Orb 1: Deep Blue */}
      <Orb
        colorClass="bg-[#2a3a8a]" // Deep Blue
        sizeClass="w-[60vw] h-[60vh] md:w-[40vw] md:h-[40vh]"
        animationClass="animate-slow-float-1"
        initialPositionClasses="top-[-10vh] left-[-15vw]"
      />
      {/* Orb 2: Soft Violet */}
      <Orb
        colorClass="bg-[#7a5af7]" // Soft Violet
        sizeClass="w-[50vw] h-[50vh] md:w-[35vw] md:h-[35vh]"
        animationClass="animate-slow-float-2"
        initialPositionClasses="bottom-[-20vh] right-[-10vw]"
        opacityClass="opacity-25"
      />
      {/* Orb 3: Clinical Pink */}
      <Orb
        colorClass="bg-[#e18aaa]" // Clinical Pink
        sizeClass="w-[45vw] h-[45vh] md:w-[30vw] md:h-[30vh]"
        animationClass="animate-slow-float-3"
        initialPositionClasses="top-[20vh] left-[calc(50vw-15vw)]"
        opacityClass="opacity-20"
      />
    </div>
  );
};

export default BackgroundOrbs;
