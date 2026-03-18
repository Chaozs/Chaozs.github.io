import React, { useCallback, useEffect, useRef } from "react";

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dropsRef = useRef<number[]>([]);
  const dprRef = useRef<number>(1);
  const canvasWidthRef = useRef<number>(0);
  const canvasHeightRef = useRef<number>(0);
  const lastWidthRef = useRef<number>(0);
  const lastHeightRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const targetFpsRef = useRef<number>(60);
  const baseOpacityRef = useRef<number>(1);
  const scrollFrameRef = useRef<number | null>(null);
  const columnSpacing = 0.65;
  const speed = 0.15;
  const matrixColorsRef = useRef({
    trail: "rgba(0, 0, 0, 0.06)",
    char: "#3bd16f",
  });

  const readMatrixColors = useCallback(() => {
    const styles = getComputedStyle(document.documentElement);
    const trail = styles.getPropertyValue("--matrix-trail").trim() || "rgba(0, 0, 0, 0.06)";
    const char = styles.getPropertyValue("--matrix-char").trim() || "#3bd16f";
    const opacity = Number.parseFloat(styles.getPropertyValue("--matrix-opacity").trim() || "1");
    matrixColorsRef.current = { trail, char };
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
    targetFpsRef.current = lowEnd ? 20 : 60;
  }, []);

  const getFontSize = useCallback(() => {
    if (window.innerWidth <= 480) {
      return 22;
    }
    if (window.innerWidth <= 767.98) {
      return 28;
    }
    return 39;
  }, []);

  const animateMatrix = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
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
    ctx.font = `${fontSize}px monospace`;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    ctx.save();
    ctx.setTransform(-dprRef.current, 0, 0, dprRef.current, canvasWidthRef.current * dprRef.current, 0);
    for (let i = 0; i < dropsRef.current.length; i += 1) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize * columnSpacing;
      const y = dropsRef.current[i] * fontSize;
      ctx.fillText(text, x, y);
      const trailText = chars.charAt(Math.floor(Math.random() * chars.length));
      const trailText2 = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(trailText, x, y - fontSize * 2);
      ctx.fillText(trailText2, x, y - fontSize * 4);

      if (y > canvasHeightRef.current && Math.random() > 0.99) {
        dropsRef.current[i] = 0;
      }
      dropsRef.current[i] += speed * frameMultiplier;
    }
    ctx.restore();

    animationFrameIdRef.current = requestAnimationFrame(animateMatrix);
  }, [columnSpacing, getFontSize, speed]);

  const initMatrix = useCallback((restart = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const heightDelta = Math.abs(height - lastHeightRef.current);

    if (restart && lastWidthRef.current === width && heightDelta > 0 && heightDelta < 120) {
      return;
    }

    dprRef.current = window.devicePixelRatio || 1;
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
    const columns = Math.ceil(width / (fontSize * columnSpacing)) + 1;
    const initialRows = Math.ceil(height / fontSize);
    // Seed each column at a different off-screen row so the first visible frame is already staggered.
    dropsRef.current = Array.from({ length: columns }, () => -Math.random() * initialRows);
    lastFrameTimeRef.current = 0;

    if (restart && animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animateMatrix();
  }, [animateMatrix, columnSpacing, getFontSize, readMatrixColors]);

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
