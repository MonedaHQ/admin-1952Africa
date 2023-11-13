import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useScrollToTopOnRouteChange(elementRef) {
  const location = useLocation();

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.scrollTop = 0;
    }
  }, [location.pathname, elementRef]);
}

export default useScrollToTopOnRouteChange;
