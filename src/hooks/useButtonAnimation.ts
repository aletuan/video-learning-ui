import { useCallback } from 'react';

export const useButtonAnimation = () => {
  const animateButton = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    
    // Apply scale down animation
    element.style.transform = 'scale(0.95)';
    element.style.transition = 'transform 100ms ease';
    
    // Return to normal scale after 100ms
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 100);
  }, []);

  const handleButtonClick = useCallback((
    onClick?: () => void
  ) => {
    return (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      event.preventDefault();
      const target = event.currentTarget;
      animateButton(target);
      
      // Call the original onClick handler after a small delay to allow animation
      if (onClick) {
        setTimeout(() => onClick(), 50);
      }
    };
  }, [animateButton]);

  return { animateButton, handleButtonClick };
};

export default useButtonAnimation;