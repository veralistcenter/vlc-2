<template>
  <main class="page pt--8">
    <SiteSubnav :pages="[]" />

    <BiennialFilters
      :prizes="prizes"
      :tags="tags"
      @newFilters="setNewFilters"
      :count="filteredBiennials.length"
    />

    <BiennialList :biennials="filteredBiennials" />
  </main>
</template>

<script>
import { Biennials } from "@/services/Home";

export default {
  head() {
    return this.$metatags({ title: "Focus Theme" });
  },
  data() {
    return {
      filters: [],
    };
  },
  methods: {
    setNewFilters(filters) {
      this.filters = filters;
    },
  },
  // computed: {
  //   biennials() {
  //     return []
  //       .concat(this.focus.biennials.edges.map((e) => e.node))
  //       .sort((a, b) => {
  //         const aY = a.biennialInfo.dateRange.startingYear;
  //         const bY = b.biennialInfo.dateRange.startingYear;

  //         return parseInt(bY) - parseInt(aY);
  //       });
  //   },
  // },
  computed: {
    filteredBiennials() {
      if (this.$CheckA(this.filters)) {
        const filters = this.filters;
        return [].concat(this.biennials).filter((p) => {
          const contains = filters.some((f) => {
            return p.filters.includes(f.slug);
          });
          return contains;
        });
      } else {
        return this.biennials;
      }
    },
  },
  async asyncData({ $axios, $Req, store, $CheckA }) {
    const query = Biennials;

    try {
      const res = await $axios($Req(query));

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "Focus Theme", route: "/focus-theme" },
      ]);

      let biennials = res.data.data.biennials.edges.map((e) => {
        let biennial = e.node;

        const prizes = biennial.prizeTaxonomies.edges.map((ee) => ee.node.slug);

        const tags = $CheckA(biennial.sitewideTags.edges)
          ? biennial.sitewideTags.edges.map((ee) => ee.node.slug)
          : [];

        console.log("tags", tags);

        biennial.filters = [].concat(prizes).concat(tags);
        return biennial;
      });

      let prizes = [],
        tags = [];

      const constructArray = (biennials, focus) => {
        let filters = [];
        biennials.forEach((biennial) => {
          const f = $CheckA(biennial[focus].edges)
            ? biennial[focus].edges.map((e) => e.node)
            : [];
          filters = [].concat(filters).concat(f);
        });
        const ids = filters.map((o) => o.slug);
        const filtered = filters.filter(
          ({ slug }, index) => ids.indexOf(slug) === index
        );

        return filtered;
      };

      prizes = constructArray(biennials, "prizeTaxonomies");
      tags = constructArray(biennials, "sitewideTags");

      // console.log("biennials", biennials);

      return {
        biennials,
        prizes,
        tags,
      };
    } catch (e) {
      console.error("error", e);
      return { focus: e };
    }
  },
};
</script>
