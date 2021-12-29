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
          // Please change this to your repo.
          editUrl: 'https://github.com/JATOS/JATOS_docs/tree/master',
          routeBasePath: '/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          versions: {
            current: {
              label: 'next',
              path: 'next',
              banner: 'unreleased',
            },
            '3.7.1': {
              label: '3.7.1-alpha',
              path: '',
              banner: 'none',
            },
            '3.6.1': {
              label: '3.6.1 and earlier',
              path: '3.6.1',
              banner: 'none',
            },
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/JATOS/JATOS_docs/tree/master/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
            to: 'https://ko-fi.com/jatos',
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
                label: 'Google Group',
                to: 'https://groups.google.com/g/jatos',
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
            ],
          },
        ],
        copyright: `JATOS is free and <a href="https://github.com/JATOS/JATOS" class="footer__link-item">open source</a> and published under <a href="https://www.apache.org/licenses/LICENSE-2.0" class="footer__link-item">Apache License, version 2.0</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      googleAnalytics: {
        trackingID: 'UA-57013276-1',
        anonymizeIP: true, // Should IPs be anonymized?
      },
    }),
};

module.exports = config;
