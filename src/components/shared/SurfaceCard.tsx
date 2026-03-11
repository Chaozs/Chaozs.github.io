import React from "react";

type SurfaceCardProps = {
  className?: string;
  background?: string;
  radius?: string;
  padding?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const SurfaceCard: React.FC<SurfaceCardProps> = ({
  className,
  background = "var(--surface-2)",
  radius = "var(--radius-md)",
  padding,
  style,
  children,
}) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor: background,
    borderRadius: radius,
    ...style,
  };

  if (padding !== undefined) {
    baseStyle.padding = padding;
  }

  const mergedClassName = className ? `surface-card ${className}` : "surface-card";

  return (
    <div className={mergedClassName} style={baseStyle}>
      {children}
    </div>
  );
};

export default SurfaceCard;
