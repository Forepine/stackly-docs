import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// Same order and names as the Stackly sidebar, so people find things where they expect them
const sidebars: SidebarsConfig = {
  guide: [
    'index',
    {
      type: 'category', label: 'Getting started', collapsed: false,
      items: ['getting-started/create-your-account', 'getting-started/dashboard-tour', 'getting-started/plans-and-limits'],
    },
    {
      type: 'category', label: 'Links', collapsed: false,
      items: ['links/create-a-link', 'links/link-options', 'links/manage-links', 'links/qr-codes', 'links/bulk-links', 'links/what-visitors-see'],
    },
    'visiting-cards',
    {
      type: 'category', label: 'Grow', collapsed: false,
      items: ['grow/campaigns', 'grow/event-pages', 'grow/event-guests', 'grow/personal-links', 'grow/utm-builder'],
    },
    { type: 'category', label: 'Insights', collapsed: false, items: ['insights/analytics', 'insights/reports', 'insights/client-report-link'] },
    { type: 'category', label: 'CRM', collapsed: false, items: ['crm/leads', 'crm/brand-deals', 'crm/smart-openers'] },
    {
      type: 'category', label: 'Workspace', collapsed: false,
      items: ['workspace/collections', 'workspace/stack-notes', 'workspace/custom-domains', 'workspace/integrations', 'workspace/browser-extension'],
    },
    {
      type: 'category', label: 'Account & settings', collapsed: false,
      items: [
        'account/profile', 'account/password-and-security', 'account/team-members', 'account/billing-and-plans',
        'account/api-keys', 'account/audit-logs', 'account/data-retention', 'account/refer-and-earn',
      ],
    },
    'faq',
  ],
};

export default sidebars;
