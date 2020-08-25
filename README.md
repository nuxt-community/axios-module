# 📦 Axios Module


[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Checks][checks-src]][checks-href]
[![Codecov][codecov-src]][codecov-href]
[![Standard JS][standard-js-src]][standard-js-href]

> Secure and Easy <a href="https://github.com/mzabriskie/axios">Axios</a> integration with Nuxt.js

## ✅ Features

✓ Automatically set base URL for client & server side

✓ Exposes `setToken` function to `$axios` so we can easily and globally set authentication tokens

✓ Automatically enables `withCredentials` when requesting to base URL

✓ Proxy request headers in SSR (Useful for auth)

✓ Fetch Style requests

✓ Integrated with Nuxt.js Progressbar while making requests

✓ Integrated with [Proxy Module](https://github.com/nuxt-community/proxy-module)

✓ Auto retry requests with [axios-retry](https://github.com/softonic/axios-retry)

📖 [**Read Documentation**](https://axios.nuxtjs.org)

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## 📑 License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community

<!-- Badges -->
<!-- Badges -->
[npm-version-src]: https://flat.badgen.net/npm/v/@nuxtjs/axios
[npm-version-href]: https://npmjs.com/package/@nuxtjs/axios
[npm-downloads-src]: https://flat.badgen.net/npm/dm/@nuxtjs/axios
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/axios
[checks-src]: https://flat.badgen.net/github/checks/nuxt-community/axios-module/dev
[checks-href]: https://github.com/nuxt-community/axios-module/actions
[codecov-src]: https://flat.badgen.net/codecov/c/github/nuxt-community/axios-module
[codecov-href]: https://codecov.io/gh/nuxt-community/axios-module
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
