import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onLoaded: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startExitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 6500); // Increased total time to allow for slower animation

    const notifyLoadedTimer = setTimeout(() => {
      onLoaded();
    }, 7500); // Adjusted to account for new total time + 1s exit animation

    return () => {
      clearTimeout(startExitTimer);
      clearTimeout(notifyLoadedTimer);
    };
  }, [onLoaded]);

  return (
    <div
      className={`preloader-container ${isExiting ? 'exiting' : ''}`}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="text-center">
        <div className="preloader-text-wrapper">
          <h1 className="preloader-text">bravaware</h1>
        </div>

        <p className="preloader-subtitle preloader-subtitle-animate">
          "The best protection is early detection."
        </p>
      </div>
    </div>
  );
};

export default Preloader;