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

    hideUi();
    const intervalId = window.setInterval(hideUi, 500);
    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [containerRef, enabled]);
};
