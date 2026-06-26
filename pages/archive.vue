<template>
  <main class="page pt--8">
    <nav class="section_inset">
      <h2 class="fs--regular caps grey_text mb--1">
        <button :class="{ active: sortByYear }" @click="sortByYear = true">
          Chronological
        </button>
        /
        <button :class="{ active: !sortByYear }" @click="sortByYear = false">
          Alphabetical
        </button>
      </h2>

      <ul v-if="sortByYear" class="ul--inline">
        <li v-for="y in yearNav" :key="'yearnav_' + y.year">
          <button
            class="jump_to_link btn--grey mb--1_2 mr--1_2 pr--1_2 pl--1_2 pb--1_8 pt--1_8 fs--small"
            @click="jumpTo('#year_' + y.year)"
            v-html="y.year"
          ></button>
        </li>
      </ul>

      <ul v-else class="ul--inline">
        <li v-for="group in byLetter" :key="'letternav_' + group.letter">
          <button
            class="jump_to_link btn--grey mb--1_2 mr--1_2 pr--1_2 pl--1_2 pb--1_8 pt--1_8 fs--small"
            @click="jumpTo('#letter_' + group.letter)"
            v-html="group.letter"
          ></button>
        </li>
      </ul>
    </nav>

    <Filters
      :filterTypes="filterTypes"
      :count="filteredPosts.length"
      @newFilters="setNewFilters"
    />

    <section>
      <section
        v-if="sortByYear"
        class="section_inset"
        v-for="(year, i) in byYear"
        :key="'year_' + i + '_' + year.year"
      >
        <h2
          :id="'year_' + year.year"
          class="archive_section caps fs--large mt--1 pt--1 mb--1"
          v-html="year.year === 'Unsorted' ? '—' : year.year"
        ></h2>

        <section class="grid grid--sans pb--1">
          <nuxt-link
            v-for="(node, j) in year.posts"
            :key="year.year + '_' + i + node.slug + j"
            class="fs--regular col col--1_4 mcol--1_2 mcol--tile col--tile mb--1_2"
            :to="'/' + postPath(node.__typename) + '/' + node.slug"
          >
            <span class="node_name" v-html="node.title"></span>
          </nuxt-link>
        </section>
      </section>

      <section
        v-if="!sortByYear"
        class="section_inset"
        v-for="(letter, i) in byLetter"
        :key="'letter_' + i + '_' + letter.letter"
      >
        <h2
          :id="'letter_' + letter.letter"
          class="archive_section caps fs--large mt--1 pt--1 mb--1"
          v-html="letter.letter"
        ></h2>
        <section class="grid grid--sans pb--1">
          <nuxt-link
            v-for="(node, j) in letter.posts"
            :key="'l_' + letter.letter + '_' + i + node.slug + j"
            class="fs--regular col col--1_4 mcol--1_2 mcol--tile col--tile mb--1_2"
            :to="'/' + postPath(node.__typename) + '/' + node.slug"
          >
            <span class="node_name" v-html="node.title"></span>
          </nuxt-link>
        </section>
      </section>
    </section>
  </main>
</template>

<script>
import {
  ArchiveMoreEvents,
  attachArchivePostFilters,
  filterArchivePosts,
  fetchArchivePage,
  getArchivePostPath,
  groupPostsByLetter,
  groupPostsByYear,
} from "@/services/Archive";

export default {
  head() {
    return this.$metatags({ title: "Archive" });
  },
  data() {
    return {
      sortByYear: true,
      additionalEvents: [],
      filters: [],
    };
  },
  computed: {
    allPosts() {
      return [
        ...this.events,
        ...this.additionalEvents,
        ...this.publications,
        ...this.exhibitions,
        ...this.announcements,
      ];
    },
    filteredPosts() {
      return filterArchivePosts(this.allPosts, this.filters, this.filterTypes);
    },
    byYear() {
      return groupPostsByYear(this.filteredPosts);
    },
    yearNav() {
      return this.byYear.filter((group) => group.year !== "Unsorted");
    },
    byLetter() {
      return groupPostsByLetter(this.filteredPosts);
    },
    filterTypes() {
      return [
        {
          name: "postTypes",
          title: "Type",
          list: this.postTypes,
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
  },
  mounted() {
    if (this.eventInfo?.hasNextPage) {
      this.fetchMoreEvents(this.eventInfo.endCursor);
    }
  },
  methods: {
    postPath(type) {
      return getArchivePostPath(type);
    },
    jumpTo(target) {
      this.$scrollToTarget({ t: target });
    },
    setNewFilters(filters) {
      this.filters = filters;
    },
    async fetchMoreEvents(cursor) {
      try {
        const res = await this.$axios(this.$Req(ArchiveMoreEvents(cursor)));
        const { events } = res.data.data;
        const newEvents = events.edges.map((e) =>
          attachArchivePostFilters(e.node)
        );

        this.additionalEvents = this.additionalEvents.concat(newEvents);

        if (events.pageInfo?.hasNextPage) {
          this.fetchMoreEvents(events.pageInfo.endCursor);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  async asyncData(ctx) {
    try {
      return await fetchArchivePage(ctx);
    } catch (e) {
      return { error: e };
    }
  },
};
</script>

<style>
.archive_section {
  border-top: var(--border);
}
</style>
