import React from "react";
import logo1 from "../img/ProfilePic.webp";
import cat from "../img/Kiwi.webp";
import cSharp from "../img/skillIcons/CSharp.svg";
import gitLogo from "../img/skillIcons/gitLogo.webp";
import javaLogo from "../img/skillIcons/javaLogo.svg";
import jiraLogo from "../img/skillIcons/jiraLogo.webp";
import jsLogo from "../img/skillIcons/JS.svg";
import linuxLogo from "../img/skillIcons/linuxLogo.webp";
import playcanvasLogo from "../img/skillIcons/playcanvasLogo.webp";
import reactLogo from "../img/skillIcons/reactLogo.webp";
import scrumLogo from "../img/skillIcons/scrumLogo.webp";
import sqlLogo from "../img/skillIcons/sqlLogo.webp";
import typeScriptLogo from "../img/skillIcons/TypeScript.svg";
import unityLogo from "../img/skillIcons/unityLogo.webp";
import vueJsLogo from "../img/skillIcons/vueJSLogo.webp";
import dotNetLogo from "../img/skillIcons/netLogo.webp";
import { aboutContent, aboutFooterContent } from "../content";
import ImageWithSkeleton from "./ImageWithSkeleton";
import SectionHeader from "./shared/SectionHeader";
import SectionShell from "./shared/SectionShell";
import SkillGrid from "./shared/SkillGrid";
import SocialIconLink from "./shared/SocialIconLink";
import SurfaceCard from "./shared/SurfaceCard";

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
    <SectionShell id="about" className="about-mf sect-pt4 route">
      <SectionHeader title="About" padding="20px" />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div>
              <div className="row">
                <div className="col-md-6 about-left-col">
                  <div className="about-me pt-4 pt-md-0">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <ImageWithSkeleton
                          src={logo}
                          alt="logo"
                          style={{ width: "100%", maxWidth: "100%", aspectRatio: "4 / 3" }}
                          className="about-photo"
                          imgStyle={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            marginBottom: "20px",
                            borderRadius: "var(--radius-md)",
                            marginLeft: "0",
                          }}
                        />
                      </div>
                    <SkillGrid skills={skills} />
                    </div>
                  </div>
                  <SurfaceCard className="col-md-6 about-right-col" padding="18px" style={{ marginRight: "-50px" }}>
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
                          style={{ color: "var(--text-primary)" }}
                          dangerouslySetInnerHTML={{ __html: content.content }}
                        ></p>
                      );
                    })}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <ImageWithSkeleton
                        src={cat}
                        alt="logo"
                        width={420}
                        height={320}
                        style={{ maxWidth: "100%" }}
                        className="about-photo"
                        imgStyle={{
                          maxWidth: "100%",
                          marginBottom: "20px",
                          borderRadius: "var(--radius-md)",
                          marginLeft: "0",
                        }}
                      />
                    </div>
                    <p
                      className="lead"
                      style={{ color: "var(--text-primary)" }}
                      dangerouslySetInnerHTML={{ __html: aboutFooterContent }}
                    ></p>
                    <SocialIconLink
                      href="https://www.youtube.com/@Chaos4496/"
                      iconClass="ion-social-youtube"
                      label="YouTube"
                    />
                  </SurfaceCard>
                </div>
              </div>
            </div>
          </div>
        </div>
    </SectionShell>
  );
};

export default About;
