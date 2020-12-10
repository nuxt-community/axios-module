export default (req, res) => {
  const reqValue = (new URLSearchParams(req.headers.cookie || '').get('mycookie') || '').split(';')[0].trim()
  const newValue = Math.round(Math.random() * 1000) + ''
  res.setHeader('Set-Cookie', `mycookie=${newValue}; path=/`)
  res.end(JSON.stringify([reqValue, newValue], null, 2))
}
