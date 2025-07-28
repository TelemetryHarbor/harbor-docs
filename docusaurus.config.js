// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/**
 * ==============================================================================
 * YOUR DOCUSAURUS CONFIGURATION
 * ==============================================================================
 * This file contains the central configuration for your Docusaurus site.
 *
 * You can find a full list of options here:
 * https://docusaurus.io/docs/api/docusaurus-config
 */

/** @type {import('@docusaurus/types').Config} */
const config = {
  // --- SITE METADATA ---
  title: 'Telemetry Harbor',
  tagline: 'Collect, Store & Visualize — All in One Place',
  favicon: 'img/favicon.ico',
  url: 'https://docs.telemetryharbor.com',
  baseUrl: '/',

  // --- DEPLOYMENT & BUILD SETTINGS ---
  organizationName: 'telemetryharbor',
  projectName: 'telemetryharbor-docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // --- INTERNATIONALIZATION ---
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // --- PLUGINS ---
  plugins: [
    [
      '@docusaurus/plugin-sitemap',
      {
        id: 'plugin-sitemap-1',
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/tags/**'],
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        id: 'plugin-pwa-1',
        debug: false,
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/favicon.ico' },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          { tagName: 'meta', name: 'theme-color', content: '#111827' },
        ],
      },
    ],
  ],

  // --- PRESETS ---
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/TelemetryHarbor/harbor-docs/edit/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            copyright: `Copyright © ${new Date().getFullYear()} Telemetry Harbor`,
          },
          editUrl: 'https://github.com/telemetryharbor/telemetryharbor-docs/edit/main/blog/',
          postsPerPage: 5,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-XW9HHXP7SE',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  // ============================================================================
  //                              THEME CONFIGURATION
  // ============================================================================
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // --- SEO & SOCIAL SHARING ---
      image: 'img/social-card.jpg',
      metadata: [
        { name: 'keywords', content: 'telemetry, iot, data, harbor, documentation, api, real-time' },
        { property: 'og:title', content: 'Telemetry Harbor Documentation' },
        { property: 'og:description', content: 'Collect, Store & Visualize — All in One Place.' },
        { property: 'og:type', content: 'website' },
      ],

      // --- UI & APPEARANCE ---
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },

      // --- ANNOUNCEMENT BAR ---
      announcementBar: {
        id: 'github_star',
        content:
          '⭐️ If you find Telemetry Harbor useful, please <b>star us on GitHub</b>! ⭐️',
        backgroundColor: '#111827',
        textColor: '#ffffff',
        isCloseable: true,
      },

      // --- NAVBAR ---
      navbar: {
        title: 'Telemetry Harbor',
        hideOnScroll: true,
        logo: {
          alt: 'Telemetry Harbor Logo',
          src: 'img/lightIcon.svg',
          srcDark: 'img/darkIcon.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/docs/category/api',
            label: 'API',
            position: 'left',
          },
          {
            to: '/docs/category/sdks',
            label: 'SDKs',
            position: 'left',
          },
          /* { to: '/blog', label: 'Blog', position: 'left' }, */
          
          {
            href: 'https://telemetryharbor.com/signup',
            label: 'Get Started for Free',
            position: 'right',
          },
        ],
      },

      // --- FOOTER ---
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              { label: 'Getting Started', to: '/docs/intro' },
              { label: 'SDKs', to: '/docs/category/SDKs' },
              { label: 'API', to: '/docs/category/api' },
              { label: 'Integrations', to: '/docs/category/integrations' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'GitHub', href: 'https://github.com/telemetryharbor' },
              { label: 'Twitter', href: 'https://twitter.com/telemetryharbor' },
              { label: 'Discussions', href: 'https://github.com/telemetryharbor/telemetryharbor/discussions' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Login', href: 'https://telemetryharbor.com/login' },
              { label: 'System Status', href: 'https://status.telemetryharbor.com/' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Telemetry Harbor. Built with Docusaurus.`,
      },

      // --- CODE BLOCK STYLING ---
      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
        // 'http' has been removed from this list to fix the error
        additionalLanguages: ['bash', 'json', 'yaml', 'docker', 'nginx'],
      },
    }),
};

export default config;