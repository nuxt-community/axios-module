const { Nuxt, Builder } = require('nuxt')
const { resolve } = require('path')

process.env.NODE_ENV = 'production'

describe('axios module', () => {
  let nuxt

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
    nuxt = new Nuxt({ srcDir: resolve(__dirname, 'fixture'), dev: false })
    let builder = new Builder(nuxt)
    await builder.build()
  })

  test('test', () => {
    expect(nuxt.options.dev).toBe(false)
  })
})
