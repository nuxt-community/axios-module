---
title: 'Extending axios'
description: 'Learn how to extend the axios module for Nuxt'
position: 5
category: 'API'
---

## Adding interceptors

If you need to customize axios by registering interceptors and changing global config, you have to create a nuxt plugin.

```js{}[nuxt.config.js]
export default {
  plugins: [
    '~/plugins/axios'
  ]
}
```

```js{}[plugins/axios.js]
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

<alert type="info">

Learn more about [$axios's helpers](/helpers).


</alert>

## New axios instance

If you need to create your own axios instance which based on `$axios` defaults, you can use the `create` method.

```js{}[plugins/api.js]
export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })

  // Set baseURL to something different
  api.setBaseURL('https://my_api.com')

  // Inject to context as $api
  inject('api', api)
}
```

Learn about [$axios's helpers](/helpers).
