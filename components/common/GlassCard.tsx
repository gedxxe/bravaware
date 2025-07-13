
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  pulsatingBorder?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, pulsatingBorder = false }) => {
  const borderClass = pulsatingBorder 
    ? 'border-[#7a5af7] animate-pulse shadow-[0_0_25px_rgba(122,90,247,0.5)]' // Pulsating soft violet border
    : 'border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]'; // Standard subtle white glow

  return (
    <div
      className={`bg-[rgba(25,30,50,0.5)] backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl border ${borderClass} p-6 md:p-8 ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
