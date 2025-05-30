import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth <= 480);
      setIsTablet(window.innerWidth <= 768);
    };

    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  return { isMobile, isTablet };
};