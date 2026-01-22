import React, { useEffect } from 'react';

const Preloader: React.FC = () => {
  useEffect(() => {
    const hidePreloader = () => {
      const preloader = document.getElementById('preloader');
      if (!preloader) {
        return;
      }
      const delayMs = 100;
      const fadeMs = 400;
      window.setTimeout(() => {
        preloader.style.transition = `opacity ${fadeMs}ms ease`;
        preloader.style.opacity = "0";
        window.setTimeout(() => {
          preloader.remove();
        }, fadeMs);
      }, delayMs);
    };

    const hardTimeoutMs = 3000;
    const hardTimeoutId = window.setTimeout(() => {
      hidePreloader();
    }, hardTimeoutMs);

    if (document.readyState === "loading") {
      document.addEventListener('DOMContentLoaded', hidePreloader);
    } else {
      hidePreloader();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', hidePreloader);
      window.clearTimeout(hardTimeoutId);
    };
  }, []);

  return <div id="preloader"></div>;
};

export default Preloader;
