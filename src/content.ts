import type { CSSProperties } from "react";
import gatarnLogo from "./img/gglogo.png";
import prodigyLogo from "./img/ProdigyLogo.png";
import imagineLogo from "./img/ImagineLogo.png";
import ViralStagingLogo from "./img/ViralStagingLogo.png";
import McmasterLogo from "./img/mcmasterChildrenHospitalLogo.jpg";
import EvertzLogo from "./img/Evertz_Microsystems_logo.svg.png";

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
      "I'm a Software engineer passionate about creating robust, modular, and scalable software that I hope will outlive me. I've been fortunate to gain experience across a wide range of development environments-from a fast-paced startup to a structured, large-scale corporate setting, and even a research-oriented role at a hospital. "
  },
  {
    id: "second-p-about",
    content:
      'Most recently, I was a Software Engineer at Prodigy Education, where I worked on <a href="https://www.prodigygame.com/main-en" target="_blank" rel="noopener noreferrer">Prodigy Math</a>, North America\'s #1 Education Game for kids.'
  },
  {
    id: "third-p-about",
    content:
      'Prior to that, I served as the lead full-stack developer at a startup: Gatarn Games Ltd., where I worked on <a href="https://www.crazygames.com/game/skillfite-io" target="_blank" rel="noopener noreferrer">Skillfite.io</a>, a popular web game with over 1,000 daily players and more than 1 million accounts created.'
  },
  {
    id: "fourth-p-about",
    content:
      'Outside of my professional experience, I completed my thesis, <a href="https://macsphere.mcmaster.ca/handle/11375/29773" target="_blank" rel="noopener noreferrer">Generating Player-Traversable Paths for Cyclescape From Real World Data</a> as part of my MASc in Software Engineering.'
  },
  {
    id: "fifth-p-about",
    content:
      "In my free time, I like finding and experimenting new cooking recipes, playing video games, and failing to entertain permanently bored cats (See proof below!)"
  }
];

export const workExperiences: WorkExperience[] = [
  {
    title: "Prodigy Education",
    logo: prodigyLogo,
    logoStyle: { width: "300px", maxWidth: "300px", marginLeft: "-60px" },
    date: "February 2025 - Jan 2026",
    role: "Software Engineer",
    skills: "Typescript, C#, Unity, Live Ops, A/B Testing (Growthbook), Git, Jira, AI-assisted Development, Scrum",
    details: [
      "Main contributor to <a href=\"https://www.prodigygame.com/main-en\" target=\"_blank\" rel=\"noopener noreferrer\">Prodigy Math</a>'s Replay Campaign (New Game+), a scalable post-completion progression system.",
      "    Increased subscription conversion by 8.6% and monthly revenue by 11%.",
      "    Increased free-to-play premium currency spend by 7.9%, driving OTPs and upgrades.",
      "    Built modular level pipelines that reduced content iteration time by 50%+ and enabled designer-owned updates.",

      "Designed and delivered the Linear Campaign onboarding system, reducing new-player churn by 15%.",
      "    Improved subscription conversion by 5%.",
      "    Set up A/B testing to initially validate the feature with new players.",
      "        Designed staged rollouts for different cohorts and eventual legacy-player inclusion.",

      "Core engineer on Prodigy's rapid-prototyping Game Island initiative, delivering monetized Unity minigames at production scale across web and Chromebook platforms.",
      "    Built and standardized AI-assisted development workflows for large Unity codebases, improving onboarding speed, refactoring safety, and test coverage.",
      "    Built A/B-tested monetization systems, including CDN video ads optimized for low-end Chromebooks.",
      "    Led development of Neek's Bubble Rescue and Academy Defense, integrating education, progression, and monetization frameworks.",
      "        Shipped games that contributed to an 8% increase in player retention.",

      "Built internal designer and QA tooling.",
      "    Spreadsheet-to-JSON pipelines reduced data iteration time by 90%.",
      "    Debug commands and cheat tools significantly improved QA throughput and regression testing.",

      "Regular production release owner and incident responder.",
      "    Shipped hotfixes for live issues and drove permanent solutions to production problems.",
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
      'Led development and operation of <a href="https://www.crazygames.com/game/skillfite-io" target="_blank" rel="noopener noreferrer">Skillfite</a>, a web-based MMORPG SaaS with 1,000+ daily active users.',
      "Built and ran live-ops systems and content pipelines driving an 80% increase in monthly revenue.",
      "Owned production stability, uptime, and player experience for a continuously running live service.",

      "Built the scalable backend platform powering player progression, monetization, and real-time gameplay.",
      "Designed authentication, login, and session services connecting web clients to game servers.",
      "Implemented a SQL-backed player data platform to support accounts, inventory, and progression.",

      "Architected and optimized the game's core runtime systems, including:",
      "    Reducing client-server network traffic by ~90%, improving latency and lowering server costs.",
      "    Building a reusable ECS (Entity-Component-System) enabling rapid feature iteration and content expansion.",
      "    Implementing an object-pooling framework improving CPU and memory performance by ~80%.",

      "Built the TypeScript web client powering gameplay, UI, and monetization.",
      "    Designed reusable, SDK-agnostic ad-integration layers supporting multiple monetization providers.",
      "    Built extensible UI frameworks enabling rapid feature and UX development.",

      "Drove performance, reliability, and developer velocity across the live service.",
      "    Used Visual Studio and runtime profiling to identify bottlenecks, improving performance by ~50%.",
      "    Integrated AI-assisted development workflows to accelerate refactoring, test generation, and large-scale system changes while maintaining production-grade code quality.",

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
      "Designed containerized web pages using VUE.js, Typescript, and Docker.",
      "Worked in a SAFe Agile environment using Git, Bitbucket, Jenkins, and Jira.",
      "Improved customer usability with dynamic landing pages and custom table filtering.",
      "Enhanced code maintainability by taking an active role in bi-weekly merges of long-term branches.",
    ],
  },
  {
    title: "Viral Staging",
    logo: ViralStagingLogo,
    logoStyle: { marginLeft: "-25px" },
    date: "May 2022 - Aug 2022",
    role: "Freelancer Software Engineer",
    skills: "JavaScript",
    details: [
      "Implemented an embeddable HTML/JavaScript geolocation widget that resolved user postal codes to the nearest of 700+ vendors",
      "Built Google Maps and Google Drive API integrations to dynamically surface location data on customer-facing websites",
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
      "Developed a Virtual Reality (VR) exercise/cycling application in C# and Unity.",
      "Interacted with doctors and external stakeholders to derive requirements and constraints.",
      "Leveraged Google Maps API to dynamically obtain terrain data.",
      "Designed tuning methods to transform terrain data into a traversable game map.",
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
      "Developed and maintained UI control applications.",
      "Implemented third-party hardware integration.",
    ],
  },
];
