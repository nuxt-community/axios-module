function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

module.exports = {
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
}
