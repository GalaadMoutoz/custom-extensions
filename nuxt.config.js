export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - custom-extensions",
    title: "custom-extensions",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [],
    script: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  router: {
    middleware: [],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/firebase"],

  firebase: {
    config: {
      apiKey: "AIzaSyCr9TgMPEVFA1RicGjcPP9VGQEiEU9fGd8",
      authDomain: "galaad-custom-extensions.firebaseapp.com",
      projectId: "galaad-custom-extensions",
      storageBucket: "galaad-custom-extensions.appspot.com",
      messagingSenderId: "183978647192",
      appId: "1:183978647192:web:5c2dcdae99d189e7fb7aed",
    },
    services: {
      auth: {
        emulatorPort: process.env.NODE_ENV === "development" ? 9099 : undefined,
        emulatorHost: process.env.NODE_ENV === "development" ? "http://localhost" : undefined,
      },
      firestore: {
        emulatorPort: process.env.NODE_ENV === "development" ? 8080 : undefined,
        // ssl: false,
        settings: {
          ignoreUndefinedProperties: true,
        },
      },
      storage: true,
      functions: {
        location: "europe-west1",
        emulatorPort: process.env.NODE_ENV === "development" ? 5001 : undefined,
        emulatorHost: process.env.NODE_ENV === "development" ? "http://localhost" : undefined,
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // babel:{
    //   plugins: [
    //     ['@babel/plugin-proposal-private-methods', { loose: true }],
    //     ['@babel/plugin-proposal-class-properties', { loose: true }],
    //     ['@babel/plugin-proposal-private-property-in-object ', { loose: true }]
    //   ]
    // }
  },
};
