"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, cubicBezier, motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import CopyEmailHint from "@/components/CopyEmailHint";
import ContactForm from "@/components/ContactForm";
import LiveClock from "@/components/LiveClock";
import { apiUrl } from "@/lib/api";
import {
  ClockIcon,
  ExternalArrow,
  InstagramIcon,
  LocationIcon,
  SpotifyIcon,
  TempIcon,
  ThreadsIcon,
  YouTubeIcon,
  XIcon,
} from "@/components/Icons";


const experiences = [
  {
    start: "2024",
    end: "NOW",
    role: "IT Student Assistant",
    company: "Schneider Electric",
    logo: "/images/SE.svg",
    description:
      "Delivered IT support and data management while building KPI dashboards in Power BI/Tableau, analyzing data with Python/SQL/Excel, and automating reporting workflows.",
  },
  {
    start: "2024",
    end: "NOW",
    role: "CEO",
    company: "adaKon",
    logo: "/images/adaKon.svg",
    description:
      "Leading a team of web designers and programmers. Was focused on product development, and agile project management. Led full-stack delivery for businesses in Denmark and produced market research insights.",
  },
  {
    start: "2021",
    end: "2022",
    role: "System Administrator",
    company: "Krolikoff",
    logo: "/images/Krolikoff.svg",
    description:
      "System administration and network administration for IT infrastructure, including device management, server support, and DevOps-aligned IT service management.",
  },
];

const education = [
  {
    start: "2021",
    end: "2025",
    degree: "BSc in Software Engineering",
    school: "National Aviation University",
    logo: "/images/NAU.svg",
    description:
      "Software engineering foundation with hands-on development, web fundamentals, documentation standards, and deployment/containerisation.",
  },
  {
    start: "2022",
    end: "2025",
    degree: "BSc in Data Science",
    school: "IT University of Copenhagen",
    logo: "/images/ITU.svg",
    description:
      "Project-driven mix of math, statistics, computer science, and social science in Copenhagen with core courses in Machine Learning, NLP & Deep Learning, Network Analysis, and Large-Scale Data Analysis.",
  },
  {
    start: "2025",
    end: "2027",
    degree: "MSc in Data Science",
    school: "IT University of Copenhagen",
    logo: "/images/ITU.svg",
    description:
      "MSc in Data Science in Copenhagen with advanced training in end-to-end data science solutions: statistical and algorithmic foundations, modern analysis, communication, and operationalisation.",
  },
];

const certifications = [
  {
    date: "2025",
    title: "Artificial Intelligence on Microsoft Azure",
    href: "https://www.coursera.org/account/accomplishments/verify/SU4S72QLQBPK",
    icon: "/images/Microsoft.svg",
    iconAlt: "Microsoft Azure logo",
  },
  {
    date: "2025",
    title: "Computer Vision in Microsoft Azure",
    href: "https://www.coursera.org/account/accomplishments/verify/B701NF8UH36V",
    icon: "/images/Microsoft.svg",
    iconAlt: "Microsoft Azure logo",
  },
  {
    date: "2025",
    title: "Microsoft Azure Machine Learning",
    href: "https://www.coursera.org/account/accomplishments/verify/CP6CLAKQBMV7",
    icon: "/images/Microsoft.svg",
    iconAlt: "Microsoft Azure logo",
  },
  {
    date: "2025",
    title: "Modern Data Warehouse Analytics in Microsoft Azure",
    href: "https://www.coursera.org/account/accomplishments/verify/CKPFRP2DKHF2",
    icon: "/images/Microsoft.svg",
    iconAlt: "Microsoft Azure logo",
  },
  {
    date: "2025",
    title: "Natural Language Processing in Microsoft Azure",
    href: "https://www.coursera.org/account/accomplishments/verify/RIOA1JHX51YG",
    icon: "/images/Microsoft.svg",
    iconAlt: "Microsoft Azure logo",
  },
  {
    date: "2025",
    title: "Fundamentals of Financial Analysis",
    href: "https://www.coursera.org/account/accomplishments/verify/NFJF69Y5ZNB1",
    icon: "/images/London Business School.svg",
    iconAlt: "London Business School logo",
  },
  {
    date: "2025",
    title: "Data Analytics and Databases on AWS",
    href: "https://www.coursera.org/account/accomplishments/verify/JW527RE7UG19",
    icon: "/images/AWS.svg",
    iconAlt: "AWS logo",
  },
  {
    date: "2025",
    title: "Agile and Hybrid Approaches",
    href: "https://www.coursera.org/account/accomplishments/verify/Z0BE3RTT4HR5",
    icon: "/images/Microsoft.svg",
    iconAlt: "Microsoft logo",
  },
  {
    date: "2025",
    title: "Program Management Fundamentals",
    href: "https://www.coursera.org/account/accomplishments/verify/BHLUHOW96DAQ",
    icon: "/images/Microsoft.svg",
    iconAlt: "Microsoft logo",
  },
];

type WorkProject = {
  title: string;
  description: string;
  tag: string;
  href: string;
  previewVideo: string;
  iconGradient?: string;
  client: string;
  year: string;
  overview: string;
  hero: string;
  heroAlt: string;
  technologies: string[];
  whatIDid?: string[];
  whyItMatters?: string[];
};

