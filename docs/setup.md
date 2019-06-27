
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
module.exports = {
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // proxyHeaders: false
  }
}
```


### Typescript setup

Create an index.d.ts for your project if you don't have one already and add the following

**index.d.ts**

```ts
import "@nuxtjs/axios"
```
> **Why?**
>
> Because of the way nuxt works the `$axios` property on the context has to be merged into the nuxt `Context` interface via [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html). Importing `@nuxtjs/axios` in a .d.ts file will import the types from the package and make typescript aware of the additions to the `Context` interface.
