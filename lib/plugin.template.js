import Axios from 'axios'

// Axios.prototype cannot be modified
const axiosExtra = {
  setHeader (name, value, scopes = 'common') {
    for (let scope of Array.isArray(scopes) ? scopes : [ scopes ]) {
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
  }
}

// Request helpers ($get, $post, ...)
for (let method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
  axiosExtra['$' + method] = function () { return this[method].apply(this, arguments).then(res => res && res.data) }
}

const extendAxiosInstance = axios => {
  for (let key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios)
  }
}

<% if (options.debug) { %>
const log = (level, ...messages) => console[level]('[Axios]', ...messages)

const setupDebugInterceptor = axios => {
  // request
  axios.interceptors.request.use(undefined, error => {
      log('error', 'Request error:', error)
      return Promise.reject(error)
  })

  // response
  axios.interceptors.response.use(res => {
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
    }, error => {
      log('error', 'Response error:', error)
      return Promise.reject(error)
  })
}
<% } %>

<% if (options.credentials) { %>
const setupCredentialsInterceptor = axios => {
  // Send credentials only to relative and API Backend requests
  axios.interceptors.request.use(config => {
    if (config.withCredentials === undefined) {
      if (!/^https?:\/\//i.test(config.url) || config.url.indexOf(config.baseURL) === 0) {
        config.withCredentials = true
      }
    }
    return config
  })
}
<% } %>

export default async (ctx, inject) => {
  const axiosOptions = {
    // baseURL
    baseURL : process.browser
      ? (process.env.API_URL_BROWSER || '<%= options.browserBaseURL %>')
      : (process.env.API_URL || '<%= options.baseURL %>'),

    // Create fresh objects for all default header scopes
    // Axios creates only one which is shared across SSR requests!
    // https://github.com/mzabriskie/axios/blob/master/lib/defaults.js
    headers: {
      common : {
        'Accept': 'application/json, text/plain, */*'
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {}
    }
  }

  <% if (options.proxyHeaders) { %>
  // Proxy SSR request headers headers
  axiosOptions.headers.common = (ctx.req && ctx.req.headers) ? Object.assign({}, ctx.req.headers) : {}
  <% for (let h of options.proxyHeadersIgnore) { %>delete axiosOptions.headers.common['<%= h %>']
  <% } %><% } %>

  // Create new axios instance
  const axios = Axios.create(axiosOptions)

  // Extend axios proto
  extendAxiosInstance(axios)

  // Setup interceptors
  <% if (options.debug) { %>setupDebugInterceptor(axios) <% } %>
  <% if (options.credentials) { %>setupCredentialsInterceptor(axios)<% } %>

  // Inject axios to the context as $axios
  ctx.$axios = axios
  inject('axios', axios)
}
