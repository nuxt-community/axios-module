<template>
  <div>
    <p>SSRCookie: {{ ssrCookie }}</p>
    <p>ClientCookie: {{ clientCookie }}</p>
    <p>SSR proxy pass: {{ clientCookie === ssrCookie }}</p>
  </div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    const [_, ssrCookie] = await app.$axios.$get('/cookie')
    return {
      ssrCookie
    }
  },
  data () {
    return {
      clientCookie: ''
    }
  },
  mounted () {
    this.clientCookie = new URLSearchParams(document.cookie).get('mycookie')
  }
}
</script>
