import React from "react";
import WorkBox from "./WorkExperience";
import gatarnLogo from "../img/gglogo.png";
import imagineLogo from "../img/ImagineLogo.png";
import ViralStagingLogo from "../img/ViralStagingLogo.png";
import McmasterLogo from "../img/mcmasterChildrenHospitalLogo.jpg";
import EvertzLogo from "../img/Evertz_Microsystems_logo.svg.png"

class Portfolio extends React.Component {
  render() {
    const workExperiences = [
      {
        title: "Gatarn Games Ltd",
        logo: gatarnLogo,
        date: "Dec 2022 – Dec 2024",
        role: "Fullstack Software Engineer",
        skills: "C# .NET, Typescript, SQL, REST API, Scrum",
        details: [
          'Led development of <a href="https://www.crazygames.com/game/skillfite-io" target="_blank" rel="noopener noreferrer">Skillfite</a>, a live-service web-based MMORPG with 1000+ daily users.',
          "Implemented live-ops strategies that enhanced monthly revenue by 80%.",
          "Investigated performance issues using VS profiling tools yielding an improvement of 50%.",
          "Designed API endpoints to facilitate authentication, login, and connecting clients to servers.",
          "Created a SQL database to store user data, then integrated it into a .NET server using Entity Framework.",
          "Architected and implemented core features for a C# .NET server, including:",
          "    Reducing network traffic load between server and client by 90%.",
          "    Implementing an ECS (entity component system) for reusability and extensibility of game features.",
          "    Developing an object pooling system that improved CPU and memory performance by 80%.",
          "Developed a Typescript web client for handling user input and interactions.",
          "    Designed reusable interfaces for supporting multiple SDK integrations for ad monetization.",
          "    Fabricated abstract generic UI classes to streamline UI/UX development.",
          "Led product standups, biweekly sprint planning, sprint reports, and retro reports using Jira.",
          "Created and conducted technical interview processes for hiring new developers.",
        ],
      },
      {
        title: "Imagine Communications",
        logo: imagineLogo,
        date: "Nov 2021 – Dec 2022",
        role: "Software Engineer",
        skills: "Typescript, C# .NET, VUE",
        details: [
          "Designed containerized web pages using VUE.js, Typescript, and Docker.",
          "Worked in a SAFe Agile environment using Git, Bitbucket, Jenkins, and Jira.",
          "Improved customer usability with dynamic landing pages and custom table filtering.",
          "Enhanced code maintainability by taking an active role in bi-weekly merges of long-term branches.",
        ],
      },
      {
        title: "Viral Staging",
        logo: ViralStagingLogo,
        date: "May 2022 – Aug 2022",
        role: "Freelancer Software Engineer",
        skills: "JavaScript",
        details: [
          "Integrated Google Maps API and Google Drive API into customer websites to enable users to locate nearby businesses efficiently.",
        ],
      },
      {
        title: "McMaster Children's Hospital",
        logo: McmasterLogo,
        date: "Sept 2019 – Nov 2021",
        role: "Software Engineer",
        skills: "C#, Unity",
        details: [
          "Developed a Virtual Reality (VR) exercise/cycling application in C# and Unity.",
          "Interacted with doctors and external stakeholders to derive requirements and constraints.",
          "Leveraged Google Maps API to dynamically obtain terrain data.",
          "Designed tuning methods to transform terrain data into a traversable game map.",
        ],
      },
      {
        title: "Evertz",
        logo: EvertzLogo,
        date: "May 2017 – Aug 2018",
        role: "Software Design Engineer Intern",
        skills: "JavaScript",
        details: [
          "Developed and maintained UI control applications.",
          "Implemented third-party hardware integration.",
        ],
      },
    ];    
    return (
      <section id="work" className="portfolio-mf sect-pt4 route" style={{ backgroundColor: "#202124" }}>
        <div className="container" style={{backgroundColor: "#181818", borderRadius: "1%", padding: "20px"}}>
          <div className="row">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <h3 className="title-a" style={{color: "#E4E4E4", marginTop: "25px"}}> Work Experience</h3>
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
  }
}

export default Portfolio;
