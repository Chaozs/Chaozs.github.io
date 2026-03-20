import React from "react";
import ImageWithSkeleton from "./ImageWithSkeleton";
import SurfaceCard from "./SurfaceCard";

type SkillItem = {
  icon: string;
  alt: string;
};

type SkillGridProps = {
  skills: SkillItem[];
  title?: string;
  columns?: number;
  iconSize?: number;
};

const SkillGrid: React.FC<SkillGridProps> = ({ skills, title = "Skills:", columns = 3, iconSize = 110 }) => (
  <SurfaceCard className="skill-mf about-skills-card" padding="15px">
    <div className="skill-category">
      <h3 className="title-s skill-category__title">
        {title}
      </h3>
      <div
        className="skill-grid"
        style={{ "--skill-cols": columns, "--skill-icon-size": `${iconSize}px` } as React.CSSProperties}
      >
        {skills.map((skill, index) => (
          <span key={index} className="skill-icon" data-tooltip={skill.alt}>
            <ImageWithSkeleton
              src={skill.icon}
              alt={skill.alt}
              width={iconSize}
              height={iconSize}
              imgStyle={{
                width: "100%",
                maxWidth: "var(--skill-icon-size)",
                height: "var(--skill-icon-size)",
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
