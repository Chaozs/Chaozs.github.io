/// <reference types="vite/client" />

declare const __BUILD_DATE__: string;

declare module "*.pdf" {
  const src: string;
  export default src;
}
