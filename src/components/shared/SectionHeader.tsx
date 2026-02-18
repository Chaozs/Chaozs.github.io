import React from "react";

type SectionHeaderProps = {
  title: string;
  align?: "center" | "left";
  padding?: string;
  marginTop?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, align = "center", padding, marginTop }) => {
  const titleStyle: React.CSSProperties = { color: "var(--text-heading)" };
  if (marginTop) {
    titleStyle.marginTop = marginTop;
  }

  return (
    <div
      className={`title-box${align === "center" ? " text-center" : ""}`}
      style={padding ? { padding } : undefined}
    >
      <h3 className="title-a" style={titleStyle}>
        {title}
      </h3>
      <div className="line-mf"></div>
    </div>
  );
};

export default SectionHeader;
