<template>
  <div>session-{{ axiosSessionId }}</div>
</template>

<script>
// This will be intentially shared across requests
let reqCtr = 1

export default {
  async fetch ({ app, route }) {
    let doLogin = route.query.login !== undefined
    if (doLogin) {
      app.$axios.setHeader('sessionId', reqCtr++)
    }
  },
  computed: {
    axiosSessionId () {
      return this.$axios.defaults.headers.common.sessionId
    }
  }
}
</script>