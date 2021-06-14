import { useEffect } from "react";

const useOnPushEsc = (handler) => {
  useEffect(() => {
    function closeByEsc(e) {
      if (e.key === "Escape") {
        handler();
      }
    }
    document.addEventListener('keyup', closeByEsc);
  
    return () => {
      document.removeEventListener('keyup', closeByEsc);
    }
  }, [handler]);
};

export default useOnPushEsc;