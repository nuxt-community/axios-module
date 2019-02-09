export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('SPY: ' + config.url)

    $axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'
  })
}
