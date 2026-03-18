import React, { useEffect, useRef, useState } from "react";
import logo1 from "../img/ProfilePic.webp";
import cat from "../img/Kiwi.webp";
import cat2 from "../img/kiki.webp";
import cSharp from "../img/skillIcons/CSharp.svg";
import gitLogo from "../img/skillIcons/gitLogo.webp";
import javaLogo from "../img/skillIcons/javaLogo.svg";
import jiraLogo from "../img/skillIcons/jiraLogo.webp";
import linuxLogo from "../img/skillIcons/linuxLogo.webp";
import playcanvasLogo from "../img/skillIcons/playcanvasLogo.webp";
import reactLogo from "../img/skillIcons/reactLogo.webp";
import scrumLogo from "../img/skillIcons/scrumLogo.webp";
import typeScriptLogo from "../img/skillIcons/TypeScript.svg";
import unityLogo from "../img/skillIcons/unityLogo.webp";
import vueJsLogo from "../img/skillIcons/vueJSLogo.webp";
import dotNetLogo from "../img/skillIcons/netLogo.webp";
import { aboutContent, aboutFooterContent } from "../content";
import ImageWithSkeleton from "./ImageWithSkeleton";
import SectionShell from "./shared/SectionShell";
import SectionHeader from "./shared/SectionHeader";
import SkillGrid from "./shared/SkillGrid";
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

