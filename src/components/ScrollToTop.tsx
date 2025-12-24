import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Case 1: It's a Hash Link (e.g. #cocktails) -> Scroll SMOOTHLY
    if (hash) {
      // We use a timeout to let the page render content before scrolling
      // This is crucial for cross-page links (e.g. Home -> Vaerftet#cocktails)
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    }
    // Case 2: It's a standard Page Change -> Scroll INSTANTLY to top
    // We use 'instant' here to prevent the CSS 'scroll-behavior: smooth'
    // from making us watch the page scroll all the way up.
    else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
