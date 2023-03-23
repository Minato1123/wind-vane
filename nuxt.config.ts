// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  nitro: {
    storage: {
      db: {
        driver: 'fs',
        base: './.db',
      },
    },
  },
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt',
    // '@nuxtjs/stylelint-module',
    '@nuxtjs/device',
    'nuxt-icon',
  ],
})
