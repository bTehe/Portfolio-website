"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import CopyEmailHint from "@/components/CopyEmailHint";
import ContactForm from "@/components/ContactForm";
import LiveClock from "@/components/LiveClock";
import {
  ClockIcon,
  ExternalArrow,
  GitHubIcon,
  LinkedInIcon,
  LocationIcon,
  MailIcon,
  SpotifyIcon,
  TempIcon,
  XIcon,
} from "@/components/Icons";

const experiences = [
  {
    start: "2024",
    end: "NOW",
    role: "Design engineer",
    company: "Wait",
    badge: "W",
    color: "#DFFF1A",
    description:
      "Designed a real-time waitlist and dashboard for monitoring sign ups with live updates, reducing latency by 15%",
  },
  {
    start: "2024",
    end: "NOW",
    role: "Design engineer",
    company: "Omega",
    badge: "O",
    color: "#58D0FF",
    description:
      "Designed and built an admin panel for enterprise clients, scaling to support over 500 active users per instance.",
  },
  {
    start: "2017",
    end: "2020",
    role: "Software engineer",
    company: "Theta",
    badge: "T",
    color: "#79F2C0",
    description:
      "Developed the user interface for a crypto payment gateway, ensuring compliance with global accessibility standards.",
  },
];

const ventures = [
  {
    title: "CMD Supply",
    subtitle: "Framer Template Store",
    icon: "C",
    color: "#E6E6E6",
  },
  {
    title: "Best Websites",
    subtitle: "Website Directory",
    icon: "B",
    color: "#FFE24A",
  },
  {
    title: "Great Fonts",
    subtitle: "Font Directory",
    icon: "G",
    color: "#88F5C9",
  },
];

const writings = [
  {
    date: "21/02/25",
    title: "How to think like both a designer & engineer",
    time: "2 m",
  },
  { date: "16/02/25", title: "UI Performance", time: "4 m" },
  { date: "12/02/25", title: "How AI is changing my workflow", time: "2 m" },
  { date: "11/01/25", title: "Design tokens 101", time: "2 m" },
  { date: "01/01/25", title: "Hello world", time: "1 m" },
];

