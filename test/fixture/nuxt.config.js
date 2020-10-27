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
  serverMiddleware: [
    require(resolve(__dirname, 'api.js')).test_api,
    require(resolve(__dirname, 'api.js')).check_req_axios
  ],
  axios: {
    prefix: '/test_api',
    proxy: true,
    credentials: true,
    debug: true,
    retry: true
  },
  plugins: ['~/plugins/axios']
}
