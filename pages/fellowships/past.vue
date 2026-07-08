<template>
  <main class="page pt--8">
    <SiteSubnav :statement="'Statement String'" :pages="pages" />

    <GridThumbs
      size="Quarter"
      :posts="fellowship.fellows.pastFellows.fellows"
    />

    <div class="section_inset mt--2">
      <button aria-label="Back to top" class="btn--grey" @click="scrollToTop()">
        ↑ Back to top
      </button>
    </div>
  </main>
</template>

<script>
import { FellowPages } from "@/services/Fellowships";
import { mapGetters } from "vuex";

export default {
  head() {
    return this.$metatags({ title: "Past Fellowships" });
  },

  computed: {
    fellowship() {
      return this.settings.pages.edges
        .map((e) => e.node)
        .filter((p) => p.slug === "fellowships")[0];
    },
    ...mapGetters({
      settings: "getSettings",
    }),
  },

  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  async asyncData({ $axios, $Req, store }) {
    try {
      const fellowshipsPage = store.state.settings?.pages?.edges
        ?.map((e) => e.node)
        ?.find((p) => p.slug === "fellowships");

      const res = await $axios($Req(FellowPages));

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "Fellowships", route: "/fellowships" },
        { title: "Past", route: "/fellowships/past" },
      ]);

      const pages = fellowshipsPage?.fellows?.currentFellows?.disableCurrent
        ? [{ title: "Past", path: "/fellowships/past" }]
        : [
            { title: "Current", path: "/fellowships" },
            { title: "Past", path: "/fellowships/past" },
          ];

      const fpages = res.data.data.fellowships.edges.map((e) => {
        return { title: e.node.title, path: `/fellowships/${e.node.slug}` };
      });

      return {
        pages: [].concat(pages).concat(fpages),
      };
    } catch (e) {
      return { error: e };
    }
  },
};
</script>
