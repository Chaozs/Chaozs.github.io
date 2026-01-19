import React, { useState } from "react";

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  loading?: "lazy" | "eager";
  onClick?: React.MouseEventHandler<HTMLImageElement>;
};

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  imgStyle,
  loading = "lazy",
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);
  const skeletonWidth = width ?? 200;
  const skeletonHeight = height ?? 120;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        ...style,
      }}
    >
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: "6px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              border: "3px solid rgba(228, 228, 228, 0.5)",
              borderTopColor: "#3bd16f",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        onClick={onClick}
        onLoad={() => setLoaded(true)}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: loaded ? 1 : 0,
          transition: "opacity 200ms ease",
          ...imgStyle,
        }}
      />
      <style>
        {`@keyframes spin { to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
};

export default ImageWithSkeleton;
