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
  <SurfaceCard className="skill-mf about-skills-card" padding="15px">
    <div className="skill-category">
      <h3 className="title-s skill-category__title">
        {title}
      </h3>
      <div className="skill-grid">
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
