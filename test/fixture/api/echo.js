export default async (req, res) => {
  const query = new URL(req.url, 'http://localhost:3000').query
  if (query && query.delay) {
    await sleep(query.delay)
  }

  res.end(JSON.stringify({
    url: req.url,
    method: req.method
  }))
}

function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
