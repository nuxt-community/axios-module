const { Nuxt, Builder } = require('nuxt-edge')
const axios = require('axios')
const config = require('./fixture/nuxt.config')

const url = path => `http://localhost:3000${path}`

describe('axios module', () => {
  let nuxt
  let addTemplate

  beforeAll(async () => {
    nuxt = new Nuxt(config)

    // Spy addTemplate
    addTemplate = nuxt.moduleContainer.addTemplate = jest.fn(
      nuxt.moduleContainer.addTemplate
    )

    await new Builder(nuxt).build()
    await nuxt.listen(process.env.PORT)
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('baseURL', () => {
    expect(addTemplate).toBeDefined()
    let call = addTemplate.mock.calls.find(args =>
      args[0].src.includes('plugin.template.js')
    )
    let options = call[0].options
    expect(options.baseURL.toString()).toBe(
      `http://localhost:3000/test_api`
    )
    expect(options.browserBaseURL.toString()).toBe('/test_api')
  })

  test('asyncData', async () => {
    let html = (await axios.get(url('/asyncData'))).data
    expect(html).toContain('foo/bar')
  })

  test('mounted', async () => {
    const window = await nuxt.renderAndGetWindow(url('/mounted'))
    window.onNuxtReady(() => {
      const html = window.document.body.innerHTML
      expect(html).toContain('foo/bar')
    })
  })

  test('init', async () => {
    const window = await nuxt.renderAndGetWindow(url('/mounted'))
    window.onNuxtReady(() => {
      const $axios = window.$nuxt.$axios
      expect($axios.defaults.xsrfHeaderName).toBe('X-CSRF-TOKEN')
    })
  })

  test('ssr', async () => {
    const makeReq = login =>
      axios
        .get(url('/ssr' + (login ? '?login' : '')))
        .then(r => r.data)
        .then(h => /session-[0-9]+/.exec(h))
        .then(m => (m && m[0] ? m[0] : null))

    let a = await makeReq()
    let b = await makeReq(true)
    let c = await makeReq()
    let d = await makeReq(true)

    expect(a).toBeNull()
    expect(b).not.toBeNull()
    expect(c).toBeNull() // Important!
    expect(d).not.toBeNull()
    expect(b).not.toBe(d)
  })
})
