const path = require('path')
const consola = require('consola')
const defu = require('defu')

const logger = consola.withScope('nuxt:axios')

function axiosModule (_moduleOptions) {
  // Combine options
  const moduleOptions = { ...this.options.axios, ..._moduleOptions }

  // Default port
  const defaultPort =
    process.env.API_PORT ||
    moduleOptions.port ||
    process.env.PORT ||
    process.env.npm_package_config_nuxt_port ||
    (this.options.server && this.options.server.port) ||
    3000

  // Default host
  let defaultHost =
    process.env.API_HOST ||
    moduleOptions.host ||
    process.env.HOST ||
    process.env.npm_package_config_nuxt_host ||
    (this.options.server && this.options.server.host) ||
    'localhost'

  /* istanbul ignore if */
  if (defaultHost === '0.0.0.0') {
    defaultHost = 'localhost'
  }

  // Default prefix
  const prefix = process.env.API_PREFIX || moduleOptions.prefix || '/'

  // HTTPS
  const https = Boolean(this.options.server && this.options.server.https)

  // Headers
  const headers = {
    common: {
      'Accept': 'application/json, text/plain, */*'
    },
    delete: {},
    get: {},
    head: {},
    post: {},
    put: {},
    patch: {}
  }

  // Apply defaults
  const options = defu(moduleOptions, {
    baseURL: `http://${defaultHost}:${defaultPort}${prefix}`,
    browserBaseURL: null,
    credentials: false,
    debug: false,
    progress: true,
    proxyHeaders: true,
    proxyHeadersIgnore: ['accept', 'host', 'cf-ray', 'cf-connecting-ip', 'content-length', 'content-md5', 'content-type'],
    proxy: false,
    retry: false,
    https,
    headers
  })

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
    options.browserBaseURL = options.proxy ? prefix : options.baseURL
  }

  // Normalize options
  if (options.retry === true) {
    options.retry = {}
  }

  // Convert http:// to https:// if https option is on
  if (options.https === true) {
    const https = s => s.includes('//localhost:') ? s : s.replace('http://', 'https://')
    options.baseURL = https(options.baseURL)
    options.browserBaseURL = https(options.browserBaseURL)
  }

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'axios.js',
    options
  })

  // Proxy integration
  if (options.proxy) {
    this.requireModule([
      '@nuxtjs/proxy',
      typeof options.proxy === 'object' ? options.proxy : {}
    ])
  }

  // Set _AXIOS_BASE_URL_ for dynamic SSR baseURL
  process.env._AXIOS_BASE_URL_ = options.baseURL

  logger.debug(`baseURL: ${options.baseURL}`)
  logger.debug(`browserBaseURL: ${options.browserBaseURL}`)
}

module.exports = axiosModule
module.exports.meta = require('../package.json')
