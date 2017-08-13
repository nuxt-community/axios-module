jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
process.env.PORT = process.env.PORT || 5060
process.env.NODE_ENV = 'production'

const { Nuxt, Builder } = require('nuxt')
const axios = require('axios')
const config = require('./fixture/nuxt.config')

const url = path => `http://localhost:${process.env.PORT}${path}`

describe('axios module', () => {
  let nuxt
  let addTemplate

  beforeAll(async () => {
    config.modules.unshift(function () {
      addTemplate = this.addTemplate = jest.fn(this.addTemplate)
    })

    nuxt = new Nuxt(config)
    await new Builder(nuxt).build()
    await nuxt.listen(process.env.PORT)
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('baseURL', () => {
    let call = addTemplate.mock.calls.find(args => args[0].src.includes('plugin.template.js'))
    expect(call).toBeDefined()
    let options = call[0].options
    expect(options.baseURL.toString()).toBe(`http://localhost:${process.env.PORT}/test_api`)
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
})
