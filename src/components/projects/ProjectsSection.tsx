import React from "react";
import SectionShell from "../shared/SectionShell";
import SectionHeader from "../shared/SectionHeader";
import WorkBox from "../WorkExperience";
import { personalProjects } from "../../content";

// ─── Section ──────────────────────────────────────────────────────────────────

const ProjectsSection: React.FC = () => (
  <SectionShell id="projects" className="sect-pt4">
    <div className="row">
      <div className="col-sm-12">
        <SectionHeader command="load project files" />
      </div>
    </div>
    <div className="row">
      {personalProjects.map((project) => (
        <WorkBox key={project.title} {...project} />
      ))}
    </div>
  </SectionShell>
);

export default ProjectsSection;
