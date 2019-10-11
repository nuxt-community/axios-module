module.exports = {
  path: '/test_api',
  handler (req, res) {
    res.end(JSON.stringify({
      url: req.url,
      method: req.method
    }))
  }
}
