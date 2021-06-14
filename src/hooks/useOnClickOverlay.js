import { useEffect } from "react";

const useOnClickOverlay = (handler) => {
  useEffect(() => {
    function closeByOverlay(e) {
      if (e.target.classList.contains('popup_opened')) {
        handler();
      }
    }
    document.addEventListener('click', closeByOverlay);
  
    return () => {
      document.removeEventListener('click', closeByOverlay);
    }
  }, [handler]);
};

export default useOnClickOverlay;

