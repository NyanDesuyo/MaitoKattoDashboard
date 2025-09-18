// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  vite: {
    vue: {
      customElement: true,
    },
    vueJsx: {
      mergeProps: true,
    },
  },
});
