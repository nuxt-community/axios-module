# Usage

## Component

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

## Store Actions

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

## `$` Shortcuts

Axios plugin also supports shortcuts with `$` prefixed methods to directly get data:

```js
// Normal usage with axios
let data = (await $axios.get('...')).data

// Fetch Style
let data = await $axios.$get('...')
```

## Cancel token

You can cancel a request using a _cancel token_.

> The axios cancel token API is based on the withdrawn [cancelable promises proposal](https://github.com/tc39/proposal-cancelable-promises).

You can create a cancel token using the `CancelToken.source` factory as shown below:

```js
const source = this.$axios.CancelToken.source()

this.$axios.$get('/user/12345', {
  cancelToken: source.token
}).catch(error => {
  if (this.$axios.isCancel(error)) {
    console.log('Request canceled', error)
  } else {
    // handle error
  }
})

this.$axios.$post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.')
```

You can also create a cancel token by passing an executor function to the `CancelToken` constructor:

```js
const { CancelToken } = this.$axios
let cancel

this.$axios.$get('/user/12345', {
  cancelToken: new CancelToken(c => {
    // An executor function receives a cancel function as a parameter
    cancel = c
  }),
})

// cancel the request
cancel()
```

> Note: you can cancel several requests with the same cancel token.
