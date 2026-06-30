<template>
  <main class="page pt--8">
    <SiteSubnav :statement="'Events statement'" :pages="pages" />

    <nav class="section_inset mb--2">
      <ul class="ul--inline">
        <li v-for="y in eventsByYear" :key="'yearnav_' + y.year">
          <button
            class="jump_to_link btn--grey mb--1_2 mr--1_2 pr--1_2 pl--1_2 pb--1_8 pt--1_8"
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
      v-for="y in eventsByYear"
      :key="'year_' + y.year"
      :id="'year_' + y.year"
    >
      <h1 class="section_heading title fs--large" v-html="y.year"></h1>
      <GridThumbs :posts="y.events" :size="'Quarter'" />
    </section>
  </main>
</template>

<script>
import {
  attachEventsPostFilters,
  fetchPastEventsPage,
  isPastEvent,
  PastEventsNextQuery,
} from "@/services/Events";
import { groupPostsByYear } from "@/services/Filters";
import filterList from "@/mixins/filterList";

export default {
  mixins: [filterList],
  head() {
    return this.$metatags({ title: "Past Events" });
  },
  data() {
    return {
      additionalEvents: [],
    };
  },
  computed: {
    filterableItems() {
      return [...this.events, ...this.additionalEvents];
    },
    filterTypes() {
      return [
        {
          name: "types",
          title: "Type",
          list: this.eventTypes,
        },
        {
          name: "series",
          title: "Series",
          list: this.series,
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
    eventsByYear() {
      return groupPostsByYear(this.filteredItems).map(({ year, posts }) => ({
        year: year === "Unsorted" ? "—" : year,
        events: posts,
      }));
    },
  },
  mounted() {
    if (this.pageInfo?.hasNextPage) {
      this.fetchMoreEvents(this.pageInfo.endCursor);
    }
  },
  methods: {
    jumpTo(target) {
      this.$scrollToTarget({ t: target });
    },
    async fetchMoreEvents(cursor) {
      try {
        const res = await this.$axios(this.$Req(PastEventsNextQuery(cursor)));
        const { pastEvents } = res.data.data;
        const newEvents = pastEvents.edges
          .map((e) => e.node)
          .filter((event) => isPastEvent(event, this.$moment))
          .map(attachEventsPostFilters);

        this.additionalEvents = this.additionalEvents.concat(newEvents);

        if (pastEvents.pageInfo?.hasNextPage) {
          this.fetchMoreEvents(pastEvents.pageInfo.endCursor);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  async asyncData(ctx) {
    try {
      return await fetchPastEventsPage(ctx);
    } catch (e) {
      return { error: e };
    }
  },
};
</script>
