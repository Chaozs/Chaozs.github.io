import React, { useEffect, useState } from "react";

type SectionTarget = {
  id: string;
  label: string;
};

const SECTION_TARGETS: SectionTarget[] = [
  { id: "home", label: "START" },
  { id: "about", label: "PROFILE" },
  { id: "work", label: "EXPERIENCES" },
  { id: "projects", label: "PROJECTS" },
  { id: "emulator", label: "MISSION" },
  { id: "contact", label: "CONTACT" },
];

type SystemStatusBarProps = {
  embedded?: boolean;
  onNavigate?: () => void;
  utilityContent?: React.ReactNode;
};

const SystemStatusBar: React.FC<SystemStatusBarProps> = ({ embedded = false, onNavigate, utilityContent }) => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateStatus = () => {
      frameId = 0;

      const navHeight = document.getElementById("mainNav")?.offsetHeight ?? 0;
      const activationLine = navHeight + 140;

      let currentSection = SECTION_TARGETS[0].id;
      SECTION_TARGETS.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (!element) {
          return;
        }
        const top = element.getBoundingClientRect().top;
        if (top <= activationLine) {
          currentSection = id;
        }
      });
      setActiveSection(currentSection);

      const scrollRoot = document.documentElement;
      const maxScroll = Math.max(scrollRoot.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(window.scrollY / maxScroll, 1));
    };

    const scheduleUpdate = () => {
      if (frameId !== 0) {
        return;
      }
      frameId = window.requestAnimationFrame(updateStatus);
    };

    const mutationObserver = new MutationObserver(scheduleUpdate);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    window.addEventListener("reveal-profile", scheduleUpdate);
    window.addEventListener("reveal-experiences", scheduleUpdate);
    window.addEventListener("reveal-projects", scheduleUpdate);

    scheduleUpdate();

    return () => {
      mutationObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      window.removeEventListener("reveal-profile", scheduleUpdate);
      window.removeEventListener("reveal-experiences", scheduleUpdate);
      window.removeEventListener("reveal-projects", scheduleUpdate);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <nav
      className={`system-status${embedded ? " system-status--embedded" : ""}`}
      style={{ ["--status-progress" as string]: `${Math.round(scrollProgress * 100)}%` }}
      aria-label="Section navigation"
    >
      {utilityContent ? (
        <div className="system-status__utility">
          {utilityContent}
        </div>
      ) : null}
      <div className="system-status__track">
        {SECTION_TARGETS.map((section, index) => {
          const isActive = activeSection === section.id;
          const isComplete = SECTION_TARGETS.findIndex(({ id }) => id === activeSection) > index;

          return (
            <a
              key={section.id}
              className={`system-status__item js-scroll${isActive ? " is-active" : ""}${isComplete ? " is-complete" : ""}`}
              href={`#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) => {
                event.currentTarget.blur();
                onNavigate?.();
              }}
            >
              <span className="system-status__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="system-status__label">{section.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default SystemStatusBar;
