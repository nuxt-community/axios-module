function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

module.exports = {
  test_api: {
    path: '/test_api',
    async handler (req, res) {
      const query = new URL(req.url, 'http://localhost:3000').query
      if (query && query.delay) {
        await sleep(query.delay)
      }

      res.end(JSON.stringify({
        url: req.url,
        method: req.method
      }))
    }
  },
  check_req_axios: {
    path: '/check_req_axios',
    handler (req, res) {
      res.end(JSON.stringify({
        hasAxios: req.$axios !== undefined,
        axiosExtended: req.$axios && req.$axios.$get !== undefined
      }))
    }
  }
}
