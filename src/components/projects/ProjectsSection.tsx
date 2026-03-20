import React from "react";
import SectionShell from "../shared/SectionShell";
import SectionHeader from "../shared/SectionHeader";
import WorkBox from "../experiences/WorkExperience";
import { personalProjects } from "../../content";

// ─── Section ──────────────────────────────────────────────────────────────────

const ProjectsSection: React.FC = () => (
  <SectionShell id="projects" className="sect-pt4">
    <SectionHeader command="load project files" />
    <div className="row">
      {personalProjects.map((project) => (
        <WorkBox key={project.title} {...project} />
      ))}
    </div>
  </SectionShell>
);

export default ProjectsSection;
