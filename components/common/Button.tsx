
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  fullWidth = false,
  className, 
  ...props 
}) => {
  const baseStyles = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0F1E] transition-all duration-150 ease-in-out inline-flex items-center justify-center";
  
  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-white text-[#0A0F1E] hover:bg-gray-200 focus:ring-white";
      break;
    case 'secondary':
      variantStyles = "bg-[#7a5af7] text-white hover:bg-[#694edf] focus:ring-[#7a5af7]";
      break;
    case 'outline':
      variantStyles = "bg-transparent border border-white/50 text-white hover:bg-white/10 focus:ring-white";
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case 'sm':
      sizeStyles = "px-4 py-2 text-sm";
      break;
    case 'md':
      sizeStyles = "px-6 py-3 text-base";
      break;
    case 'lg':
      sizeStyles = "px-8 py-4 text-lg";
      break;
  }
  
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''} ${className || ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
