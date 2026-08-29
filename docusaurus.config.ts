import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Stackly Documentation',
  tagline: 'All-in-one platform for URL shortening, web scraping, PDF conversion, team collaboration, and more',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://docs.stackly.in',
  baseUrl: '/',

  organizationName: 'Forepine',
  projectName: 'stackly-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Forepine/stackly-docs/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/Forepine/stackly-docs/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',

    announcementBar: {
      id: 'stackly_v2',
      content:
        '🚀 <strong>Stackly v2</strong> is now live with Digital vCards & Advanced Analytics! <a href="/docs/intro"><strong>See what\'s new →</strong></a>',
      backgroundColor: '#7c3aed',
      textColor: '#ffffff',
      isCloseable: true,
    },

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },

    navbar: {
      title: 'Stackly Docs',
      logo: {
        alt: 'Stackly Logo',
        src: 'img/stackly-final.svg',
      },
      hideOnScroll: false,
      style: 'dark',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://app.stackly.in',
          label: '🚀 Open App',
          position: 'right',
          className: 'navbar-app-link',
        },
        {
          href: 'https://github.com/Forepine/stackly-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: '📚 Documentation',
          items: [
            { label: 'Getting Started', to: '/docs/intro' },
            { label: 'URL Shortener', to: '/docs/url-shortener' },
            { label: 'Web to PDF', to: '/docs/web-to-pdf' },
            { label: 'Digital vCards', to: '/docs/digital-vcards' },
            { label: 'Stack Notes', to: '/docs/stack-notes' },
          ],
        },
        {
          title: '🛠️ Product',
          items: [
            { label: 'Stackly App', href: 'https://app.stackly.in' },
            { label: 'Pricing', to: '/docs/pricing' },
            { label: 'Integrations & API', to: '/docs/integrations' },
            { label: 'Branded Domains', to: '/docs/branded-domains' },
          ],
        },
        {
          title: '🌐 Connect',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: 'https://github.com/Forepine/stackly-docs' },
            { label: 'Twitter / X', href: 'https://twitter.com/stacklyin' },
            { label: 'LinkedIn', href: 'https://linkedin.com/company/forepine' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <strong>Stackly</strong> by Forepine. All rights reserved.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'python', 'http'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
