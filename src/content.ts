import type { CSSProperties } from "react";
import gatarnLogo from "./img/gglogo.webp";
import prodigyLogo from "./img/ProdigyLogo.webp";
import imagineLogo from "./img/ImagineLogo.webp";
import ViralStagingLogo from "./img/ViralStagingLogo.webp";
import McmasterLogo from "./img/mcmasterChildrenHospitalLogo.webp";
import EvertzLogo from "./img/Evertz_Microsystems_logo.svg.webp";

export type AboutContent = {
  id: string;
  content: string;
};

export type WorkExperience = {
  title: string;
  logo: string;
  logoStyle?: CSSProperties;
  date: string;
  role: string;
  skills: string;
  summary?: string;
  highlights?: string[];
  details: string[];
  iframeUrl?: string;
};

export const aboutContent: AboutContent[] = [
  {
    id: "first-p-about",
    content:
      "I’m a full-stack software engineer who builds and scales live production systems. I focus on modular architecture, performance optimization, and end-to-end feature ownership — from backend services and data models to front-end experiences and release stability."
  },
  {
    id: "second-p-about",
    content:
      'Most recently at <a href="https://www.prodigygame.com/main-en" target="_blank" rel="noopener noreferrer">Prodigy Education</a>, I led development of high-impact features including the Replay Campaign and onboarding systems, improving subscription conversion by 8.6% and reducing churn by 15% through data-driven iteration and A/B testing.'
  },
  {
    id: "third-p-about",
    content:
      'Previously, as the lead full-stack engineer at Gatarn Games Ltd., I architected and built <a href="https://www.crazygames.com/game/skillfite-io" target="_blank" rel="noopener noreferrer">Skillfite.io</a>, a real-time web platform supporting 1,000+ daily active users and over 1 million accounts, designing authentication services, SQL-backed data systems, and performance-optimized runtime architecture.'
  },
  {
    id: "fourth-p-about",
    content:
      'I care about building systems that are maintainable, measurable, and built to evolve — whether that means refactoring legacy components to reduce long-term cost, optimizing network traffic by 90%, or building tooling that accelerates entire teams.'
  },
  {
    id: "fifth-p-about",
    content:
      "Outside of work, I enjoy experimenting with new recipes, playing games, and attempting (unsuccessfully) to entertain permanently bored cats."
  }
];

export const aboutFooterContent =
  "I also enjoy playing piano (I used to both teach and perform part-time before starting my tech career), check out my youtube piano covers by clicking the icon below!";

