const Axios = require('axios')
const defu = require('defu')

const createAxiosInstance = (axiosOptions, moduleOptions, isServer) => {
  // Create new axios instance
  const axios = Axios.create(axiosOptions)

  // Extend axios proto
  extendAxiosInstance(axios, moduleOptions, isServer)

  return axios
}

const extendAxiosInstance = (axios, moduleOptions, isServer) => {
  axios.CancelToken = Axios.CancelToken
  axios.isCancel = Axios.isCancel

  // Axios.prototype cannot be modified
  const axiosExtra = {
    setBaseURL (baseURL) {
      this.defaults.baseURL = baseURL
    },
    setHeader (name, value, scopes = 'common') {
      for (const scope of Array.isArray(scopes) ? scopes : [scopes]) {
        if (!value) {
          delete this.defaults.headers[scope][name]
          return
        }
        this.defaults.headers[scope][name] = value
      }
    },
    setToken (token, type, scopes = 'common') {
      const value = !token ? null : (type ? type + ' ' : '') + token
      this.setHeader('Authorization', value, scopes)
    },
    onRequest (fn) {
      this.interceptors.request.use(config => fn(config) || config)
    },
    onResponse (fn) {
      this.interceptors.response.use(response => fn(response) || response)
    },
    onRequestError (fn) {
      this.interceptors.request.use(undefined, error => fn(error) || Promise.reject(error))
    },
    onResponseError (fn) {
      this.interceptors.response.use(undefined, error => fn(error) || Promise.reject(error))
    },
    onError (fn) {
      this.onRequestError(fn)
      this.onResponseError(fn)
    },
    create (options) {
      return createAxiosInstance(defu(options, this.defaults), moduleOptions, isServer)
    }
  }

  // Request helpers ($get, $post, ...)
  for (const method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
    axiosExtra['$' + method] = function () { return this[method].apply(this, arguments).then(res => res && res.data) }
  }

  for (const key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios)
  }

  // Setup interceptors
  if (moduleOptions.debug) {
    setupDebugInterceptor(axios, isServer)
  }
  if (moduleOptions.credentials) {
    setupCredentialsInterceptor(axios)
  }
  if (moduleOptions.progress && !isServer) {
    setupProgress(axios)
  }
  if (moduleOptions.retry) {
    const axiosRetry = require('axios-retry')
    axiosRetry(axios, moduleOptions.retry)
  }
}

const log = (level, ...messages) => console[level]('[Axios]', ...messages)

const setupDebugInterceptor = (axios, isServer) => {
  // request
  axios.onRequestError((error) => {
    log('error', 'Request error:', error)
  })

  // response
  axios.onResponseError((error) => {
    log('error', 'Response error:', error)
  })
  axios.onResponse((res) => {
    log(
      'info',
      '[' + (res.status + ' ' + res.statusText) + ']',
      '[' + res.config.method.toUpperCase() + ']',
      res.config.url)

    if (!isServer) {
      console.log(res)
    } else {
      console.log(JSON.stringify(res.data, undefined, 2))
    }

    return res
  })
}

const setupCredentialsInterceptor = (axios) => {
  // Send credentials only to relative and API Backend requests
  axios.onRequest((config) => {
    if (config.withCredentials === undefined) {
      if (!/^https?:\/\//i.test(config.url) || config.url.indexOf(config.baseURL) === 0) {
        config.withCredentials = true
      }
    }
  })
}

const setupProgress = (axios) => {
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

  axios.onRequest((config) => {
    if (config && config.progress === false) {
      return
    }

    currentRequests++
  })

  axios.onResponse((response) => {
    if (response && response.config && response.config.progress === false) {
      return
    }

    currentRequests--
    if (currentRequests <= 0) {
      currentRequests = 0
      $loading().finish()
    }
  })

  axios.onError((error) => {
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

  const onProgress = (e) => {
    if (!currentRequests) {
      return
    }
    const progress = ((e.loaded * 100) / (e.total * currentRequests))
    $loading().set(Math.min(100, progress))
  }

  axios.defaults.onUploadProgress = onProgress
  axios.defaults.onDownloadProgress = onProgress
}

module.exports.createAxiosInstance = createAxiosInstance
