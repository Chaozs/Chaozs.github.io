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
  radius = "2%",
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

  return (
    <div className={className} style={baseStyle}>
      {children}
    </div>
  );
};

export default SurfaceCard;