const Profile: React.FC = () => {
  const [accessState, setAccessState] = useState<"sealed" | "unlocking" | "unlocked">("sealed");
  const unlockTimerRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number>(980);

  useEffect(() => {
    return () => {
      if (unlockTimerRef.current !== null) {
        window.clearTimeout(unlockTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const contentNode = contentRef.current;
    if (!contentNode) {
      return;
    }

    const updateHeight = () => {
      setExpandedHeight(contentNode.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);
      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(contentNode);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleRelock = () => {
    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = null;
    }

    setAccessState("sealed");
  };

  const handleUnlock = () => {
    if (accessState !== "sealed") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAccessState("unlocked");
      return;
    }

    setAccessState("unlocking");
    unlockTimerRef.current = window.setTimeout(() => {
      setAccessState("unlocked");
      unlockTimerRef.current = null;
    }, 1150);
  };

  return (
    <SectionShell id="about" className="sect-pt4">
      <div>
        <div className="row">
          <div className="col-sm-12 profile-section-header">
            <SectionHeader command="open profile" />
            {accessState === "unlocked" ? (
              <div className="about-dossier__relock-row">
                <button
                  type="button"
                  className="about-dossier__relock work-dossier__toggle"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRelock();
                  }}
                  aria-label="Seal profile dossier again"
                >
                  <span className="work-dossier__toggle-label">Seal Profile</span>
                  <span className="work-dossier__toggle-icon is-open" aria-hidden="true">
                    <span className="ion-ios-arrow-down"></span>
                  </span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={`about-dossier is-${accessState}`}
          style={{ "--about-dossier-expanded-height": `${Math.max(expandedHeight, 980)}px` } as React.CSSProperties}
        >
          <div className="about-dossier__viewport">
          <div
            ref={contentRef}
            className={`row about-layout about-dossier__content${accessState === "unlocked" ? " is-unlocked" : ""}`}
            aria-hidden={accessState !== "unlocked"}
          >
            <div className="col-md-6 about-top-photo-col about-dossier__panel">
              <div className="about-reveal-item about-reveal-item--name">
                <div className="profile-nameplate">
                  <div className="profile-nameplate__eyebrow">Profile Subject</div>
                  <h4 className="profile-nameplate__title">Thien Trandinh</h4>
                </div>
              </div>
              <div className="about-reveal-item about-reveal-item--photo">
                <ImageWithSkeleton
                  src={logo1}
                  alt="Portrait of Thien Trandinh"
                  style={{ width: "100%", maxWidth: "100%", height: "100%" }}
                  className="about-photo"
                  imgStyle={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "var(--radius-md)",
                    marginLeft: "0",
                  }}
                />
              </div>
            </div>
            <div className="col-md-6 about-top-skills-col about-dossier__panel">
              <div className="about-reveal-item about-reveal-item--skills">
                <SkillGrid skills={skills} />
              </div>
            </div>
            <div className="col-12 about-bottom-col about-dossier__panel">
              <SurfaceCard className="about-story-card" padding="18px">
                {aboutContent.map((content) => {
                  return (
                    <p
                      className="lead about-reveal-item about-reveal-item--paragraph"
                      key={content.id}
                      style={{ color: "var(--text-primary)" }}
                      dangerouslySetInnerHTML={{ __html: content.content }}
                    ></p>
                  );
                })}
                <div className="about-reveal-item about-reveal-item--cat">
                  <div className="about-cat-gallery">
                    <div className="about-cat-gallery__item about-cat-gallery__item--kiwi">
                      <ImageWithSkeleton
                        src={cat}
                        alt="Kiwi"
                        style={{ width: "100%", height: "100%" }}
                        className="about-photo"
                        imgStyle={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          marginLeft: "0",
                        }}
                      />
                    </div>
                    <div className="about-cat-gallery__item about-cat-gallery__item--kiki">
                      <ImageWithSkeleton
                        src={cat2}
                        alt="Kiki"
                        style={{ width: "100%", height: "100%" }}
                        className="about-photo"
                        imgStyle={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: "var(--radius-md)",
                          marginLeft: "0",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <p
                  className="lead about-reveal-item about-reveal-item--footer"
                  style={{ color: "var(--text-primary)" }}
                  dangerouslySetInnerHTML={{ __html: aboutFooterContent }}
                ></p>
                <div className="about-reveal-item about-reveal-item--social contact-relay-links profile-relay-links">
                  <a
                    className="contact-relay-link"
                    href="https://www.youtube.com/@Chaos4496/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open YouTube Channel"
                  >
                    <span className="contact-relay-link__label">YouTube</span>
                    <span className="contact-relay-link__icon" aria-hidden="true">
                      <i className="ion-social-youtube"></i>
                    </span>
                  </a>
                </div>
              </SurfaceCard>
            </div>
          </div>
          </div>

        <div
          className={`about-dossier__seal${accessState === "unlocked" ? " is-unlocked" : ""}`}
          aria-hidden={accessState === "unlocked"}
        >
          <div
            className="about-dossier__seal-card"
            onClick={handleUnlock}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleUnlock();
              }
            }}
            role="button"
            tabIndex={accessState === "sealed" ? 0 : -1}
            aria-label="Unlock profile dossier"
          >
            <div className="about-dossier__lock-core" aria-hidden="true">
              <span className="about-dossier__lock-ring"></span>
              <span className="about-dossier__lock-ring about-dossier__lock-ring--inner"></span>
                <span className="about-dossier__lock-icon">{accessState === "unlocking" ? "..." : "LOCK"}</span>
              </div>
              <div className="about-dossier__eyebrow">Classified Profile</div>
              <h3 className="about-dossier__title">
                {accessState === "unlocking" ? "Bypassing clearance protocol" : "File locked until authorized"}
              </h3>
              <div className="about-dossier__chips">
                <span className={`about-dossier__chip ${accessState === "unlocking" ? "about-dossier__chip--active" : "about-dossier__chip--alert"}`}>
                  {accessState === "unlocking" ? "Decrypting" : "Sealed"}
                </span>
                <span className="about-dossier__chip">Profile-THN-01</span>
              </div>
              <p className="about-dossier__summary">
                {accessState === "unlocking"
                  ? "Identity fragments, technical capabilities, and personal records are being reconstructed now."
                  : "Contains profile imagery, background summary, technical capabilities, and extracurricular records."}
              </p>
              {accessState === "sealed" ? (
                <div className="about-dossier__tap-hint">Click to unlock</div>
              ) : null}
              <div className="about-dossier__progress" aria-hidden="true">
                <span className="about-dossier__progress-bar"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default Profile;
