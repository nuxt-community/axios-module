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
    '/api/test': '~/api/test',
    '/api/cookie': '~/api/cookie'
  },
  axios: {
    prefix: '/api',
    proxy: true,
    credentials: true,
    debug: true,
    retry: true
  },
  plugins: ['~/plugins/axios']
}