const contactLinks = [
  {
    label: "Email",
    value: "hi@jacobvos.com",
    href: "mailto:hi@jacobvos.com",
    icon: <MailIcon />,
  },
  {
    label: "X.com",
    value: "@jacob",
    href: "https://x.com/jacob",
    icon: <XIcon />,
  },
  {
    label: "GitHub",
    value: "@jy",
    href: "https://github.com/jy",
    icon: <GitHubIcon />,
  },
  {
    label: "LinkedIn",
    value: "/in/jacobvos",
    href: "https://www.linkedin.com/in/jacobvos",
    icon: <LinkedInIcon />,
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
    id: "ventures",
    label: "Ventures",
    href: "#ventures",
    icon: (
      <svg className="menu-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11" y="4" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="4" y="11" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11" y="11" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: "writing",
    label: "Writing",
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
    id: "framer",
    label: "Framer",
    node: (
      <svg className="stack-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M9 6H23L16 14H9V6Z" fill="#FFFFFF" />
        <path d="M9 16H16L23 26H9V16Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "figma",
    label: "Figma",
    node: (
      <svg className="stack-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="12" cy="9" r="5" fill="#F24E1E" />
        <circle cx="20" cy="9" r="5" fill="#FF7262" />
        <circle cx="12" cy="17" r="5" fill="#A259FF" />
        <circle cx="20" cy="17" r="5" fill="#1ABCFE" />
        <circle cx="12" cy="25" r="5" fill="#0ACF83" />
      </svg>
    ),
  },
  {
    id: "react",
    label: "React",
    node: (
      <svg className="stack-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="3" fill="#61DAFB" />
        <ellipse cx="16" cy="16" rx="12" ry="5" stroke="#61DAFB" strokeWidth="2" />
        <ellipse
          cx="16"
          cy="16"
          rx="12"
          ry="5"
          stroke="#61DAFB"
          strokeWidth="2"
          transform="rotate(60 16 16)"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="12"
          ry="5"
          stroke="#61DAFB"
          strokeWidth="2"
          transform="rotate(-60 16 16)"
        />
      </svg>
    ),
  },
  {
    id: "spline",
    label: "Spline",
    node: (
      <svg className="stack-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M6 18C6 10 16 6 22 10C28 14 24 24 16 24C10 24 6 22 6 18Z"
          fill="#FF7AD9"
        />
        <circle cx="20" cy="12" r="4" fill="#7C3AED" />
      </svg>
    ),
  },
  {
    id: "vercel",
    label: "Vercel",
    node: (
      <svg className="stack-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 6L28 26H4L16 6Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "openai",
    label: "OpenAI",
    node: (
      <svg className="stack-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" stroke="#FFFFFF" strokeWidth="2" />
        <path
          d="M16 6L23 10V22L16 26L9 22V10L16 6Z"
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    node: (
      <svg className="stack-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="12" cy="14" r="2" fill="#FFFFFF" />
        <circle cx="20" cy="14" r="2" fill="#FFFFFF" />
        <path d="M10 20C12 22 20 22 22 20" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "slack",
    label: "Slack",
    node: (
      <svg className="stack-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="14" width="6" height="12" rx="3" fill="#36C5F0" />
        <rect x="12" y="6" width="12" height="6" rx="3" fill="#2EB67D" />
        <rect x="14" y="14" width="12" height="6" rx="3" fill="#ECB22E" />
        <rect x="14" y="20" width="6" height="12" rx="3" fill="#E01E5A" />
      </svg>
    ),
  },
  {
    id: "linear",
    label: "Linear",
    node: (
      <svg className="stack-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" stroke="#B8B8B8" strokeWidth="2" />
        <path d="M10 22L22 10" stroke="#B8B8B8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "spotify",
    label: "Spotify",
    node: (
      <svg className="stack-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" fill="#1DB954" />
        <path d="M10 14C14 12.6 18.6 12.8 22 14.2" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" />
        <path d="M10.8 17C14 16 18 16.1 21 17.2" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" />
        <path d="M11.6 20C14 19.4 17 19.5 19.6 20.4" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const workScreens = [
  { src: "/ui/ui-1.svg", alt: "Dark dashboard panel" },
  { src: "/ui/ui-2.svg", alt: "Code editor view" },
  { src: "/ui/ui-3.svg", alt: "Light UI form" },
  { src: "/ui/ui-4.svg", alt: "Settings modal" },
];

const hoverTransition: Transition = { type: "spring", bounce: 0.25, duration: 0.45, delay: 0 };
const strongSpring: Transition = { type: "spring", damping: 30, stiffness: 400, mass: 1, delay: 0 };
const revealSpring: Transition = { type: "spring", bounce: 0.2, duration: 0.4 };
const pageAppearSpring: Transition = { type: "spring", damping: 30, stiffness: 400, mass: 1, delay: 1.5 };
const reducedTransition: Transition = { duration: 0 };

export default function Home() {
  const prefersReduced = useReducedMotion();
  const pageInitial = prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 15 };
  const pageTransition = prefersReduced ? reducedTransition : pageAppearSpring;
  const revealTransition = prefersReduced ? reducedTransition : revealSpring;
  const revealTarget = { opacity: 1, y: 0, scale: 1 };
  const revealY10 = prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 };
  const revealY15 = prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 };
  const revealScale80 = prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 };
  const revealOpacityOnly = prefersReduced ? { opacity: 1 } : { opacity: 0, y: 0 };
  const revealViewport = { once: true, amount: 0.25 };
  const [menuHidden, setMenuHidden] = useState(false);

  useEffect(() => {
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
    };

    updateMenuVisibility();
    window.addEventListener("scroll", updateMenuVisibility, { passive: true });
    window.addEventListener("resize", updateMenuVisibility);

    return () => {
      window.removeEventListener("scroll", updateMenuVisibility);
      window.removeEventListener("resize", updateMenuVisibility);
    };
  }, []);

  return (
    <motion.main id="top" initial={pageInitial} animate={{ opacity: 1, y: 0 }} transition={pageTransition}>
      <motion.section
        id="hero"
        className="container section"
        initial={revealY15}
        whileInView={revealTarget}
        viewport={revealViewport}
        transition={revealTransition}
      >
        <div className="utility-row label">
          <span>EST. 2004</span>
          <span className="clock">
            <ClockIcon />
            <LiveClock />
          </span>
        </div>
        <div className="hero">
          <motion.div className="avatar-wrap" whileHover={{ scale: 1.08 }} transition={strongSpring}>
            <Image src="/images/avatar.svg" alt="Oleksandr Adamov" width={56} height={56} className="avatar" />
            <span className="online-dot" />
          </motion.div>
          <div className="name-row">
            <h1>Oleksandr Adamov</h1>
            <span className="verified-badge" aria-hidden="true">
              <Image src="/images/verified.svg" alt="Verified" width={20} height={20} />
            </span>
          </div>
          <div className="subtitle">Data Scientist</div>
          <p className="muted">
            Hey, I'm Oleksandr a IT Student Assistant at <span className="inline-badge">SE</span>{" "}
            <span className="highlight-strong">Schneider Electric</span> based in Ringsted, Denmark
            <span className="flag-badge" aria-hidden="true" /> where I specialize in crafting polished web
            interfaces with a strong focus on accessibility, web animation, and product design.
          </p>
          <CopyEmailHint email="hi@jacobvos.com" />
        </div>
        <div className="section">
          <span className="label">WORK</span>
          <p className="muted">Below are some select projects, full walkthroughs on request</p>
        </div>
      </motion.section>

      <motion.section
        id="work"
        className="work-band"
        initial={revealScale80}
        whileInView={revealTarget}
        viewport={revealViewport}
        transition={revealTransition}
      >
        <div className="work-band-inner">
          <div className="polaroid-group">
            {workScreens.map((screen, index) => (
              <div key={screen.src} className={`polaroid polaroid-${index + 1}`}>
                <img src={screen.src} alt={screen.alt} />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="experience"
        className="container section"
        initial={revealY15}
        whileInView={revealTarget}
        viewport={revealViewport}
        transition={revealTransition}
      >
        <span className="label">EXPERIENCE</span>
        <p className="muted">
          Throughout my career, I've worked on various projects, from building scalable systems to designing
          user-friendly interfaces. Here's a brief overview.
        </p>
        <div className="timeline">
          {experiences.map((item) => (
            <div key={`${item.company}-${item.start}`} className="timeline-row">
              <div className="timeline-period mono">
                {item.start} {"\u2014"} {item.end}
              </div>
              <div>
                <div className="role-line">
                  <span>{item.role} at</span>
                  <span className="company-badge" style={{ backgroundColor: item.color }}>
                    {item.badge}
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
        id="stack"
        className="container section"
        initial={revealScale80}
        whileInView={revealTarget}
        viewport={revealViewport}
        transition={revealTransition}
      >
        <span className="label">STACK</span>
        <div className="stack-row">
          {stackIcons.map((icon) => (
            <motion.div
              key={icon.id}
              className="stack-item"
              title={icon.label}
              whileHover={{ scale: 1.1 }}
              transition={hoverTransition}
            >
              {icon.node}
              <span className="stack-label mono">{icon.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="ventures"
        className="container section"
        initial={revealY15}
        whileInView={revealTarget}
        viewport={revealViewport}
        transition={revealTransition}
      >
        <span className="label">VENTURES</span>
        <div className="ventures-list">
          {ventures.map((item) => (
            <motion.div
              key={item.title}
              className="venture-row"
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={hoverTransition}
            >
              <span className="venture-icon" style={{ backgroundColor: item.color }}>
                {item.icon}
              </span>
              <div>
                <div className="venture-title">{item.title}</div>
                <div className="venture-subtitle">{item.subtitle}</div>
              </div>
              <ExternalArrow className="external-arrow" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="writing"
        className="container section"
        initial={revealY10}
        whileInView={revealTarget}
        viewport={revealViewport}
        transition={revealTransition}
      >
        <span className="label">WRITING</span>
        <div className="writing-list">
          {writings.map((item) => (
            <motion.div
              key={item.title}
              className="writing-row"
              whileHover={{ scale: 1.01 }}
              transition={hoverTransition}
            >
              <span className="writing-date mono">{item.date}</span>
              <span className="writing-title">{item.title}</span>
              <span className="writing-time mono">
                <ClockIcon />
                {item.time}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="personal"
        className="container section"
        initial={revealY15}
        whileInView={revealTarget}
        viewport={revealViewport}
        transition={revealTransition}
      >
        <span className="label">PERSONAL</span>
        <p className="muted">In my spare time, I enjoy listening to music and taking photos with my Leica M6</p>
        <div>
          <div className="personal-card">
            <div className="personal-art">
              <Image src="/images/album-art.svg" alt="Luna album art" width={52} height={52} />
            </div>
            <div className="personal-meta">
              <strong>Luna</strong>
              <span>Pascal Schumacher, Echo Collective</span>
            </div>
          </div>
          <div className="personal-footer">
            <span>Most replayed this month</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Listen on Spotify <SpotifyIcon />
            </span>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="container section"
        initial={revealOpacityOnly}
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
                  {link.icon}
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
        className="container footer"
        initial={revealOpacityOnly}
        whileInView={revealTarget}
        viewport={revealViewport}
        transition={revealTransition}
      >
        <Image src="/images/signature.svg" alt="Signature" width={120} height={60} className="signature" />
        <div className="footer-meta mono">
          <span>Built using Framer</span>
          <span>{"\u00b7"}</span>
          <span>Get this template</span>
          <span>{"\u00b7"}</span>
          <span>Become an affiliate</span>
        </div>
        <div className="footer-copy mono">
          {"\u00a9"} 2025 Core by CMD Supply
        </div>
        <div className="footer-status mono">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <LocationIcon />
            LAGOS, PORTUGAL
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <TempIcon />
            27{"\u00b0"}C
          </span>
        </div>
      </motion.footer>
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
    </motion.main>
  );
}
