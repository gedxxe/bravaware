
import React, { useState, useEffect } from 'react';
import { APP_NAME } from '../constants';

interface HeaderProps {
  onMissionClick: () => void;
  onSdgsClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
  onArchitectureClick: () => void;
}

const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className }) => (
  <li>
    <button
      onClick={onClick}
      className={`text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wider uppercase ${className}`}
    >
      {children}
    </button>
  </li>
);

const Header: React.FC<HeaderProps> = ({ onMissionClick, onSdgsClick, onAboutClick, onContactClick, onArchitectureClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileLinkClick = (actionFunc: () => void) => {
    actionFunc();
    setIsMenuOpen(false);
  };

  const navLinks = (
    <>
      <NavLink onClick={onMissionClick}>Mission</NavLink>
      <NavLink onClick={onSdgsClick}>SDGs</NavLink>
      <NavLink onClick={onArchitectureClick}>Model Architecture</NavLink>
      <NavLink onClick={onAboutClick}>About</NavLink>
      <NavLink onClick={onContactClick}>Contact Us</NavLink>
    </>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[rgba(10,15,30,0.8)] backdrop-blur-lg shadow-lg border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-0 flex justify-between items-center h-20">
          <a href="#" className="text-2xl font-bold text-white tracking-tighter" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            {APP_NAME}
          </a>

          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8">
              {navLinks}
            </ul>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none z-50"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[rgba(10,15,30,0.95)] backdrop-blur-xl transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full">
          <ul className="flex flex-col items-center space-y-10">
             <NavLink onClick={() => handleMobileLinkClick(onMissionClick)} className="text-xl">Mission</NavLink>
             <NavLink onClick={() => handleMobileLinkClick(onSdgsClick)} className="text-xl">SDGs</NavLink>
             <NavLink onClick={() => handleMobileLinkClick(onArchitectureClick)} className="text-xl">Model Architecture</NavLink>
             <NavLink onClick={() => handleMobileLinkClick(onAboutClick)} className="text-xl">About</NavLink>
             <NavLink onClick={() => handleMobileLinkClick(onContactClick)} className="text-xl">Contact Us</NavLink>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
