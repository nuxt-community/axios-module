<p align="center">
<img src="https://user-images.githubusercontent.com/5158436/30198986-d4c5d7f8-9485-11e7-9c3e-8b5f5f061f5f.png">
</p>

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

<h1 align="center">Axios</h1>

<p align="center"> Secure and Easy <a href="https://github.com/mzabriskie/axios">Axios</a> integration with Nuxt.js. </p>

[📖 Release Notes](./CHANGELOG.md)

# Table of Contents

* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
  * [Component](#component)
  * [Store](#store-nuxtserverinit)
  * [Store Actions](#store-actions)
* [Options](#options)
  * [Prefix, Host and Port](#prefix-host-and-port)
  * [baseURL](#baseurl)
  * [browserBaseURL](#browserbaseurl)
  * [credentials](#credentials)
  * [debug](#debug)
  * [proxyHeaders](#proxyheaders)
  * [proxyHeadersIgnore](#proxyheadersignore)
  * [disableDefaultErrorHandler](#disabledefaulterrorhandler)
* [Helpers](#helpers)
  * [Fetch Style Requests](#fetch-style-requests)
  * [Set Header](#setheadername-value-scopescommon)
  * [Set Token](#settokentoken-type-scopescommon)
  * [Dynamic API Backend](#dynamic-api-backend)

## Features

* Automatically set base URL for client & server side
* Exposes `setToken` function to `$axios` so we can easily and globally set authentication tokens
* Throws _nuxt-friendly_ errors and optionally redirect on specific error codes
* Automatically enables `withCredentials` when requesting to base URL
* Proxy request headers in SSR (Useful for auth)
* Fetch Style requests

## Setup

Install with yarn:

```bash
>_ yarn add @nuxtjs/axios
```

Install with npm:

```bash
>_ npm install @nuxtjs/axios
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

* Default: `baseURL` (or `prefix` when `options.proxyMode` is `true`)

Base URL which is used and prepended to make requests in client side.

Environment variable `API_URL_BROWSER` can be used to **override** `browserBaseURL`.

### `credentials`

* Default: `false`

Adds an interceptor to automatically set `withCredentials` config of axios when requesting to `baseUrl`
which allows passing authentication headers to backend.

### `debug`

* Default: `false`

Adds interceptors to log all responses and requests

### `proxyHeaders`

* Default: `true`

In SSR context, sets client request header as axios default request headers.
This is useful for making requests which need cookie based auth on server side.
Also helps making consistent requests in both SSR and Client Side code.

> **NOTE:** If directing requests at a url protected by CloudFlare's CDN you should set this to false to prevent CloudFlare from mistakenly detecting a reverse proxy loop and returning a 403 error.

### `proxyHeadersIgnore`

* Default `['host', 'accept']`

Only efficient when `proxyHeaders` is set to true. Removes unwanted request headers to the API backend in SSR.

### `redirectError`

* Default: `{}`

This option is a map from specific error codes to page which they should be redirect.
For example if you want redirecting all `401` errors to `/login` use:

```js
axios: {
  redirectError: {
    401: '/login'
  }
}
```

### `requestInterceptor`

* Default: `null`

Function for manipulating axios requests. Useful for setting custom headers,
for example based on the store state. The second argument is the nuxt context.

```js
requestInterceptor: (config, { store }) => {
  if (store.state.token) {
    config.headers.common['Authorization'] = store.state.token
  }
  return config
}
```

### `disableDefaultErrorHandler`

* Default: `false`

If you want to disable the default error handler for some reason, you can do it so
by setting the option `disableDefaultErrorHandler` to true.

## Helpers

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

## License

[MIT License](./LICENSE) - Copyright (c) 2017 Nuxt Community
