const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  modules: [
    { handler: require('../../') }
  ],
  serverMiddleware: ['~/api.js'],
  axios: {
    prefix: `/test_api`,
    proxy: true,
    credentials: true,
    debug: true,
    retry: {
      retries: 3
    }
  },
  plugins: ['~/plugins/axios']
}
