export default defineNuxtConfig({
  css: ["@/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "https://fastapi-backend-d5cy.onrender.com",
    },
  },

  devtools: { enabled: true },
  compatibilityDate: "2025-02-16",
  
});