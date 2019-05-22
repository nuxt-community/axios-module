<template>
  <div>
    <div>session-{{ axiosSessionId }}</div>
    <div>encoding-${{ axiosEncoding }}$</div>
  </div>
</template>

<script>
// This will be intentically shared across requests
let reqCtr = 1

export default {
  computed: {
    axiosSessionId() {
      return this.$axios.defaults.headers.common.sessionId
    },

    axiosEncoding() {
      return this.$axios.defaults.headers.common['accept-encoding']
    }
  },
  fetch({ app, route }) {
    const doLogin = route.query.login !== undefined
    if (doLogin) {
      app.$axios.setHeader('sessionId', reqCtr++)
    }
  }
}
</script>
