import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [isClosing, setIsClosing] = useState(false);

  // Reset closing state when modal is reopened from parent
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  // handleClose now triggers the closing animation and delays the actual closing call
  const handleClose = () => {
    if (isClosing) return; // Prevent multiple calls while closing
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Duration must match the CSS animation
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClosing]); // Re-bind if isClosing changes to get the latest state

  // The modal remains in the DOM during the closing animation because `isOpen` is still true.
  // It unmounts only after the animation finishes and onClose is called.
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`modal-overlay ${isOpen && !isClosing ? 'open' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={`modal-content ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
      >
        <div className="flex justify-between items-center mb-4 px-3 pt-2 flex-shrink-0">
          <h2 id="modal-title" className="text-xl font-bold text-white">
            {title}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-3 pb-3 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;