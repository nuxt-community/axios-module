<template>
  <div>
    <p>Client proxy pass: {{ proxyWorks }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      proxyWorks: '?'
    }
  },
  async mounted () {
    this.clientCookie = new URLSearchParams(document.cookie).get('mycookie')
    const a = await this.$axios.$get('/cookie')
    const b = await this.$axios.$get('/cookie')
    this.proxyWorks = a[1] === b[0]
  }
}
</script>
