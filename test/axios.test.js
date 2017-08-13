const { Nuxt, Builder } = require('nuxt')

process.env.NODE_ENV = 'production'

describe('axios module', () => {
    let nuxt

    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
        nuxt = new Nuxt({ srcDir: __dirname + '/fixture', dev: false })
        let builder = new Builder(nuxt)
        builder.webpackStats = false
        await builder.build()
    })

    test('test', () => {
        expect(nuxt.options.dev).toBe(false)
    })
})
