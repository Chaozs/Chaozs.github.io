import React, { useCallback, useEffect, useRef } from "react";

type IdleDeadline = {
  timeRemaining: () => number;
  didTimeout: boolean;
};

type IdleCallbackOptions = {
  timeout?: number;
};

type IdleCallbackHandle = number;
type TimeoutHandle = ReturnType<typeof setTimeout>;

type IdleCallback = (callback: (deadline: IdleDeadline) => void, options?: IdleCallbackOptions) => IdleCallbackHandle;

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const idleCallbackIdRef = useRef<IdleCallbackHandle | TimeoutHandle | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dropsRef = useRef<number[]>([]);
  const dprRef = useRef<number>(1);
  const canvasWidthRef = useRef<number>(0);
  const canvasHeightRef = useRef<number>(0);
  const lastWidthRef = useRef<number>(0);
  const lastHeightRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const targetFpsRef = useRef<number>(60);

  const fontSize = 28;
  const columnSpacing = 0.65;
  const speed = 0.6;

  const setTargetFps = useCallback(() => {
    const cores = navigator.hardwareConcurrency || 0;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 0;
    const lowEnd = (cores && cores <= 4) || (memory && memory <= 4);
    targetFpsRef.current = lowEnd ? 20 : 60;
  }, []);

  const animateMatrix = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    if (targetFpsRef.current < 60) {
      const now = performance.now();
      const frameInterval = 1000 / targetFpsRef.current;
      if (now - lastFrameTimeRef.current < frameInterval) {
        animationFrameIdRef.current = requestAnimationFrame(animateMatrix);
        return;
      }
      lastFrameTimeRef.current = now;
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
    ctx.fillRect(0, 0, canvasWidthRef.current, canvasHeightRef.current);

    ctx.fillStyle = "#3bd16f";
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
      dropsRef.current[i] += speed;
    }
    ctx.restore();

    animationFrameIdRef.current = requestAnimationFrame(animateMatrix);
  }, [columnSpacing, fontSize, speed]);

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
    canvasWidthRef.current = width;
    canvasHeightRef.current = height;
    lastWidthRef.current = width;
    lastHeightRef.current = height;

    const columns = Math.floor(width / (fontSize * columnSpacing));
    dropsRef.current = new Array(columns).fill(1);

    if (restart && animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animateMatrix();
  }, [animateMatrix, columnSpacing, fontSize]);

  const deferInit = useCallback(() => {
    const requestIdle = (window as Window & { requestIdleCallback?: IdleCallback }).requestIdleCallback;
    if (requestIdle) {
      idleCallbackIdRef.current = requestIdle(() => {
        initMatrix();
      }, { timeout: 3000 });
      return;
    }

    idleCallbackIdRef.current = setTimeout(() => {
      initMatrix();
    }, 2000);
  }, [initMatrix]);

  useEffect(() => {
    setTargetFps();
    deferInit();

    const handleResize = () => {
      initMatrix(true);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      const cancelIdle = (window as Window & { cancelIdleCallback?: (handle: IdleCallbackHandle) => void })
        .cancelIdleCallback;
      if (idleCallbackIdRef.current !== null && cancelIdle && typeof idleCallbackIdRef.current === "number") {
        cancelIdle(idleCallbackIdRef.current);
      } else if (idleCallbackIdRef.current !== null) {
        clearTimeout(idleCallbackIdRef.current);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [deferInit, initMatrix, setTargetFps]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "#000000",
      }}
    />
  );
};

export default MatrixBackground;
