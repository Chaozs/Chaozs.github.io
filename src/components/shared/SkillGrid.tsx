import React from "react";
import ImageWithSkeleton from "../ImageWithSkeleton";
import SurfaceCard from "./SurfaceCard";

type SkillItem = {
  icon: string;
  alt: string;
};

type SkillGridProps = {
  skills: SkillItem[];
  title?: string;
};

const SkillGrid: React.FC<SkillGridProps> = ({ skills, title = "Skills:" }) => (
  <SurfaceCard className="skill-mf" padding="15px" style={{ marginLeft: "-5px" }}>
    <div className="skill-category">
      <p className="title-s" style={{ color: "var(--text-muted)" }}>
        {title}
      </p>
      <div
        className="icons"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(70px, 1fr))",
          gap: "12px",
          alignItems: "center",
          justifyItems: "stretch",
          width: "100%",
        }}
      >
        {skills.map((skill, index) => (
          <span key={index} className="skill-icon" data-tooltip={skill.alt}>
            <ImageWithSkeleton
              src={skill.icon}
              alt={skill.alt}
              width={130}
              height={110}
              imgStyle={{
                width: "100%",
                maxWidth: "130px",
                height: "110px",
                objectFit: "contain",
                justifySelf: "center",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  </SurfaceCard>
);

export default SkillGrid;
