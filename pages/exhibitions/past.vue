<template>
  <main class="page pt--8">
    <SiteSubnav :statement="'Exhibitions Statement statement'" :pages="pages" />

    <nav class="section_inset mb--2">
      <ul class="ul--inline">
        <li v-for="y in exhibitionsByYear" :key="'yearnav_' + y.year">
          <button
            class="jump_to_link btn--grey mr--1_2 pr--1_2 pl--1_2 pb--1_8 pt--1_8"
            @click="jumpTo('#year_' + y.year)"
            v-html="y.year"
          ></button>
        </li>
      </ul>
    </nav>

    <Filters
      :filterTypes="filterTypes"
      :count="filteredItems.length"
      @newFilters="setNewFilters"
    />

    <section
      v-for="y in exhibitionsByYear"
      :key="'year_' + y.year"
      :id="'year_' + y.year"
    >
      <h1 class="section_heading title fs--large" v-html="y.year"></h1>
      <GridThumbs :posts="y.exhibitions" :size="'Half'" />
    </section>
  </main>
</template>

<script>
import { fetchPastExhibitionsPage } from "@/services/Exhibitions";
import { groupPostsByYear } from "@/services/Filters";
import filterList from "@/mixins/filterList";

export default {
  mixins: [filterList],
  head() {
    return this.$metatags({ title: "Past Exhibitions" });
  },
  computed: {
    filterableItems() {
      return this.exhibitions;
    },
    filterTypes() {
      return [
        {
          name: "types",
          title: "Type",
          list: this.exhibitionTypes,
        },
        {
          name: "tags",
          title: "Tag",
          list: this.sitewideTags,
        },
        {
          name: "focus",
          title: "Focus Theme",
          list: this.biennialTaxonomies,
        },
      ];
    },
    exhibitionsByYear() {
      return groupPostsByYear(this.filteredItems).map(({ year, posts }) => ({
        year: year === "Unsorted" ? "—" : year,
        exhibitions: posts,
      }));
    },
  },
  methods: {
    jumpTo(target) {
      this.$scrollToTarget({ t: target });
    },
  },
  async asyncData(ctx) {
    try {
      return await fetchPastExhibitionsPage(ctx);
    } catch (e) {
      return { error: e };
    }
  },
};
</script>
