import React, { useEffect } from 'react';

const BackToTop: React.FC = () => {
  useEffect(() => {
    const backToTop = document.querySelector<HTMLAnchorElement>('.back-to-top');
    if (!backToTop) {
      return;
    }

    const clickHandler = (event: MouseEvent) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    backToTop.addEventListener('click', clickHandler);

    const scrollHandler = () => {
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
      backToTop.removeEventListener('click', clickHandler);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return <a href="#" className="back-to-top animated"><i className="fa fa-chevron-up"></i></a>;
};

export default BackToTop;