const workProjects: WorkProject[] = [
  {
    title: "Intrusion Detection System",
    description:
      "Deep learning techniques of anomaly detection with a hybrid Convolutional Neural Network (CNN) and LSTM intrusion detection model.",
    tag: "AI / CYBERSECURITY",
    href: "#",
    previewVideo:
      "https://stream.mux.com/MvSECpFN9Y72sNWh5rbPXOPEWtfaSRz374bt00uTm00bI.m3u8",
    iconGradient: "linear-gradient(135deg, #1f1f1f 0%, #2e244a 45%, #121217 100%)",
    client: "National Aviation University",
    year: "2024",
    overview:
      "I built a real-time intrusion detection system for cybersecurity as my Bachelor's thesis, turning raw network traffic into a production-ready deep learning application deployable in the cloud.",
    hero: "/images/IDS.png",
    heroAlt: "Intrusion detection system interface for cybersecurity anomaly detection",
    technologies: [
      "Python",
      "SQL",
      "Machine Learning",
      "Deep Learning",
      "CNN",
      "LSTM",
      "Cybersecurity",
      "AWS",
    ],
    whatIDid: [
      "Designed a hybrid CNN + LSTM model to detect network intrusions in real time",
      "Built an asynchronous Python pipeline for streaming network traffic analysis",
      "Implemented unit testing and CI/CD with GitHub Actions",
      "Containerized the system with Docker and deployed it on AWS Kubernetes",
    ],
    whyItMatters: [
      "The system does not just classify traffic after the fact - it detects attacks as they happen, with reliability and scalability in mind.",
      "It is not a prototype. It is an engineering-grade security component.",
    ],
  },
  {
    title: "Dataset design and surplus detection",
    description:
      "Data engineering and dataset creation with anomaly detection for supply chain analytics in the Nordic energy market.",
    tag: "DATA ENGINEERING / ML",
    href: "#",
    previewVideo:
      "https://stream.mux.com/x2yYHQcY00TxRRiSAgNOFfAkXmgoj6OeZ01zMTOC37j48.m3u8",
    iconGradient: "linear-gradient(135deg, #1f1f1f 0%, #153545 45%, #0f1419 100%)",
    client: "IT University of Copenhagen",
    year: "2025",
    overview:
      "I built an end-to-end data engineering pipeline and dataset creation workflow for surplus detection in the Nordic power market, turning grid, market, and weather data into clear anomaly events and explanations for price collapses.",
    hero: "/images/Dataset.png",
    heroAlt: "Dataset design and surplus detection dashboard with energy market analytics",
    technologies: [
      "Python",
      "SQL",
      "Data Engineering",
      "Anomaly Detection",
      "Supply Chain Analytics",
      "Machine Learning",
      "Power BI",
      "Tableau",
    ],
    whatIDid: [
      "Built a unified hourly dataset across Nordic bidding zones from ENTSO-E/TSOs/eSett + ERA5",
      "Defined surplus and grouped hours into events with severity and grid-stress metrics",
      "Analyzed key drivers, such as wind, load, exports, balancing with zone-level modeling and event visuals",
    ],
    whyItMatters: [
      "Surplus is not just cheap power - it is a repeatable system state where wind-driven oversupply meets transmission and flexibility limits, pushing prices toward zero or negative and increasing balancing pressure.",
      "This project turns that into measurable, explainable signals you can act on.",
    ],
  },
  {
    title: "PLM-ICD reproducibility study",
    description:
      "Healthcare NLP and bioinformatics for automatic ICD coding with a pretrained language model on clinical data.",
    tag: "HEALTHCARE NLP / ICD CODING",
    href: "#",
    previewVideo:
      "https://stream.mux.com/Y502NxqkSzme4JrQukbI7C8FiSW8oIPSudCvW3FCmg24.m3u8",
    iconGradient: "linear-gradient(135deg, #1f1f1f 0%, #3a2f1a 45%, #14100d 100%)",
    client: "IT University of Copenhagen",
    year: "2025",
    overview:
      "I reproduced a state-of-the-art healthcare NLP system for automatic ICD coding, moving from published research to verified results on restricted healthcare data using a high-performance computing cluster.",
    hero: "/images/PLM.jpg",
    heroAlt: "Healthcare NLP project for ICD coding on clinical data",
    technologies: [
      "Python",
      "Healthcare NLP",
      "ICD Coding",
      "Clinical Data",
      "Pretrained Language Model",
      "Transformer",
      "Deep Learning",
      "Bioinformatics",
    ],
    whatIDid: [
      "Reproduced the PLM-ICD model for automatic ICD coding using a pretrained RoBERTa-based language model",
      "Set up and ran large-scale experiments on the MIMIC-III clinical dataset",
      "Executed training and evaluation on ITU's HPC cluster using SLURM and GPU nodes",
      "Analyzed discrepancies between reproduced and original results, identifying methodological causes",
    ],
    whyItMatters: [
      "The core claims held up within tight margins, while subtle differences revealed how fragile reproducibility can be in modern ML research.",
    ],
  },
  {
    title: "Visualisation of WWII military losses",
    description:
      "Tableau data visualization and analytics showing USSR WWII losses and the post-war lost generation.",
    tag: "DATA / VISUALIZATION",
    href: "#",
    previewVideo:
      "https://stream.mux.com/v01ouKlqfQFAk2JWxtf5VueNgk6ykMIt8Nh8qb2Pnk6U.m3u8",
    iconGradient: "linear-gradient(135deg, #1f1f1f 0%, #2b1f32 45%, #151018 100%)",
    client: "IT University of Copenhagen",
    year: "2024",
    overview:
      "I built a Tableau data story that turns dense WWII datasets into one clear narrative - how Eastern Front battles map to casualty spikes and how those losses reshaped USSR demographics by 1946.",
    hero: "/images/WW2.png",
    heroAlt: "Tableau data visualization of WWII military losses",
    technologies: [
      "Tableau",
      "Data Visualization",
      "Data Analytics",
      "Data Interpretation",
      "Statistical Analysis",
      "Population Analysis",
      "Data Storytelling",
      "Excel",
    ],
    whatIDid: [
      "Built a mountain-shaped casualties timeline and annotated major events and battles",
      "Highlighted the scale of loss with contextual callouts",
      "Compared civilian vs military deaths by republic to show regional disproportions",
      "Created 1941 vs 1946 population pyramids to reveal the post-war deficit of young men",
    ],
    whyItMatters: [
      "You can see the war as a timeline of peaks, and then immediately see the echo of those peaks in the population structure that followed.",
    ],
  },
];

const skills = [
  { label: "Python", priority: true },
  // { label: "SQL", priority: true },
  { label: "PostgreSQL" },
  // { label: "Machine Learning", priority: true },
  { label: "Power BI", priority: true },
  { label: "Tableau", priority: true },
  // { label: "Deep Learning" },
  // { label: "Neural Networks" },
  // { label: "Artificial Intelligence" },
  // { label: "Data Analysis" },
  // { label: "Data Analytics" },
  // { label: "Data Interpretation" },
  { label: "Microsoft Azure" },
  // { label: "Azure AI" },
  { label: "AWS" },
  // { label: "Cloud Computing" },
  // { label: "Big Data" },
  // { label: "Excel" },
  { label: "React" },
  { label: ".NET" },
  // { label: "Full-Stack Development" },
  { label: "JavaScript" },
  { label: "TypeScript" },
  { label: "C++" },
  { label: "C#" },
  { label: "R" },
  // { label: "Agile" },
];

const languages = [
  {
    label: "English",
    flagSrc: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1ec-1f1e7.svg",
  },
  {
    label: "Ukrainian",
    flagSrc: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1fa-1f1e6.svg",
  },
  {
    label: "Polish",
    flagSrc: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f5-1f1f1.svg",
  },
  {
    label: "Russian",
    flagSrc: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f7-1f1fa.svg",
  },
  {
    label: "Danish",
    flagSrc: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1e9-1f1f0.svg",
  },
  {
    label: "German",
    flagSrc: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1e9-1f1ea.svg",
  },
];

const contactLinks = [
  {
    label: "Email",
    value: "alex04adamov@gmail.com",
    href: "mailto:alex04adamov@gmail.com",
    iconSrc: "/images/email.svg",
  },
  {
    label: "Meeting",
    value: "oleksandr-adamov",
    href: "https://app.cal.eu/oleksandr-adamov",
    iconSrc: "/images/calendar.svg",
  },
  {
    label: "GitHub",
    value: "@bTehe",
    href: "https://github.com/bTehe",
    iconSrc: "/images/github.svg",
  },
  {
    label: "LinkedIn",
    value: "/in/oleksandr-adamov",
    href: "https://www.linkedin.com/in/oleksandr-adamov",
    iconSrc: "/images/linkedin.svg",
  },
];

