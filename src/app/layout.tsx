import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteTitle = "Data Science Portfolio | Oleksandr Adamov (Copenhagen)";
const siteDescription =
  "Oleksandr Adamov is a data scientist and data analyst based in Copenhagen, Denmark. Data science student portfolio featuring Python, SQL, machine learning, Power BI/Tableau, Azure, and projects in cybersecurity, financial data analysis, and healthcare NLP.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Oleksandr Adamov",
    "Data Scientist",
    "Data Analyst",
    "Copenhagen",
    "Denmark",
    "Python",
    "SQL",
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "Artificial Intelligence",
    "Power BI",
    "Tableau",
    "Data Analysis",
    "Data Analytics",
    "Microsoft Azure",
    "Azure AI",
    "AWS",
    "Cloud Computing",
    "React",
    "Full-Stack Development",
    ".NET",
    "Agile",
    "Project Management",
    "Cybersecurity",
    "Healthcare NLP",
    "Financial Data Analysis",
  ],
  authors: [{ name: "Oleksandr Adamov" }],
  creator: "Oleksandr Adamov",
  robots: { index: true, follow: true },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: [{ url: "/images/logo.svg", type: "image/svg+xml" }],
    shortcut: ["/images/logo.svg"],
    apple: ["/images/logo.svg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oleksandr Adamov",
  jobTitle: "Data Scientist and Data Analyst",
  homeLocation: {
    "@type": "Place",
    name: "Ringsted, Denmark",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "IT University of Copenhagen",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "National Aviation University",
    },
  ],
  knowsAbout: [
    "Python",
    "SQL",
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "Artificial Intelligence",
    "Power BI",
    "Tableau",
    "Data Analysis",
    "Data Analytics",
    "Microsoft Azure",
    "Azure AI",
    "AWS",
    "Cloud Computing",
    "React",
    "Full-Stack Development",
    ".NET",
    "Agile",
    "Project Management",
    "Cybersecurity",
    "Healthcare NLP",
    "Financial Data Analysis",
  ],
  sameAs: [
    "https://www.linkedin.com/in/oleksandr-adamov",
    "https://github.com/bTehe",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q8Y6LHYL75"></script>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-Q8Y6LHYL75');",
          }}
        />
        <link rel="preconnect" href="https://stream.mux.com" />
        <link rel="dns-prefetch" href="https://stream.mux.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.variable}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
