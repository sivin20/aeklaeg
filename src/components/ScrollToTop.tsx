import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "0, 0" means x:0, y:0 (top left of the page)
    window.scrollTo(0, 0);
  }, [pathname]); // Runs every time the 'pathname' changes

  return null;
}
