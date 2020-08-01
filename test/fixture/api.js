const url = require('url')

function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

module.exports = {
  path: '/test_api',
  async handler (req, res) {
    const query = url.URL(req.url, true).query
    if (query && query.delay) {
      await sleep(query.delay)
    }

    res.end(JSON.stringify({
      url: req.url,
      method: req.method
    }))
  }
}
