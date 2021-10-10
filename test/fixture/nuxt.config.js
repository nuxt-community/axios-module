const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [
    { handler: require('../../') }
  ],
  serverMiddleware: {
    '/api/echo': '~/api/echo',
    '/api/cookie': '~/api/cookie'
  },
  axios: {
    polyfillFetch: true,
    prefix: '/api',
    proxy: true,
    credentials: true,
    debug: true,
    retry: true
  },
  plugins: ['~/plugins/axios']
}
