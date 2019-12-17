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

### Create new axios instance based on defaults

If you need to create your own axios instance which based on $axios defaults, you can use `create` method.

```js
export default function ({ $axios, redirect }, inject) {
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
