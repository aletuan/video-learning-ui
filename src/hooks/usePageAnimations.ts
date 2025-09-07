import { useEffect } from 'react';

export const usePageAnimations = () => {
  useEffect(() => {
    // Get all elements that should animate on load
    const elements = document.querySelectorAll(
      '.animate-on-load, .sidebar, .header, .video-container, .subtitles-panel, .course-tabs, .content-section'
    );
    
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      
      // Set initial state for animation
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      
      // Animate each element with staggered timing
      setTimeout(() => {
        element.style.transition = 'all 0.6s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  const animateContentChange = (element: HTMLElement | null) => {
    if (!element) return;
    
    // Fade out first
    element.style.opacity = '0';
    
    // Fade in after content change
    setTimeout(() => {
      element.style.opacity = '1';
    }, 100);
  };

  return {
    animateContentChange
  };
};

export default usePageAnimations;