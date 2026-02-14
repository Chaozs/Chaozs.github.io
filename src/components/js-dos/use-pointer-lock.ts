import { useEffect, useState, type RefObject } from "react";

export const usePointerLock = (
  containerRef: RefObject<HTMLElement | null>,
): boolean => {
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  useEffect(() => {
    const handlePointerLockChange = () => {
      const container = containerRef.current;
      const lockedElement = document.pointerLockElement;
      const isLocked = Boolean(lockedElement && container && container.contains(lockedElement));
      setIsPointerLocked(isLocked);
      if (isLocked && container) {
        requestAnimationFrame(() => {
          container.focus();
        });
      }
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    return () => {
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
    };
  }, [containerRef]);

  return isPointerLocked;
};
