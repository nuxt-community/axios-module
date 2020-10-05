import Axios from 'axios'
import defu from 'defu'
<% if (options.retry) { %>import axiosRetry from 'axios-retry'<% } %>

// Axios.prototype cannot be modified
const axiosExtra = {
  setBaseURL (baseURL) {
    this.defaults.baseURL = baseURL
  },
  setHeader (name, value, scopes = 'common') {
    for (const scope of Array.isArray(scopes) ? scopes : [ scopes ]) {
      if (!value) {
        delete this.defaults.headers[scope][name];
        return
      }
      this.defaults.headers[scope][name] = value
    }
  },
  setToken (token, type, scopes = 'common') {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value, scopes)
  },
  onRequest(fn) {
    this.interceptors.request.use(config => fn(config) || config)
  },
  onResponse(fn) {
    this.interceptors.response.use(response => fn(response) || response)
  },
  onRequestError(fn) {
    this.interceptors.request.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onResponseError(fn) {
    this.interceptors.response.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onError(fn) {
    this.onRequestError(fn)
    this.onResponseError(fn)
  },
  create(options) {
    return createAxiosInstance(defu(options, this.defaults))
  }
}

// Request helpers ($get, $post, ...)
for (const method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
  axiosExtra['$' + method] = function () { return this[method].apply(this, arguments).then(res => res && res.data) }
}

const extendAxiosInstance = axios => {
  for (const key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios)
  }
}

const createAxiosInstance = axiosOptions => {
  // Create new axios instance
  const axios = Axios.create(axiosOptions)
  axios.CancelToken = Axios.CancelToken
  axios.isCancel = Axios.isCancel

  // Extend axios proto
  extendAxiosInstance(axios)

  // Setup interceptors
  <% if (options.debug) { %>setupDebugInterceptor(axios) <% } %>
  <% if (options.credentials) { %>setupCredentialsInterceptor(axios)<% } %>
  <% if (options.progress) { %>setupProgress(axios) <% } %>
  <% if (options.retry) { %>axiosRetry(axios, <%= serialize(options.retry) %>)<% } %>

  return axios
}

<% if (options.debug) { %>
const log = (level, ...messages) => console[level]('[Axios]', ...messages)

const setupDebugInterceptor = axios => {
  // request
  axios.onRequestError(error => {
    log('error', 'Request error:', error)
  })

  // response
  axios.onResponseError(error => {
    log('error', 'Response error:', error)
  })
  axios.onResponse(res => {
      log(
        'info',
        '[' + (res.status + ' ' + res.statusText) + ']',
        '[' + res.config.method.toUpperCase() + ']',
        res.config.url)

      if (process.browser) {
        console.log(res)
      } else {
        console.log(JSON.stringify(res.data, undefined, 2))
      }

      return res
  })
}<% } %>

<% if (options.credentials) { %>
const setupCredentialsInterceptor = axios => {
  // Send credentials only to relative and API Backend requests
  axios.onRequest(config => {
    if (config.withCredentials === undefined) {
      if (!/^https?:\/\//i.test(config.url) || config.url.indexOf(config.baseURL) === 0) {
        config.withCredentials = true
      }
    }
  })
}<% } %>

<% if (options.progress) { %>
const setupProgress = (axios) => {
  if (process.server) {
    return
  }

  // A noop loading inteterface for when $nuxt is not yet ready
  const noopLoading = {
    finish: () => { },
    start: () => { },
    fail: () => { },
    set: () => { }
  }

  const $loading = () => {
    const $nuxt = typeof window !== 'undefined' && window['$<%= options.globalName %>']
    return ($nuxt && $nuxt.$loading && $nuxt.$loading.set) ? $nuxt.$loading : noopLoading
  }

  let currentRequests = 0

  axios.onRequest(config => {
    if (config && config.progress === false) {
      return
    }

    currentRequests++
  })

  axios.onResponse(response => {
    if (response && response.config && response.config.progress === false) {
      return
    }

    currentRequests--
    if (currentRequests <= 0) {
      currentRequests = 0
      $loading().finish()
    }
  })

  axios.onError(error => {
    if (error && error.config && error.config.progress === false) {
      return
    }

    currentRequests--

    if (Axios.isCancel(error)) {
      if (currentRequests <= 0) {
        currentRequests = 0
        $loading().finish()
      }
      return
    }

    $loading().fail()
    $loading().finish()
  })

  const onProgress = e => {
    if (!currentRequests || !e.total) {
      return
    }
    const progress = ((e.loaded * 100) / (e.total * currentRequests))
    $loading().set(Math.min(100, progress))
  }

  axios.defaults.onUploadProgress = onProgress
  axios.defaults.onDownloadProgress = onProgress
}<% } %>

export default (ctx, inject) => {
  // runtimeConfig
  const runtimeConfig = ctx.$config && ctx.$config.axios || {}
  // baseURL
  const baseURL = process.browser
    ? (runtimeConfig.browserBaseURL || runtimeConfig.baseURL || '<%= options.browserBaseURL || '' %>')
      : (runtimeConfig.baseURL || process.env._AXIOS_BASE_URL_ || '<%= options.baseURL || '' %>')

  // Create fresh objects for all default header scopes
  // Axios creates only one which is shared across SSR requests!
  // https://github.com/mzabriskie/axios/blob/master/lib/defaults.js
  const headers = <%= JSON.stringify(options.headers, null, 4) %>

  const axiosOptions = {
    baseURL,
    headers
  }

  <% if (options.proxyHeaders) { %>
  // Proxy SSR request headers headers
  if (process.server && ctx.req && ctx.req.headers) {
    const reqHeaders = { ...ctx.req.headers }
    for (const h of <%= serialize(options.proxyHeadersIgnore) %>) {
      delete reqHeaders[h]
    }
    axiosOptions.headers.common = { ...reqHeaders, ...axiosOptions.headers.common }
  }
  <% } %>

  if (process.server) {
    // Don't accept brotli encoding because Node can't parse it
    axiosOptions.headers.common['accept-encoding'] = 'gzip, deflate'
  }

  const axios = createAxiosInstance(axiosOptions)

  // Inject axios to the context as $axios
  ctx.$axios = axios
  inject('axios', axios)
}
