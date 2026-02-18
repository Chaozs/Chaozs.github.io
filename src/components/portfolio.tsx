import React from "react";
import WorkBox from "./WorkExperience";
import { workExperiences } from "../content";
import SectionHeader from "./shared/SectionHeader";
import SectionShell from "./shared/SectionShell";

const Portfolio: React.FC = () => {
  return (
    <SectionShell id="work" className="portfolio-mf sect-pt4 route">
      <div className="row">
        <div className="col-sm-12">
          <SectionHeader title="Work Experience" marginTop="25px" />
        </div>
      </div>
      <div className="row">
        {workExperiences.map((experience, index) => (
          <WorkBox
            key={index}
            title={experience.title}
            logo={experience.logo}
            logoStyle={experience.logoStyle}
            date={experience.date}
            role={experience.role}
            skills={experience.skills}
            details={experience.details}
            iframeUrl={experience.iframeUrl}
          />
        ))}
      </div>
    </SectionShell>
  );
};

export default Portfolio;