export const workExperiences: WorkExperience[] = [
  {
    title: "Prodigy Education",
    logo: prodigyLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-40px" },
    date: "February 2025 - Jan 2026",
    role: "Software Engineer",
    skills: "Typescript, C#, Unity, A/B Testing, Git, Agentic AI-assisted development",
    summary:
      'Worked on <a href="https://www.prodigygame.com/main-en" target="_blank" rel="noopener noreferrer">Prodigy Math</a>, a large-scale educational game used by millions of students. I owned and delivered multiple production systems end-to-end, from architecture and experimentation design through live release and post-launch optimization, with direct impact on conversion, retention, and system performance. I worked closely with product, design, and QA partners and regularly supported live operations.',
    highlights: [
      "Led development of the Replay Campaign (New Game+), increasing subscription conversion by 8.6% and monthly revenue by 11%.",
      "Designed and delivered a new onboarding experience that reduced new-player churn by 15% and improved subscription conversion by 4%.",
      "Built modular ECS components and internal tooling that reduced content iteration time by 50%+ and enabled designer-owned updates.",
      "Shipped experimentation-driven features using A/B testing and staged rollouts, enabling safe, data-informed releases.",
      "Acted as release owner for live production systems, shipping hotfixes and driving long-term stability improvements.",
    ],
    details: [
      "Worked on <a href=\"https://www.prodigygame.com/main-en\" target=\"_blank\" rel=\"noopener noreferrer\">Prodigy Math</a>, a large-scale educational game used by millions of students. I owned and delivered multiple production systems end-to-end, from architecture and experimentation design through live release and post-launch optimization, with direct impact on conversion, retention, and system performance. I worked closely with product, design, and QA partners and regularly supported live operations.",
      "Highlights:",
      "Led development of the Replay Campaign (New Game+), increasing subscription conversion by 8.6% and monthly revenue by 11%.",
      "Designed and delivered a new onboarding experience that reduced new-player churn by 15% and improved subscription conversion by 4%.",
      "Built modular ECS components and internal tooling that reduced content iteration time by 50%+ and enabled designer-owned updates.",
      "Shipped experimentation-driven features using A/B testing and staged rollouts, enabling safe, data-informed releases.",
      "Acted as release owner for live production systems, shipping hotfixes and driving long-term stability improvements.",
    ],
  },
  {
    title: "Gatarn Games Ltd",
    logo: gatarnLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-25px" },
    date: "Dec 2022 - Dec 2024",
    role: "Lead Software Engineer",
    skills: "C# .NET, TypeScript, SQL, REST APIs, Live Ops, AI-assisted Development",
    iframeUrl: "https://skillfite.io/",
    summary:
      'Led the end-to-end development of <a href="https://skillfite.io/" target="_blank" rel="noopener noreferrer">Skillfite.io</a>, a real-time web application with 1,000+ daily active users. I owned backend services, performance-critical runtime systems, and the web client, and worked closely with product and design to evolve the platform in a live production environment.',
    highlights: [
      "Built and operated production systems and content delivery pipelines that enabled rapid releases and drove an 80% increase in monthly revenue.",
      "Designed authentication and session services and a SQL-backed data platform supporting accounts, inventory, and progression.",
      "Architected performance-critical runtime systems, reducing client-server network traffic by ~90% and improving CPU and memory performance by ~80%.",
      "Built and evolved the TypeScript web client powering gameplay, UI, and monetization, including reusable UI frameworks and ad-integration layers.",
      "Led engineering delivery, sprint planning, and technical hiring, supporting team growth and long-term maintainability.",
    ],
    details: [
      "Led the end-to-end development of <a href=\"https://skillfite.io/\" target=\"_blank\" rel=\"noopener noreferrer\">Skillfite.io</a>, a real-time web application with 1,000+ daily active users. I owned backend services, performance-critical runtime systems, and the web client, and worked closely with product and design to evolve the platform in a live production environment.",
      "Highlights:",
      "Built and operated production systems and content delivery pipelines that enabled rapid releases and drove an 80% increase in monthly revenue.",
      "Designed authentication and session services and a SQL-backed data platform supporting accounts, inventory, and progression.",
      "Architected performance-critical runtime systems, reducing client-server network traffic by ~90% and improving CPU and memory performance by ~80%.",
      "Built and evolved the TypeScript web client powering gameplay, UI, and monetization, including reusable UI frameworks and ad-integration layers.",
      "Led engineering delivery, sprint planning, and technical hiring, supporting team growth and long-term maintainability.",
    ],
  },
  {
    title: "Imagine Communications",
    logo: imagineLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-25px" },
    date: "Nov 2021 - Dec 2022",
    role: "Software Engineer",
    skills: "Typescript, C# .NET, VUE",
    summary:
      "Developed and maintained containerized web applications in a large-scale media technology environment.",
    highlights: [
      "Built web pages using Vue.js, TypeScript, and Docker.",
      "Worked in a SAFe Agile environment using Git, Bitbucket, Jenkins, and Jira.",
      "Improved customer usability through dynamic landing pages and advanced table filtering.",
      "Improved long-term code maintainability by contributing to bi-weekly merges of long-lived branches.",
    ],
    details: [
      "Developed and maintained containerized web applications in a large-scale media technology environment.",
      "Highlights:",
      "Built web pages using Vue.js, TypeScript, and Docker.",
      "Worked in a SAFe Agile environment using Git, Bitbucket, Jenkins, and Jira.",
      "Improved customer usability through dynamic landing pages and advanced table filtering.",
      "Improved long-term code maintainability by contributing to bi-weekly merges of long-lived branches.",
    ],
  },
  {
    title: "Viral Staging",
    logo: ViralStagingLogo,
    logoStyle: { width: "150px", marginLeft: "-25px", marginTop: "-10px" },
    date: "May 2022 - Aug 2022",
    role: "Freelancer Software Engineer",
    skills: "JavaScript",
    summary:
      "Built customer-facing web tooling for location-based services, working directly with client requirements and third-party APIs.",
    highlights: [
      "Implemented an embeddable HTML/JavaScript geolocation widget resolving postal codes to the nearest of 700+ vendors.",
      "Integrated Google Maps and Google Drive APIs to dynamically display and manage location data.",
    ],
    details: [
      "Built customer-facing web tooling for location-based services, working directly with client requirements and third-party APIs.",
      "Highlights:",
      "Implemented an embeddable HTML/JavaScript geolocation widget resolving postal codes to the nearest of 700+ vendors.",
      "Integrated Google Maps and Google Drive APIs to dynamically display and manage location data.",
    ],
  },
  {
    title: "McMaster Children's Hospital",
    logo: McmasterLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-25px" },
    date: "Sept 2019 - Nov 2021",
    role: "Software Engineer",
    skills: "C#, Unity",
    summary:
      "Designed, developed, and maintained Cyclescape, a VR-based rehabilitation application used in a clinical hospital setting. I owned the system end-to-end and collaborated closely with doctors and physiotherapists to translate medical requirements and safety constraints into technical designs.",
    highlights: [
      "Built caretaker-facing administrative tooling for managing patients, sessions, and application configuration.",
      "Designed data ingestion pipelines that transformed real-world map routes and elevation data into safe, traversable virtual environments.",
      "Implemented runtime systems to efficiently stream and load environment data while balancing CPU, GPU, and memory constraints in VR.",
      "Iteratively improved the application based on clinician feedback and live patient usage.",
    ],
    details: [
      "Designed, developed, and maintained Cyclescape, a VR-based rehabilitation application used in a clinical hospital setting. I owned the system end-to-end and collaborated closely with doctors and physiotherapists to translate medical requirements and safety constraints into technical designs.",
      "Highlights:",
      "Built caretaker-facing administrative tooling for managing patients, sessions, and application configuration.",
      "Designed data ingestion pipelines that transformed real-world map routes and elevation data into safe, traversable virtual environments.",
      "Implemented runtime systems to efficiently stream and load environment data while balancing CPU, GPU, and memory constraints in VR.",
      "Iteratively improved the application based on clinician feedback and live patient usage.",
    ],
  },
  {
    title: "Evertz",
    logo: EvertzLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-25px" },
    date: "May 2017 - Aug 2018",
    role: "Software Design Engineer Intern",
    skills: "JavaScript",
    details: [
      "Developed and maintained a graphical UI control application used by camera operators during live sports broadcasts.",
      "    Built interactive UI components including multiviewer displays, favourites bar, and drag-and-drop workflows to support real-time production control.",
      "    Integrated third-party broadcast hardware including Tektronix and Wohler devices for monitoring and signal management.",

      "Designed and implemented a Unity-based sports field simulation controllable via TCP connections and command protocols.",
      "    Developed network communication layers to simulate real-time device interactions and broadcast workflows.",
      "    Researched and implemented image tracking techniques for live sports feeds to enable virtual telestration and augmented reality overlays.",
    ],
  },
];
