import { useState, useEffect } from 'react';

export const useMediaQuery = () => {
    const [isTabletAndDesktop, setIsTabletAndDesktop ] = useState(false);
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 768) {
            setIsTabletAndDesktop(true);
        } else {
            setIsTabletAndDesktop(false);
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isTabletAndDesktop;
};