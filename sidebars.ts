import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsed: false,
      items: ['intro', 'dashboard'],
    },
    {
      type: 'category',
      label: '🔗 Core Tools',
      collapsed: false,
      items: [
        'url-shortener',
        'branded-domains',
        'utm-templates',
        'web-to-pdf',
        'digital-vcards',
        'stack-notes',
        'folders',
      ],
    },
    {
      type: 'category',
      label: '👥 Team & Collaboration',
      collapsed: false,
      items: ['team-members', 'integrations'],
    },
    {
      type: 'category',
      label: '⚙️ Account',
      collapsed: true,
      items: [
        'profile',
        'change-password',
        'address-info',
        'billing-info',
        'pricing',
        'api-keys',
        'audit-logs',
      ],
    },
  ],
};

export default sidebars;
