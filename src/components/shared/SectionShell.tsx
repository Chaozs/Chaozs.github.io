import React, { useEffect, useRef, useState } from "react";

type SectionShellProps = {
  id: string;
  className?: string;
  containerPadding?: string;
  containerBackground?: string;
  containerRadius?: string;
  after?: React.ReactNode;
  children: React.ReactNode;
};

const SectionShell: React.FC<SectionShellProps> = ({
  id,
  className,
  containerPadding = "24px",
  containerBackground = "var(--surface-1)",
  containerRadius = "var(--radius-lg)",
  after,
  children,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || isVisible) {
      return;
    }

    if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${className ?? ""} section-shell${isVisible ? " is-visible" : ""}`.trim()}
      style={{ backgroundColor: "var(--section-bg)" }}
    >
      <div
        className="container section-shell__container"
        style={{ backgroundColor: containerBackground, borderRadius: containerRadius, padding: containerPadding }}
      >
        {children}
      </div>
      {after}
    </section>
  );
};

export default SectionShell;
