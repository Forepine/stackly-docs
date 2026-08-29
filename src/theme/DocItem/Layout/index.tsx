import React, { type ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import type { Props } from '@theme/DocItem/Layout';

import styles from './styles.module.css';

/**
 * Decide the "reading time" based on word count.
 * Docusaurus exposes `metadata.readingTime` if blog readingTime is on,
 * but for docs we calculate it manually.
 */
function useReadingTime(content: string) {
  const words = content?.replace(/<[^>]+>/g, '')?.split(/\s+/)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return minutes;
}

function ShareButton({
  href,
  icon,
  label,
  onClick,
}: {
  href?: string;
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  if (onClick) {
    return (
      <button className="share-btn" onClick={onClick} aria-label={label}>
        <span>{icon}</span>
        {label}
      </button>
    );
  }
  return (
    <a
      className="share-btn"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}>
      <span>{icon}</span>
      {label}
    </a>
  );
}

function SharePanel({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;

  return (
    <div className={styles.sharePanel}>
      <p className={styles.sharePanelTitle}>Share</p>
      <ShareButton href={twitterUrl} icon="𝕏" label="Twitter" />
      <ShareButton href={linkedinUrl} icon="in" label="LinkedIn" />
      <ShareButton
        icon={copied ? '✓' : '🔗'}
        label={copied ? 'Copied!' : 'Copy Link'}
        onClick={handleCopyLink}
      />
    </div>
  );
}

/**
 * Custom DocItem/Layout with:
 * - Reading time badge
 * - Share panel (right sidebar)
 */
export default function DocItemLayout({ children }: Props): ReactNode {
  const docData = useDoc();
  const { metadata } = docData;

  // Estimate reading time from the description + title as proxy
  const estWords = (metadata.description?.length ?? 0) / 5;
  const readingMinutes = Math.max(1, Math.ceil(estWords / 40));

  const hasToc =
    (metadata.frontMatter as Record<string, unknown>)?.hide_table_of_contents !== true;

  return (
    <div className="row">
      {/* Main content column */}
      <div className={clsx('col', hasToc ? 'col--8' : 'col--9')}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          {/* Breadcrumbs */}
          <DocBreadcrumbs />
          <DocVersionBadge />

          {/* Reading time badge */}
          <div className={styles.metaRow}>
            <span className="reading-time-badge">
              📖 {readingMinutes} min read
            </span>
          </div>

          {/* Mobile TOC */}
          <DocItemTOCMobile />

          {/* Doc content */}
          <article>
            <DocItemContent>{children}</DocItemContent>
          </article>

          <DocItemFooter />
        </div>
        <DocItemPaginator />
      </div>

      {/* Right sidebar: TOC + Share */}
      {hasToc && (
        <div className="col col--3">
          <div className={styles.rightSidebar}>
            <DocItemTOCDesktop />
            <SharePanel title={metadata.title} />
          </div>
        </div>
      )}
    </div>
  );
}