const menuItems = [
  {
    id: "home",
    label: "Home",
    href: "#top",
    icon: (
      <svg className="menu-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 16.2C5.6 13.8 7.6 12.8 10 12.8C12.4 12.8 14.4 13.8 16 16.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "work",
    label: "Work",
    href: "#work",
    icon: (
      <svg className="menu-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3.5" y="5.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3.5 8.5H16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    href: "#experience",
    icon: (
      <svg className="menu-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="4" y="7" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 7V5.8C8 5.3 8.3 5 8.8 5H11.2C11.7 5 12 5.3 12 5.8V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "stack",
    label: "Stack",
    href: "#stack",
    icon: (
      <svg className="menu-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 8L10 4L16 8L10 12L4 8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M4 12L10 16L16 12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "writing",
    label: "Certifications",
    href: "#writing",
    icon: (
      <svg className="menu-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 14.6L14.6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M11.8 4.8L15.2 8.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M4.5 15.5L8 14.8L5.2 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "personal",
    label: "Personal",
    href: "#personal",
    icon: (
      <svg className="menu-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10.5 3.5L6 11H10L9.5 16.5L14 9H10L10.5 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    icon: (
      <svg className="menu-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="4" y="5.5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.6 6.6L10 10.4L15.4 6.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const stackIcons = [
  {
    id: "azure",
    label: "Azure",
    icon: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/microsoft-azure.svg",
    href: "https://azure.microsoft.com/",
  },
  {
    id: "aws",
    label: "AWS",
    icon: "/images/AWS.svg",
    href: "https://aws.amazon.com/",
  },
  {
    id: "powerbi",
    label: "Power BI",
    icon: "/images/PowerBI.svg",
    href: "https://powerbi.microsoft.com/",
  },
  {
    id: "tableau",
    label: "Tableau",
    icon: "/images/Tableau.svg",
    href: "https://www.tableau.com/",
  },
  {
    id: "alteryx",
    label: "Alteryx",
    icon: "/images/Alteryx.svg",
    href: "https://www.alteryx.com/",
  },
  {
    id: "docker",
    label: "Docker",
    icon: "/images/Docker.svg",
    href: "https://www.docker.com/",
  },
  {
    id: "tensorflow",
    label: "TensorFlow",
    icon: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/tensorflow.svg",
    href: "https://www.tensorflow.org/",
  },
  {
    id: "pytorch",
    label: "PyTorch",
    icon: "/images/PyTorch.svg",
    href: "https://pytorch.org/",
  },
  {
    id: "pandas",
    label: "Pandas",
    icon: "/images/Pandas.svg",
    href: "https://pandas.pydata.org/",
  },
  {
    id: "numpy",
    label: "NumPy",
    icon: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/numpy.svg",
    href: "https://numpy.org/",
  },
  {
    id: "matplotlib",
    label: "Matplotlib",
    icon: "/images/Matplotlib.svg",
    href: "https://matplotlib.org/",
  },
  {
    id: "github",
    label: "GitHub",
    icon: "https://cdn.simpleicons.org/github/FFFFFF",
    href: "https://github.com/",
  },
  {
    id: "figma",
    label: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@master/logos/figma.svg",
    href: "https://www.figma.com/",
  },
];

const workScreens = [
  { src: "/ui/ui-1.svg", alt: "Dark dashboard panel" },
  { src: "/ui/ui-2.svg", alt: "Code editor view" },
  { src: "/ui/ui-3.svg", alt: "Light UI form" },
  { src: "/ui/ui-4.svg", alt: "Settings modal" },
];

const URL_FROM_IFRAME = /(https?:\/\/[^ ]*)/;
const SE_PREVIEW_SRC =
  "https://stream.mux.com/AiWR2Q02g02fjG3jrdIQXMK018QdGEUCcMhlKZ01tbK9EtQ.m3u8";

const buildSpotifyEmbedSrc = (url: string, theme = 0) => {
  if (!url || url.length < 5) {
    return null;
  }

  const raw = url.includes("iframe") ? url.match(URL_FROM_IFRAME)?.[1]?.replace('"', "") : url;
  if (!raw) {
    return null;
  }

  try {
    const parsed = new URL(raw);
    if (!parsed.pathname.includes("embed")) {
      parsed.pathname = `/embed${parsed.pathname}`;
    }
    parsed.search = `theme=${theme}`;
    return parsed.toString();
  } catch (error) {
    return null;
  }
};

const hoverTransition: Transition = { type: "spring", bounce: 0.25, duration: 0.45, delay: 0 };
const strongSpring: Transition = { type: "spring", damping: 30, stiffness: 400, mass: 1, delay: 0 };
const revealSpring: Transition = { type: "spring", bounce: 0.2, duration: 0.4 };
const pageAppearSpring: Transition = { type: "spring", damping: 30, stiffness: 400, mass: 1, delay: 1.5 };
const reducedTransition: Transition = { duration: 0 };
const cursorCardVariants: Variants = {
  initial: { opacity: 1, scale: 0.96, y: 6 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: cubicBezier(0.44, 0, 0.56, 1) },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 6,
    transition: { duration: 0.2, ease: cubicBezier(0.44, 0, 0.56, 1) },
  },
};

type PersonalTrack = {
  trackUrl: string;
  imageUrl?: string;
  title: string;
  subtitle: string;
  embedUrl?: string;
};

export default function Home() {
  const prefersReduced = useReducedMotion();
  const pageInitial = prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 15 };
  const pageTransition = prefersReduced ? reducedTransition : pageAppearSpring;
  const revealTransition = prefersReduced ? reducedTransition : revealSpring;
  const revealTarget = { opacity: 1, y: 0, scale: 1 };
  const revealY20 = prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };
  const revealViewport = { once: true, amount: 0.25 };
  const workModalVariants: Variants = {
    hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: prefersReduced ? 1 : 0,
      y: prefersReduced ? 0 : 40,
      transition: { duration: prefersReduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const workModalItemVariants: Variants = {
    hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 18 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1], delay: prefersReduced ? 0 : delay },
    }),
  };
  const [menuHidden, setMenuHidden] = useState(false);
  const [bottomBlurHidden, setBottomBlurHidden] = useState(false);
  const fallbackSignaturePath =
    "M12 40C24 20 38 14 40 26C42 38 28 44 24 30C22 22 30 18 38 18C52 18 58 44 70 36C78 30 86 16 92 22C98 28 96 42 82 44";
  const [signatureActive, setSignatureActive] = useState(false);
  const [signaturePath, setSignaturePath] = useState(fallbackSignaturePath);
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [statusCursorActive, setStatusCursorActive] = useState(false);
  const [statusCursorPos, setStatusCursorPos] = useState({ x: 0, y: 0 });
  const [activeWork, setActiveWork] = useState<WorkProject | null>(null);
  const [topTrack, setTopTrack] = useState<PersonalTrack | null>(null);
  const [spotifyError, setSpotifyError] = useState<string | null>(null);
  const [ringstedTemp, setRingstedTemp] = useState<number | null>(null);
  const cursorVideoRef = useRef<HTMLVideoElement | null>(null);
  const cursorHideTimeout = useRef<number | null>(null);
  const cursorShowFrame = useRef<number | null>(null);
  const cursorShowInnerFrame = useRef<number | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorDotFrame = useRef<number | null>(null);
  const cursorDotVisible = useRef(false);
  const cursorDotPos = useRef({ x: 0, y: 0 });
  const cursorDotTarget = useRef({ x: 0, y: 0 });
  const cursorDotPopTimeout = useRef<number | null>(null);
  const cursorDotCollapseTimeout = useRef<number | null>(null);
  const cursorMoveFrame = useRef<number | null>(null);
  const cursorMoveTarget = useRef({ x: 0, y: 0 });
  const statusMoveFrame = useRef<number | null>(null);
  const statusMoveTarget = useRef({ x: 0, y: 0 });
  const cursorPreviewRef = useRef<HTMLDivElement | null>(null);
  const cursorPreviewInnerRef = useRef<HTMLDivElement | null>(null);
  const cursorPreviewVideoRef = useRef<HTMLVideoElement | null>(null);
  const workGridRef = useRef<HTMLDivElement | null>(null);
  const workScrollCursorRef = useRef<HTMLDivElement | null>(null);
  const workRailRef = useRef<HTMLDivElement | null>(null);
  const previewWarmupRef = useRef(false);

  useEffect(() => {
    const video = cursorVideoRef.current;
    if (!video) {
      return;
    }

    let hls: any | null = null;
    let cancelled = false;

    const setup = async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = SE_PREVIEW_SRC;
        video.load();
        return;
      }

      try {
        const module = await import("hls.js");
        if (cancelled) {
          return;
        }
        const Hls = module.default;
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(SE_PREVIEW_SRC);
          hls.attachMedia(video);
        } else {
          video.src = SE_PREVIEW_SRC;
          video.load();
        }
      } catch (error) {
        video.src = SE_PREVIEW_SRC;
        video.load();
      }
    };

    setup();

    return () => {
      cancelled = true;
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  useEffect(() => {
    let frame: number | null = null;
    const updateMenuVisibility = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = scrollHeight - windowHeight;

      if (maxScroll <= 0) {
        setMenuHidden(false);
        return;
      }

      setMenuHidden(scrollTop >= maxScroll - 120);
      setBottomBlurHidden(scrollTop >= maxScroll - 8);
    };

    const scheduleUpdate = () => {
      if (frame !== null) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        updateMenuVisibility();
        frame = null;
      });
    };

    updateMenuVisibility();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadTopTrack = async () => {
      try {
        const response = await fetch(apiUrl("/api/personal-track"), { cache: "no-store" });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          if (isMounted) {
            setSpotifyError((data as any)?.error ?? `Spotify request failed (${response.status}).`);
          }
          return;
        }

        if ((data as any)?.error) {
          if (isMounted) {
            setSpotifyError((data as any).error);
          }
          return;
        }

        if (isMounted && (data as any)?.title) {
          setTopTrack(data);
          setSpotifyError(null);
        }
      } catch (error) {
        if (isMounted) {
          setSpotifyError("Spotify request failed.");
        }
      }
    };

    loadTopTrack();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadSignature = async () => {
      try {
        const response = await fetch("/images/signature.svg");
        if (!response.ok) {
          return;
        }
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, "image/svg+xml");
        const path = doc.querySelector("path");
        const d = path?.getAttribute("d");
        if (isMounted && d) {
          setSignaturePath(d);
        }
      } catch (error) {
      }
    };

    loadSignature();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadTemperature = async () => {
      try {
        const response = await fetch(apiUrl("/api/weather"), { cache: "no-store" });
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        if (isMounted && typeof data?.temperature === "number") {
          setRingstedTemp(data.temperature);
        }
      } catch (error) {
        // Ignore network errors; last known value remains.
      }
    };

    loadTemperature();
    const interval = window.setInterval(loadTemperature, 10 * 60 * 1000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!activeWork) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveWork(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeWork]);

  useEffect(() => {
    const grid = workGridRef.current;
    const cursor = workScrollCursorRef.current;
    const rail = workRailRef.current;
    if (!grid || !cursor || !rail) {
      return;
    }

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) {
      return;
    }

    const EASE = 0.2;
    let targetX = -9999;
    let targetY = -9999;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number | null = null;
    let isActive = false;
    let activeDir: "left" | "right" | null = null;
    let availabilityFrame: number | null = null;
    let canScrollLeft = false;
    let canScrollRight = false;

    const positionNow = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;
      positionNow(currentX, currentY);
      rafId = window.requestAnimationFrame(tick);
    };

    const startFollow = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const stopFollow = () => {
      if (rafId === null) {
        return;
      }
      window.cancelAnimationFrame(rafId);
      rafId = null;
    };

    const moveTo = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (rafId === null) {
        currentX = targetX;
        currentY = targetY;
        positionNow(currentX, currentY);
      }
    };

    const showCursor = (direction: "left" | "right", event: PointerEvent) => {
      isActive = true;
      activeDir = direction;
      cursor.dataset.dir = direction;
      cursor.classList.add("is-visible");
      document.body.classList.add("work-scroll-active");
      moveTo(event);
      startFollow();
    };

    const hideCursor = () => {
      if (!isActive) {
        return;
      }
      isActive = false;
      activeDir = null;
      cursor.classList.remove("is-visible");
      document.body.classList.remove("work-scroll-active");
      stopFollow();
    };

    const isOverCard = (event: PointerEvent) =>
      Boolean((event.target as HTMLElement | null)?.closest(".work-card"));

    const updateAvailability = () => {
      const maxScroll = grid.scrollWidth - grid.clientWidth;
      canScrollLeft = grid.scrollLeft > 1;
      canScrollRight = grid.scrollLeft < maxScroll - 1;

      if (activeDir === "left" && !canScrollLeft) {
        hideCursor();
      }
      if (activeDir === "right" && !canScrollRight) {
        hideCursor();
      }
    };

    const getDirection = (event: PointerEvent) => {
      const rect = rail.getBoundingClientRect();
      const isRight = event.clientX - rect.left > rect.width / 2;
      let dir: "left" | "right" = isRight ? "right" : "left";

      if (dir === "right" && !canScrollRight && canScrollLeft) {
        dir = "left";
      } else if (dir === "left" && !canScrollLeft && canScrollRight) {
        dir = "right";
      }

      if ((dir === "right" && !canScrollRight) || (dir === "left" && !canScrollLeft)) {
        return null;
      }

      return dir;
    };

    const handleEnter = (event: PointerEvent) => {
      if (isOverCard(event)) {
        hideCursor();
        return;
      }
      updateAvailability();
      const dir = getDirection(event);
      if (!dir) {
        return;
      }
      showCursor(dir, event);
    };

    const handleMove = (event: PointerEvent) => {
      if (isOverCard(event)) {
        hideCursor();
        return;
      }
      const dir = getDirection(event);
      if (!dir) {
        hideCursor();
        return;
      }

      if (!isActive) {
        showCursor(dir, event);
      } else if (activeDir !== dir) {
        activeDir = dir;
        cursor.dataset.dir = dir;
      }

      moveTo(event);
    };

    const handleLeave = () => {
      hideCursor();
    };

    const handleClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest(".work-card")) {
        return;
      }

      const dir = activeDir;
      if (!dir) {
        return;
      }

      const styles = window.getComputedStyle(grid);
      const gap = parseFloat(styles.columnGap || styles.gap || "0");
      const card = grid.querySelector<HTMLElement>(".work-card");
      const amount = card ? card.getBoundingClientRect().width + gap : grid.clientWidth * 0.6;
      grid.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
    };

    const handleScroll = () => updateAvailability();
    const handleResize = () => updateAvailability();
    const resizeObserver = new ResizeObserver(() => updateAvailability());
    resizeObserver.observe(grid);
    grid.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("blur", hideCursor);
    availabilityFrame = window.requestAnimationFrame(updateAvailability);
    rail.addEventListener("pointerenter", handleEnter);
    rail.addEventListener("pointermove", handleMove);
    rail.addEventListener("pointerleave", handleLeave);
    rail.addEventListener("click", handleClick);

    return () => {
      grid.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("blur", hideCursor);
      resizeObserver.disconnect();
      rail.removeEventListener("pointerenter", handleEnter);
      rail.removeEventListener("pointermove", handleMove);
      rail.removeEventListener("pointerleave", handleLeave);
      rail.removeEventListener("click", handleClick);
      document.body.classList.remove("work-scroll-active");
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      if (availabilityFrame !== null) {
        window.cancelAnimationFrame(availabilityFrame);
      }
    };
  }, []);

  useEffect(() => {
    const canHover =
      window.matchMedia("(hover: hover)").matches || window.matchMedia("(pointer: fine)").matches;
    if (!canHover) {
      return;
    }

    const preview = cursorPreviewRef.current;
    const inner = cursorPreviewInnerRef.current;
    const video = cursorPreviewVideoRef.current;

    if (!preview || !inner || !video) {
      return;
    }

    const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-preview-video]"));
    if (!triggers.length) {
      return;
    }

    const OFFSET_X = 18;
    const OFFSET_Y = 18;
    const EASE = 0.18;
    const MARGIN = 12;

    let targetX = -9999;
    let targetY = -9999;
    let currentX = targetX;
    let currentY = targetY;
    let lastPointerX = targetX;
    let lastPointerY = targetY;
    let rafId: number | null = null;
    let hideTimer: number | null = null;
    let lastSrc = "";
    let lastPoster = "";
    let isOpen = false;
    let hls: any | null = null;
    let hlsCtor: any | null = null;
    let hlsReady = false;
    let supportsNativeHls = video.canPlayType("application/vnd.apple.mpegurl") !== "";
    let openStartedAt = 0;
    let readyTimeout: number | null = null;
    const OPEN_ANIMATION_MS = 500;

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const positionNow = (x: number, y: number) => {
      const rect = inner.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width - MARGIN;
      const maxY = window.innerHeight - rect.height - MARGIN;

      const clampedX = clamp(x, MARGIN, maxX);
      const clampedY = clamp(y, MARGIN, maxY);

      preview.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
    };

    const tick = () => {
      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;

      positionNow(currentX, currentY);
      rafId = window.requestAnimationFrame(tick);
    };

    const startFollow = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const stopFollow = () => {
      if (rafId === null) {
        return;
      }
      window.cancelAnimationFrame(rafId);
      rafId = null;
    };

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    const scheduleReady = () => {
      if (!isOpen) {
        return;
      }
      const elapsed = performance.now() - openStartedAt;
      const remaining = Math.max(0, OPEN_ANIMATION_MS - elapsed);
      if (readyTimeout !== null) {
        window.clearTimeout(readyTimeout);
      }
      readyTimeout = window.setTimeout(() => {
        if (!isOpen) {
          return;
        }
        inner.classList.remove("is-opening");
        inner.classList.add("is-ready");
        readyTimeout = null;
      }, remaining);
    };

    const ensureHls = async () => {
      if (hlsReady || supportsNativeHls) {
        return;
      }

      try {
        const module = await import("hls.js");
        hlsCtor = module.default;
        if (hlsCtor && hlsCtor.isSupported()) {
          hls = new hlsCtor({
            lowLatencyMode: true,
            backBufferLength: 0,
            maxBufferLength: 6,
          });
          hls.attachMedia(video);
          hls.on(hlsCtor.Events.MANIFEST_PARSED, () => {
            if (isOpen) {
              attemptPlay();
            }
          });
          hlsReady = true;
        } else {
          supportsNativeHls = true;
        }
      } catch (error) {
        supportsNativeHls = true;
      }
    };

    const openPreview = (triggerEl: HTMLElement, event?: PointerEvent) => {
      if (hideTimer !== null) {
        window.clearTimeout(hideTimer);
        hideTimer = null;
      }

      isOpen = true;
      document.body.classList.add("preview-open");
      preview.setAttribute("aria-hidden", "false");
      openStartedAt = performance.now();
      inner.classList.remove("is-ready");
      inner.classList.add("is-opening");

      if (event) {
        targetX = event.clientX + OFFSET_X;
        targetY = event.clientY + OFFSET_Y;
        lastPointerX = targetX;
        lastPointerY = targetY;
      } else if (lastPointerX !== -9999 && lastPointerY !== -9999) {
        targetX = lastPointerX;
        targetY = lastPointerY;
      }

      if (rafId === null) {
        currentX = targetX;
        currentY = targetY;
        positionNow(currentX, currentY);
      }

      const src = triggerEl.getAttribute("data-preview-video") ?? "";
      const poster = triggerEl.getAttribute("data-preview-poster") ?? "";

      if (poster !== lastPoster) {
        lastPoster = poster;
        if (poster) {
          video.setAttribute("poster", poster);
        } else {
          video.removeAttribute("poster");
        }
      }

      if (src && src !== lastSrc) {
        lastSrc = src;
        const isHls = src.includes(".m3u8");
        if (isHls && !supportsNativeHls) {
          void ensureHls().then(() => {
            if (!isOpen || src !== lastSrc) {
              return;
            }
            if (hls) {
              hls.loadSource(src);
              attemptPlay();
              scheduleReady();
            } else if (supportsNativeHls) {
              video.src = src;
              video.load();
              attemptPlay();
              scheduleReady();
            }
          });
        } else {
          video.src = src;
          video.load();
        }
      }

      video.muted = true;
      video.playsInline = true;

      try {
        video.currentTime = 0;
      } catch (error) {
      }

      attemptPlay();
      if (video.readyState < 2) {
        video.addEventListener("canplay", attemptPlay, { once: true });
      }
      if (video.readyState >= 2) {
        scheduleReady();
      } else {
        video.addEventListener("canplay", scheduleReady, { once: true });
      }

      startFollow();
    };

    const closePreview = () => {
      hideTimer = window.setTimeout(() => {
        inner.classList.remove("is-opening");
        inner.classList.remove("is-ready");
        document.body.classList.remove("preview-open");
        preview.setAttribute("aria-hidden", "true");

        video.pause();
        try {
          video.currentTime = 0;
        } catch (error) {
        }

        isOpen = false;
        stopFollow();
      }, 60);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX + OFFSET_X;
      targetY = event.clientY + OFFSET_Y;
      lastPointerX = targetX;
      lastPointerY = targetY;

      if (rafId === null) {
        currentX = targetX;
        currentY = targetY;
        positionNow(currentX, currentY);
      }
    };

    const handleResize = () => {
      if (isOpen) {
        positionNow(currentX, currentY);
      }
    };

    const listeners = triggers.map((el) => {
      const handleEnter = (event: PointerEvent) => openPreview(el, event);
      const handleLeave = () => closePreview();
      const handleMove = (event: PointerEvent) => handlePointerMove(event);
      el.addEventListener("pointerenter", handleEnter);
      el.addEventListener("pointerleave", handleLeave);
      el.addEventListener("pointermove", handleMove);
      return { el, handleEnter, handleLeave, handleMove };
    });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      listeners.forEach(({ el, handleEnter, handleLeave, handleMove }) => {
        el.removeEventListener("pointerenter", handleEnter);
        el.removeEventListener("pointerleave", handleLeave);
        el.removeEventListener("pointermove", handleMove);
      });

      if (hideTimer !== null) {
        window.clearTimeout(hideTimer);
      }
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      if (readyTimeout !== null) {
        window.clearTimeout(readyTimeout);
      }

      document.body.classList.remove("preview-open");
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const grid = workGridRef.current;
    if (!grid || previewWarmupRef.current) {
      return;
    }

    const warmup = () => {
      if (previewWarmupRef.current) {
        return;
      }
      previewWarmupRef.current = true;
      const sources = Array.from(
        new Set(workProjects.map((project) => project.previewVideo).filter(Boolean))
      );
      sources.forEach((src) => {
        if (src.includes(".m3u8")) {
          fetch(src)
            .then((response) => (response.ok ? response.text() : ""))
            .then((playlist) => {
              if (!playlist) {
                return;
              }
              const firstSegment = playlist
                .split("\n")
                .map((line) => line.trim())
                .find((line) => line && !line.startsWith("#"));
              if (!firstSegment) {
                return;
              }
              const segmentUrl = new URL(firstSegment, src).toString();
              fetch(segmentUrl).catch(() => {});
            })
            .catch(() => {});
          return;
        }

        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "video";
        link.href = src;
        document.head.appendChild(link);
      });
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            warmup();
            observer.disconnect();
          }
        },
        { rootMargin: "240px" }
      );
      observer.observe(grid);
      return () => observer.disconnect();
    }

    warmup();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("cursor-none", cursorActive || statusCursorActive);
    return () => {
      document.body.classList.remove("cursor-none");
    };
  }, [cursorActive, statusCursorActive]);

  useEffect(() => {
    return () => {
      if (cursorHideTimeout.current !== null) {
        window.clearTimeout(cursorHideTimeout.current);
      }
      if (cursorShowFrame.current !== null) {
        window.cancelAnimationFrame(cursorShowFrame.current);
      }
      if (cursorShowInnerFrame.current !== null) {
        window.cancelAnimationFrame(cursorShowInnerFrame.current);
      }
      if (cursorMoveFrame.current !== null) {
        window.cancelAnimationFrame(cursorMoveFrame.current);
      }
      if (statusMoveFrame.current !== null) {
        window.cancelAnimationFrame(statusMoveFrame.current);
      }
      if (cursorDotPopTimeout.current !== null) {
        window.clearTimeout(cursorDotPopTimeout.current);
      }
      if (cursorDotCollapseTimeout.current !== null) {
        window.clearTimeout(cursorDotCollapseTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const dot = cursorDotRef.current;
    if (!dot) {
      return;
    }

    const ease = 0.18;
    const animateDot = () => {
      const { x: targetX, y: targetY } = cursorDotTarget.current;
      const { x, y } = cursorDotPos.current;
      const nextX = x + (targetX - x) * ease;
      const nextY = y + (targetY - y) * ease;

      cursorDotPos.current = { x: nextX, y: nextY };
      dot.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) translate(-50%, 0)`;
      cursorDotFrame.current = window.requestAnimationFrame(animateDot);
    };

    cursorDotFrame.current = window.requestAnimationFrame(animateDot);
    return () => {
      if (cursorDotFrame.current !== null) {
        window.cancelAnimationFrame(cursorDotFrame.current);
        cursorDotFrame.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const dot = cursorDotRef.current;
    if (!dot) {
      return;
    }

    const showDotAt = (x: number, y: number) => {
      const wasVisible = cursorDotVisible.current;
      cursorDotVisible.current = true;
      cursorDotTarget.current = { x, y };

      if (!wasVisible) {
        cursorDotPos.current = { x, y };
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, 0)`;
        dot.classList.add("is-visible");
      }
    };

    const hideDot = () => {
      if (cursorDotVisible.current) {
        cursorDotVisible.current = false;
        dot.classList.remove("is-visible");
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        hideDot();
        return;
      }

      showDotAt(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", hideDot);
    window.addEventListener("blur", hideDot);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseleave", hideDot);
      window.removeEventListener("blur", hideDot);
    };
  }, []);

  useEffect(() => {
    const dot = cursorDotRef.current;
    if (!dot) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) {
        return;
      }
      dot.classList.add("is-pressed");
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }
      dot.classList.remove("is-pressed");
    };

    const handleBlur = () => {
      dot.classList.remove("is-pressed");
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    const dot = cursorDotRef.current;
    if (!dot) {
      return;
    }

    dot.classList.toggle("is-suspended", statusCursorActive);
  }, [statusCursorActive]);

  const triggerCursorDotPop = () => {
    const dot = cursorDotRef.current;
    if (!dot) {
      return;
    }

    dot.classList.remove("is-popping");
    dot.classList.remove("is-collapsing");
    void dot.offsetWidth;
    dot.classList.add("is-popping");

    if (cursorDotPopTimeout.current !== null) {
      window.clearTimeout(cursorDotPopTimeout.current);
    }

    cursorDotPopTimeout.current = window.setTimeout(() => {
      dot.classList.remove("is-popping");
      cursorDotPopTimeout.current = null;
    }, 400);
  };

  const triggerCursorDotCollapse = () => {
    const dot = cursorDotRef.current;
    if (!dot) {
      return;
    }

    dot.classList.remove("is-collapsing");
    dot.classList.remove("is-popping");
    void dot.offsetWidth;
    dot.classList.add("is-collapsing");

    if (cursorDotCollapseTimeout.current !== null) {
      window.clearTimeout(cursorDotCollapseTimeout.current);
    }

    cursorDotCollapseTimeout.current = window.setTimeout(() => {
      dot.classList.remove("is-collapsing");
      cursorDotCollapseTimeout.current = null;
    }, 500);
  };

  const showCursorDotAt = (x: number, y: number) => {
    const dot = cursorDotRef.current;
    if (!dot) {
      return;
    }

    const wasVisible = cursorDotVisible.current;
    cursorDotVisible.current = true;
    cursorDotTarget.current = { x, y };

    if (!wasVisible) {
      cursorDotPos.current = { x, y };
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, 0)`;
      dot.classList.add("is-visible");
    }
  };

  const startCursorPreview = () => {
    const video = cursorVideoRef.current;
    if (!video) {
      return;
    }

    try {
      video.currentTime = 0;
    } catch (error) {
      // Ignore seek failures; video will still play.
    }

    const attemptPlay = () => {
      try {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      } catch (error) {
        // Ignore play failures.
      }
    };

    attemptPlay();

    if (video.readyState < 2) {
      video.addEventListener("canplay", attemptPlay, { once: true });
    }
  };

  const stopCursorPreview = () => {
    const video = cursorVideoRef.current;
    if (video) {
      video.pause();
    }
  };

  const handleCursorEnter = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (cursorHideTimeout.current !== null) {
      window.clearTimeout(cursorHideTimeout.current);
      cursorHideTimeout.current = null;
    }
    if (cursorShowFrame.current !== null) {
      window.cancelAnimationFrame(cursorShowFrame.current);
      cursorShowFrame.current = null;
    }
    if (cursorShowInnerFrame.current !== null) {
      window.cancelAnimationFrame(cursorShowInnerFrame.current);
      cursorShowInnerFrame.current = null;
    }

    cursorMoveTarget.current = { x: event.clientX, y: event.clientY };
    setCursorPos(cursorMoveTarget.current);
    setCursorVisible(false);
    setCursorActive(true);
    showCursorDotAt(event.clientX, event.clientY);
    triggerCursorDotPop();
    cursorShowFrame.current = window.requestAnimationFrame(() => {
      cursorShowInnerFrame.current = window.requestAnimationFrame(() => {
        setCursorVisible(true);
        cursorShowFrame.current = null;
        cursorShowInnerFrame.current = null;
      });
    });
  };

  const handleCursorMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    cursorMoveTarget.current = { x: event.clientX, y: event.clientY };
    if (cursorMoveFrame.current !== null) {
      return;
    }
    cursorMoveFrame.current = window.requestAnimationFrame(() => {
      setCursorPos(cursorMoveTarget.current);
      cursorMoveFrame.current = null;
    });
  };

  const handleStatusEnter = (event: ReactPointerEvent<HTMLSpanElement>) => {
    statusMoveTarget.current = { x: event.clientX, y: event.clientY };
    setStatusCursorPos(statusMoveTarget.current);
    setStatusCursorActive(true);
  };

  const handleStatusMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    statusMoveTarget.current = { x: event.clientX, y: event.clientY };
    if (statusMoveFrame.current !== null) {
      return;
    }
    statusMoveFrame.current = window.requestAnimationFrame(() => {
      setStatusCursorPos(statusMoveTarget.current);
      statusMoveFrame.current = null;
    });
  };

  const handleStatusLeave = () => {
    if (statusMoveFrame.current !== null) {
      window.cancelAnimationFrame(statusMoveFrame.current);
      statusMoveFrame.current = null;
    }
    setStatusCursorActive(false);
  };

  const handleCursorLeave = () => {
    const fadeDuration = 450;

    setCursorVisible(false);
    if (cursorMoveFrame.current !== null) {
      window.cancelAnimationFrame(cursorMoveFrame.current);
      cursorMoveFrame.current = null;
    }
    if (cursorShowFrame.current !== null) {
      window.cancelAnimationFrame(cursorShowFrame.current);
      cursorShowFrame.current = null;
    }
    if (cursorShowInnerFrame.current !== null) {
      window.cancelAnimationFrame(cursorShowInnerFrame.current);
      cursorShowInnerFrame.current = null;
    }
    stopCursorPreview();
    triggerCursorDotCollapse();

    cursorHideTimeout.current = window.setTimeout(() => {
      setCursorActive(false);
      cursorHideTimeout.current = null;
    }, fadeDuration);
  };

  useEffect(() => {
    if (cursorActive && cursorVisible) {
      startCursorPreview();
    }
  }, [cursorActive, cursorVisible]);

  const personalTrackUrl = topTrack?.trackUrl ?? "https://open.spotify.com";
  const spotifyEmbedSrc = topTrack
    ? buildSpotifyEmbedSrc(topTrack.embedUrl || topTrack.trackUrl, 0)
    : null;
  const personalTrackEmbedUrl = topTrack?.embedUrl ?? "";
  const temperatureLabel = ringstedTemp === null ? "--\u00b0C" : `${Math.round(ringstedTemp)}\u00b0C`;

  return (
    <motion.main id="top" initial={pageInitial} animate={{ opacity: 1, y: 0 }} transition={pageTransition}>
            <div className="page">
        <aside className="sidebar">
          <div className="sidebar-inner">
            <div className="utility-row label sidebar-utility">
              <span>EST. 2004</span>
              <span className="clock">
                <ClockIcon />
                <LiveClock />
              </span>
            </div>
            <motion.section
              id="hero"
              className="section hero-block"
              initial={revealY20}
              whileInView={revealTarget}
              viewport={revealViewport}
              transition={revealTransition}
            >
              <div className="hero">
                <motion.div className="avatar-wrap" whileHover={{ scale: 1.08 }} transition={strongSpring}>
                  <Image src="/images/avatar.svg" alt="Oleksandr Adamov" width={56} height={56} className="avatar" />
                  <span
                    className="online-dot"
                    onPointerEnter={handleStatusEnter}
                    onPointerMove={handleStatusMove}
                    onPointerLeave={handleStatusLeave}
                  />
                </motion.div>
                <div className="name-block">
                  <div className="name-row">
                    <h1>Oleksandr Adamov</h1>
                    <span className="verified-badge" aria-hidden="true">
                      <Image src="/images/verified.svg" alt="Verified" width={20} height={20} />
                    </span>
                  </div>
                  <div className="subtitle">Data Scientist and Data Analyst</div>
                </div>
                <p className="muted hero-intro">
                  <span className="hero-intro-line">
                    Hey, I'm Oleksandr, a Data Scientist and Data Analyst, and an IT Student Assistant at{" "}
                  <span
                    className="se-preview cursor-preview-trigger"
                    data-preview-cursor="schneider-preview"
                    onPointerEnter={handleCursorEnter}
                    onPointerMove={handleCursorMove}
                    onPointerLeave={handleCursorLeave}
                  >
                    <span className="highlight-strong se-text">Schneider Electric</span>
                    <span className="inline-badge" aria-hidden="true">
                      <Image
                        src="/images/SE.svg"
                        alt="Schneider Electric logo"
                        width={20}
                        height={20}
                        className="inline-badge-image"
                      />
                    </span>
                  </span>{" "}
                    based in Ringsted, Denmark <span className="flag-badge" aria-hidden="true" />.
                  </span>
                  <span className="hero-intro-line hero-intro-line--gap">
                    I focus on data analytics and automation: KPI dashboards, Python/SQL analysis, Power BI/Tableau
                    reporting, and machine-learning-ready data pipelines. I am especially interested in financial data
                    analysis and healthcare data projects.
                  </span>
                </p>
                <CopyEmailHint email="alex04adamov@gmail.com" />
                <div className="bio-extras">
                  <div className="bio-section">
                    <span className="label">SKILLS</span>
                    <div className="tag-list">
                      {skills.map((skill) => (
                        <span key={skill.label} className="tag">
                          {skill.priority ? <strong>{skill.label}</strong> : skill.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bio-section">
                    <span className="label">LANGUAGES</span>
                    <div className="tag-list">
                      {languages.map((language) => (
                        <span key={language.label} className="tag tag-language">
                          <img
                            className="tag-flag"
                            src={language.flagSrc}
                            alt={`${language.label} flag`}
                            loading="lazy"
                          />
                          {language.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
            <div className="sidebar-social-bottom">
              <a
                className="sidebar-social-bottom-link"
                href="mailto:alex04adamov@gmail.com"
                aria-label="Email"
              >
                <img src="/images/email.svg" alt="Email icon" />
              </a>
              <a
                className="sidebar-social-bottom-link"
                href="https://www.linkedin.com/in/oleksandr-adamov"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <img src="/images/linkedin.svg" alt="LinkedIn icon" />
              </a>
              <a
                className="sidebar-social-bottom-link"
                href="https://github.com/bTehe"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <img src="/images/github.svg" alt="GitHub icon" />
              </a>
            </div>
          </div>
        </aside>

        <div className="mainRail">
          <div className="mainShell">
            <div className={`mainStack alignedStack${bottomBlurHidden ? " blur-hidden" : ""}`}>
              <motion.section
                id="work"
                className="section contentNarrow work-section"
                initial={revealY20}
                whileInView={revealTarget}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <span className="label">DATA SCIENCE PROJECTS</span>
                <p className="muted">
                  Machine learning, data analysis, and data engineering projects in cybersecurity, healthcare NLP,
                  and analytics. Full walkthroughs on request.
                </p>
                <div className="work-rail" ref={workRailRef}>
                  <div className="work-grid" ref={workGridRef}>
                    {workProjects.map((project) => (
                      <a
                        key={project.title}
                        className="work-card"
                        href={project.href}
                        data-preview-video={project.previewVideo}
                        onClick={(event) => {
                          event.preventDefault();
                          setActiveWork(project);
                        }}
                      >
                        <span
                          className="work-card-icon"
                          aria-hidden="true"
                          style={project.iconGradient ? { background: project.iconGradient } : undefined}
                        />
                        <div className="work-card-body">
                          <div className="work-card-title">{project.title}</div>
                          <div className="work-card-subtitle">{project.description}</div>
                          <span className="work-card-tag mono">{project.tag}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="experience"
                className="section contentNarrow"
                initial={revealY20}
                whileInView={revealTarget}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <div className="section-header">
                  <span className="label">EXPERIENCE</span>
                  <p className="muted">
                    Throughout my career, I've worked across data analysis and automation, including:
                    project management, dashboarding, and end-to-end analytics workflows. Here's a brief
                    overview.
                  </p>
                </div>
                <div className="timeline">
                  {experiences.map((item) => (
                    <div key={`${item.company}-${item.start}`} className="timeline-row">
                      <div className="timeline-period mono">
                        {item.start} {"\u2014"} {item.end}
                      </div>
                      <div>
                        <div className="role-line">
                          <span>{item.role} at</span>
                          <span className="company-logo" aria-hidden="true">
                            <Image src={item.logo} alt={`${item.company} logo`} width={20} height={20} />
                          </span>
                          <span>{item.company}</span>
                        </div>
                        <p className="muted">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="education"
                className="section contentNarrow education-section"
                initial={revealY20}
                whileInView={revealTarget}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <div className="section-header">
                  <span className="label">EDUCATION</span>
                  <p className="muted">
                  </p>
                </div>
                <div className="timeline">
                  {education.map((item) => (
                    <div key={`${item.school}-${item.degree}`} className="timeline-row">
                      <div className="timeline-period mono">
                        {item.start} {"\u2014"} {item.end}
                      </div>
                      <div>
                        <div className="role-line">
                          <span>{item.degree}</span>
                          <span>at</span>
                          <span className="company-logo" aria-hidden="true">
                            <Image src={item.logo} alt={`${item.school} logo`} width={20} height={20} />
                          </span>
                          <span>{item.school}</span>
                        </div>
                        <p className="muted">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="stack"
                className="section contentNarrow"
                initial={revealY20}
                whileInView={revealTarget}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <span className="label">STACK</span>
                <div className="stack-row">
                  {stackIcons.map((icon) => (
                    <motion.a
                      key={icon.id}
                      className="stack-item"
                      title={icon.label}
                      href={icon.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.1 }}
                      transition={hoverTransition}
                    >
                      <img
                        className="stack-icon"
                        src={icon.icon}
                        alt={`${icon.label} logo`}
                        loading="lazy"
                      />
                      <span className="stack-label mono">{icon.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="writing"
                className="section contentNarrow"
                initial={revealY20}
                whileInView={revealTarget}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <span className="label">CERTIFICATIONS</span>
                <p className="muted">
                  Microsoft Azure, AWS, and Coursera certifications in AI, analytics, and program management.
                </p>
                <div className="writing-list">
                  {certifications.map((item) => (
                    <motion.a
                      key={item.title}
                      className="writing-row"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.01 }}
                      transition={hoverTransition}
                    >
                      <span className="writing-date mono">{item.date}</span>
                      <span className="writing-title">{item.title}</span>
                      <span className="writing-time mono">
                        <img className="writing-icon" src={item.icon} alt={item.iconAlt} />
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="personal"
                className="section contentNarrow"
                initial={revealY20}
                whileInView={revealTarget}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <span className="label">PERSONAL</span>
                <p className="muted">In my spare time, I enjoy playing the piano, doing sports, swimming, and designing websites and marketing campaigns</p>
                <div>
                  <div className="personal-card">
                    <div className="spotify-title">Most played</div>
                    <div className="spotify-embed">
                      <div className="spotify-embed-slot">
                        <div className="spotify-embed-frame">
                        {spotifyEmbedSrc ? (
                          <iframe
                            title="Spotify player"
                            loading="lazy"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            src={spotifyEmbedSrc}
                          />
                        ) : (
                          <div className="spotify-placeholder">{spotifyError ?? "Loading Spotify..."}</div>
                        )}
                      </div>
                    </div>
                    </div>
                  </div>
                  <div className="personal-footer">
                    <span>Most replayed this month</span>
                    <a className="spotify-link" href={personalTrackUrl} target="_blank" rel="noreferrer">
                      Listen on Spotify <SpotifyIcon />
                    </a>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="contact"
                className="section contentNarrow"
                initial={revealY20}
                whileInView={revealTarget}
                viewport={revealViewport}
                transition={revealTransition}
              >
                <span className="label">CONTACT</span>
                <p className="muted">You can contact me using the form or via the links below.</p>
                <ContactForm />
                <div className="contact-links">
                  {contactLinks.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    return (
                      <div key={link.label} className="link-row">
                        <span className="link-label">
                          <img className="contact-icon" src={link.iconSrc} alt={`${link.label} icon`} />
                          {link.label}
                        </span>
                        <motion.a
                          className="link-value"
                          href={link.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          whileTap={{ scale: 0.98 }}
                          transition={strongSpring}
                        >
                          {link.value}
                          <ExternalArrow className="external-arrow" />
                        </motion.a>
                      </div>
                    );
                  })}
                </div>
              </motion.section>

              <motion.footer
                id="footer"
                className="footer contentNarrow"
                initial={revealY20}
                whileInView={revealTarget}
                viewport={revealViewport}
                transition={revealTransition}
                onViewportEnter={() => setSignatureActive(true)}
              >
                <svg
                  className={`signature${signatureActive ? " signature--animate" : ""}`}
                  width="120"
                  height="60"
                  viewBox="0 0 120 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    className="signature-path"
                    pathLength="1"
                    d={signaturePath}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* <div className="footer-meta mono">
                  <span>Built using Framer</span>
                  <span>{"\u00b7"}</span>
                  <span>Get this template</span>
                  <span>{"\u00b7"}</span>
                  <span>Become an affiliate</span>
                </div> */}
                <div className="footer-copy mono">
                  {"\u00a9"} 2025 Portfolio by adaKon
                </div>
                <div className="footer-status mono">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <LocationIcon />
                    RINGSTED, DENMARK
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <TempIcon />
                    {temperatureLabel}
                  </span>
                </div>
              </motion.footer>
            </div>
          </div>
        </div>
      </div>
      <nav className={`menu-bar${menuHidden ? " is-hidden" : ""}`} aria-label="Quick navigation">
        <div className="menu-bar-inner">
          {menuItems.map((item) => (
            <a key={item.id} href={item.href} className="menu-item" aria-label={item.label} title={item.label}>
              {item.icon}
              <span className="menu-item-label mono">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
      <div ref={workScrollCursorRef} className="work-scroll-cursor" aria-hidden="true">
        <div className="work-scroll-cursor-inner">
          <svg className="work-scroll-cursor-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 8H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M9 5L12 8L9 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div id="cursorPreview" ref={cursorPreviewRef} aria-hidden="true">
        <div className="cursorPreview__inner" ref={cursorPreviewInnerRef}>
          <video
            id="cursorPreviewVideo"
            ref={cursorPreviewVideoRef}
            muted
            playsInline
            preload="auto"
            loop
          />
        </div>
      </div>
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true">
        <span className="cursor-dot-core" />
      </div>
      <div
        className={`custom-cursor${cursorVisible ? " is-visible" : ""}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
        aria-hidden={!cursorActive}
      >
        <div className="custom-cursor-shell">
          <div className="custom-cursor-preview">
            <video
              ref={cursorVideoRef}
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/SE.png"
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {statusCursorActive && (
          <motion.div
            className="status-cursor"
            style={{ left: statusCursorPos.x, top: statusCursorPos.y }}
            variants={cursorCardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            aria-hidden="true"
          >
            <div className="status-cursor-anchor">
              <div className="status-cursor-card">
                <div className="status-cursor-row mono">
                  <span className="status-cursor-dot" />
                  <span className="status-cursor-text">Available for work</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeWork && (
          <motion.div
            className="work-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeWork.title} details`}
            onClick={() => setActiveWork(null)}
            initial={{ opacity: prefersReduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReduced ? 1 : 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="work-modal"
              onClick={(event) => event.stopPropagation()}
              variants={workModalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.div className="work-modal-hero" variants={workModalItemVariants} custom={0.02}>
                <div className="work-modal-hero-inner">
                  <Image
                    src={activeWork.hero}
                    alt={activeWork.heroAlt}
                    width={820}
                    height={520}
                    className="work-modal-hero-img"
                  />
                </div>
              </motion.div>
              <motion.div className="work-modal-header" variants={workModalItemVariants} custom={0.1}>
                <h2>{activeWork.title}</h2>
                <div className="work-modal-meta">
                  <span className="work-modal-meta-item">
                    <LocationIcon className="work-modal-meta-icon" />
                    {activeWork.client}
                  </span>
                  <span className="work-modal-meta-item">
                    <ClockIcon className="work-modal-meta-icon" />
                    {activeWork.year}
                  </span>
                </div>
              </motion.div>
              <motion.div className="work-modal-section" variants={workModalItemVariants} custom={0.18}>
                <span className="label">Overview</span>
                <p className="muted">{activeWork.overview}</p>
              </motion.div>
              {activeWork.whatIDid ? (
                <motion.div className="work-modal-section" variants={workModalItemVariants} custom={0.26}>
                  <span className="label">What I did</span>
                  <ul className="work-modal-list">
                    {activeWork.whatIDid.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
              {activeWork.whyItMatters ? (
                <motion.div className="work-modal-section" variants={workModalItemVariants} custom={0.34}>
                  <span className="label">Why it matters</span>
                  <div className="work-modal-paragraphs">
                    {activeWork.whyItMatters.map((item) => (
                      <p key={item} className="muted">
                        {item}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              <motion.div className="work-modal-section" variants={workModalItemVariants} custom={0.42}>
                <span className="label">Technologies used</span>
                <div className="tag-list">
                  {activeWork.technologies.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
