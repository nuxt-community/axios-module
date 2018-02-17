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
