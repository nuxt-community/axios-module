<template>
  <div>
    there should be no loading bar left over:
    <button @click="test">
      Fake Request
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    test () {
      const source = this.$axios.CancelToken.source()
      this.$axios
        .$post(
          'http://localhost:3000/api/echo/foo/bar?delay=1000',
          { data: 'test' },
          {
            cancelToken: source.token
          }
        )
        .catch((err) => {
          if (this.$axios.isCancel(err)) {
            console.log('request canceled')
          }
        })

      setTimeout(function () {
        source.cancel()
      }, 500)
    }
  }
}
</script>
