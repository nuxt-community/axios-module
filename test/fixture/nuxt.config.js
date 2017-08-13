const axiosModule = require('../..')

module.exports = {
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  modules: [
    axiosModule
  ],
  serverMiddleware: [
    '~/api'
  ],
  axios: {
    // Defaults
    baseURL: `http://localhost:${process.env.PORT}/test_api`
  }
}
