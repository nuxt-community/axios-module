export default (req, res) => {
  const reqCookie = (new URLSearchParams(req.headers.cookie || '').get('mycookie') || '').split(';')[0].trim()
  res.end(reqCookie || '')
}
