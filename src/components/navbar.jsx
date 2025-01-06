import React from "react";
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';

import logo1 from "../img/ProfilePic3.png";

class Navbar extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   logo: logo1
    // };
  }

  componentDidMount() {
    const nav = document.querySelector("nav");
    const navHeight = nav.offsetHeight;
  
    // ScrollSpy initialization
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: navHeight,
    });
  
    // Collapse the navbar when a scroll link is clicked
    document.querySelectorAll(".js-scroll").forEach((link) => {
      link.addEventListener("click", () => {
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse) {
          const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
          collapseInstance.hide();
        }
      });
    });
  
    // Navbar reduce effect on scroll
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar-expand-md");
      if (window.pageYOffset > 50) {
        navbar.classList.add("navbar-reduce");
        navbar.classList.remove("navbar-trans");
        //this.setState({ logo: logo2 });
      } else {
        navbar.classList.add("navbar-trans");
        navbar.classList.remove("navbar-reduce");
        //this.setState({ logo: logo1 });
      }
    });
  
    // Smooth scrolling
    document.querySelectorAll('a.js-scroll[href*="#"]:not([href="#"])').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - navHeight + 5,
            behavior: "smooth",
          });
        }
      });
    });
  }
  

  render() {
    return (
      <nav
        className="navbar navbar-b navbar-trans navbar-expand-md fixed-top"
        id="mainNav"
        style={{backgroundColor: "#181818", borderRadius: "1%"}}
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
                  Skills
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
  }
}

export default Navbar;
