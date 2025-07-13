
import React, { useEffect, useMemo } from 'react';

// Make Vara globally available for TypeScript
declare var Vara: any;

interface FontSettings {
  fontSize: number;
  color: string;
  strokeWidth?: number;
  duration?: number;
  textAlign?: 'left' | 'center' | 'right';
  letterSpacing?: number;
  x?: number; // Added x for horizontal offset within Vara's SVG
}

interface VaraTextProps {
  id: string; // Unique ID for the container div
  text: string;
  fontJsonUrl: string;
  fontSettings: FontSettings;
  containerClassName?: string;
}

const VaraText: React.FC<VaraTextProps> = ({
  id,
  text,
  fontJsonUrl,
  fontSettings,
  containerClassName = '',
}) => {
  // Memoize fontSettings parts to stabilize dependencies for useEffect
  const { 
    fontSize, 
    color, 
    strokeWidth = 0.7, 
    duration = 2000, 
    textAlign = 'center',
    letterSpacing = 0,
    x // Destructure x offset property
  } = fontSettings;

  useEffect(() => {
    if (typeof Vara === 'undefined') {
      console.warn('Vara.js library is not loaded yet.');
      return;
    }

    const containerElement = document.getElementById(id);
    if (!containerElement) {
      console.warn(`Vara container element with id #${id} not found.`);
      return;
    }

    // Clear any previous animation in the container
    containerElement.innerHTML = '';

    // Initialize Vara animation
    new Vara(
      `#${id}`, // Target element selector
      fontJsonUrl, // URL of the font JSON
      [ // Array of text objects to animate
        {
          text: text,
          fontSize: fontSize,
          strokeWidth: strokeWidth,
          color: color,
          duration: duration,
          textAlign: textAlign,
          letterSpacing: letterSpacing,
          x: x, // Pass the x offset to Vara
          autoAnimation: true, // Start animation automatically
          queued: true, // Animation will be queued
        },
      ],
      {
        // Global options for Vara instance (optional)
      }
    );

    // Cleanup function: clear container on component unmount or before re-running effect
    return () => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = '';
      }
    };
  }, [id, text, fontJsonUrl, fontSize, color, strokeWidth, duration, textAlign, letterSpacing, x]); // Add x to effect dependencies

  // Added 'vara-text-svg-container' for specific CSS targeting of the SVG child
  return <div id={id} className={`${containerClassName} vara-text-svg-container z-[20]`}></div>;
};

export default VaraText;
