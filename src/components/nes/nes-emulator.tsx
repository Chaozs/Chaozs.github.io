import React, { useCallback, useEffect, useRef, useState } from "react";
import EmulatorShell from "../emulator/EmulatorShell";
import { ensureJsNes } from "../emulator/externalAssets";
import type { ControlSection } from "../js-dos/controls";

type NesStatus = "idle" | "loading" | "running" | "paused" | "error";

type JsNesGlobal = {
  NES: new (options: { onFrame: (frameBuffer: number[]) => void; onAudioSample?: (left: number, right: number) => void }) => {
    loadROM: (rom: string) => void;
    frame: () => void;
    buttonDown: (player: number, button: number) => void;
    buttonUp: (player: number, button: number) => void;
  };
  Controller: {
    BUTTON_A: number;
    BUTTON_B: number;
    BUTTON_SELECT: number;
    BUTTON_START: number;
    BUTTON_UP: number;
    BUTTON_DOWN: number;
    BUTTON_LEFT: number;
    BUTTON_RIGHT: number;
  };
};

const NES_CONTROLS: ControlSection[] = [
  {
    items: [
      { key: "\u2191 / \u2193 / \u2190 / \u2192", label: "D-pad" },
      { key: "Space", label: "A" },
      { key: "Z", label: "B" },
      { key: "Enter", label: "Start" },
      { key: "Shift", label: "Select" },
    ],
  },
];

type BuiltinRom = {
  id: string;
  label: string;
  fileName: string;
  displayName: string;
};

const BUILTIN_ROMS: BuiltinRom[] = [
  {
    id: "final-fantasy",
    label: "Final Fantasy",
    fileName: "final-fantasy-usa.nes",
    displayName: "Final Fantasy (USA)",
  },
  {
    id: "dragon-quest",
    label: "Dragon Quest",
    fileName: "dragon-quest-usa-translation-quest-v118.nes",
    displayName: "Dragon Quest (USA) Translation Quest v1.18",
  },
];

const CANVAS_WIDTH = 256;
const CANVAS_HEIGHT = 240;
const FRAME_INTERVAL = 1000 / 60;

type NesEmulatorProps = {
  activePresetId: string;
};

