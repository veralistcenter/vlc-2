let meta = [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { hid: 'description', name: 'description', content: '' },
  { name: 'format-detection', content: 'telephone=no' },
  { hid: 'image', itemprop: 'image', content: '/site_image.png' },
  { hid: 'twitter-image', name: 'twitter:image', content: '/site_image.png' },
  { hid: 'og-image', property: 'og:image', content: '/site_image.png' }
]

if(process.env.ENVIRONMENT !== 'production'){
  // if not production, add search engine crawl disabler
  meta.push(
    {
      hid: 'disablecrawl',
      name: 'robots',
      content: 'noindex'
    }
  )
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Vera List Center',
    htmlAttrs: {
      lang: 'en'
    },
    meta: meta,
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  publicRuntimeConfig: {
    wpURL: process.env.WPURL || 'http://localhost:8888'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/variables.css',
    '@/assets/reset.css',
    '@/assets/grid.css',
    '@/assets/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/check.js',
    '~/plugins/format.js',
    '~/plugins/requests.js',
    '~/plugins/meta.js',
    { src: `~plugins/vimeo-player` },
    { src: '~/plugins/scroll-to.js', mode: 'client' },
    { src: '~/plugins/scroll-lock.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/google-gtag'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: [
      'vue-vimeo-player'
    ],
  },

  'google-gtag': {
    id: 'UA-16461853-1'
  },

  moment: {
    defaultTimezone: 'America/New_York'
  },
}
