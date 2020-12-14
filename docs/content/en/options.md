---
title: 'Options'
description: 'Discover the available options to configure Axios in Nuxt'
position: 4
category: 'Getting started'
---

You can pass different options using the `axios` property in your `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  axios: {
    // Axios options here
  }
}
```

## Runtime Config

The use of [runtime config](https://nuxtjs.org/guide/runtime-config) is mandatory in case of using environment variables in production, otherwise, the values will be hard coded during build and won't change.

Supported options:

- `baseURL`
- `browserBaseURL`

**nuxt.config.js**

```js
export default {
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: 'http://localhost:4000', // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },
}
```

## `prefix`, `host` and `port`

These options are used for the default values of `baseURL` and `browserBaseURL`.

They can be customized with `API_PREFIX`, `API_HOST` (or `HOST`) and `API_PORT` (or `PORT`) environment variables.

Default value of `prefix` is `/`.

## `baseURL`

* Default: `http://[HOST]:[PORT][PREFIX]`

Defines the base URL which is used and prepended to make server side requests.

Environment variable `API_URL` can be used to **override** `baseURL`.

**WARNING:** `baseURL` and `proxy` cannot be used at the same time, so when the `proxy` option is in use, you need to define `prefix` instead of `baseURL`.

## `browserBaseURL`

* Default: `baseURL`

Defines the base URL which is used and prepended to make client side requests.

The environment variable `API_URL_BROWSER` can be used to **override** `browserBaseURL`.

**WARNING:** when the `proxy` option is enabled the default for `browserBaseURL` becomes `prefix` instead of `baseURL`.

## `https`

* Default: `false`

If set to `true`, `http://` in both `baseURL` and `browserBaseURL` will be changed into `https://`.

## `progress`

* Default: `true`

This option shows a loading bar while making requests integrating Nuxt.js progress bar (see "loading" options in config.nuxt.js). This is active only in the browser, and when loading bar is enabled and available.

You can also disable the progress bar in specific requests using the `progress` option in an inline request configuration:

```js
this.$axios.$get('URL', { progress: false })
```

## `proxy`

* Default: `false`

You can easily integrate Axios with [Proxy Module](https://github.com/nuxt-community/proxy-module). This is highly recommended to prevent CORS and production/deployment problems.

**nuxt.config.js**

```js
{
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    proxy: true // Can be also an object with default options
  },

  proxy: {
    '/api/': 'http://api.example.com',
    '/api2/': 'http://api.another-website.com'
  }
}
```

**Note:** It is not required to manually register `@nuxtjs/proxy` module, but it does need to be in your dependencies.

**Note:** In the proxy module, `/api/` will be added to all requests to the API end point. If you need to remove it use the  `pathRewrite` option:

```js
proxy: {
  '/api/': { target: 'http://api.example.com', pathRewrite: {'^/api/': ''} }
}
```

## `retry`

* Default: `false`

 Automatically intercept failed requests and retries them whenever posible using [axios-retry](https://github.com/softonic/axios-retry).

By default, number of retries will be **3 times**, if `retry` value is set to `true`. You can change it by passing the option with an inline retries sub-option like this:

```js
axios: {
  retry: { retries: 3 }
}
```

## `credentials`

* Default: `false`

Adds an interceptor that automatically sets `withCredentials` axios configuration when issuing a request to `baseURL`
that needs to pass authentication headers to the backend.

## `debug`

* Default: `false`

Adds interceptors that logs axios request and responses.

## `proxyHeaders`

* Default: `true`

In SSR context, this options sets client requests headers as default headers for the axios requests.
This is useful for making requests which need cookie based auth on server side.
This also helps making consistent requests in both SSR and Client Side code.

> **NOTE:** If you are directing requests to an url that is protected by CloudFlare's CDN you should set this to `false` in order to prevent CloudFlare from mistakenly detecting a reverse proxy loop and returning a 403 error.

## `proxyHeadersIgnore`

* Default `['host', 'accept', 'cf-ray', 'cf-connecting-ip', 'content-length']`

This is useful and efficient only when `proxyHeaders` is set to true. Removes unwanted requests headers to the API backend in SSR.

## `headers`

Headers added to all requests. If provided, will be merged with the defaults.

```js
{
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
```

- **NOTE:** Do NOT include any credentials or tokens here. One can easily access them.
- **NOTE:** This headers are effective to ALL requests. Please take care and consider providing special headers on each call that needs this unless you are pretty sure you always need to add headers.
