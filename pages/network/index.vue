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
        <NetworkNodeLink
          v-for="(node, j) in l.nodes"
          :key="l.letter + i + node.slug + j"
          :node="node"
          class="fs--regular col col--1_4 mcol--1_2 mcol--tile col--tile mb--1_2"
        />
      </section>
    </section>
  </main>
</template>

<script>
import { fetchNetworkListPage } from "@/services/Network";
import networkList from "@/mixins/networkList";

export default {
  mixins: [networkList],
  head() {
    return this.$metatags({ title: "Network" });
  },
  async asyncData(ctx) {
    try {
      return await fetchNetworkListPage(ctx, {
        breadcrumb: { title: "All", route: "/network" },
      });
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
