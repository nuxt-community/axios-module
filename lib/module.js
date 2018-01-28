const chalk = require('chalk')
const path = require('path')
const debug = require('debug')('nuxt:axios')

module.exports = function nuxtAxios (_moduleOptions) {
  // Combine options
  const moduleOptions = Object.assign({}, this.options.axios, _moduleOptions)

  // Default port
  const defaultPort =
    process.env.API_PORT ||
    moduleOptions.port ||
    process.env.PORT ||
    process.env.npm_package_config_nuxt_port ||
    3000

  // Default host
  let defaultHost =
    process.env.API_HOST ||
    moduleOptions.host ||
    process.env.HOST ||
    process.env.npm_package_config_nuxt_host ||
    'localhost'

  /* istanbul ignore if */
  if (defaultHost === '0.0.0.0') {
    defaultHost = 'localhost'
  }

  // Default prefix
  const prefix = process.env.API_PREFIX || moduleOptions.prefix || '/'

  // Apply defaults
  const options = Object.assign(
    {
      baseURL: `http://${defaultHost}:${defaultPort}${prefix}`,
      browserBaseURL: null,
      credentials: false,
      debug: false,
      progress: true,
      proxyHeaders: true,
      proxyHeadersIgnore: ['accept', 'host'],
      proxy: false
    },
    moduleOptions
  )

  // ENV overrides

  /* istanbul ignore if */
  if (process.env.API_URL) {
    options.baseURL = process.env.API_URL
  }

  /* istanbul ignore if */
  if (process.env.API_URL_BROWSER) {
    options.browserBaseURL = process.env.API_URL_BROWSER
  }

  // Default browserBaseURL
  if (!options.browserBaseURL) {
    options.browserBaseURL = options.proxyMode ? prefix : options.baseURL
  }

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.template.js'),
    fileName: 'axios.js',
    options
  })

  /* eslint-disable no-console */
  debug(
    `BaseURL: ${chalk.green(options.baseURL)} (Browser: ${chalk.green(
      options.browserBaseURL
    )})`
  )
}

module.exports.meta = require('../package.json')
