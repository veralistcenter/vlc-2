<template>
  <main class="page pt--8">
    <SiteSubnav :pages="[]" />
    <MatrixBody
      v-if="$Check(prize) && $Check(prize.bodyField)"
      :matrix="prize.bodyField.body"
    />
    <PrizeList class="mt--4" :prizes="prizes" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { Prizes } from "@/services/Home";

export default {
  head() {
    return this.$metatags({ title: "Prize" });
  },
  computed: {
    prize() {
      return this.settings.pages.edges
        .map((e) => e.node)
        .filter((p) => p.slug == "prize")[0];
    },
    prizes() {
      return []
        .concat(this.focus.prizes.edges.map((e) => e.node))
        .sort((a, b) => {
          const aY = a.prizeInfo.dateRange.startingYear;
          const bY = b.prizeInfo.dateRange.startingYear;

          return parseInt(bY) - parseInt(aY);
        });
    },
    ...mapGetters({
      settings: "getSettings",
    }),
  },
  async asyncData({ $axios, $Req, store }) {
    const query = Prizes;

    try {
      const res = await $axios($Req(query));

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "Prize", route: "/prize" },
      ]);

      return { focus: res.data.data };
    } catch (e) {
      return { focus: e };
    }
  },
};
</script>
