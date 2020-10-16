[![@nuxtjs/axios](https://axios.nuxtjs.org/preview.png)](https://axios.nuxtjs.org)

# @nuxtjs/axios

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Secure and easy [Axios](https://github.com/axios/axios) integration for [Nuxt](https://nuxtjs.org).

- [✨ &nbsp;Release Notes](https://axios.nuxtjs.org/releases)
- [📖 &nbsp;Documentation](https://axios.nuxtjs.org)

## Features

- Automatically set base URL for client & server side
- Exposes `setToken` function to `$axios` so we can easily and globally set authentication tokens
- Automatically enables `withCredentials` when requesting to base URL
- Proxy request headers in SSR
- Fetch Style requests
- Integrated with Nuxt progress bar
- Integrated with Proxy Module
- Auto retry requests with axios-retry

[📖 &nbsp;Read more](https://axios.nuxtjs.org)

## Contributing

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

[github-actions-ci-src]: https://github.com/nuxt-community/axios-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-community/axios-module/actions?query=workflow%3Aci

[codecov-src]: https://flat.badgen.net/codecov/c/github/nuxt-community/axios-module
[codecov-href]: https://codecov.io/gh/nuxt-community/axios-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/axios.svg
[license-href]: https://npmjs.com/package/@nuxtjs/axios
