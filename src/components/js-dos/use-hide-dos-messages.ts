import { useEffect, type RefObject } from "react";

export const useHideDosMessages = (
  enabled: boolean,
  containerRef: RefObject<HTMLElement | null>,
): void => {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const hideUi = () => {
      const elements = Array.from(container.querySelectorAll<HTMLElement>("*"));
      elements.forEach((element) => {
        if (element.tagName === "CANVAS") {
          return;
        }
        if (element.querySelector("canvas")) {
          return;
        }
        element.style.display = "none";
      });
    };

    // Run immediately and then keep running for the entire session so that
    // overlays injected by the js-dos player (e.g. the ClickToLock / sensitivity
    // hint that appears once DOOM requests mouse capture) stay suppressed even
    // after the game has fully loaded.
    hideUi();
    const intervalId = window.setInterval(hideUi, 100);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [containerRef, enabled]);
};
