// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'nuxt-headlessui',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vee-validate/nuxt'
  ],
  ssr: false,
})