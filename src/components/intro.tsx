import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

const FINAL_NAME = "Thien Trandinh";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const CREATOR_TIME_ZONE = "America/Toronto";
const CREATOR_NODE = "Toronto";

const formatUptime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const getThemeLabel = (): string => {
  if (typeof document === "undefined") {
    return "DARK_MODE";
  }

  return document.documentElement.getAttribute("data-theme") === "light" ? "LIGHT_MODE" : "DARK_MODE";
};

const getTelemetrySnapshot = () => {
  const now = new Date();
  const localTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: CREATOR_TIME_ZONE,
  });

  return {
    localNode: CREATOR_NODE,
    localTime,
  };
};

const Intro: React.FC = () => {
  const typedRef = useRef<HTMLSpanElement | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [isNameResolved, setIsNameResolved] = useState(false);
  const [themeLabel, setThemeLabel] = useState(getThemeLabel);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const [telemetrySnapshot, setTelemetrySnapshot] = useState(getTelemetrySnapshot);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setDisplayName(FINAL_NAME);
      setIsNameResolved(true);
      return;
    }

    let revealProgress = 0;
    const revealStep = 0.45;
    const intervalId = window.setInterval(() => {
      revealProgress += revealStep;
      const lockedCount = Math.floor(revealProgress);

      const scrambledName = FINAL_NAME
        .split("")
        .map((char, index) => {
          if (char === " ") {
            return " ";
          }
          if (index < lockedCount) {
            return FINAL_NAME[index];
          }
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      setDisplayName(scrambledName);

      if (lockedCount >= FINAL_NAME.length) {
        window.clearInterval(intervalId);
        setDisplayName(FINAL_NAME);
        setIsNameResolved(true);
      }
    }, 48);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!isNameResolved || !typedRef.current) {
      return;
    }

    typedRef.current.textContent = "";
    const typed = new Typed(typedRef.current, {
      strings: ["Software Engineer", "Full Stack Developer"],
      typeSpeed: 30,
      backDelay: 1100,
      backSpeed: 20,
      loop: true,
      startDelay: 120,
    });

    return () => {
      typed.destroy();
    };
  }, [isNameResolved]);

  useEffect(() => {
    const tick = () => {
      setUptimeSeconds((prev) => prev + 1);
      setTelemetrySnapshot(getTelemetrySnapshot());
    };

    const intervalId = window.setInterval(tick, 1000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const updateThemeLabel = () => {
      setThemeLabel(getThemeLabel());
    };

    updateThemeLabel();

    const observer = new MutationObserver(updateThemeLabel);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="home"
      className="intro bg-image"
      style={{ backgroundColor: "var(--section-bg)", position: "relative" }}
    >
      <div className="intro-content display-table" style={{ position: "relative", zIndex: 1 }}>
        <div className="table-cell">
          <div className="container intro-stagger">
            <h1 className="intro-title mb-4 intro-stagger-item">
              <span className="intro-title__text" aria-label={FINAL_NAME}>
                {displayName || FINAL_NAME}
              </span>
              <span className={`intro-title__cursor${isNameResolved ? " is-hidden" : ""}`} aria-hidden="true">
                _
              </span>
            </h1>
            <p className={`intro-subtitle intro-stagger-item intro-subtitle--signal${isNameResolved ? " is-ready" : ""}`}>
              <strong className="text-slider">
                <span ref={typedRef}></span>
              </strong>
            </p>
            <div className="intro-telemetry intro-stagger-item" aria-label="Live hero telemetry">
              <div className="intro-telemetry__grid">
                <div className="intro-telemetry__item">
                  <span className="intro-telemetry__label">Theme</span>
                  <span className="intro-telemetry__value">{themeLabel}</span>
                </div>
                <div className="intro-telemetry__item">
                  <span className="intro-telemetry__label">Uptime</span>
                  <span className="intro-telemetry__value">{formatUptime(uptimeSeconds)}</span>
                </div>
                <div className="intro-telemetry__item">
                  <span className="intro-telemetry__label">Creator Node</span>
                  <span className="intro-telemetry__value">{telemetrySnapshot.localNode}</span>
                </div>
                <div className="intro-telemetry__item">
                  <span className="intro-telemetry__label">Creator Clock</span>
                  <span className="intro-telemetry__value">{telemetrySnapshot.localTime}</span>
                </div>
              </div>
            </div>
            <div className="pt-3 intro-stagger-item">
              <a
                className="btn btn-primary btn js-scroll intro-work-btn"
                href="#work"
                role="button"
              >
                <span className="intro-work-btn__meta">Access</span>
                <span className="intro-work-btn__copy">
                  <span className="intro-work-btn__title">Open Experience Files</span>
                </span>
                <span className="intro-work-btn__icon" aria-hidden="true">
                  <i className="ion-ios-arrow-forward"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
