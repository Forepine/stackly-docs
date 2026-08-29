import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// ─── Feature list ──────────────────────────────────────────────────────────
type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
  href: string;
  badge?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'URL Shortener',
    icon: '🔗',
    href: '/docs/url-shortener',
    description: 'Custom slugs, branded domains, advanced targeting, and real-time analytics.',
  },
  {
    title: 'Web to PDF',
    icon: '📄',
    href: '/docs/web-to-pdf',
    description: 'Convert any webpage to high-quality PDF instantly with custom formatting.',
  },
  {
    title: 'Stack Notes',
    icon: '📝',
    href: '/docs/stack-notes',
    description: 'Powerful task management and note-taking to keep your team aligned.',
  },
  {
    title: 'Digital vCards',
    icon: '🪪',
    href: '/docs/digital-vcards',
    badge: 'New',
    description: 'Modern interactive digital business cards with analytics and custom branding.',
  },
  {
    title: 'Team Management',
    icon: '👥',
    href: '/docs/team-members',
    description: 'Role-based access control, collaborative workspaces, and permissions.',
  },
  {
    title: 'Integrations & API',
    icon: '🔌',
    href: '/docs/integrations',
    description: 'RESTful API, webhooks, and SDKs for seamless workflow automation.',
  },
  {
    title: 'Branded Domains',
    icon: '🌐',
    href: '/docs/branded-domains',
    description: 'Use your own domain for short links — build brand authority on every click.',
  },
  {
    title: 'UTM Templates',
    icon: '🎯',
    href: '/docs/utm-templates',
    description: 'Reusable UTM parameter templates for consistent campaign tracking.',
  },
  {
    title: 'Audit Logs',
    icon: '🔍',
    href: '/docs/audit-logs',
    description: 'Complete activity trail with timestamps for compliance and visibility.',
  },
];

// ─── Stats bar ──────────────────────────────────────────────────────────────
const stats = [
  { value: '9+', label: 'Powerful Tools' },
  { value: 'REST', label: 'Full API Access' },
  { value: '∞', label: 'Link Clicks Tracked' },
  { value: '100%', label: 'White-label Ready' },
];

// ─── Components ─────────────────────────────────────────────────────────────
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function FeatureCard({ title, icon, description, href, badge }: FeatureItem) {
  return (
    <Link to={href} className={clsx(styles.featureCard, 'glass-card')}>
      <div className={styles.featureCardHeader}>
        <div className={styles.featureIcon}>{icon}</div>
        {badge && <span className={styles.featureBadge}>{badge}</span>}
      </div>
      <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
      <p className={styles.featureDesc}>{description}</p>
      <span className={styles.featureArrow}>Learn more →</span>
    </Link>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroContainer}>
      {/* Animated background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.gridOverlay} />

      <div className={clsx('container', styles.heroInner)}>
        {/* Badge */}
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot} />
          Documentation Hub
        </div>

        <Heading as="h1" className={styles.heroTitle}>
          <span className="text-gradient">{siteConfig.title}</span>
        </Heading>

        <p className={styles.heroSubtitle}>
          Everything you need to integrate, automate, and scale with Stackly.
          From URL shortening to AI-powered analytics — all in one place.
        </p>

        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Get Started →
          </Link>
          <Link className="button button--secondary button--lg" to="https://app.stackly.in">
            Open App ↗
          </Link>
        </div>

        {/* Stats */}
        <div className={styles.statsBar}>
          {stats.map((s, i) => (
            <StatItem key={i} {...s} />
          ))}
        </div>
      </div>
    </header>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Stackly Documentation"
      description="All-in-one platform documentation — URL shortening, web to PDF, digital vCards, team management, and more.">
      <HomepageHeader />

      <main>
        {/* Section heading */}
        <section className={styles.featuresSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Explore Docs</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Everything you need, documented
              </Heading>
              <p className={styles.sectionSubtitle}>
                Pick a tool below to jump straight into its documentation.
              </p>
            </div>

            <div className={styles.featureGrid}>
              {FeatureList.map((props, idx) => (
                <FeatureCard key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className={styles.ctaBand}>
          <div className="container">
            <div className={styles.ctaInner}>
              <div>
                <Heading as="h2" className={styles.ctaTitle}>
                  Ready to streamline your workflow?
                </Heading>
                <p className={styles.ctaSubtitle}>
                  Start free. No credit card required.
                </p>
              </div>
              <div className={styles.ctaButtons}>
                <Link className="button button--primary button--lg" to="https://app.stackly.in">
                  Start for Free
                </Link>
                <Link className="button button--secondary button--lg" to="/docs/intro">
                  Read the Docs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
