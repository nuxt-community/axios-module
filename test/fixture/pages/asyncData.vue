<template>
  <div>
    Response: {{ res }}
  </div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    const res = await app.$axios.$get('echo/foo/bar')
    return {
      res
    }
  }
}
</script>
