import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#AA7AB5'
  },
  buildModules: ['vue-plausible'],
  plausible: {
    domain: 'axios.nuxtjs.org'
  },
  pwa: {
    manifest: {
      name: 'Nuxt Axios'
    }
  }
})