const NesEmulator: React.FC<NesEmulatorProps> = ({ activePresetId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nesRef = useRef<InstanceType<JsNesGlobal["NES"]> | null>(null);
  const rendererRef = useRef<{ ctx: CanvasRenderingContext2D; imageData: ImageData } | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const runningRef = useRef(false);
  const isMountedRef = useRef(true);
  const previousPresetRef = useRef<string | null>(null);
  const [romName, setRomName] = useState<string | null>(null);
  const [status, setStatus] = useState<NesStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [hasClickedStart, setHasClickedStart] = useState(false);

  const getJsNes = (): JsNesGlobal | null => {
    const jsnes = (window as Window & { jsnes?: JsNesGlobal }).jsnes;
    return jsnes?.NES ? jsnes : null;
  };

  const ensureRenderer = useCallback(() => {
    if (rendererRef.current) {
      return rendererRef.current;
    }
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return null;
    }
    const imageData = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
    rendererRef.current = { ctx, imageData };
    return rendererRef.current;
  }, []);

  const drawFrame = useCallback(
    (frameBuffer: number[]) => {
      const renderer = ensureRenderer();
      if (!renderer) {
        return;
      }
      const data = renderer.imageData.data;
      for (let i = 0; i < frameBuffer.length; i += 1) {
        const pixel = frameBuffer[i];
        const offset = i * 4;
        data[offset] = pixel & 0xff;
        data[offset + 1] = (pixel >> 8) & 0xff;
        data[offset + 2] = (pixel >> 16) & 0xff;
        data[offset + 3] = 0xff;
      }
      renderer.ctx.putImageData(renderer.imageData, 0, 0);
    },
    [ensureRenderer],
  );

  const stopLoop = useCallback(() => {
    runningRef.current = false;
    if (animationRef.current) {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    if (!nesRef.current || runningRef.current) {
      return;
    }
    runningRef.current = true;
    lastFrameRef.current = 0;

    const step = (timestamp: number) => {
      if (!runningRef.current || !nesRef.current) {
        return;
      }
      if (timestamp - lastFrameRef.current >= FRAME_INTERVAL) {
        nesRef.current.frame();
        lastFrameRef.current = timestamp;
      }
      animationRef.current = window.requestAnimationFrame(step);
    };

    animationRef.current = window.requestAnimationFrame(step);
  }, []);

  const bufferToBinaryString = useCallback((buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }, []);

  const startRom = useCallback(
    (romData: string, name: string, jsnes: JsNesGlobal) => {
      const nesInstance = new jsnes.NES({
        onFrame: drawFrame,
        onAudioSample: () => undefined,
      });
      nesInstance.loadROM(romData);
      nesRef.current = nesInstance;
      setRomName(name);
      setStatus("running");
      startLoop();
    },
    [drawFrame, startLoop],
  );

  const handleLoadBuiltin = useCallback(
    async (presetId: string) => {
      const preset = BUILTIN_ROMS.find((rom) => rom.id === presetId);
      if (!preset) {
        return;
      }
      setStatus("loading");
      setErrorMessage(null);
      stopLoop();

      try {
        await ensureJsNes();
      } catch (error) {
        if (!isMountedRef.current) {
          return;
        }
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Failed to load jsnes.");
        return;
      }

      const jsnes = getJsNes();
      if (!jsnes) {
        setStatus("error");
        setErrorMessage("jsnes failed to load.");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.BASE_URL}nes/${preset.fileName}?v=20260218`);
        if (!response.ok) {
          throw new Error("Failed to fetch ROM.");
        }
        const buffer = await response.arrayBuffer();
        if (!isMountedRef.current) {
          return;
        }
        const romData = bufferToBinaryString(buffer);
        startRom(romData, preset.displayName, jsnes);
      } catch (error) {
        if (!isMountedRef.current) {
          return;
        }
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Failed to load ROM.");
      }
    },
    [bufferToBinaryString, startRom, stopLoop],
  );

  const handleStart = useCallback(() => {
    if (status === "loading" || status === "running") {
      return;
    }
    if (!activePresetId) {
      return;
    }
    setHasClickedStart(true);
    void handleLoadBuiltin(activePresetId);
  }, [activePresetId, handleLoadBuiltin, status]);

  useEffect(() => {
    ensureRenderer();
    return () => {
      isMountedRef.current = false;
      stopLoop();
    };
  }, [ensureRenderer, stopLoop]);

  useEffect(() => {
    if (!activePresetId) {
      return;
    }
    if (previousPresetRef.current === activePresetId) {
      return;
    }
    stopLoop();
    nesRef.current = null;
    setErrorMessage(null);
    setStatus("idle");
    setHasClickedStart(false);
    setRomName(null);
    previousPresetRef.current = activePresetId;
  }, [activePresetId, stopLoop]);

  useEffect(() => {
    if (!nesRef.current || status === "loading" || status === "error" || status === "idle") {
      return undefined;
    }

    const jsnes = getJsNes();
    if (!jsnes) {
      return undefined;
    }

    const keyMap: Record<string, number> = {
      ArrowUp: jsnes.Controller.BUTTON_UP,
      ArrowDown: jsnes.Controller.BUTTON_DOWN,
      ArrowLeft: jsnes.Controller.BUTTON_LEFT,
      ArrowRight: jsnes.Controller.BUTTON_RIGHT,
      Space: jsnes.Controller.BUTTON_A,
      KeyZ: jsnes.Controller.BUTTON_B,
      Enter: jsnes.Controller.BUTTON_START,
      ShiftLeft: jsnes.Controller.BUTTON_SELECT,
      ShiftRight: jsnes.Controller.BUTTON_SELECT,
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!nesRef.current) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) {
        return;
      }
      const button = keyMap[event.code];
      if (button === undefined) {
        return;
      }
      event.preventDefault();
      nesRef.current.buttonDown(1, button);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!nesRef.current) {
        return;
      }
      const button = keyMap[event.code];
      if (button === undefined) {
        return;
      }
      event.preventDefault();
      nesRef.current.buttonUp(1, button);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [status]);

  const statusText = (() => {
    if (status === "loading") {
      return "Loading mission package...";
    }
    if (status === "error") {
      return errorMessage ?? "Something went wrong.";
    }
    if (!hasClickedStart) {
      return "Click to deploy";
    }
    return "";
  })();

  return (
    <>
      <EmulatorShell
        statusText={statusText}
        onStart={handleStart}
        isIdle={!hasClickedStart}
        isStarting={hasClickedStart && status === "loading"}
        isRunning={status === "running"}
        showControls={showControls}
        controls={NES_CONTROLS}
        onToggleControls={() => setShowControls((current) => !current)}
        showControlsOverlay={status !== "idle" && status !== "loading"}
      >
        <canvas className="emulator-nes-canvas" ref={canvasRef}></canvas>
      </EmulatorShell>
      <p className="emulator-hint">Tip: Click the mission window to focus input. Controls live in the top-right overlay.</p>
    </>
  );
};

export default NesEmulator;
