import React from "react";
import logo1 from "../img/ProfilePic.jpg";
import cat from "../img/Kiwi.png"
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
import dotNetLogo from "../img/skillIcons/.netLogo.png";


const SkillIcon = ({ src, alt }) => (
  <img 
    src={src} 
    alt={alt} 
    style={{ width: "40px", height: "40px", borderRadius: "4px" }} 
  />
);

const skills = [
  { icon: cSharp, alt: "C#" },
  { icon: typeScriptLogo, alt: "TypeScript" },
  { icon: jsLogo, alt: "JavaScript" },
  { icon: javaLogo, alt: "Java" },
  { icon: sqlLogo, alt: "SQL" },
  { icon: dotNetLogo, alt: ".NET" },
  { icon: unityLogo, alt: "Unity" },
  { icon: vueJsLogo, alt: "Vue.js" },
  { icon: playcanvasLogo, alt: "PlayCanvas" },
  { icon: reactLogo, alt: "React" },
  { icon: gitLogo, alt: "Git" },
  { icon: linuxLogo, alt: "Linux" },
  { icon: jiraLogo, alt: "Jira" },
  { icon: scrumLogo, alt: "Scrum" },
];

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      logo: logo1,
      about_me: [
        {
          id: "first-p-about",
          content:
            "I'm a full-stack developer passionate about creating robust, modular, and scalable software that I hope will outlive me. I’ve been fortunate to gain experience across a wide range of development environments—from a fast-paced startup to a structured, large-scale corporate setting, and even a research-oriented role at a hospital. "
        },
        {
          id: "second-p-about",
          content:
            'Most recently, I served as the lead full-stack developer at Gatarn Games Ltd., where I worked on <a href="https://www.crazygames.com/game/skillfite-io" target="_blank" rel="noopener noreferrer">Skillfite.io</a>, a popular web game with over 1,000 daily players and more than 1 million accounts created.'
        },
        {
          id: "third-p-about",
          content:
            'Outside of my professional experience, I completed my thesis, <a href="https://macsphere.mcmaster.ca/handle/11375/29773" target="_blank" rel="noopener noreferrer">Generating Player-Traversable Paths for Cyclescape From Real World Data</a> as part of my MASc in Software Engineering.'
        },
        {
          id: "fourth-p-about",
          content:
            'In my free time, I like finding and experimenting new cooking recipes, playing video games, and failing to entertain my two silly cats (See proof below!)'
        }
      ]
    };
  }

  render() {
    return (
      <section id="about" className="about-mf sect-pt4 route" style={{ backgroundColor: "#202124" }}>
        <div className="container" style={{ backgroundColor: "#181818", borderRadius: "1%", padding: "20px" }}>
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
                        <a className="navbar-brand js-scroll" href="#page-top">
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <img
                              src={this.state.logo}
                              alt="logo"
                              style={{ maxWidth: "100%", marginBottom: "20px", borderRadius: "2%", marginLeft: "-15px" }}
                            />
                          </div>
                        </a>
                        <div className="skill-mf" style={{ backgroundColor: "#1E1E1E", padding: "15px", borderRadius: "2%", marginLeft: "-5px" }}>
                        <div className="skill-category">
                          <p className="title-s" style={{ color: "#9A9A9A" }}>Skills:</p>
                          <div className="icons">
                          {skills.map((lang, index) => {
                            // Define breakpoints and height values
                            const getDynamicHeight = () => {
                              const width = window.innerWidth;
                              if (width <= 600) return "50px"; // For small screens
                              if (width >= 1200) return "120px"; // For large screens
                              return "120px"; // Default height
                            };

                            return (
                              <img
                                key={index}
                                src={lang.icon}
                                alt={lang.alt}
                                style={{
                                  height: getDynamicHeight(),
                                  objectFit: "contain",
                                  margin: "5px",
                                }}
                              />
                            );
                          })}
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
                      {this.state.about_me.map((content) => {
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
                              <span className="ico-circle">
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
  }
}

export default About;
