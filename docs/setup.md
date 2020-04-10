
# Setup

## Install

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
module.exports = {
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // proxyHeaders: false
  }
}
```


## TypeScript

Add the types to your "types" array in tsconfig.json after the `@nuxt/types` (Nuxt 2.9.0+) or `@nuxt/vue-app` entry

**tsconfig.json**

```json
{
  "compilerOptions": {
    "types": [
      "@nuxt/types",
      "@nuxtjs/axios"
    ]
  }
}
```
> **Why?**
>
> Because of the way nuxt works the `$axios` property on the context has to be merged into the nuxt `Context` interface via [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html). Adding `@nuxtjs/axios` to your types will import the types from the package and make typescript aware of the additions to the `Context` interface.
