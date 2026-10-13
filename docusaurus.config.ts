import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Stackly Help Center: plain-language guides for every part of the app, styled like stackly.in

const config: Config = {
  title: 'Stackly Help Center',
  tagline: 'Step-by-step guides for every part of Stackly, with screenshots',
  favicon: 'img/brand/favicon.ico',

  future: { v4: true },

  url: 'https://docs.stackly.in',
  baseUrl: '/',
  organizationName: 'Forepine',
  projectName: 'stackly-docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: { hooks: { onBrokenMarkdownLinks: 'throw' } },

  i18n: { defaultLocale: 'en', locales: ['en'] },

  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
        sitemap: { changefreq: 'weekly', priority: 0.5 },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/brand/og-image.png',
    metadata: [{ name: 'description', content: 'How to use Stackly: short links, QR codes, campaigns, event pages, personal links, analytics, CRM and more. Simple guides with screenshots.' }],

    colorMode: { defaultMode: 'light', respectPrefersColorScheme: true },

    docs: { sidebar: { hideable: true, autoCollapseCategories: false } },

    tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },

    navbar: {
      title: 'Help Center',
      logo: { alt: 'Stackly', src: 'img/brand/stackly-logo.svg', srcDark: 'img/brand/stackly-logo-white.svg', href: '/' },
      items: [
        { type: 'docSidebar', sidebarId: 'guide', position: 'left', label: 'Guides' },
        { to: '/getting-started/plans-and-limits', label: 'Plans', position: 'left' },
        { to: '/faq', label: 'FAQ', position: 'left' },
        
        { href: 'https://stackly.in/signin', label: 'Open Stackly', position: 'right', className: 'navbar-cta' },
      ],
    },

    footer: {
      style: 'light',
      logo: { alt: 'Stackly', src: 'img/brand/stackly-logo.svg', srcDark: 'img/brand/stackly-logo-white.svg', href: 'https://stackly.in', height: 20 },
      links: [
        {
          title: 'Get started',
          items: [
            { label: 'Welcome to Stackly', to: '/' },
            { label: 'Your first short link', to: '/links/create-a-link' },
            { label: 'Plans and limits', to: '/getting-started/plans-and-limits' },
          ],
        },
        {
          title: 'Popular guides',
          items: [
            { label: 'Event pages', to: '/grow/event-pages' },
            { label: 'Personal links', to: '/grow/personal-links' },
            { label: 'Analytics', to: '/insights/analytics' },
            { label: 'Custom domains', to: '/workspace/custom-domains' },
          ],
        },
        {
          title: 'Stackly',
          items: [
            { label: 'stackly.in', href: 'https://stackly.in' },
            { label: 'Contact support', href: 'mailto:contact@stackly.in' },
            { label: 'Privacy policy', href: 'https://stackly.in/privacy-policy' },
            { label: 'Terms of service', href: 'https://stackly.in/terms' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Stackly by Forepine Technologies`,
    },

    prism: { theme: prismThemes.github, darkTheme: prismThemes.vsDark, additionalLanguages: ['bash', 'json'] },
  } satisfies Preset.ThemeConfig,
};

export default config;
