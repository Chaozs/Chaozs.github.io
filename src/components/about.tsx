import React from "react";
import logo1 from "../img/ProfilePic.jpg";
import cat from "../img/Kiwi.png";
import cSharp from "../img/skillIcons/CSharp.svg";
import gitLogo from "../img/skillIcons/gitLogo.webp";
import javaLogo from "../img/skillIcons/javaLogo.svg";
import jiraLogo from "../img/skillIcons/jiraLogo.webp";
import jsLogo from "../img/skillIcons/JS.svg";
import linuxLogo from "../img/skillIcons/linuxLogo.png";
import playcanvasLogo from "../img/skillIcons/playcanvasLogo.jpg";
import reactLogo from "../img/skillIcons/reactLogo.png";
import scrumLogo from "../img/skillIcons/scrumLogo.png";
import sqlLogo from "../img/skillIcons/sqlLogo.png";
import typeScriptLogo from "../img/skillIcons/TypeScript.svg";
import unityLogo from "../img/skillIcons/unityLogo.png";
import vueJsLogo from "../img/skillIcons/vueJSLogo.png";
import dotNetLogo from "../img/skillIcons/netLogo.png";
import { aboutContent } from "../content";

type Skill = {
  icon: string;
  alt: string;
};

const skills: Skill[] = [
  { icon: cSharp, alt: "C#" },
  { icon: typeScriptLogo, alt: "TypeScript" },
  { icon: unityLogo, alt: "Unity" },
  { icon: dotNetLogo, alt: ".NET" },
  { icon: vueJsLogo, alt: "Vue.js" },
  { icon: playcanvasLogo, alt: "PlayCanvas" },
  { icon: javaLogo, alt: "Java" },
  { icon: reactLogo, alt: "React" },
  { icon: gitLogo, alt: "Git" },
  { icon: linuxLogo, alt: "Linux" },
  { icon: jiraLogo, alt: "Jira" },
  { icon: scrumLogo, alt: "Scrum" },
];

const About: React.FC = () => {
  const logo = logo1;

  return (
    <section id="about" className="about-mf sect-pt4 route" style={{ backgroundColor: "rgba(32, 33, 36, 0.6)" }}>
      <div className="container" style={{ backgroundColor: "#2a2a2a", borderRadius: "1%", padding: "20px" }}>
        <div className="title-box text-center" style={{ padding: "20px" }}>
          <h3 className="title-a" style={{ color: "#E4E4E4" }}> About</h3>
          <div className="line-mf"></div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="about-me pt-4 pt-md-0">
                      <a>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <img
                            src={logo}
                            alt="logo"
                            style={{ maxWidth: "100%", marginBottom: "20px", borderRadius: "2%", marginLeft: "-15px" }}
                          />
                        </div>
                      </a>
                      <div className="skill-mf" style={{ backgroundColor: "#1E1E1E", padding: "15px", borderRadius: "2%", marginLeft: "-5px" }}>
                      <div className="skill-category">
                        <p className="title-s" style={{ color: "#9A9A9A" }}>Skills:</p>
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
                        {skills.map((lang: Skill, index: number) => (
                          <span
                            key={index}
                            className="skill-icon"
                            data-tooltip={lang.alt}
                          >
                            <img
                              src={lang.icon}
                              alt={lang.alt}
                              style={{
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

                        {/* <p className="title-s" style={{ color: "#9A9A9A" }}>Languages:</p>
                        <p className="lead" style={{ color: "#E4E4E4" }}>C#, Typescript, Javascript, Java, SQL </p>
                        <p className="title-s" style={{ color: "#9A9A9A" }}>Frameworks:</p>
                        <p className="lead" style={{ color: "#E4E4E4" }}> .NET, Unity, VUE, Playcanvas</p>
                        <p className="title-s" style={{ color: "#9A9A9A" }}>Other:</p>
                        <p className="lead" style={{ color: "#E4E4E4" }}> Git, REST, Linux, Jira, Jenkins, Agile, Scrum</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" style={{ backgroundColor: "#1E1E1E", padding: "15px", borderRadius: "2%", marginRight: "-50px" }}>
                    <div className="row">
                      <div
                        className="col-sm-6 col-md-5"
                        style={{ margin: "0 auto" }}
                      >
                        <div
                          className="about-img"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            className="img-fluid rounded b-shadow-a"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    {aboutContent.map((content) => {
                      return (
                        <p
                          className="lead"
                          key={content.id}
                          style={{ color: "#E4E4E4" }}
                          dangerouslySetInnerHTML={{ __html: content.content }}
                        ></p>
                      );
                    })}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={cat}
                        alt="logo"
                        style={{ maxWidth: "100%", marginBottom: "20px", borderRadius: "2%", marginLeft: "-15px" }}
                      />
                    </div>
                    <p
                      className="lead"
                      style={{ color: "#E4E4E4" }}
                    > I also enjoy playing piano (I used to both teach and perform part-time before starting my tech career), check out my youtube piano covers by clicking the icon below! </p>
                    <div className="socials">
                      <ul>
                        <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <a
                            href="https://www.youtube.com/@Chaos4496/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <span className="ico-circle"   style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}>
                              <i className="ion-social-youtube"></i>
                            </span>
                          </a>
                        </span>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
