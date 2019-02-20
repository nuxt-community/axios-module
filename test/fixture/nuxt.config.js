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
  serverMiddleware: ['~/api.js'],
  axios: {
    prefix: '/test_api',
    proxy: true,
    credentials: true,
    debug: true,
    retry: true
  },
  plugins: ['~/plugins/axios']
}
