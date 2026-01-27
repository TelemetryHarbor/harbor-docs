// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  // --- SITE METADATA ---
  title: 'Harbor Scale',
  // SEO: A slightly longer tagline helps with context
  tagline: 'The All-in-One Platform to Collect, Store & Visualize IoT Data', 
  favicon: 'img/favicon.ico',
  url: 'https://docs.harborscale.com',
  baseUrl: '/',

  // --- DEPLOYMENT & BUILD SETTINGS ---
  organizationName: 'harborscale',
  projectName: 'harborscale-docs',
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
          // THEME: Updated to International Orange for mobile browser headers
          { tagName: 'meta', name: 'theme-color', content: '#FF4F00' }, 
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
          editUrl: 'https://github.com/harborscale/harbor-docs/edit/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            copyright: `Copyright © ${new Date().getFullYear()} Harbor Scale`,
          },
          editUrl: 'https://github.com/harborscale/harborscale-docs/edit/main/blog/',
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
      image: 'img/social-card.png', // Ensure this image is high quality (1200x630px)
      metadata: [
        // SEO: Expanded keywords for better discoverability
        { name: 'keywords', content: 'telemetry, iot, data platform, real-time analytics, visualization, harbor, api, sdk, developer tools, time-series data, mqtt, http' },
        { name: 'description', content: 'Harbor Scale documentation: The complete guide to collecting, storing, and visualizing your device data in real-time.' },
        
        // Open Graph (Facebook/LinkedIn)
        { property: 'og:title', content: 'Harbor Scale Documentation' },
        { property: 'og:description', content: 'Collect, Store & Visualize — All in One Place.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://docs.harborscale.com' },
        
        // Twitter Card (Large Image for better visibility)
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Harbor Scale Documentation' },
        { name: 'twitter:description', content: 'The developer-first platform for real-time IoT telemetry and visualization.' },
        { name: 'twitter:site', content: '@harborscale' }, 
        { name: 'twitter:image', content: 'https://docs.harborscale.com/img/social-card.png' },
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
          '⭐️ If you find Harbor Scale useful, please <b>star us on GitHub</b>! ⭐️',
        // THEME: International Orange background
        backgroundColor: '#FF4F00', 
        textColor: '#ffffff',
        isCloseable: true,
      },

      // --- NAVBAR ---
      navbar: {
        title: 'Harbor Scale',
        hideOnScroll: true,
        logo: {
          alt: 'Harbor Scale Logo',
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
          {
            href: 'https://harborscale.com/signup',
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
              { label: 'Getting Started', to: '/docs/getting-started/quick-start' },
              { label: 'SDKs', to: '/docs/category/sdks' },
              { label: 'API', to: '/docs/category/api' },
              { label: 'Integrations', to: '/docs/category/integrations' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'GitHub', href: 'https://github.com/harborscale' },
              { label: 'Twitter', href: 'https://twitter.com/harborscale' },
              { label: 'Discussions', href: 'https://github.com/harborscale/harborscale/discussions' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Login', href: 'https://harborscale.com/login' },
              { label: 'System Status', href: 'https://status.harborscale.com/' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Harbor Scale.`,
      },

      // --- CODE BLOCK STYLING ---
      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
        additionalLanguages: ['bash', 'json', 'yaml', 'docker', 'nginx'],
      },
    }),
};

export default config;