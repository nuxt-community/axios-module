const chalk = require('chalk')
const path = require('path')
const { URL } = require('whatwg-url')
const debug = require('debug')('nuxt:axios')

module.exports = function nuxtAxios (moduleOptions) {
  const port = process.env.PORT || process.env.npm_package_config_nuxt_port || 3000
  let host = process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'
  /* istanbul ignore if */
  if (host === '0.0.0.0') {
    host = 'localhost'
  }

  // Apply defaults
  const defaults = {
    baseURL: `http://${host}:${port}/api`,
    browserBaseURL: null,
    credentials: true,
    proxyHeaders: true,
    debug: false,
    redirectError: {}
  }

  const options = Object.assign({}, defaults, this.options.axios, moduleOptions)

  // Override env
  /* istanbul ignore if */
  if (process.env.API_URL) {
    options.baseURL = process.env.API_URL
  }

  /* istanbul ignore if */
  if (process.env.API_URL_BROWSER) {
    options.browserBaseURL = process.env.API_URL_BROWSER
  }

  const isSchemeLessBaseURL = options.baseURL.substr(0, 2) === '//'
  options.baseURL = new URL(options.baseURL, `http://${host}:${port}`)

  if (!options.browserBaseURL) {
    const sameHost = options.baseURL.host === `${host}:${port}`
    options.browserBaseURL = sameHost ? options.baseURL.pathname : isSchemeLessBaseURL ? options.baseURL.toString().substr(5) : options.baseURL // 5 == 'http:'.length
  }

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.template.js'),
    fileName: 'axios.js',
    options
  })

  /* eslint-disable no-console */
  debug(`BaseURL: ${chalk.green(options.baseURL)} (Browser: ${chalk.green(options.browserBaseURL)})`)
}

module.exports.meta = require('../package.json')
