import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number; // Speed in seconds for one animation cycle
  className?: string; // For text styling like size, font, layout, etc. applied to the Tag
  baseTextColorClass?: string; // e.g. text-gray-300, applied for fallback or when disabled
  tag?: keyof JSX.IntrinsicElements; // Allow choosing the HTML tag
  once?: boolean; // If true, animation runs once
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
  baseTextColorClass = 'text-gray-300', // Default base color for text
  tag: Tag = 'div', // Default to div, can be overridden to 'p', 'span', etc.
  once = false,
}) => {
  const animationDuration = `${speed}s`;

  // The baseTextColorClass sets the initial text color.
  // When 'animate-shine-effect' is active, its 'color: transparent !important' rule
  // will make the text transparent, allowing the gradient background to show through.
  const combinedClassName = `
    ${baseTextColorClass} 
    ${!disabled ? (once ? 'animate-shine-once' : 'animate-shine-effect') : ''}
    ${className}
  `;

  return (
    <Tag
      className={combinedClassName.trim()}
      style={!disabled ? { animationDuration: animationDuration } : {}}
      aria-label={text} // For accessibility, as visual text color is made transparent
    >
      {text}
    </Tag>
  );
};

export default ShinyText;