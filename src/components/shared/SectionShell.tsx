import React from "react";

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
}) => (
  <section id={id} className={className} style={{ backgroundColor: "var(--section-bg)" }}>
    <div
      className="container section-shell__container"
      style={{ backgroundColor: containerBackground, borderRadius: containerRadius, padding: containerPadding }}
    >
      {children}
    </div>
    {after}
  </section>
);

export default SectionShell;
