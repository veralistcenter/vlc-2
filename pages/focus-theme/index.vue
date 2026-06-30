<template>
  <main class="page pt--8">
    <SiteSubnav :pages="[]" />

    <BiennialList :biennials="biennials" />
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
  computed: {
    biennials() {
      return []
        .concat(this.focus.biennials.edges.map((e) => e.node))
        .sort((a, b) => {
          const aY = a.biennialInfo.dateRange.startingYear;
          const bY = b.biennialInfo.dateRange.startingYear;

          return parseInt(bY) - parseInt(aY);
        });
    },
  },
  async asyncData({ $axios, $Req, store }) {
    const query = Biennials;

    try {
      const res = await $axios($Req(query));

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "Focus Theme", route: "/focus-theme" },
      ]);

      let biennials = res.data.data.biennials.edges.map((e) => {
        let biennial = e.node;

        return biennial;
      });

      return {
        biennials,
      };
    } catch (e) {
      console.error("error", e);
      return { focus: e };
    }
  },
};
</script>
