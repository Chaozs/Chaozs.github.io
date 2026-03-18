import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { ensureDosAssets } from "../emulator/externalAssets";

type DosEvent = "emu-ready" | "bnd-play" | "ci-ready" | "fullscreen-changed";
type DosOptions = {
  url: string;
  autoStart?: boolean;
  countDownStart?: number;
  backend?: "dosbox" | "dosboxX";
  backendLocked?: boolean;
  renderBackend?: "webgl" | "canvas";
  onEvent?: (event: DosEvent, arg?: unknown) => void;
};
type DosProps = {
  stop?: () => Promise<void> | void;
};
type DosFn = (element: HTMLDivElement, options: Partial<DosOptions>) => DosProps;
type PromptEvents = {
  onStdout?: (consumer: (data: unknown) => void) => void;
  onStderr?: (consumer: (data: unknown) => void) => void;
  onMessage?: (consumer: (data: unknown) => void) => void;
};
type CommandInterface = {
  events?: () => PromptEvents;
};

declare global {
  interface Window {
    Dos?: DosFn;
  }
}

type UseDosPlayerArgs = {
  bundleUrl: string;
  containerRef: RefObject<HTMLDivElement | null>;
};

type UseDosPlayerResult = {
  isReady: boolean;
  isRunning: boolean;
  hasClickedStart: boolean;
  mouseEnabled: boolean;
  loadError: string;
  handleStart: () => void;
  stopAndReset: () => void;
};

export const useDosPlayer = ({
  bundleUrl,
  containerRef,
}: UseDosPlayerArgs): UseDosPlayerResult => {
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasClickedStart, setHasClickedStart] = useState(false);
  const [mouseEnabled, setMouseEnabled] = useState(false);
  const [loadError, setLoadError] = useState("");

  const dosPlayerRef = useRef<DosProps | null>(null);
  const initRef = useRef(false);
  const isMountedRef = useRef(true);
  const startRequestedRef = useRef(false);
  const promptListenerBoundRef = useRef(false);
  const promptDetectionArmedRef = useRef(false);
  const promptBufferRef = useRef("");
  const promptArmTimeoutRef = useRef<number | null>(null);
  const readyFallbackRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (readyFallbackRef.current) {
      window.clearTimeout(readyFallbackRef.current);
      readyFallbackRef.current = null;
    }
    if (promptArmTimeoutRef.current) {
      window.clearTimeout(promptArmTimeoutRef.current);
      promptArmTimeoutRef.current = null;
    }
  }, []);

  const resetPlayerState = useCallback(() => {
    setIsReady(false);
    setIsRunning(false);
    setHasClickedStart(false);
    setMouseEnabled(false);
    setLoadError("");
    startRequestedRef.current = false;
    promptListenerBoundRef.current = false;
    promptDetectionArmedRef.current = false;
    promptBufferRef.current = "";
    clearTimers();
  }, [clearTimers]);

  const stopAndReset = useCallback(() => {
    if (dosPlayerRef.current?.stop) {
      void dosPlayerRef.current.stop();
    }
    dosPlayerRef.current = null;
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }
    resetPlayerState();
  }, [containerRef, resetPlayerState]);

  const bindPromptListener = useCallback(
    (ci?: CommandInterface) => {
      if (!ci || promptListenerBoundRef.current) {
        return;
      }
      const events = ci.events?.();
      if (!events) {
        return;
      }

      const decode = (data: unknown): string => {
        if (typeof data === "string") {
          return data;
        }
        if (data instanceof ArrayBuffer) {
          return new TextDecoder().decode(new Uint8Array(data));
        }
        if (ArrayBuffer.isView(data)) {
          return new TextDecoder().decode(data as Uint8Array);
        }
        return "";
      };

      const handleOutput = (data: unknown) => {
        if (!promptDetectionArmedRef.current) {
          return;
        }
        const text = decode(data);
        if (!text) {
          return;
        }
        promptBufferRef.current = `${promptBufferRef.current}${text}`.slice(-200);
        if (/[A-Z]:\\>/.test(promptBufferRef.current)) {
          if (!isMountedRef.current) {
            return;
          }
          stopAndReset();
        }
      };

      if (events.onStdout) {
        events.onStdout(handleOutput);
      }
      if (events.onStderr) {
        events.onStderr(handleOutput);
      }
      if (events.onMessage) {
        events.onMessage(handleOutput);
      }

      promptListenerBoundRef.current = Boolean(events.onStdout || events.onStderr || events.onMessage);
    },
    [stopAndReset],
  );

  const initPlayer = useCallback(() => {
    const container = containerRef.current;
    if (!window.Dos || !container) {
      return;
    }
    if (dosPlayerRef.current) {
      return;
    }
    dosPlayerRef.current = window.Dos(container, {
      url: bundleUrl,
      autoStart: true,
      countDownStart: 0,
      backend: "dosboxX",
      backendLocked: true,
      renderBackend: "webgl",
      onEvent: (event, arg) => {
        if (!isMountedRef.current) {
          return;
        }
        if (event === "emu-ready") {
          setIsReady(true);
        }
        if (event === "ci-ready") {
          setIsReady(true);
          setIsRunning(true);
          bindPromptListener(arg as CommandInterface);
          if (promptArmTimeoutRef.current) {
            window.clearTimeout(promptArmTimeoutRef.current);
          }
          promptArmTimeoutRef.current = window.setTimeout(() => {
            promptDetectionArmedRef.current = true;
          }, 2500);
          requestAnimationFrame(() => {
            container.focus();
          });
        }
      },
    });
  }, [bindPromptListener, bundleUrl, containerRef]);

  useEffect(() => {
    if (initRef.current) {
      return;
    }
    initRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (dosPlayerRef.current?.stop) {
        void dosPlayerRef.current.stop();
      }
      clearTimers();
    };
  }, [clearTimers]);

  const handleStart = useCallback(() => {
    if (isRunning || startRequestedRef.current) {
      return;
    }
    setLoadError("");
    setHasClickedStart(true);
    setMouseEnabled(true);
    startRequestedRef.current = true;
    if (readyFallbackRef.current) {
      window.clearTimeout(readyFallbackRef.current);
    }
    readyFallbackRef.current = window.setTimeout(() => {
      if (isMountedRef.current) {
        setIsReady(true);
      }
    }, 1500);

    void (async () => {
      try {
        await ensureDosAssets();
        if (!isMountedRef.current) {
          return;
        }
        initPlayer();
      } catch (error) {
        if (!isMountedRef.current) {
          return;
        }
        setLoadError(error instanceof Error ? error.message : "Failed to load mission console.");
        setIsReady(false);
        setIsRunning(false);
        setHasClickedStart(false);
        setMouseEnabled(false);
        startRequestedRef.current = false;
      }
    })();
  }, [initPlayer, isRunning]);

  return {
    isReady,
    isRunning,
    hasClickedStart,
    mouseEnabled,
    loadError,
    handleStart,
    stopAndReset,
  };
};
