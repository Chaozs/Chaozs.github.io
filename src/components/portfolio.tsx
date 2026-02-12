import React from "react";
import WorkBox from "./WorkExperience";
import { workExperiences } from "../content";

const Portfolio: React.FC = () => {
  return (
    <section id="work" className="portfolio-mf sect-pt4 route" style={{ backgroundColor: "var(--section-bg)" }}>
      <div className="container" style={{ backgroundColor: "var(--surface-1)", borderRadius: "1%", padding: "20px" }}>
        <div className="row">
          <div className="col-sm-12">
            <div className="title-box text-center">
              <h3 className="title-a" style={{ color: "var(--text-heading)", marginTop: "25px" }}> Work Experience</h3>
              <div className="line-mf"></div>
            </div>
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
          />
        ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
