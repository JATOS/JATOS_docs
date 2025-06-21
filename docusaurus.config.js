// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'JATOS',
  tagline: 'Just Another Tool for Online Studies',
  url: 'https://www.jatos.org',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'JATOS', // Usually your GitHub org/user name.
  projectName: 'JATOS_docs', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/JATOS/JATOS_docs/tree/main',
          routeBasePath: '/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          lastVersion: '3.9.1',
          versions: {
            current: {
              label: 'next',
              path: 'next',
              banner: 'unreleased',
            },
            '3.9.1': {
              label: '3.9.x',
              path: '',
              banner: 'none',
            },
            '3.8.1': {
              label: '3.8.x',
              path: '3.8.x',
              banner: 'none',
            },
            '3.7.1': {
              label: '3.7.x',
              path: '3.7.x',
              banner: 'none',
            },
            '3.6.1': {
              label: '3.6.x and earlier',
              path: '3.6.x',
              banner: 'unmaintained',
            },
          },
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/JATOS/JATOS_docs/tree/main/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-57013276-1',
          anonymizeIP: true, // Should IPs be anonymized?
        },
        gtag: {
          trackingID: 'G-ZRKSKWW41X',
          anonymizeIP: true, // Should IPs be anonymized?
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'JATOS',
        logo: {
          alt: 'JATOS Logo',
          src: 'img/jatos_logo_color.svg'
        },
        items: [
          {
            type: 'doc',
            docId: 'Overview/Whats-JATOS',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/Example-Studies',
            label: 'Example Studies',
            position: 'left'
          },
          {
            type: 'doc',
            docId: 'Overview/Contact-us',
            position: 'left',
            label: 'Contact'
          },
          {
            to: '/Support-us',
            label: 'Support us',
            position: 'right'
          },
          {
            type: 'docsVersionDropdown',
            position: "right",
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'JATOS Forum',
                to: 'https://forum.cogsci.nl/categories/jatos',
              },
              {
                label: 'Slack',
                to: 'https://communityinviter.com/apps/jatosworkspace/jatos-slack',
              },
              {
                label: 'GitHub Issues',
                to: 'https://github.com/JATOS/JATOS/issues',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'http://blog.jatos.org/',
              },
              {
                label: 'GitHub',
                to: 'https://github.com/JATOS/JATOS',
              },
              {
                label: 'Source Code Docs',
                to: 'https://docs.jatos.org',
              },
            ],
          },
        ],
        copyright: `JATOS is free and <a href="https://github.com/JATOS/JATOS" class="footer__link-item">open source</a> and published under <a href="https://www.apache.org/licenses/LICENSE-2.0" class="footer__link-item">Apache License, version 2.0</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
