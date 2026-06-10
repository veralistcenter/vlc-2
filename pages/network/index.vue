<template>
  <main class="page pt--8">
    <SiteSubnav :pages="pages" />

    <NetworkNav :keyprefix="'all_'" :list="list" />

    <nav class="section_inset mb--1">
      <ul class="ul--inline">
        <li
          class="node_item mr--1_2 mb--1_2"
          v-for="(tag, i) in taxonomy"
          :key="'tag_' + tag.slug"
          v-if="(!showAllTags && i < 15) || showAllTags"
          :class="{ active: activeFilters.includes(tag.slug) }"
        >
          <button
            class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2"
            @click="setTag(tag.slug)"
          >
            <span v-html="tag.name"></span>
          </button>
        </li>

        <li
          v-if="!showAllTags"
          class="mr--1_2 mb--1_2"
          @click="showAllTags = true"
        >
          <button class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2">
            View All
          </button>
        </li>
      </ul>
    </nav>

    <section
      class="section_inset"
      v-for="(l, i) in byNames"
      :key="'letter_' + l.letter"
    >
      <h2
        :id="'node_' + l.letter"
        class="caps fs--large mt--1 mb--1"
        v-html="l.letter"
      ></h2>

      <section class="grid grid--sans network_section pb--1">
        <nuxt-link
          v-for="(node, j) in l.nodes"
          :key="l.letter + i + node.slug + j"
          class="fs--regular col col--1_4 mcol--1_2 mcol--tile col--tile mb--1_2"
          :to="'/network/' + node.slug"
        >
          <span class="node_name" v-html="node.title"></span>
        </nuxt-link>
      </section>
    </section>
  </main>
</template>

<script>
import { Network, AdditionalNetwork } from "@/services/Network";

export default {
  head() {
    return this.$metatags({ title: "Network" });
  },
  data() {
    return {
      additional: [],
      list: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "Y",
        "Z",
      ],
    };
  },
  computed: {
    byNames() {
      let nodes = [].concat(this.networks).concat(this.additional);

      if (this.activeFilters.length > 0) {
        nodes = nodes.filter((n) => {
          const tags = n.networkTypes;
          if (this.$CheckA(tags && tags.edges)) {
            const slugs = tags.edges
              .filter((e) => this.$Check(e) && this.$Check(e.node))
              .map((e) => e.node.slug);
            return slugs.some((s) => this.activeFilters.includes(s));
          }
          return false;
        });
      }

      let byNames = [];

      nodes.sort((a, b) => {
        const artistNamesA = a.title.split(" "),
          artistLastNameA = artistNamesA[artistNamesA.length - 1],
          artistAlphaA =
            a.networkInformation.nameToBeAlphabetized !== null &&
            a.networkInformation.nameToBeAlphabetized !== undefined &&
            a.networkInformation.nameToBeAlphabetized !== ""
              ? a.networkInformation.nameToBeAlphabetized
              : artistLastNameA;

        const artistNamesB = b.title.split(" "),
          artistLastNameB = artistNamesB[artistNamesB.length - 1],
          artistAlphaB =
            b.networkInformation.nameToBeAlphabetized !== null &&
            b.networkInformation.nameToBeAlphabetized !== undefined &&
            b.networkInformation.nameToBeAlphabetized !== ""
              ? b.networkInformation.nameToBeAlphabetized
              : artistLastNameB;

        return artistAlphaA.localeCompare(artistAlphaB);
      });

      nodes.forEach((e) => {
        const artistNamesA = e.title.split(" "),
          artistLastNameA = artistNamesA[artistNamesA.length - 1];

        const letter = this.$Check(e.networkInformation.nameToBeAlphabetized)
          ? e.networkInformation.nameToBeAlphabetized[0].toUpperCase()
          : artistLastNameA[0].toUpperCase();
        const iO = byNames.map((y) => y.letter).indexOf(letter);
        if (iO >= 0) {
          byNames[iO].nodes.push(e);
        } else {
          byNames.push({
            letter,
            nodes: [e],
          });
        }
      });

      return byNames;
    },

    activeFilters() {
      const tags = this.$route.query.tags;
      if (this.$Check(tags)) {
        let activeTags = tags.split(",");
        return activeTags;
      } else {
        return [];
      }
    },
  },
  mounted() {
    if (this.pageInfo.hasNextPage) {
      this.fetchMore(this.pageInfo.endCursor);
    }
  },
  methods: {
    setTag(slug) {
      let tags = this.$route.query.tags;
      if (this.$Check(tags)) {
        const existingTags = tags.split(",");
        const i = existingTags.indexOf(slug);
        if (i > -1) {
          // remove tag
          existingTags.splice(i, 1);
          tags = existingTags.join(",");
        } else {
          tags = tags + "," + slug;
        }
      } else {
        tags = slug;
      }
      this.$router.replace({ query: { ...this.$route.query, tags: tags } });
    },
    async fetchMore(cursor) {
      try {
        const res = await this.$axios(this.$Req(AdditionalNetwork(cursor)));

        this.additional = []
          .concat(this.additional)
          .concat(res.data.data.moreNetwork.edges.map((e) => e.node));

        console.log(res.data.data);

        if (res.data.data.moreNetwork.pageInfo.hasNextPage) {
          this.fetchMore(res.data.data.moreNetwork.pageInfo.endCursor);
        } else {
          console.log("no more network");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  async asyncData({ $axios, $Req, store }) {
    try {
      const res = await $axios($Req(Network));

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "Network", route: "/network" },
        { title: "All", route: "/network" },
      ]);

      let pages = [
        { title: "All", path: "/network" },
        { title: "Individuals", path: "/network/individuals" },
        { title: "Organizations", path: "/network/organizations" },
      ];

      const networks = res.data.data.networks.edges
        .map((e) => e.node)
        .sort((a, b) => {
          const artistNamesA = a.title.split(" "),
            artistLastNameA = artistNamesA[artistNamesA.length - 1],
            artistAlphaA =
              a.networkInformation.nameToBeAlphabetized !== null &&
              a.networkInformation.nameToBeAlphabetized !== undefined &&
              a.networkInformation.nameToBeAlphabetized !== ""
                ? a.networkInformation.nameToBeAlphabetized
                : artistLastNameA;

          const artistNamesB = b.title.split(" "),
            artistLastNameB = artistNamesB[artistNamesB.length - 1],
            artistAlphaB =
              b.networkInformation.nameToBeAlphabetized !== null &&
              b.networkInformation.nameToBeAlphabetized !== undefined &&
              b.networkInformation.nameToBeAlphabetized !== ""
                ? b.networkInformation.nameToBeAlphabetized
                : artistLastNameB;

          return artistAlphaA.localeCompare(artistAlphaB);
        });

      const taxonomy = res.data.data.taxonomy.edges.map((e) => e.node);

      return {
        pages,
        networks,
        pageInfo: res.data.data.networks.pageInfo,
        taxonomy,
      };
    } catch (e) {
      return { error: e };
    }
  },
};
</script>

<style>
.network_section {
  border-bottom: var(--border);
}
</style>
