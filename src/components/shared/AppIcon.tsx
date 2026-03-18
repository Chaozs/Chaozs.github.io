import React from "react";

type IconName =
  | "bars"
  | "download"
  | "lock"
  | "sun"
  | "chevron-up"
  | "chevron-down"
  | "paper-plane"
  | "linkedin"
  | "github"
  | "youtube";

type AppIconProps = {
  name: IconName;
  className?: string;
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const AppIcon: React.FC<AppIconProps> = ({ name, className }) => {
  switch (name) {
    case "bars":
      return (
        <svg className={`app-icon ${className ?? ""}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
          <path {...strokeProps} d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "download":
      return (
        <svg className={`app-icon ${className ?? ""}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
          <path {...strokeProps} d="M12 4v10" />
          <path {...strokeProps} d="m8 10 4 4 4-4" />
          <path {...strokeProps} d="M5 19h14" />
        </svg>
      );
    case "lock":
      return (
        <svg className={`app-icon ${className ?? ""}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
          <rect {...strokeProps} x="5" y="10" width="14" height="10" rx="2.5" />
          <path {...strokeProps} d="M8 10V7.8a4 4 0 0 1 8 0V10" />
          <path {...strokeProps} d="M12 13.5v3" />
        </svg>
      );
    case "sun":
      return (
        <svg className={`app-icon ${className ?? ""}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
          <circle {...strokeProps} cx="12" cy="12" r="4" />
          <path {...strokeProps} d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
        </svg>
      );
    case "chevron-up":
      return (
        <svg className={`app-icon ${className ?? ""}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
          <path {...strokeProps} d="m6 14 6-6 6 6" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg className={`app-icon ${className ?? ""}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
          <path {...strokeProps} d="m6 10 6 6 6-6" />
        </svg>
      );
    case "paper-plane":
      return (
        <svg className={`app-icon ${className ?? ""}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
          <path {...strokeProps} d="M21 3 10 14" />
          <path {...strokeProps} d="m21 3-7 18-4-7-7-4Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={`app-icon ${className ?? ""}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M6.94 8.5H4.1V20h2.84zm.18-3.1a1.66 1.66 0 1 0-3.31 0 1.66 1.66 0 0 0 3.31 0M20 13.93c0-3.38-1.8-4.95-4.2-4.95a3.62 3.62 0 0 0-3.26 1.8V8.5H9.7V20h2.84v-6.4c0-1.68.32-3.31 2.4-3.31 2.05 0 2.08 1.91 2.08 3.41V20H20z" />
        </svg>
      );
    case "github":
      return (
        <svg className={`app-icon ${className ?? ""}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.21.68-.48v-1.7c-2.77.6-3.35-1.18-3.35-1.18-.45-1.15-1.1-1.45-1.1-1.45-.9-.62.07-.6.07-.6 1 .07 1.52 1.02 1.52 1.02.88 1.52 2.3 1.08 2.86.83.09-.64.34-1.08.62-1.33-2.21-.25-4.53-1.11-4.53-4.94 0-1.1.39-2 1.03-2.71-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.41.1 2.66.64.71 1.03 1.61 1.03 2.71 0 3.84-2.32 4.69-4.53 4.94.36.31.68.91.68 1.84v2.72c0 .27.18.58.69.48A10 10 0 0 0 12 2"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg className={`app-icon ${className ?? ""}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M21.58 7.2a2.95 2.95 0 0 0-2.08-2.09C17.66 4.6 12 4.6 12 4.6s-5.66 0-7.5.5A2.95 2.95 0 0 0 2.42 7.2C1.9 9.04 1.9 12 1.9 12s0 2.96.52 4.8a2.95 2.95 0 0 0 2.08 2.09c1.84.5 7.5.5 7.5.5s5.66 0 7.5-.5a2.95 2.95 0 0 0 2.08-2.09c.52-1.84.52-4.8.52-4.8s0-2.96-.52-4.8M10.2 15.02V8.98L15.42 12z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default AppIcon;
