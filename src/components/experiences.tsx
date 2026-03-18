import React from "react";
import WorkBox from "./WorkExperience";
import { workExperiences } from "../content";
import SectionShell from "./shared/SectionShell";
import SectionHeader from "./shared/SectionHeader";

const Experiences: React.FC = () => {
  return (
    <SectionShell id="work" className="sect-pt4">
      <div className="row">
        <div className="col-sm-12">
          <SectionHeader command="load experience dossier" />
        </div>
      </div>
      <div className="row">
        {workExperiences.map((experience) => (
          <WorkBox
            key={`${experience.title}-${experience.date}`}
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

export default Experiences;
