// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  nitro: {
    storage: {
      db: {
        driver: 'memory',
      },
    },
    devStorage: {
      db: {
        driver: 'fs',
        base: './.db',
      },
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@formkit/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs',
    ],
  },
})
