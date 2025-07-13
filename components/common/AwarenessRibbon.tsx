import React from 'react';

const AwarenessRibbon: React.FC = () => {
  const ribbonColorMain = "#E83E8C"; // Strong Pink - Main color
  const ribbonHighlight = "#F472B6"; // Lighter Pink for gradient start
  const ribbonShadow = "#D92A7A";   // Darker Pink for gradient end / deep shadow

  return (
    <svg 
      viewBox="0 0 100 160" // Defines the internal coordinate system of the SVG
      className="w-36 h-56 sm:w-40 sm:h-64 md:w-48 md:h-72 drop-shadow-xl" // Responsive sizing and shadow
      aria-label="Breast Cancer Awareness Ribbon"
      role="img" // ARIA role for assistive technologies
    >
      <defs>
        <linearGradient id="awarenessRibbonGradient" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={ribbonHighlight} />
          <stop offset="50%" stopColor={ribbonColorMain} />
          <stop offset="100%" stopColor={ribbonShadow} />
        </linearGradient>
      </defs>
      
      {/* 
        This path creates a stylized awareness ribbon.
        It starts at the top-center (M 50,10), curves down to form one side of the loop (C ... 50,85),
        then curves back up to complete the loop (C ... 50,10). This forms the main head of the ribbon.
        Then, two "tails" are drawn downwards from the center-bottom of the loop.
        - M 50,85 L 35,155 creates the left tail.
        - M 50,85 L 65,155 creates the right tail.
        The stroke attribute gives the path its thickness and color (using the gradient).
        stroke-linecap and stroke-linejoin round the ends and joins for a smoother look.
      */}
      <path
        d="
          M 50,10 
          C 15,20 10,65 50,85 
          C 90,65 85,20 50,10 
          
          M 50,85 L 35,155 
          M 50,85 L 65,155
        "
        fill="none" // The ribbon is formed by the stroke, not a fill
        stroke="url(#awarenessRibbonGradient)" // Apply the defined gradient
        strokeWidth="18" // Thickness of the ribbon
        strokeLinecap="round" // Rounded ends of the lines
        strokeLinejoin="round" // Rounded joins between line segments
      />
      
      {/* Optional: A small circle to emphasize the "knot" or crossover point */}
      <circle cx="50" cy="83" r="6" fill={ribbonColorMain} stroke={ribbonShadow} strokeWidth="1.5" />
    </svg>
  );
};

export default AwarenessRibbon;
