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
    baseURL: `http://localhost:${process.env.PORT || 3000}/test_api`,
    init (axios) {},
    responseInterceptor: (response, { store }) => {
      /* eslint-disable no-console */
      console.log('YAY')
      return response
    }
  }
}
