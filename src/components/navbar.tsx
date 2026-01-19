import React, { useEffect } from "react";
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar: React.FC = () => {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("nav");
    if (!nav) {
      return;
    }
    const navHeight = nav.offsetHeight;

    // ScrollSpy initialization
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: navHeight,
    });

    const collapseHandler = () => {
      const navbarCollapse = document.querySelector<HTMLElement>(".navbar-collapse");
      if (navbarCollapse) {
        const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
        collapseInstance.hide();
      }
    };

    const scrollLinks = Array.from(document.querySelectorAll(".js-scroll"));
    scrollLinks.forEach((link) => {
      link.addEventListener("click", collapseHandler);
    });

    const reduceHandler = () => {
      const navbar = document.querySelector<HTMLElement>(".navbar-expand-md");
      if (!navbar) {
        return;
      }
      if (window.pageYOffset > 50) {
        navbar.classList.add("navbar-reduce");
        navbar.classList.remove("navbar-trans");
        //this.setState({ logo: logo2 });
      } else {
        navbar.classList.add("navbar-trans");
        navbar.classList.remove("navbar-reduce");
        //this.setState({ logo: logo1 });
      }
    };
    window.addEventListener("scroll", reduceHandler);

    const smoothLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a.js-scroll[href*="#"]:not([href="#"])'));
    const smoothHandler = (e: Event) => {
      e.preventDefault();
      const targetLink = e.currentTarget as HTMLAnchorElement;
      const targetAttribute = targetLink.getAttribute("href");
      if (!targetAttribute) {
        return;
      }
      const targetId = targetAttribute.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - navHeight + 5,
          behavior: "smooth",
        });
      }
    };

    smoothLinks.forEach((link) => {
      link.addEventListener("click", smoothHandler);
    });

    return () => {
      scrollSpy.dispose();
      scrollLinks.forEach((link) => {
        link.removeEventListener("click", collapseHandler);
      });
      smoothLinks.forEach((link) => {
        link.removeEventListener("click", smoothHandler);
      });
      window.removeEventListener("scroll", reduceHandler);
    };
  }, []);

  return (
    <nav
      className="navbar navbar-b navbar-trans navbar-expand-md fixed-top"
      id="mainNav"
      style={{backgroundColor: "#2a2a2a", borderRadius: "1%"}}
    >
      <div className="container">
        {/* <a className="navbar-brand js-scroll" href="#page-top">
          <img
            src={this.state.logo}
            alt="logo"
            style={{ maxWidth: "100px" }}
          />
        </a> */}

        <div
          className="navbar-collapse collapse justify-content-end"
          id="navbarDefault"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link js-scroll active" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll" href="#work">
                Work
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
