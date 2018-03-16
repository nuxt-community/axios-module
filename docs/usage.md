## Usage

### Component

**`asyncData`**

```js
async asyncData({ app }) {
  const ip = await app.$axios.get('http://icanhazip.com')
  return { ip }
}
```

**`methods`/`created`/`mounted`/etc**

```js
methods: {
  async fetchSomething() {
    const ip = await this.$axios.get('http://icanhazip.com')
    this.ip = ip
  }
}
```

### Store `nuxtServerInit`

```js
async nuxtServerInit ({ commit }, { app }) {
  const ip = await app.$axios.get('http://icanhazip.com')
  commit('SET_IP', ip)
}
```

### Store actions

```js
// In store
{
  actions: {
    async getIP ({ commit }) {
      const ip = await this.$axios.get('http://icanhazip.com')
      commit('SET_IP', ip)
    }
  }
}
```
