import type { CSSProperties } from "react";
import AvanadeLogo from "./img/AvanadeLogo.webp";
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
  logo?: string;
  logoStyle?: CSSProperties;
  date?: string;
  role?: string;
  categories: string;
  skills: string;
  summary?: string;
  highlights?: string[];
  details?: string[];
  iframeUrl?: string;
  eyebrow?: string;
  liveUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
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

export type EducationDegree = {
  degree: string;
  field: string;
  date: string;
  thesisUrl?: string;
};

export type Education = {
  institution: string;
  degrees: EducationDegree[];
  highlights?: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
};

export const educationContent: Education[] = [
  {
    institution: "McMaster University",
    degrees: [
      { degree: "MASc", field: "Software Engineering", date: "2019 – 2022", thesisUrl: "https://macsphere.mcmaster.ca/items/f302fd7c-c4ee-4c2a-a5db-7b60c8ed24ac" },
      { degree: "Bachelor", field: "Software Engineering", date: "2014 – 2019" },
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "Azure Fundamentals AZ-900",
    issuer: "Microsoft",
    date: "September 2024",
    credentialId: "A2FEN4-CD9AFE",
  },
  {
    name: "GitHub Copilot GH-300",
    issuer: "Microsoft",
    date: "April 2026",
    credentialId: "4C3F3E-CBAH38",
  },
];

export const personalProjects: WorkExperience[] = [
  {
    title: "Mewgenics Breeding Planner",
    eyebrow: "Personal Project",
    categories: "Game Tooling · AI Integration",
    skills: "React · TypeScript · Node.js · Vite · OpenAI API",
    summary: "Fan-made tool to import, organize, and analyze Mewgenics (A cat-sim+tactical Video Game) breeding data — with an AI-powered planner for parsing and recommendations.",
    highlights: [
      "React + TypeScript frontend with a TypeScript Node.js server for screenshot parsing and AI-powered planner recommendations.",
      "Import spreadsheet-style cat data, edit inline, filter, drag to reorder, and manage Cats.",
      "AI-powered integration for screenshot parsing and customizable, structured AI-generated breeding recommendations with streamed output.",
      "Dynamically generates actionable Apply/Undo buttons from AI response output, allowing move and delete recommendations to be executed directly from result cards.",
    ],
    repoUrl: "https://github.com/Chaozs/Mewgenics-breeding-planner",
    demoUrl: "https://raw.githubusercontent.com/Chaozs/Mewgenics-breeding-planner/master/Docs/demo.gif",
  },
];

export const workExperiences: WorkExperience[] = [
  {
    title: "Avanade",
    logo: AvanadeLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-25px" },
    date: "April 2025 - Present",
    role: "Full Stack Developer",
    categories: "Software Consultant",
    skills: "C#, TypesScript",
    details: ["TBD"],
  },
  {
    title: "Prodigy Education",
    logo: prodigyLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-40px" },
    date: "February 2025 - Jan 2026",
    role: "Software Engineer",
    categories: "EdTech, Education Gaming, Web Development",
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
  },
  {
    title: "Gatarn Games Ltd",
    logo: gatarnLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-25px" },
    date: "Dec 2022 - Dec 2024",
    role: "Lead Software Engineer",
    categories: "Live-Service Gaming, Web Development",
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
  },
  {
    title: "Imagine Communications",
    logo: imagineLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-25px" },
    date: "Nov 2021 - Dec 2022",
    role: "Software Engineer",
    categories: "Broadcast/Media, Web Development",
    skills: "Typescript, C# .NET, VUE",
    summary:
      "Developed and maintained containerized web applications in a large-scale media technology environment.",
    highlights: [
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
    categories: "Web Development",
    skills: "JavaScript",
    summary:
      "Built customer-facing web tooling for location-based services, working directly with client requirements and third-party APIs.",
    highlights: [
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
    categories: "HealthTech, Rehabilitation Technology, VR",
    skills: "C#, Unity",
    summary:
      "Designed, developed, and maintained Cyclescape, a VR-based rehabilitation application used in a clinical hospital setting. I owned the system end-to-end and collaborated closely with doctors and physiotherapists to translate medical requirements and safety constraints into technical designs.",
    highlights: [
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
    categories: "Broadcast/Media",
    skills: "JavaScript",
    summary:
      "Worked on UI control applications used in live broadcast environments, gaining early experience with real-time systems, hardware integration, and complex operator workflows.",
    highlights: [
      "Developed UI control applications for camera operators in live broadcast settings.",
      "Implemented complex UI components including multiview layouts, drag-and-drop interactions, and operator-focused control panels.",
      "Integrated third-party broadcast and monitoring hardware into operator workflows.",
      "Built a Unity-based simulation controllable via TCP commands to support testing and visualization.",
    ],
  },
];
