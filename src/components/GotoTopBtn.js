import React, { useState, useEffect } from 'react';
import './GotoTopBtn.css';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  return (
    <button
      className={`go-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      title="Go to Top"
    >
      Top
    </button>
  );
};

export default GoToTopButton;