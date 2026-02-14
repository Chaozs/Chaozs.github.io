import React, { useEffect, useRef, useState } from "react";

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

declare global {
  interface Window {
    Dos?: DosFn;
  }
}

const DOOM_BUNDLE_URL = `${import.meta.env.BASE_URL}doom/doom.jsdos?v=20260213m`;
const CIV_BUNDLE_URL = `${import.meta.env.BASE_URL}civ/civ.jsdos?v=20260214a`;
const WOLF_BUNDLE_URL = `${import.meta.env.BASE_URL}wolf3d/wolf3d.jsdos?v=20260214c`;

type GameId = "doom" | "civ" | "wolf3d";

const GAME_CONFIG: Record<GameId, { label: string; bundleUrl: string }> = {
  doom: {
    label: "DOOM",
    bundleUrl: DOOM_BUNDLE_URL,
  },
  civ: {
    label: "Civilization",
    bundleUrl: CIV_BUNDLE_URL,
  },
  wolf3d: {
    label: "Wolfenstein 3D",
    bundleUrl: WOLF_BUNDLE_URL,
  },
};

const Doom: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameId>("doom");
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasClickedStart, setHasClickedStart] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [mouseEnabled, setMouseEnabled] = useState(false);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const remapActiveRef = useRef(false);
  const dosPlayerRef = useRef<DosProps | null>(null);
  const dosboxContainerRef = useRef<HTMLDivElement | null>(null);
  const initRef = useRef(false);
  const isMountedRef = useRef(true);
  const hasLoggedScriptRef = useRef(false);
  const hasLoggedInstanceRef = useRef(false);
  const startRequestedRef = useRef(false);
  const pollRef = useRef<number | null>(null);
  const readyFallbackRef = useRef<number | null>(null);

  const initPlayer = (bundleUrl: string) => {
    if (!window.Dos || !dosboxContainerRef.current) {
      return;
    }
    if (!hasLoggedScriptRef.current) {
      // eslint-disable-next-line no-console
      console.log("js-dos script detected");
      hasLoggedScriptRef.current = true;
    }
    if (dosPlayerRef.current) {
      return;
    }
    if (!hasLoggedInstanceRef.current) {
      // eslint-disable-next-line no-console
      console.log("js-dos player created");
      hasLoggedInstanceRef.current = true;
    }
    dosPlayerRef.current = window.Dos(dosboxContainerRef.current, {
      url: bundleUrl,
      autoStart: true,
      countDownStart: 0,
      backend: "dosboxX",
      backendLocked: true,
      renderBackend: "webgl",
      onEvent: (event) => {
        if (!isMountedRef.current) {
          return;
        }
        if (event === "emu-ready") {
          setIsReady(true);
        }
        if (event === "ci-ready") {
          setIsReady(true);
          setIsRunning(true);
          const container = dosboxContainerRef.current;
          if (container) {
            requestAnimationFrame(() => {
              container.focus();
            });
          }
        }
      },
    });
  };

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
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
      if (readyFallbackRef.current) {
        window.clearTimeout(readyFallbackRef.current);
        readyFallbackRef.current = null;
      }
    };
  }, []);

  const resetPlayerState = () => {
    setIsReady(false);
    setIsRunning(false);
    setHasClickedStart(false);
    setMouseEnabled(false);
    setIsPointerLocked(false);
    startRequestedRef.current = false;
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (readyFallbackRef.current) {
      window.clearTimeout(readyFallbackRef.current);
      readyFallbackRef.current = null;
    }
  };

  const handleGameSwitch = (nextGame: GameId) => {
    if (nextGame === activeGame) {
      return;
    }
    if (document.pointerLockElement && document.exitPointerLock) {
      document.exitPointerLock();
    }
    if (dosPlayerRef.current?.stop) {
      void dosPlayerRef.current.stop();
    }
    dosPlayerRef.current = null;
    if (dosboxContainerRef.current) {
      dosboxContainerRef.current.innerHTML = "";
    }
    resetPlayerState();
    setActiveGame(nextGame);
  };

  const handleStart = () => {
    if (isRunning || startRequestedRef.current) {
      return;
    }
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

    const bundleUrl = GAME_CONFIG[activeGame].bundleUrl;
    if (window.Dos) {
      initPlayer(bundleUrl);
      return;
    }

    pollRef.current = window.setInterval(() => {
      if (!window.Dos) {
        return;
      }
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
      initPlayer(bundleUrl);
    }, 100);
  };

  useEffect(() => {
    remapActiveRef.current = activeGame === "wolf3d" && isRunning;
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
      const target = dosboxContainerRef.current ?? window;
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
  }, [activeGame, isRunning]);

  useEffect(() => {
    const handlePointerLockChange = () => {
      const container = dosboxContainerRef.current;
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
  }, []);

  const handleGamePointerDown = () => {
    const container = dosboxContainerRef.current;
    if (!container) {
      return;
    }
    container.focus();
    requestAnimationFrame(() => {
      container.focus();
    });
  };

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const container = dosboxContainerRef.current;
    if (!container) {
      return;
    }
    const blockedTexts = [
      "Use slider on the left to change sensitivity",
      "Current sensitivity:",
    ];
    const hideMessage = () => {
      const elements = Array.from(container.querySelectorAll<HTMLElement>("div, span, p, label"));
      elements.forEach((element) => {
        if (element.childElementCount > 0) {
          return;
        }
        if (blockedTexts.some((text) => element.textContent?.includes(text))) {
          element.style.display = "none";
        }
      });
    };
    hideMessage();
    const intervalId = window.setInterval(hideMessage, 500);
    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, 4000);
    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [isRunning]);

  const activeGameLabel = GAME_CONFIG[activeGame].label;
  const statusText = isRunning
    ? ""
    : (hasClickedStart
        ? (isReady ? `Loading ${activeGameLabel}...` : "Loading emulator...")
        : "Click to start");

  return (
    <section id="doom" className="doom-mf sect-pt4 route" style={{ backgroundColor: "var(--section-bg)" }}>
      <div className="container" style={{ backgroundColor: "var(--surface-1)", borderRadius: "1%", padding: "20px" }}>
        <div className="row">
          <div className="col-sm-12">
            <div className="title-box text-center">
              <h3 className="title-a" style={{ color: "var(--text-heading)", marginTop: "25px" }}> Play DOS Classics</h3>
              <div className="line-mf"></div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "var(--surface-2)", borderRadius: "2%", padding: "16px" }}>
          <div className="doom-game-toggle">
            <button
              type="button"
              className={`doom-game-button${activeGame === "doom" ? " is-active" : ""}`}
              onClick={() => handleGameSwitch("doom")}
            >
              DOOM
            </button>
            <button
              type="button"
              className={`doom-game-button${activeGame === "civ" ? " is-active" : ""}`}
              onClick={() => handleGameSwitch("civ")}
            >
              Civilization
            </button>
            <button
              type="button"
              className={`doom-game-button${activeGame === "wolf3d" ? " is-active" : ""}`}
              onClick={() => handleGameSwitch("wolf3d")}
            >
              Wolfenstein 3D
            </button>
          </div>
          <p className="lead" style={{ color: "var(--text-primary)", textAlign: "center", marginBottom: "16px" }}>
            Yes, this website CAN run {activeGameLabel}!
          </p>
          <div className="doom-frame-wrap" onClick={handleStart}>
            {statusText ? (
              <div className="doom-start-overlay" role="button" tabIndex={0} onClick={handleStart}>
                <div className="doom-start-text">{statusText}</div>
              </div>
            ) : null}
            <div
              id="dosbox"
              className={`doom-dosbox${mouseEnabled && isRunning ? " is-mouse-enabled" : ""}${isPointerLocked ? " is-pointer-locked" : ""}`}
              ref={dosboxContainerRef}
              tabIndex={0}
              onMouseDown={handleGamePointerDown}
            ></div>
            {isPointerLocked ? (
              <div className="doom-esc-hint">
                Press <span className="doom-key">Esc</span> to release mouse
              </div>
            ) : null}
            {hasClickedStart ? (
              <div className={`doom-controls doom-controls-overlay${showControls ? "" : " is-collapsed"}`}>
                <div className="doom-controls-header">
                  <div className="doom-controls-title">Controls</div>
                  <button
                    type="button"
                    className="doom-controls-toggle"
                    onClick={(event) => {
                      event.stopPropagation();
                      setShowControls((current) => !current);
                    }}
                  >
                    {showControls ? "Hide" : "Show"}
                  </button>
                </div>
                {showControls ? (
                  <>
                    {activeGame === "doom" ? (
                      <>
                        <ul className="doom-controls-list">
                          <li><span className="doom-key">W / S</span> Move</li>
                          <li><span className="doom-key">A / D</span> Strafe</li>
                          <li><span className="doom-key">&larr; / &rarr;</span> Turn</li>
                          <li><span className="doom-key">&uarr;</span> Fire</li>
                          <li><span className="doom-key">&darr;</span> Use/Open</li>
                          <li><span className="doom-key">Shift</span> Run</li>
                          <li><span className="doom-key">Tab</span> Automap</li>
                          <li><span className="doom-key">1-7</span> Weapons</li>
                        </ul>
                        <div className="doom-controls-subtitle">Mouse Controls</div>
                        <ul className="doom-controls-list">
                          <li><span className="doom-key">Mouse X</span> Turn</li>
                          <li><span className="doom-key">Mouse Y</span> Disabled</li>
                          <li><span className="doom-key">Mouse L</span> Fire</li>
                        </ul>
                        <div className="doom-controls-subtitle">Menu Controls</div>
                        <ul className="doom-controls-list">
                          <li><span className="doom-key">&uarr; / &darr;</span> Navigate</li>
                          <li><span className="doom-key">Enter</span> Select</li>
                        </ul>
                      </>
                    ) : activeGame === "civ" ? (
                      <>
                        <ul className="doom-controls-list">
                          <li><span className="doom-key">Mouse</span> Select / Interact</li>
                          <li><span className="doom-key">Mouse R</span> Cancel / Back</li>
                          <li><span className="doom-key">Enter</span> Confirm</li>
                          <li><span className="doom-key">Esc</span> Cancel</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <ul className="doom-controls-list">
                          <li><span className="doom-key">W / S</span> Move</li>
                          <li><span className="doom-key">A / D</span> Turn</li>
                          <li><span className="doom-key">Ctrl</span> Fire</li>
                          <li><span className="doom-key">Alt</span> Strafe</li>
                          <li><span className="doom-key">Space</span> Use/Open</li>
                          <li><span className="doom-key">Shift</span> Run</li>
                        </ul>
                        <div className="doom-controls-subtitle">Mouse Controls</div>
                        <ul className="doom-controls-list">
                          <li><span className="doom-key">Mouse X</span> Turn</li>
                          <li><span className="doom-key">Mouse Y</span> Disabled</li>
                          <li><span className="doom-key">Mouse L</span> Fire</li>
                        </ul>
                      </>
                    )}
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
          {isReady && activeGame === "doom" ? (
            <p className="doom-instructions">
              When the main menu loads, press <span className="doom-key">Enter</span> to start the game.
            </p>
          ) : null}
          <p className="doom-mobile-note">Controls only work on desktop.</p>
          <p className="doom-source">
            Powered by{" "}
            <a href="https://v8.js-dos.com/" target="_blank" rel="noopener noreferrer">
              js-dos v8 Player API
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Doom;
