import React, { useEffect } from 'react';

const Preloader: React.FC = () => {
  useEffect(() => {
    const onLoad = () => {
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

    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return <div id="preloader"></div>;
};

export default Preloader;
