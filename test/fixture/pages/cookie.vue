<template>
  <div>
    <pre style="display: none">_req:{{ reqCookie }}</pre>
    <p>Pass: {{ pass }}</p>
  </div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    const reqCookie = (await app.$axios.$get('/cookie')) + ''
    return {
      reqCookie
    }
  },
  data () {
    return {
      pass: '?'
    }
  },
  async mounted () {
    const randomValue = Math.round(Math.random() * 1000) + ''
    document.cookie = `mycookie=${randomValue}; path=/`

    // Render page with server-side, expecting to be rendered with same new cookie
    const html = await this.$axios.$get(window.location.href)
    const m = html.match(/_req:(\w+)/)
    const profifiedSSRCookie = m && m[1]

    this.pass = randomValue === profifiedSSRCookie
  }
}
</script>
