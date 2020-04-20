module.exports = {
  title: 'Axios Module',
  description: 'Axios Module for Nuxt',
  head: [['link', { rel: 'stylesheet', href: '/styles.css' }]],
  themeConfig: {
    repo: 'nuxt-community/axios-module',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    displayAllHeaders: true,
    sidebar: [
      {
        collapsable: false,
        children: [
          '/',
          '/setup',
          '/usage',
          '/extend',
          '/helpers',
          '/options',
          '/migration',
        ]
      }
    ],
    nav: [
      {
        text: 'Guide',
        link: '/'
      },
     {
        text: 'Release Notes',
        link: 'https://github.com/nuxt-community/axios-module/blob/master/CHANGELOG.md'
      }
    ]
  }
}
