import { useEffect, useRef, type RefObject } from "react";

export const useWolf3dKeyRemap = (
  enabled: boolean,
  containerRef: RefObject<HTMLElement | null>,
): void => {
  const remapActiveRef = useRef(false);

  useEffect(() => {
    remapActiveRef.current = enabled;
    if (!remapActiveRef.current) {
      return;
    }

    const keyMap: Record<string, { key: string; code: string; keyCode: number }> = {
      w: { key: "ArrowUp", code: "ArrowUp", keyCode: 38 },
      a: { key: "ArrowLeft", code: "ArrowLeft", keyCode: 37 },
      s: { key: "ArrowDown", code: "ArrowDown", keyCode: 40 },
      d: { key: "ArrowRight", code: "ArrowRight", keyCode: 39 },
    };

    const handleKey = (event: KeyboardEvent) => {
      if (!remapActiveRef.current || !event.isTrusted) {
        return;
      }
      const mapped = keyMap[event.key.toLowerCase()];
      if (!mapped) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const target = containerRef.current ?? window;
      const synthetic = new KeyboardEvent(event.type, {
        key: mapped.key,
        code: mapped.code,
        keyCode: mapped.keyCode,
        which: mapped.keyCode,
        bubbles: true,
      });
      target.dispatchEvent(synthetic);
    };

    window.addEventListener("keydown", handleKey, true);
    window.addEventListener("keyup", handleKey, true);
    return () => {
      window.removeEventListener("keydown", handleKey, true);
      window.removeEventListener("keyup", handleKey, true);
    };
  }, [containerRef, enabled]);
};
