import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'URL Shortener',
    icon: '🔗',
    description: (
      <>
        Create powerful short links with custom slugs, branded domains (&lt;key&gt;.yourdomain.com), UTM parameters, advanced targeting, and real-time analytics.
      </>
    ),
  },
  {
    title: 'Web to PDF',
    icon: '📄',
    description: (
      <>
        Convert any webpage to high-quality PDF documents instantly. Supports password-protected websites.
      </>
    ),
  },
  {
    title: 'Web Screenshots',
    icon: '📸',
    description: (
      <>
        Capture full-page or viewport screenshots. Supports password-protected websites.
      </>
    ),
  },
  {
    title: 'HTML Scraper',
    icon: '🔍',
    description: (
      <>
        Extract raw HTML content from any webpage, including password-protected sites.
      </>
    ),
  },
  {
    title: 'SEO Scraper',
    icon: '🎯',
    description: (
      <>
        Analyze SEO elements including meta tags, headings, and structured data.
      </>
    ),
  },
  {
    title: 'Team Management',
    icon: '👥',
    description: (
      <>
        Collaborate seamlessly with your team. Manage permissions and share resources.
      </>
    ),
  },
  {
    title: 'Stack Notes',
    icon: '📝',
    description: (
      <>
        Powerful task management and note-taking system to keep your team aligned.
      </>
    ),
  },
  {
    title: 'Digital vCards',
    icon: '🔐',
    description: (
      <>
        Create and share modern, interactive digital business cards with analytics.
      </>
    ),
  },
  {
    title: 'Integrations',
    icon: '🔌',
    description: (
      <>
        RESTful API, webhooks, and SDKs for seamless integration into your workflows.
      </>
    ),
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroContainer}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
            <span className="text-gradient">{siteConfig.title}</span>
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro">
              Get Started 🚀
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="https://app.stackly.in">
              Open App
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx(styles.featureCard, 'glass-card')}>
      <div className={styles.featureIcon}>{icon}</div>
      <Heading as="h3" className="margin-bottom--sm">{title}</Heading>
      <p className="margin-bottom--none text--secondary">{description}</p>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="All-in-one platform for URL shortening, web scraping, PDF conversion, screenshots, team management, and task organization">
      <HomepageHeader />
      <main>
        <section className={styles.featuresContainer}>
          <div className="container">
            <div className={styles.featureGrid}>
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
