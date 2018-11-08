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
    async fetch ({app, route}) {
      let doLogin = route.query.login !== undefined
      if (doLogin) {
        app.$axios.setHeader('sessionId', reqCtr++)
      }
    },
    computed: {
      axiosSessionId () {
        return this.$axios.defaults.headers.common.sessionId
      },
      axiosEncoding () {
        return this.$axios.defaults.headers.common['Accept-Encoding']
      }
    }
  }
</script>
