import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const Intro: React.FC = () => {
  const typedRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!typedRef.current) {
      return;
    }

    const typed = new Typed(typedRef.current, {
      strings: ["Software Engineer", "Game Developer"],
      typeSpeed: 30,
      backDelay: 1100,
      backSpeed: 20,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    // <div id="home" className="intro route bg-image " style={{backgroundImage: "url("+bigImage+")"}}>
    <div
      id="home"
      className="intro route bg-image"
      style={{ backgroundColor: "rgba(32, 33, 36, 0.6)", position: "relative" }}
    >
      <div className="intro-content display-table" style={{ position: "relative", zIndex: 1 }}>
        <div className="table-cell">
          <div className="container">
            <h1 className="intro-title mb-4">Thien Trandinh</h1>
              <p className="intro-subtitle">
                <span className="text-slider-items"></span>
                <strong className="text-slider">
                  <span ref={typedRef}></span>
                </strong>
              </p>
            <p className="pt-3">
              <a
                className="btn btn-primary btn js-scroll px-4 intro-work-btn"
                href="#work"
                role="button"
              >
                View Work Experiences
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
