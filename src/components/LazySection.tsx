import React, { useEffect, useRef, useState } from "react";

type LazySectionProps = {
  children: React.ReactNode;
  minHeight?: number;
  rootMargin?: string;
  revealOnEvent?: string;
};

const LazySection: React.FC<LazySectionProps> = ({
  children,
  minHeight = 600,
  rootMargin = "200px 0px",
  revealOnEvent,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, rootMargin]);

  useEffect(() => {
    if (!revealOnEvent || isVisible) {
      return;
    }
    const handleReveal = () => {
      setIsVisible(true);
    };
    window.addEventListener(revealOnEvent, handleReveal);
    return () => {
      window.removeEventListener(revealOnEvent, handleReveal);
    };
  }, [revealOnEvent, isVisible]);

  return (
    <div ref={containerRef} style={{ minHeight: isVisible ? undefined : `${minHeight}px` }}>
      {isVisible ? children : null}
    </div>
  );
};

export default LazySection;
