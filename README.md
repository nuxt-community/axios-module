<h1 align="center">Axios</h1>

<p align="center"> Secure and Easy <a href="https://github.com/mzabriskie/axios">Axios</a> integration with Nuxt.js. </p>

<p align="center">
<a href="https://david-dm.org/nuxt-community/axios-module">
    <img alt="" src="https://david-dm.org/nuxt-community/axios-module/status.svg?style=flat-square">
</a>
<a href="https://standardjs.com">
    <img alt="" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square">
</a>
<a href="https://circleci.com/gh/nuxt-community/axios-module">
    <img alt="" src="https://img.shields.io/circleci/project/github/nuxt-community/axios-module.svg?style=flat-square">
</a>
<a href="https://codecov.io/gh/nuxt-community/axios-module">
    <img alt="" src="https://img.shields.io/codecov/c/github/nuxt-community/axios-module.svg?style=flat-square">
</a>
<br>
<a href="https://npmjs.com/package/@nuxtjs/axios">
    <img alt="" src="https://img.shields.io/npm/v/@nuxtjs/axios/latest.svg?style=flat-square">
</a>
<a href="https://npmjs.com/package/@nuxtjs/axios">
    <img alt="" src="https://img.shields.io/npm/dt/@nuxtjs/axios.svg?style=flat-square">
</a>
</p>

[📖 Release Notes](./CHANGELOG.md)

