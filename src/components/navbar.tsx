import React, { useEffect, useState } from "react";
import resumePdf from "../ThienTrandinhResume.pdf";
import SystemStatusBar from "./SystemStatusBar";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof document === "undefined") {
    return "dark";
  }
  const attrTheme = document.documentElement.getAttribute("data-theme");
  return attrTheme === "light" || attrTheme === "dark" ? attrTheme : "dark";
};

const revealEventsByTarget: Record<string, string[]> = {
  about: ["reveal-profile"],
  work: ["reveal-experiences"],
  emulator: ["reveal-experiences"],
};

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const initialTheme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : (prefersLight ? "light" : "dark");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    const nav = document.getElementById("mainNav");
    if (!nav) {
      return;
    }

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
      const revealEvents = revealEventsByTarget[targetId] ?? [];
      const scrollToTarget = () => {
        const target = document.getElementById(targetId);
        if (!target) {
          return false;
        }
        window.scrollTo({
          top: target.offsetTop - nav.offsetHeight + 5,
          behavior: "smooth",
        });
        return true;
      };

      const attemptScrollToTarget = (remainingAttempts = 4) => {
        if (scrollToTarget() || remainingAttempts <= 0) {
          return;
        }
        window.setTimeout(() => {
          attemptScrollToTarget(remainingAttempts - 1);
        }, 150);
      };

      if (revealEvents.length > 0) {
        revealEvents.forEach((eventName) => {
          window.dispatchEvent(new Event(eventName));
        });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            attemptScrollToTarget();
          });
        });
        return;
      }

      scrollToTarget();
    };

    smoothLinks.forEach((link) => {
      link.addEventListener("click", smoothHandler);
    });

    return () => {
      smoothLinks.forEach((link) => {
        link.removeEventListener("click", smoothHandler);
      });
      window.removeEventListener("scroll", reduceHandler);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <nav
      className="navbar navbar-b navbar-trans navbar-expand-md fixed-top"
      id="mainNav"
      style={{ borderRadius: "var(--radius-md)" }}
    >
      <div className="container-fluid navbar-shell">
        <div className="navbar-utility-spacer" aria-hidden="true"></div>

        <div className="navbar-status-slot">
          <SystemStatusBar embedded />
        </div>

        <div className="navbar-utility">
          <a className="nav-link nav-resume-button" href={resumePdf} download>
            <span className="nav-resume-button__icon" aria-hidden="true">
              <i className="fa fa-download"></i>
            </span>
            <span className="nav-resume-button__content">
              <span className="nav-resume-button__eyebrow">File</span>
              <span className="nav-resume-button__label">Resume</span>
            </span>
          </a>
          <button
            type="button"
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <i className="fa fa-sun-o theme-toggle__icon" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
