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

const DOOM_BUNDLE_URL = `${import.meta.env.BASE_URL}doom/doom.jsdos?v=20260213f`;

const Doom: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasClickedStart, setHasClickedStart] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const dosPlayerRef = useRef<DosProps | null>(null);
  const dosboxContainerRef = useRef<HTMLDivElement | null>(null);
  const initRef = useRef(false);
  const isMountedRef = useRef(true);
  const hasLoggedScriptRef = useRef(false);
  const hasLoggedInstanceRef = useRef(false);
  const startRequestedRef = useRef(false);
  const pollRef = useRef<number | null>(null);
  const readyFallbackRef = useRef<number | null>(null);

  const initPlayer = () => {
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
      url: DOOM_BUNDLE_URL,
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

  const handleStart = () => {
    if (isRunning || startRequestedRef.current) {
      return;
    }
    setHasClickedStart(true);
    startRequestedRef.current = true;
    if (readyFallbackRef.current) {
      window.clearTimeout(readyFallbackRef.current);
    }
    readyFallbackRef.current = window.setTimeout(() => {
      if (isMountedRef.current) {
        setIsReady(true);
      }
    }, 1500);

    if (window.Dos) {
      initPlayer();
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
      initPlayer();
    }, 100);
  };

  const statusText = isRunning
    ? ""
    : (hasClickedStart
        ? (isReady ? "Loading DOOM..." : "Loading emulator...")
        : "Click to start");

  return (
    <section id="doom" className="doom-mf sect-pt4 route" style={{ backgroundColor: "var(--section-bg)" }}>
      <div className="container" style={{ backgroundColor: "var(--surface-1)", borderRadius: "1%", padding: "20px" }}>
        <div className="row">
          <div className="col-sm-12">
            <div className="title-box text-center">
              <h3 className="title-a" style={{ color: "var(--text-heading)", marginTop: "25px" }}> Play DOOM</h3>
              <div className="line-mf"></div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "var(--surface-2)", borderRadius: "2%", padding: "16px" }}>
          <p className="lead" style={{ color: "var(--text-primary)", textAlign: "center", marginBottom: "16px" }}>
            Yes, this website DOES run DOOM!
          </p>
          <div className="doom-frame-wrap" onClick={handleStart}>
            {statusText ? (
              <div className="doom-start-overlay" role="button" tabIndex={0} onClick={handleStart}>
                <div className="doom-start-text">{statusText}</div>
              </div>
            ) : null}
            <div
              id="dosbox"
              className="doom-dosbox"
              ref={dosboxContainerRef}
              tabIndex={0}
            ></div>
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
                    <ul className="doom-controls-list">
                      <li><span className="doom-key">W / S</span> Move</li>
                      <li><span className="doom-key">A / D</span> Strafe</li>
                      <li><span className="doom-key">&larr; / &rarr;</span> Turn</li>
                      <li><span className="doom-key">Space</span> Fire</li>
                      <li><span className="doom-key">Ctrl</span> Use/Open</li>
                      <li><span className="doom-key">Shift</span> Run</li>
                      <li><span className="doom-key">Tab</span> Automap</li>
                      <li><span className="doom-key">1-7</span> Weapons</li>
                    </ul>
                    <div className="doom-controls-subtitle">Menu Controls</div>
                    <ul className="doom-controls-list">
                      <li><span className="doom-key">&uarr; / &darr;</span> Navigate</li>
                      <li><span className="doom-key">Enter</span> Select</li>
                    </ul>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
          {isReady ? (
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
