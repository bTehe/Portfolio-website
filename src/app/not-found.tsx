import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="page">
        <aside className="sidebar">
          <div className="sidebar-inner">
            <div className="utility-row label">
              <span>404 ERROR</span>
              <span className="mono">olead.me</span>
            </div>
            <div className="hero">
              <div className="avatar-wrap">
                <Image src="/images/avatar.svg" alt="Oleksandr Adamov" width={56} height={56} className="avatar" />
                <span className="online-dot" aria-hidden="true" />
              </div>
              <div className="name-block">
                <div className="name-row">
                  <span>Oleksandr Adamov</span>
                  <span className="verified-badge" aria-hidden="true">
                    <Image src="/images/verified.svg" alt="Verified" width={20} height={20} />
                  </span>
                </div>
                <div className="subtitle">Data Scientist and Data Analyst</div>
              </div>
              <p className="muted hero-intro">
                The page you requested does not exist. Use the shortcuts to return to the portfolio.
              </p>
            </div>
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
            <div className="mainStack not-found-stack">
              <section className="section contentNarrow not-found-card">
                <span className="label">PAGE NOT FOUND</span>
                <div className="not-found-code mono">404</div>
                <h1 className="not-found-title">This page is missing.</h1>
                <p className="muted">
                  The URL may be incorrect or the page has moved. Start from the homepage or jump to a section.
                </p>
                <div className="not-found-actions">
                  <Link className="button not-found-button" href="/">
                    Back to home
                  </Link>
                  <Link className="button button--ghost not-found-button" href="/#contact">
                    Contact
                  </Link>
                </div>
                <div className="not-found-links">
                  {quickLinks.map((link) => (
                    <Link key={link.href} className="tag tag-link" href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
