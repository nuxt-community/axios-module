import { addPluginTemplate } from '@nuxt/kit'
import { resolve } from 'path'
import consola from 'consola'
import defu from 'defu'

const logger = consola.withScope('nuxt:axios')

export default async (_moduleOptions, nuxt) => {

    // Combine options
    const moduleOptions = {
        ...nuxt.options.axios,
        ..._moduleOptions,
        ...(nuxt.options.runtimeConfig && nuxt.options.runtimeConfig.axios)
    }

    // Default port
    const defaultPort =
        process.env.API_PORT ||
        moduleOptions.port ||
        process.env.PORT ||
        process.env.npm_package_config_nuxt_port ||
        (nuxt.options.server && nuxt.options.server.port) ||
        3000

    // Default host
    let defaultHost =
        process.env.API_HOST ||
        moduleOptions.host ||
        process.env.HOST ||
        process.env.npm_package_config_nuxt_host ||
        (nuxt.options.server && nuxt.options.server.host) ||
        'localhost'

    /* istanbul ignore if */
    if (defaultHost === '0.0.0.0') {
        defaultHost = 'localhost'
    }

    // Transpile defu (IE11)
    if (nuxt.options.build.transpile && process.client/* nuxt 1 */) {
        nuxt.options.build.transpile.push('defu')
    }

    // Default prefix
    const prefix = process.env.API_PREFIX || moduleOptions.prefix || '/'

    // HTTPS
    const https = Boolean(nuxt.options.server && nuxt.options.server.https)

    // Headers
    const headers = {
        common: {
            Accept: 'application/json, text/plain, */*'
        },
        delete: {},
        get: {},
        head: {},
        post: {},
        put: {},
        patch: {}
    }

    // Support baseUrl alternative
    if (moduleOptions.baseUrl) {
        moduleOptions.baseURL = moduleOptions.baseUrl
        delete moduleOptions.baseUrl
    }
    if (moduleOptions.browserBaseUrl) {
        moduleOptions.browserBaseURL = moduleOptions.browserBaseUrl
        delete moduleOptions.browserBaseUrl
    }

    // Apply defaults
    const options = defu(moduleOptions, {
        baseURL: `http://${defaultHost}:${defaultPort}${prefix}`,
        browserBaseURL: undefined,
        credentials: false,
        debug: false,
        progress: true,
        proxyHeaders: true,
        proxyHeadersIgnore: [
            'accept',
            'cf-connecting-ip',
            'cf-ray',
            'content-length',
            'content-md5',
            'content-type',
            'host',
            'if-none-match',
            'if-modified-since',
            'x-forwarded-host',
            'x-forwarded-port',
            'x-forwarded-proto'
        ],
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
    if (typeof options.browserBaseURL === 'undefined') {
        options.browserBaseURL = options.proxy ? prefix : options.baseURL
    }

    // Normalize options
    if (options.retry === true) {
        options.retry = {}
    }

    // Convert http:// to https:// if https option is on
    if (options.https === true) {
        const https = s => s.replace('http://', 'https://')
        options.baseURL = https(options.baseURL)
        options.browserBaseURL = https(options.browserBaseURL)
    }

    // globalName
    options.globalName = nuxt.options.globalName || 'nuxt'

    // Register plugin
    addPluginTemplate({
        src: resolve(__dirname, 'plugin.js'),
        filename: 'axios.options.mjs',
        options
    })

    // Proxy integration
    if (options.proxy) {
        nuxt.options.proxy = typeof options.proxy === 'object' ? options.proxy : (typeof nuxt.options.proxy === 'object' ? nuxt.options.proxy : {})
        nuxt['__module_container__'].requireModule('@nuxtjs/proxy')
    }

    // Set _AXIOS_BASE_URL_ for dynamic SSR baseURL
    process.env._AXIOS_BASE_URL_ = options.baseURL

    logger.debug(`baseURL: ${options.baseURL}`)
    logger.debug(`browserBaseURL: ${options.browserBaseURL}`)
}

module.exports.meta = require('../package.json')
