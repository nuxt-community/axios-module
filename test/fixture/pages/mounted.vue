<template>
  <div>
    Response: {{ res }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      res: ''
    }
  },

  async mounted() {
    // Request with full url becasue we are in JSDom env
    this.res = await this.$axios.$get('http://localhost:3000/test_api/foo/bar')
  }
}
</script>
