const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  modules: ['@@'],
  serverMiddleware: ['~/api.js'],
  axios: {
    prefix: `/test_api`,
    proxyMode: true,
    init (axios) {},
    responseInterceptor: (response, { store }) => {
      /* eslint-disable no-console */
      console.log('YAY')
      return response
    }
  }
}
