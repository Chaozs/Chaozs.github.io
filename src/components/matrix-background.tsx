import React, { useCallback, useEffect, useRef } from "react";

const isFirefoxBrowser = () =>
  typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent) && !/seamonkey/i.test(navigator.userAgent);

const MATRIX_COLUMN_SPACING = 0.56;
const MATRIX_BASE_SPEED = 0.07;
const MATRIX_SPEED_VARIANTS = [0.7, 1.25] as const;
const MATRIX_GLOW_VARIANTS = [0.85, 1.2] as const;
const MATRIX_TRAIL_STEP = 1.0;
const MATRIX_MAX_TRAIL_LENGTH = 18;
const MATRIX_MIN_TRAIL_LENGTH = 4;
const MATRIX_CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789";
const MATRIX_FONT_STACK = '"MS Gothic", "Noto Sans JP", "Yu Gothic UI", monospace';

const randomMatrixChar = (): string =>
  MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length));

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dropsRef = useRef<number[]>([]);
  const dropSpeedsRef = useRef<number[]>([]);
  const dropGlowRef = useRef<number[]>([]);
  const dropProgressRef = useRef<number[]>([]);
  const dropCharsRef = useRef<string[][]>([]);
  const dropCharHoldRef = useRef<number[][]>([]);
  const dropTrailLengthRef = useRef<number[]>([]);
  const dprRef = useRef<number>(1);
  const canvasWidthRef = useRef<number>(0);
  const canvasHeightRef = useRef<number>(0);
  const lastWidthRef = useRef<number>(0);
  const lastHeightRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const targetFpsRef = useRef<number>(60);
  const baseOpacityRef = useRef<number>(1);
  const scrollFrameRef = useRef<number | null>(null);
  const matrixColorsRef = useRef({
    trail: "rgba(0, 0, 0, 0.12)",
    char: "#00ff41",
    glow: "#aaffaa",
  });

  const readMatrixColors = useCallback(() => {
    const styles = getComputedStyle(document.documentElement);
    const trail = styles.getPropertyValue("--matrix-trail").trim() || "rgba(0, 0, 0, 0.06)";
    const char = styles.getPropertyValue("--matrix-char").trim() || "#3bd16f";
    const glow = styles.getPropertyValue("--matrix-glow").trim() || "#9dffbf";
    const opacity = Number.parseFloat(styles.getPropertyValue("--matrix-opacity").trim() || "1");
    matrixColorsRef.current = { trail, char, glow };
    baseOpacityRef.current = Number.isFinite(opacity) ? opacity : 1;
  }, []);

  const updateMatrixOpacity = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const scrollRange = Math.max(window.innerHeight * 1.2, 1);
    const progress = Math.min(window.scrollY / scrollRange, 1);
    const intensity = 1 - progress * 0.28;
    canvas.style.opacity = `${baseOpacityRef.current * intensity}`;
  }, []);

  const setTargetFps = useCallback(() => {
    const cores = navigator.hardwareConcurrency || 0;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 0;
    const lowEnd = (cores && cores <= 4) || (memory && memory <= 4);
    const isFirefox = isFirefoxBrowser();
    if (isFirefox) {
      targetFpsRef.current = lowEnd ? 12 : 18;
      return;
    }
    targetFpsRef.current = lowEnd ? 20 : 60;
  }, []);

  const getFontSize = useCallback(() => {
    if (window.innerWidth <= 480) {
      return 18;
    }
    if (window.innerWidth <= 767.98) {
      return 22;
    }
    return 31;
  }, []);

  const animateMatrix = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const isFirefox = isFirefoxBrowser();
    const fontSize = getFontSize();
    const now = performance.now();
    const frameInterval = 1000 / targetFpsRef.current;

    if (lastFrameTimeRef.current === 0) {
      lastFrameTimeRef.current = now;
    }

    if (targetFpsRef.current < 60 && now - lastFrameTimeRef.current < frameInterval) {
      animationFrameIdRef.current = requestAnimationFrame(animateMatrix);
      return;
    }

    const deltaMs = Math.max(now - lastFrameTimeRef.current, frameInterval);
    const frameMultiplier = Math.min(deltaMs / (1000 / 60), 3);
    lastFrameTimeRef.current = now;

    ctx.fillStyle = matrixColorsRef.current.trail;
    ctx.fillRect(0, 0, canvasWidthRef.current, canvasHeightRef.current);

    ctx.fillStyle = matrixColorsRef.current.char;
    ctx.font = `${fontSize}px ${MATRIX_FONT_STACK}`;

    ctx.save();
    ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
    for (let i = 0; i < dropsRef.current.length; i += 1) {
      const x = i * fontSize * MATRIX_COLUMN_SPACING;
      const y = dropsRef.current[i] * fontSize;
      const trailLength = isFirefox ? 4 : (dropTrailLengthRef.current[i] ?? MATRIX_MAX_TRAIL_LENGTH);
      const columnChars = dropCharsRef.current[i] ?? [];
      const columnHolds = dropCharHoldRef.current[i] ?? [];
      const glowVariant = dropGlowRef.current[i] ?? 1;

      for (let trailIndex = 0; trailIndex < trailLength; trailIndex += 1) {
        const nextHold = Math.max(0, (columnHolds[trailIndex] ?? 0) - deltaMs);
        columnHolds[trailIndex] = nextHold;

        const isHead = trailIndex === 0;
        const headChangeChance = isFirefox ? 0.25 : 0.4;
        const trailChangeChance = Math.max(0.02, 0.10 - trailIndex * 0.02);
        const shouldRefresh = isHead
          ? Math.random() < headChangeChance
          : nextHold <= 0 && Math.random() < trailChangeChance;

        if (!columnChars[trailIndex] || shouldRefresh) {
          columnChars[trailIndex] = randomMatrixChar();
          columnHolds[trailIndex] = isHead
            ? 20 + Math.random() * 35
            : 90 + trailIndex * 55 + Math.random() * 180;
        }
      }

      dropCharsRef.current[i] = columnChars;
      dropCharHoldRef.current[i] = columnHolds;

      // The effective head is the lowest character still on screen.
      // When y > canvasHeight the true head is off-screen; we promote
      // the next visible character so every visible stream has a white leader.
      const headOverflow = Math.max(0, y - canvasHeightRef.current);
      const effectiveHeadIndex = Math.min(
        Math.ceil(headOverflow / fontSize),
        trailLength - 1,
      );

      for (let trailIndex = trailLength - 1; trailIndex >= 0; trailIndex -= 1) {
        const text = columnChars[trailIndex] ?? randomMatrixChar();
        const trailY = y - fontSize * MATRIX_TRAIL_STEP * trailIndex;
        const flowStrength = 1 - trailIndex / Math.max(trailLength - 1, 1);
        const glowStrength = Math.pow(flowStrength, 1.15);
        const fillAlpha = 0.14 + glowStrength * 0.86;
        const blurStrength = isFirefox
          ? fontSize * (0.04 + glowStrength * 0.22) * glowVariant
          : fontSize * (0.08 + glowStrength * 0.42) * glowVariant;

        ctx.fillStyle = matrixColorsRef.current.char;
        ctx.globalAlpha = Math.min(fillAlpha, 0.96);
        ctx.shadowBlur = blurStrength;
        ctx.shadowColor = matrixColorsRef.current.glow;
        ctx.fillText(text, x, trailY);

        if (trailIndex === effectiveHeadIndex) {
          ctx.fillStyle = "#c8ffd8";
          ctx.globalAlpha = 1;
          ctx.shadowBlur = fontSize * 0.55 * glowVariant;
          ctx.shadowColor = "#aaffcc";
          ctx.fillText(text, x, trailY);
          ctx.fillStyle = matrixColorsRef.current.char;
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (y > canvasHeightRef.current && Math.random() > 0.99) {
        dropsRef.current[i] = 0;
        dropProgressRef.current[i] = 0;
        dropTrailLengthRef.current[i] = MATRIX_MIN_TRAIL_LENGTH + Math.floor(Math.random() * (MATRIX_MAX_TRAIL_LENGTH - MATRIX_MIN_TRAIL_LENGTH + 1));
        dropGlowRef.current[i] = MATRIX_GLOW_VARIANTS[Math.floor(Math.random() * MATRIX_GLOW_VARIANTS.length)];
        dropCharsRef.current[i] = Array.from({ length: MATRIX_MAX_TRAIL_LENGTH }, randomMatrixChar);
        dropCharHoldRef.current[i] = Array.from(
          { length: MATRIX_MAX_TRAIL_LENGTH },
          (_, index) => (index === 0 ? 0 : 110 + index * 45 + Math.random() * 120),
        );
      }
      dropProgressRef.current[i] += (dropSpeedsRef.current[i] ?? MATRIX_BASE_SPEED) * frameMultiplier;
      if (dropProgressRef.current[i] >= 1) {
        const steps = Math.floor(dropProgressRef.current[i]);
        dropsRef.current[i] += steps;
        dropProgressRef.current[i] -= steps;
        for (let stepIndex = 0; stepIndex < steps; stepIndex += 1) {
          const nextChars = [randomMatrixChar(), ...(dropCharsRef.current[i] ?? [])];
          dropCharsRef.current[i] = nextChars.slice(0, MATRIX_MAX_TRAIL_LENGTH);
          const nextHolds = [0, ...(dropCharHoldRef.current[i] ?? [])];
          dropCharHoldRef.current[i] = nextHolds.slice(0, MATRIX_MAX_TRAIL_LENGTH);
        }
      }
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.restore();

    animationFrameIdRef.current = requestAnimationFrame(animateMatrix);
  }, [getFontSize]);

  const initMatrix = useCallback((restart = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const heightDelta = Math.abs(height - lastHeightRef.current);

    if (restart && lastWidthRef.current === width && heightDelta > 0 && heightDelta < 120) {
      return;
    }

    const devicePixelRatio = window.devicePixelRatio || 1;
    dprRef.current = isFirefoxBrowser() ? Math.min(devicePixelRatio, 1) : devicePixelRatio;
    canvas.width = width * dprRef.current;
    canvas.height = height * dprRef.current;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
    ctxRef.current = ctx;
    readMatrixColors();
    canvasWidthRef.current = width;
    canvasHeightRef.current = height;
    lastWidthRef.current = width;
    lastHeightRef.current = height;

    const fontSize = getFontSize();
    // Overdraw slightly so edge columns still cover the viewport after transform/rounding.
    const columns = Math.ceil(width / (fontSize * MATRIX_COLUMN_SPACING)) + 1;
    const initialRows = Math.ceil(height / fontSize);
    // Seed each column at a different off-screen row so the first visible frame is already staggered.
    dropsRef.current = Array.from({ length: columns }, () => -Math.floor(Math.random() * initialRows));
    dropSpeedsRef.current = Array.from(
      { length: columns },
      () => MATRIX_BASE_SPEED * MATRIX_SPEED_VARIANTS[Math.floor(Math.random() * MATRIX_SPEED_VARIANTS.length)],
    );
    dropGlowRef.current = Array.from(
      { length: columns },
      () => MATRIX_GLOW_VARIANTS[Math.floor(Math.random() * MATRIX_GLOW_VARIANTS.length)],
    );
    dropProgressRef.current = Array.from({ length: columns }, () => 0);
    dropCharsRef.current = Array.from(
      { length: columns },
      () => Array.from({ length: MATRIX_MAX_TRAIL_LENGTH }, randomMatrixChar),
    );
    dropCharHoldRef.current = Array.from(
      { length: columns },
      () => Array.from(
        { length: MATRIX_MAX_TRAIL_LENGTH },
        (_, index) => (index === 0 ? 0 : 100 + index * 45 + Math.random() * 140),
      ),
    );
    dropTrailLengthRef.current = Array.from(
      { length: columns },
      () => MATRIX_MIN_TRAIL_LENGTH + Math.floor(Math.random() * (MATRIX_MAX_TRAIL_LENGTH - MATRIX_MIN_TRAIL_LENGTH + 1)),
    );
    lastFrameTimeRef.current = 0;

    if (restart && animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animateMatrix();
  }, [animateMatrix, getFontSize, readMatrixColors]);

  const deferInit = useCallback(() => {
    const requestIdle = (window as Window & { requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number })
      .requestIdleCallback;
    if (requestIdle) {
      requestIdle(() => {
        initMatrix();
      }, { timeout: 3000 });
      return;
    }

    window.setTimeout(() => {
      initMatrix();
    }, 2000);
  }, [initMatrix]);

  useEffect(() => {
    setTargetFps();
    readMatrixColors();
    deferInit();
    updateMatrixOpacity();

    const observer = new MutationObserver(() => {
      readMatrixColors();
      updateMatrixOpacity();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const handleResize = () => {
      initMatrix(true);
      updateMatrixOpacity();
    };

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) {
        return;
      }
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        updateMatrixOpacity();
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
      observer.disconnect();
    };
  }, [deferInit, initMatrix, readMatrixColors, setTargetFps, updateMatrixOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="matrix-canvas"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "var(--matrix-bg)",
      }}
    />
  );
};

export default MatrixBackground;
