import React from 'react';

interface SliderProps {
  id?: string;
  label?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  showValue?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  className = '',
  showValue = true,
}) => {
  return (
    <div className={`group ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="flex items-center space-x-3">
        <input
          type="range"
          id={id}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className={`w-full h-2 bg-slate-700/70 rounded-lg appearance-none cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-[#7a5af7] focus:ring-offset-2 focus:ring-offset-[#0A0F1E]
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:w-5
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-[#7a5af7]
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(122,90,247,0.7)]
                     [&::-webkit-slider-thumb]:cursor-grab
                     [&::-webkit-slider-thumb]:transition-all
                     [&::-webkit-slider-thumb]:duration-150
                     [&::-webkit-slider-thumb]:ease-in-out
                     group-hover:[&::-webkit-slider-thumb]:bg-[#8f6eff]
                     active:[&::-webkit-slider-thumb]:bg-[#694edf]
                     active:[&::-webkit-slider-thumb]:scale-110
                     
                     [&::-moz-range-track]:h-2
                     [&::-moz-range-track]:bg-slate-700/70
                     [&::-moz-range-track]:rounded-lg
                     
                     [&::-moz-range-thumb]:appearance-none
                     [&::-moz-range-thumb]:h-5
                     [&::-moz-range-thumb]:w-5
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-[#7a5af7]
                     [&::-moz-range-thumb]:border-none 
                     [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(122,90,247,0.7)]
                     [&::-moz-range-thumb]:cursor-grab
                     group-hover:[&::-moz-range-thumb]:bg-[#8f6eff]
                     active:[&::-moz-range-thumb]:bg-[#694edf]
                     active:[&::-moz-range-thumb]:transform active:[&::-moz-range-thumb]:scale-110
                     `}
        />
        {showValue && (
          <span className="text-sm text-gray-300 w-12 text-right tabular-nums bg-slate-800/50 px-2 py-0.5 rounded">
            {Number(value).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Slider;
