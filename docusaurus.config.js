// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Telemetry Harbor Documentation',
  tagline: 'Your IoT Data Harbor',
  favicon: 'img/favicon.ico',
  future: {
    experimental_faster: true
    
  },

  // Set the production url of your site here
  url: 'https://docs.telemetryharbor.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'telemetryharbor', // Usually your GitHub org/user name.
  projectName: 'telemetryharbor', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Add plugins for enhanced functionality
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
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/favicon.ico',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#0066CC',
          },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          editUrl:
            'https://github.com/telemetryharbor/telemetryharbor/edit/main/docs/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            copyright: `Copyright © ${new Date().getFullYear()} Telemetry Harbor`,
            xslt: true,
          },
          // Please change this to your repo.
          editUrl:
            'https://github.com/telemetryharbor/telemetryharbor/edit/main/blog/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          postsPerPage: 5,
        }, 
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-XXXXXXXXXX', // Replace with your Google Analytics tracking ID
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      metadata: [
        {name: 'keywords', content: 'telemetry, iot, data, harbor, documentation'},
        {name: 'description', content: 'Comprehensive documentation for Telemetry Harbor - Your IoT Data Harbor'},
        {name: 'twitter:card', content: 'summary_large_image'},
      ],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'support_us',
        content:
          '⭐️ If you find Telemetry Harbor useful, please star us on <a target="_blank" rel="noopener noreferrer" href="https://github.com/telemetryharbor">GitHub</a>',
        backgroundColor: '#0066CC',
        textColor: '#ffffff',
        isCloseable: true,
      },
      navbar: {
        title: 'Telemetry Harbor',
        logo: {
          alt: 'Telemetry Logo',
          src: 'img/lightIcon.svg',
          srcDark: 'img/darkIcon.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/docs/category/api',
            label: 'API',
            position: 'left',
          },
          
          {
            href: 'https://github.com/telemetryharbor/telemetryharbor',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            href: 'https://telemetryharbor.com/',
            label: 'Join Us',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'API',
                to: '/docs/category/api',
              },
              {
                label: 'Integrations',
                to: '/docs/category/integrations',
              },
            
            ],
          },
          {
            title: 'Telemetry Harbor',
            items: [
              {
                label: 'Login',
                href: 'https://telemetryharbor.com/login',
              },
              {
                label: 'Sign Up',
                href: 'https://telemetryharbor.com/signup',
              },
              {
                label: 'System Status',
                href: 'https://status.telemetryharbor.com/',
              },
             
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/telemetryharbor',
              },
             
              {
                label: 'Twitter',
                href: 'https://twitter.com/telemetryharbor',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Telemetry Harbor. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'yaml', 'docker', 'nginx'],
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
    }),
};

export default config;
