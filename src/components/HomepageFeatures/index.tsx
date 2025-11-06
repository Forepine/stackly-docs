import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

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
        Create powerful short links with custom slugs, advanced targeting, and real-time analytics.
        Track clicks, manage campaigns, and optimize your link performance.
      </>
    ),
  },
  {
    title: 'Web to PDF',
    icon: '📄',
    description: (
      <>
        Convert any webpage to high-quality PDF documents instantly. Perfect for archiving,
        documentation, and offline reading with customizable formatting options.
      </>
    ),
  },
  {
    title: 'Web Screenshots',
    icon: '📸',
    description: (
      <>
        Capture full-page or viewport screenshots of any website. Automate visual testing,
        create thumbnails, and monitor web content changes effortlessly.
      </>
    ),
  },
  {
    title: 'HTML Content Scraper',
    icon: '🔍',
    description: (
      <>
        Extract raw HTML content from any webpage. Perfect for data extraction,
        content analysis, and web automation workflows.
      </>
    ),
  },
  {
    title: 'SEO Content Scraper',
    icon: '🎯',
    description: (
      <>
        Analyze SEO elements including meta tags, headings, structured data, and more.
        Optimize your content strategy with comprehensive SEO insights.
      </>
    ),
  },
  {
    title: 'Team Management',
    icon: '👥',
    description: (
      <>
        Collaborate seamlessly with your team. Manage permissions, share resources,
        and work together on projects with role-based access control.
      </>
    ),
  },
  {
    title: 'Stack Notes',
    icon: '📝',
    description: (
      <>
        Powerful task management and note-taking system. Organize your work,
        track progress, and keep your team aligned with integrated workflows.
      </>
    ),
  },
  {
    title: 'Digital vCards',
    icon: '🔐',
    description: (
      <>
        Create and share digital business cards. Modern, interactive contact sharing
        with analytics and customizable designs for professional networking.
      </>
    ),
  },
  {
    title: 'Powerful Integrations',
    icon: '🔌',
    description: (
      <>
        RESTful API, webhooks, and SDKs for seamless integration. Build custom workflows
        and automate your processes with our developer-friendly platform.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
