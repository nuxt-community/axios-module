import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#AA7AB5'
  },
  buildModules: ['nuxt-ackee'],
  ackee: {
    server: 'https://ackee.nuxtjs.com',
    domainId: 'a1a834f9-be7a-45ca-a18e-4ab559cd8452',
    detailed: true
  },
  pwa: {
    manifest: {
      name: 'Nuxt Axios'
    }
  }
})
