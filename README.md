# 📦 Axios Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Dependencies][david-dm-src]][david-dm-href]
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
[npm-version-src]: https://img.shields.io/npm/dt/@nuxtjs/axios.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/axios
[npm-downloads-src]: https://img.shields.io/npm/v/@nuxtjs/axios/latest.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/axios
[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/axios-module.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/axios-module
[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/axios-module.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/axios-module
[david-dm-src]: https://david-dm.org/nuxt-community/axios-module/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/nuxt-community/axios-module
[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
