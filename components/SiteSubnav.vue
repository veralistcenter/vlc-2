<template>
  <header class="grid mb--1_2">
    <h1 class="col col--2_3 mcol--full genath title" v-html="statement"></h1>
    <nav class="col col--full">
      <ul class="ul--inline fs--large mt--1">
        <li
          class="subnav_item mr--1_2 mb--1"
          v-for="(p, i) in pages"
          :key="'page_' + i"
        >
          <nuxt-link :to="p.path" class="block pt--1_2 pr--1 pl--1">
            <span v-html="p.title"></span>
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    pages: Array,
  },
  computed: {
    statement() {
      let slug;
      const r = this.$route.name;

      const {
        events,
        exhibitions,
        networks,
        fellowships,
        focus,
        prize,
        about,
        support,
        publications,
        archive,
      } = this.slugs;

      if (events.includes(r)) {
        slug = "events";
      } else if (exhibitions.includes(r)) {
        slug = "exhibitions";
      } else if (networks.includes(r)) {
        slug = "network";
      } else if (fellowships.includes(r)) {
        slug = "fellowships";
      } else if (focus.includes(r)) {
        slug = "focus-theme";
      } else if (prize.includes(r)) {
        slug = "prize";
      } else if (about.includes(r)) {
        slug = "about";
      } else if (support.includes(r)) {
        slug = "support";
      } else if (publications.includes(r)) {
        slug = "publications";
      } else if (archive.includes(r)) {
        slug = "archive";
      } else {
        slug = "";
      }

      const pages = this.settings.pages.edges.map((e) => e.node);
      const thispage = pages.filter((p) => p.slug == slug)[0];

      if (!this.$Check(thispage)) {
        return "Vera List Center";
      }

      return this.$Check(thispage.pageIntroduction.introductionText)
        ? thispage.pageIntroduction.introductionText
        : "Vera List Center";
    },
    ...mapGetters({
      settings: "getSettings",
      slugs: "getSlugs",
    }),
  },
};
</script>

<style>
.subnav_item {
  border: var(--border);
}

.subnav_item a {
  padding-bottom: calc(var(--margin) * 0.75);
}

.subnav_item a.nuxt-link-exact-active {
  color: white;
  background: black;
}
</style>