If you are coming from an older release please be sure to read [Migration Guide](https://github.com/nuxt-community/axios-module/wiki/Migration-guide).

## Features

✓ Automatically set base URL for client & server side

✓ Exposes `setToken` function to `$axios` so we can easily and globally set authentication tokens

✓ Automatically enables `withCredentials` when requesting to base URL

✓ Proxy request headers in SSR (Useful for auth)

✓ Fetch Style requests

✓ Integrated with Nuxt.js Progressbar while making requests

✓ Integrated with [Proxy Module](https://github.com/nuxt-community/proxy-module)

✓ Auto retry requests with [axios-retry](https://github.com/softonic/axios-retry)

# Table of Contents

* [Setup](#setup)
* [Usage](#usage)
  * [Component](#component)
  * [Store](#store-nuxtserverinit)
  * [Store Actions](#store-actions)
* [Extending Axios](#extending-axios)
* [Helpers](#helpers)
  * [Interceptors](#interceptors)
  * [Fetch Style Requests](#fetch-style-requests)
  * [Set Header](#setheadername-value-scopescommon)
  * [Set Token](#settokentoken-type-scopescommon)
* [Options](#options)
  * [Prefix, Host and Port](#prefix-host-and-port)
  * [baseURL](#baseurl)
  * [browserBaseURL](#browserbaseurl)
  * [https](#https)
  * [progress](#progress)
  * [proxy](#proxy)
  * [retry](#retry)
  * [credentials](#credentials)
  * [debug](#debug)
  * [proxyHeaders](#proxyheaders)
  * [proxyHeadersIgnore](#proxyheadersignore)

## Setup

Install with yarn:

```bash
yarn add @nuxtjs/axios
```

Install with npm:

```bash
npm install @nuxtjs/axios
```

**nuxt.config.js**

```js
{
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // proxyHeaders: false
  }
}
```

## Usage

### Component

**`asyncData`**

```js
async asyncData({ app }) {
  const ip = await app.$axios.$get('http://icanhazip.com')
  return { ip }
}
```

**`methods`/`created`/`mounted`/etc**

```js
methods: {
  async fetchSomething() {
    const ip = await this.$axios.$get('http://icanhazip.com')
    this.ip = ip
  }
}
```

### Store `nuxtServerInit`

```js
async nuxtServerInit ({ commit }, { app }) {
  const ip = await app.$axios.$get('http://icanhazip.com')
  commit('SET_IP', ip)
}
```

### Store actions

```js
// In store
{
  actions: {
    async getIP ({ commit }) {
      const ip = await this.$axios.$get('http://icanhazip.com')
      commit('SET_IP', ip)
    }
  }
}
```

## Extending Axios

If you need to customize axios by registering interceptors and changing global config, you have to create a nuxt plugin.

**nuxt.config.js**

```js
{
  modules: [
    '@nuxtjs/axios',
  ],

  plugins: [
    '~/plugins/axios'
  ]
}
```

**plugins/axios.js**

```js
export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
```

## Helpers

### Interceptors

Axios plugin provides helpers to register axios interceptors easier and faster.

- `onRequest(config)`
- `onResponse(response)`
- `onError(err)`
- `onRequestError(err)`
- `onResponseError(err)`

This functions don't have to return anything by default.

Example: (`plugins/axios.js`)

```js
export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if(error.code === 500) {
      redirect('/sorry')
    }
  })
}
```

### Fetch Style requests

Axios plugin also supports fetch style requests with `$` prefixed methods:

```js
// Normal usage with axios
let data = (await $axios.get('...')).data

// Fetch Style
let data = await $axios.$get('...')
```

### `setHeader(name, value, scopes='common')`

Axios instance has a helper to easily set any header.

Parameters:

* **name**: Name of the header
* **value**: Value of the header
* **scopes**: Send only on specific type of requests. Defaults
  * Type: _Array_ or _String_
  * Defaults to `common` meaning all types of requests
  * Can be `get`, `post`, `delete`, ...

```js
// Adds header: `Authorization: 123` to all requests
this.$axios.setHeader('Authorization', '123')

// Overrides `Authorization` header with new value
this.$axios.setHeader('Authorization', '456')

// Adds header: `Content-Type: application/x-www-form-urlencoded` to only post requests
this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
  'post'
])

// Removes default Content-Type header from `post` scope
this.$axios.setHeader('Content-Type', false, ['post'])
```

### `setToken(token, type, scopes='common')`

Axios instance has an additional helper to easily set global authentication header.

Parameters:

* **token**: Authorization token
* **type**: Authorization token prefix(Usually `Bearer`).
* **scopes**: Send only on specific type of requests. Defaults
  * Type: _Array_ or _String_
  * Defaults to `common` meaning all types of requests
  * Can be `get`, `post`, `delete`, ...

```js
// Adds header: `Authorization: 123` to all requests
this.$axios.setToken('123')

// Overrides `Authorization` header with new value
this.$axios.setToken('456')

// Adds header: `Authorization: Bearer 123` to all requests
this.$axios.setToken('123', 'Bearer')

// Adds header: `Authorization: Bearer 123` to only post and delete requests
this.$axios.setToken('123', 'Bearer', ['post', 'delete'])

// Removes default Authorization header from `common` scope (all requests)
this.$axios.setToken(false)
```

## Options

You can pass options using module options or `axios` section in `nuxt.config.js`

### `prefix`, `host` and `port`

This options are used for default values of `baseURL` and `browserBaseURL`.

Can be customized with `API_PREFIX`, `API_HOST` (or `HOST`) and `API_PORT` (or `PORT`) environment variables.

Default value of `prefix` is `/`.

### `baseURL`

* Default: `http://[HOST]:[PORT][PREFIX]`

Base URL which is used and prepended to make requests in server side.

Environment variable `API_URL` can be used to **override** `baseURL`.

### `browserBaseURL`

* Default: `baseURL` (or `prefix` when `options.proxy` is enabled)

Base URL which is used and prepended to make requests in client side.

Environment variable `API_URL_BROWSER` can be used to **override** `browserBaseURL`.

### `https`

* Default: `false`

If set to `true`, `http://` in both `baseURL` and `browserBaseURL` will be changed into `https://`.

### `progress`

* Default: `true`

Integrate with Nuxt.js progress bar to show a loading bar while making requests. (Only on browser, when loading bar is available.)

### `proxy`

* Default: `false`

You can easily integrate Axios with [Proxy Module](https://github.com/nuxt-community/proxy-module) and is much recommended to prevent CORS and deployment problems.

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

**Note:** `/api/` will be added to all requests to the API end point. If you need to remove it use `pathRewrite`:

```js
proxy: {
  '/api/': { target: 'http://api.example.com', pathRewrite: {'^/api/': ''} }
}
```

### `retry`

* Default: `false`

 Automatically intercept failed requests and retries them whenever posible using [axios-retry](https://github.com/softonic/axios-retry).

By default, number of retries will be **3 times**, if `retry` value is set to `true`. You can change it by passing an object like this:

```js
axios: {
  retry: { retries: 3 }
}
```

### `credentials`

* Default: `false`

Adds an interceptor to automatically set `withCredentials` config of axios when requesting to `baseUrl`
which allows passing authentication headers to backend.

### `debug`

* Default: `false`

Adds interceptors to log request and responses.

### `proxyHeaders`

* Default: `true`

In SSR context, sets client request header as axios default request headers.
This is useful for making requests which need cookie based auth on server side.
Also helps making consistent requests in both SSR and Client Side code.

> **NOTE:** If directing requests at a url protected by CloudFlare's CDN you should set this to false to prevent CloudFlare from mistakenly detecting a reverse proxy loop and returning a 403 error.

### `proxyHeadersIgnore`

* Default `['host', 'accept']`

Only efficient when `proxyHeaders` is set to true. Removes unwanted request headers to the API backend in SSR.

## License

[MIT License](./LICENSE) - Copyright (c) 2017 Nuxt Community
