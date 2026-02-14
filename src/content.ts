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
  details: string[];
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
    skills: "Typescript, C#, Unity, Live Ops, A/B Testing (Growthbook), Git, Jira, AI-assisted Development, Scrum",
    details: [
      "Main contributor to <a href=\"https://www.prodigygame.com/main-en\" target=\"_blank\" rel=\"noopener noreferrer\">Prodigy Math</a>'s Replay Campaign (New Game+), a scalable post-completion progression system.",
      "    Increased subscription conversion by 8.6% and monthly revenue by 11%.",
      "    Built modular ECS components following SOLID principles, reducing content iteration time by 50%+ and enabling designer-owned updates.",
      "    Performed cost analysis on legacy bug maintenance versus refactoring, then implemented reusable components to reduce long-term maintenance costs.",

      "Designed and delivered the Linear Campaign onboarding system reducing new-player churn by 15%.",
      "    Improved subscription conversion by 4%.",
      "    Validated feature via A/B testing with new players.",
      "    Designed staged rollouts across cohorts, including eventual legacy-player inclusion.",

      "Core engineer on Prodigy’s rapid-prototyping Game Island initiative, delivering monetized Unity experiences at production scale across web and Chromebook platforms.",
      "    Built and standardized AI-assisted development workflows for large Unity codebases, improving onboarding speed, refactoring safety, and test coverage.",
      "    Built A/B-tested monetization, including CDN-served video ads optimized for low-end Chromebooks.",
      "    Led development of Neek’s Bubble Rescue and Academy Defense, integrating education, progression, and monetization frameworks.",
      "    Shipped games that contributed to an 8% increase in player retention.",

      "Built internal designer & QA tooling to accelerate content development and testing.",
      "    Spreadsheet-to-JSON pipelines reduced data iteration time by 90%.",
      "    Debug commands and cheat tools significantly improved QA throughput and regression testing.",

      "Owned multiple live, user-facing features end-to-end and supported production operations.",
      "    Partnered closely with designers to iteratively refine core user flows through rapid prototyping and playtesting feedback.",
      "    Regular production release owner and incident responder, shipping hotfixes for live issues and driving permanent solutions.",
    ],
  },
  {
    title: "Gatarn Games Ltd",
    logo: gatarnLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-25px" },
    date: "Dec 2022 - Dec 2024",
    role: "Lead Software Engineer",
    skills: "C# .NET, TypeScript, SQL, REST APIs, Live Ops, SaaS, AI-assisted Development, Scrum",
    details: [
      "Led development of Skillfite.io, a real-time web application with 1,000+ daily active users.",
      "    Built and ran live-ops systems and content pipelines driving an 80% increase in monthly revenue.",
      "    Owned backend systems powering player progression, monetization, and real-time gameplay.",

      "Designed and implemented core backend services for authentication, sessions, and data persistence.",
      "    Built login and session services connecting web clients to backend services via TCP and WebSockets.",
      "    Implemented a SQL-backed data platform supporting accounts, inventory, and progression.",

      "Architected and optimized the game’s core runtime systems to improve performance and scalability.",
      "    Reduced client-server network traffic by ~90%, improving latency and lowering server costs.",
      "    Built a reusable ECS-style architecture enabling modular, data-driven feature development.",
      "    Implemented an object-pooling framework improving CPU and memory performance by ~80%.",

      "Built the TypeScript web client powering gameplay, UI, and monetization.",
      "    Designed reusable, SDK-agnostic ad-integration layers supporting multiple monetization providers.",
      "    Built extensible UI frameworks enabling rapid feature development and UX iteration.",

      "Drove performance, reliability, and developer velocity across the live service.",
      "    Used runtime profiling to identify bottlenecks, improving performance by ~50%.",
      "    Integrated AI-assisted engineering workflows to accelerate refactoring, test generation, and large-scale system changes.",

      "Led engineering delivery and team growth.",
      "    Ran standups, sprint planning, sprint reviews, and retrospectives using Jira.",
      "    Designed and ran the technical hiring process, interviewing and onboarding new engineers.",
    ],
  },
  {
    title: "Imagine Communications",
    logo: imagineLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-25px" },
    date: "Nov 2021 - Dec 2022",
    role: "Software Engineer",
    skills: "Typescript, C# .NET, VUE",
    details: [
      "Developed and maintained containerized web applications within a large-scale media technology environment.",
      "    Built responsive web interfaces using Vue.js and TypeScript, packaged and deployed via Docker.",
      "    Worked within a SAFe Agile framework using Git, Bitbucket, Jenkins, and Jira to deliver features iteratively and reliably.",

      "Improved customer usability through dynamic landing pages and advanced table filtering.",
      "    Implemented data-driven UI components that streamlined user workflows and improved interaction efficiency.",

      "Strengthened long-term code maintainability and release stability.",
      "    Contributed to bi-weekly merges of long-lived branches, resolving integration conflicts and reducing deployment risk.",
    ],
  },
  {
    title: "Viral Staging",
    logo: ViralStagingLogo,
    logoStyle: { width: "150px", marginLeft: "-25px", marginTop: "-10px" },
    date: "May 2022 - Aug 2022",
    role: "Freelancer Software Engineer",
    skills: "JavaScript",
    details: [
      "Built customer-facing web tooling for location-based services.",
      "    Implemented an embeddable HTML/JavaScript geolocation widget resolving postal codes to the nearest of 700+ vendors.",
      "    Integrated Google Maps and Google Drive APIs to dynamically display, update, and manage vendor location data.",
    ],
  },
  {
    title: "McMaster Children's Hospital",
    logo: McmasterLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-25px" },
    date: "Sept 2019 - Nov 2021",
    role: "Software Engineer",
    skills: "C#, Unity",
    details: [
      "Designed, developed, and maintained a VR-based rehabilitation application used in a clinical hospital setting.",
      "    Collaborated with doctors and physiotherapists to translate medical requirements and safety constraints into technical system designs.",
      "    Leveraged Google Maps APIs to dynamically retrieve real-world terrain data for use in virtual rehabilitation scenarios.",
      "    Designed tuning and transformation algorithms to convert terrain data into safe, traversable virtual environments.",
      "    Maintained and iteratively improved the application based on ongoing clinical feedback and patient usage.",
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

