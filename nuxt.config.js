const axios = require("axios");

const Sitemap = `query {

pages(first: 20) {
  edges {
    node {
      slug
    }
  }
}

exhibitions (first: 150, where: {orderby: {order: DESC, field: DATE}}){
  edges {
    node {
      slug
    }
  }
}
events (first: 800, where: {orderby: {order: DESC, field: DATE}}){
  edges {
    node {
      slug
    }
  }
}
publications (first: 150, where: {orderby: {order: DESC, field: DATE}}){
  edges {
    node {
      slug
    }
  }
}
announcements(first: 150, where: {orderby: {order: DESC, field: DATE}}){
  edges {
    node {
      slug
    }
  }
}

themes: biennials(first: 150, where: {orderby: {order: DESC, field: DATE}}){
  edges {
    node {
      slug
    }
  }
}

abouts{
  edges{
    node{
      slug
    }
  }
}

}`;

let meta = [
  { charset: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { hid: "description", name: "description", content: "" },
  { name: "format-detection", content: "telephone=no" },
  { hid: "image", itemprop: "image", content: "/site_image.png" },
  { hid: "twitter-image", name: "twitter:image", content: "/site_image.png" },
  { hid: "og-image", property: "og:image", content: "/site_image.png" },
];

if (process.env.ENVIRONMENT !== "production") {
  // if not production, add search engine crawl disabler
  meta.push({
    hid: "disablecrawl",
    name: "robots",
    content: "noindex",
  });
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Vera List Center",
    htmlAttrs: {
      lang: "en",
    },
    meta: meta,
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  publicRuntimeConfig: {
    wpURL: process.env.WPURL || "http://localhost:8888",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/variables.css",
    "@/assets/reset.css",
    "@/assets/grid.css",
    "@/assets/main.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/check.js",
    "~/plugins/format.js",
    "~/plugins/requests.js",
    "~/plugins/meta.js",
    { src: `~plugins/vimeo-player` },
    { src: `~plugins/youtube-player` },
    { src: "~/plugins/scroll-to.js", mode: "client" },
    { src: "~/plugins/scroll-lock.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/google-gtag",
    "@nuxtjs/sitemap",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  sitemap: {
    hostname: "https://www.veralistcenter.org",
    exclude: ["/announcement", "/biennial-focus"],
    routes() {
      return axios({
        url: `https://admin.veralistcenter.org/graphql`,
        method: "post",
        data: {
          query: Sitemap,
        },
      }).then((results) => {
        if (
          results.data &&
          results.data.data !== undefined &&
          results.data.data !== null
        ) {
          let menu = [];
          const res = results.data.data;

          const pages = res.pages.edges.map((a) => `/${a.node.slug}`);
          const events = res.events.edges.map((a) => `/events/${a.node.slug}`);
          const exhibitions = res.exhibitions.edges.map(
            (is) => `/exhibitions/${is.node.slug}`
          );
          const publications = res.publications.edges.map(
            (is) => `/publications/${is.node.slug}`
          );
          const themes = res.themes.edges.map(
            (is) => `/focus-themes/${is.node.slug}`
          );
          const abouts = res.abouts.edges.map((a) => `/about/${a.node.slug}`);
          const announcements = res.announcements.edges.map(
            (is) => `/announcements/${is.node.slug}`
          );

          return menu
            .concat(pages)
            .concat(events)
            .concat(exhibitions)
            .concat(publications)
            .concat(themes)
            .concat(abouts)
            .concat(announcements);
        }
      });
    },
  },

  router: {
    middleware: "redirects",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ["vue-vimeo-player"],
  },

  "google-gtag": {
    id: "UA-16461853-1",
  },

  moment: {
    defaultTimezone: "America/New_York",
  },

  server: {
    host: "0.0.0.0",
    port: "8080",
  },
};
