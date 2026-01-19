import React, { useEffect } from 'react';
import $ from 'jquery';
import '../libs/easing.js';

const BackToTop: React.FC = () => {
  useEffect(() => {
    const clickHandler = () => {
      $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
      return false;
    };

    const $backToTop = $('.back-to-top');
    $backToTop.on('click', clickHandler);

    const scrollHandler = () => {
      const backToTop = document.querySelector<HTMLElement>('.back-to-top');
      if (!backToTop) {
        return;
      }
      if (window.pageYOffset > 100) {
        backToTop.classList.remove("fadeOut");
        backToTop.style.display = "block";
        backToTop.classList.add("fadeIn");
      } else {
        backToTop.classList.remove("fadeIn");
        backToTop.classList.add("fadeOut");
      }
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      $backToTop.off('click', clickHandler);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return <a href="#" className="back-to-top animated"><i className="fa fa-chevron-up"></i></a>;
};

export default BackToTop;
