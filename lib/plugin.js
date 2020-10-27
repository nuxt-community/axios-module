import { createAxiosInstance } from './axios-extend.js'

const options = <%= serialize(options) %>

export default (ctx, inject) => {
  // runtimeConfig
  const runtimeConfig = ctx.$config && ctx.$config.axios || {}
  // baseURL
  const baseURL = process.browser
    ? (runtimeConfig.browserBaseURL || runtimeConfig.baseURL || options.browserBaseURL || '')
      : (runtimeConfig.baseURL || process.env._AXIOS_BASE_URL_ || options.baseURL || '')

  // Create fresh objects for all default header scopes
  // Axios creates only one which is shared across SSR requests!
  // https://github.com/mzabriskie/axios/blob/master/lib/defaults.js
  const headers = <%= JSON.stringify(options.headers, null, 4) %>

  const axiosOptions = {
    baseURL,
    headers
  }

  if (options.proxyHeaders) {
    // Proxy SSR request headers headers
    if (process.server && ctx.req && ctx.req.headers) {
      const reqHeaders = { ...ctx.req.headers }
      for (const h of options.proxyHeadersIgnore) {
        delete reqHeaders[h]
      }
      axiosOptions.headers.common = { ...reqHeaders, ...axiosOptions.headers.common }
    }
  }

  if (process.server) {
    // Don't accept brotli encoding because Node can't parse it
    axiosOptions.headers.common['accept-encoding'] = 'gzip, deflate'
  }

  const axios = createAxiosInstance(axiosOptions, options, process.server)

  // Inject axios to the context as $axios
  inject('axios', axios)
}
