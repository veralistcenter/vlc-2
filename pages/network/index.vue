<template>
  <main class="page pt--8">
    <SiteSubnav :pages="pages" />

    <NetworkNav :keyprefix="'all_'" :list="list" />

    <NetworkTagNav
      :tags="rootTags"
      :child-tags="activeChildTags"
      :active-filters="activeFilters"
      :show-all-tags="showAllTags"
      @toggle-tag="setTag"
      @show-all-tags="showAllTags = true"
    />

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
          class="fs--regular col col--1_5 mcol--1_2 mcol--tile col--tile mb--1_2"
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
