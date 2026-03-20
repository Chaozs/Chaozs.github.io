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
  decoding?: "sync" | "async" | "auto";
  fetchPriority?: "high" | "low" | "auto";
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
  decoding = "async",
  fetchPriority,
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

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
      {!loaded && !hasError && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--skeleton-bg)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              border: "3px solid var(--skeleton-border)",
              borderTopColor: "var(--accent)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      )}
      {hasError && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--skeleton-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            color: "var(--text-muted)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textAlign: "center",
            padding: "0.75rem",
          }}
        >
          Image unavailable
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onClick={onClick}
        onLoad={() => {
          setLoaded(true);
          setHasError(false);
        }}
        onError={() => {
          setLoaded(false);
          setHasError(true);
        }}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: loaded && !hasError ? 1 : 0,
          transition: "opacity 200ms ease",
          ...imgStyle,
        }}
      />
    </div>
  );
};

export default ImageWithSkeleton;
