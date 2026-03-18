const scriptPromises = new Map<string, Promise<void>>();
const stylesheetPromises = new Map<string, Promise<void>>();

const ensureScript = (src: string, test: () => boolean): Promise<void> => {
  if (typeof document === "undefined" || test()) {
    return Promise.resolve();
  }

  const existingPromise = scriptPromises.get(src);
  if (existingPromise) {
    return existingPromise;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    const handleLoad = () => {
      if (test()) {
        resolve();
        return;
      }
      reject(new Error(`Script loaded without expected global: ${src}`));
    };

    const handleError = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };

    if (existingScript) {
      if (test()) {
        resolve();
        return;
      }
      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.head.appendChild(script);
  }).catch((error) => {
    scriptPromises.delete(src);
    throw error;
  });

  scriptPromises.set(src, promise);
  return promise;
};

const ensureStylesheet = (href: string): Promise<void> => {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  const existingPromise = stylesheetPromises.get(href);
  if (existingPromise) {
    return existingPromise;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const existingLink = document.querySelector<HTMLLinkElement>(`link[href="${href}"]`);

    if (existingLink) {
      if (existingLink.sheet) {
        resolve();
        return;
      }
      existingLink.addEventListener("load", () => resolve(), { once: true });
      existingLink.addEventListener("error", () => reject(new Error(`Failed to load stylesheet: ${href}`)), { once: true });
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.addEventListener("load", () => resolve(), { once: true });
    link.addEventListener("error", () => reject(new Error(`Failed to load stylesheet: ${href}`)), { once: true });
    document.head.appendChild(link);
  }).catch((error) => {
    stylesheetPromises.delete(href);
    throw error;
  });

  stylesheetPromises.set(href, promise);
  return promise;
};

export const ensureDosAssets = async (): Promise<void> => {
  await ensureStylesheet("https://v8.js-dos.com/latest/js-dos.css");
  await ensureScript(
    "https://v8.js-dos.com/latest/js-dos.js",
    () => typeof window !== "undefined" && typeof window.Dos === "function",
  );
};

export const ensureJsNes = async (): Promise<void> => {
  await ensureScript(
    "https://unpkg.com/jsnes/dist/jsnes.min.js",
    () => typeof window !== "undefined" && typeof (window as Window & { jsnes?: unknown }).jsnes !== "undefined",
  );
};
