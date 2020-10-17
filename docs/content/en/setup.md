---
title: 'Setup'
description: ''
position: 2
category: 'Getting started'
---


## Install

Add `@nuxtjs/axios` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add @nuxtjs/axios
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install @nuxtjs/axios
  ```

  </code-block>
</code-group>

Then add it to the `modules` section in your `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
  modules: ['@nuxtjs/axios']
}
```

<alert type="success">

That's it! You can now use [$axios](/usage) in your Nuxt app ✨

</alert>

## Configure

Add an `axios` object to your `nuxt.config.js` to configure global options which will be applied to all requests:

```js{}[nuxt.config.js]
export default {
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // proxy: true
  }
}
```

Learn more about [axios's options](/options).

## TypeScript

Add the types to your "types" array in `tsconfig.json` after the `@nuxt/types` (Nuxt 2.9.0+) or `@nuxt/vue-app` entry

```json{}[tsconfig.json]
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
