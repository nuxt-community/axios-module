<template>
  <div>
    Response: {{ res }}
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    let res = await app.$axios.$get('foo/bar')
    return {
      res
    }
  }
}
</script>
