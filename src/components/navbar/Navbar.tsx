import React, { useEffect, useRef, useState } from "react";
import resumePdf from "../../ThienTrandinhResume.pdf";
import AppIcon from "../shared/AppIcon";
import SystemStatusBar from "./SystemStatusBar";
import VersionPicker from "./VersionPicker";

const MOBILE_BREAKPOINT = 767.98;
const NAVBAR_REDUCE_OFFSET = 50;
const SCROLL_RETRY_DELAY = 180;
const SCROLL_RETRY_ATTEMPTS = 10;

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
  projects: ["reveal-experiences", "reveal-projects"],
  emulator: ["reveal-experiences"],
};

const syncNavbarScrollState = (navbar: HTMLElement) => {
  const isReduced = window.pageYOffset > NAVBAR_REDUCE_OFFSET;
  navbar.classList.toggle("navbar-reduce", isReduced);
  navbar.classList.toggle("navbar-trans", !isReduced);
};

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [isMobileStatusOpen, setIsMobileStatusOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    const nav = navRef.current;
    if (!nav) {
      return;
    }

    const reduceHandler = () => {
      syncNavbarScrollState(nav);
    };
    window.addEventListener("scroll", reduceHandler);
    reduceHandler();

    const smoothLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a.js-scroll[href*="#"]:not([href="#"])'));
    const smoothHandler = (e: Event) => {
      e.preventDefault();
      const targetLink = e.currentTarget as HTMLAnchorElement;
      const targetAttribute = targetLink.getAttribute("href");
      if (!targetAttribute) {
        return;
      }
      window.dispatchEvent(new Event("collapse-experiences"));
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

      const attemptScrollToTarget = (remainingAttempts = SCROLL_RETRY_ATTEMPTS) => {
        if (scrollToTarget() || remainingAttempts <= 0) {
          return;
        }
        window.setTimeout(() => {
          attemptScrollToTarget(remainingAttempts - 1);
        }, SCROLL_RETRY_DELAY);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setIsMobileStatusOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobileStatusOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target || !navRef.current) {
        return;
      }
      if (!navRef.current.contains(target)) {
        setIsMobileStatusOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileStatusOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileStatusOpen]);

  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    event.currentTarget.blur();
  };

  return (
    <nav
      ref={navRef}
      className="navbar navbar-b navbar-trans navbar-expand-md fixed-top"
      id="mainNav"
      aria-label="Primary"
    >
      <div className="container-fluid navbar-shell">
        <div className="navbar-utility-spacer" aria-hidden="true">
          <div className="navbar-brand-block">
            <div className="navbar-brand-block__eyebrow">Node</div>
            <a
              className="navbar-brand-block__title navbar-brand-block__title--link"
              href="https://github.com/Chaozs/Chaozs.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chaozs/Chaozs.github.io ↗
            </a>
            <div className="navbar-brand-block__updated">Updated: Mar 19, 2026</div>
          </div>
        </div>

        <div
          className={`navbar-status-slot${isMobileStatusOpen ? " is-mobile-open" : ""}`}
          id="mobileStatusOverlay"
        >
          {!isMobileStatusOpen ? (
            <button
              type="button"
              className="navbar-status-toggle"
              onClick={() => setIsMobileStatusOpen(true)}
              aria-expanded="false"
              aria-controls="mobileStatusOverlay"
              aria-label="Open section status navigation"
            >
              <span className="navbar-status-toggle__icon" aria-hidden="true">
                <AppIcon name="bars" />
              </span>
            </button>
          ) : null}
          <SystemStatusBar
            embedded
            onNavigate={() => setIsMobileStatusOpen(false)}
            utilityContent={(
              <div className="system-status__utility-bar">
                <a
                  className="nav-link nav-mobile-action nav-mobile-action--resume"
                  href={resumePdf}
                  download
                  onClick={() => setIsMobileStatusOpen(false)}
                >
                  <span className="nav-mobile-action__icon" aria-hidden="true">
                    <AppIcon name="download" />
                  </span>
                  <span className="nav-mobile-action__label">Resume</span>
                </a>
                <div className="system-status__utility-actions">
                  <button
                    type="button"
                    className="nav-mobile-action nav-mobile-action--theme"
                    onClick={handleThemeToggle}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  >
                    <span className="nav-mobile-action__icon" aria-hidden="true">
                      <AppIcon name="sun" />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="nav-mobile-action nav-mobile-action--close"
                    onClick={() => setIsMobileStatusOpen(false)}
                    aria-label="Close section status navigation"
                  >
                    <span className="nav-mobile-action__icon" aria-hidden="true">
                      <AppIcon name="chevron-up" />
                    </span>
                  </button>
                </div>
              </div>
            )}
          />
        </div>

        <div className="navbar-utility">
          <a className="nav-link nav-resume-button" href={resumePdf} download>
            <span className="nav-resume-button__icon" aria-hidden="true">
              <AppIcon name="download" />
            </span>
            <span className="nav-resume-button__content">
              <span className="nav-resume-button__eyebrow">File</span>
              <span className="nav-resume-button__label">Resume</span>
            </span>
          </a>
          <VersionPicker />
          <button
            type="button"
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <AppIcon name="sun" className="theme-toggle__icon" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
