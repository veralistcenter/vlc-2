<template>
  <main class="page pt--7">
    <NetworkHeader :single="single" />

    <template
      v-if="single.networkInformation.externalLink.networkRelatedPages !== true"
    >
      <MatrixBody
        class="mb--4"
        v-if="single.pageFormat.pageLength && $CheckA(single.pageFormat.body)"
        :matrix="single.pageFormat.body"
      />
      <section
        v-if="!single.pageFormat.pageLength"
        class="short_body richtext fs--regular"
        v-html="single.pageFormat.shortBody"
      ></section>
    </template>

    <section class="mt--2" v-if="$CheckA(single.related.relatedPages)">
      <h2
        class="fs--large section_heading"
        v-html="single.related.relatedPagesTitle"
      ></h2>
      <GridThumbs
        :size="single.related.relatedPagesSize"
        :posts="single.related.relatedPages"
      />
    </section>

    <NetworkList
      :network="{}"
      interiorTitle="Network"
      :networkNodes="networks"
    />
  </main>
</template>

<script>
import { Item, Network100 } from "@/services/Network";

export default {
  mounted() {
    if (this.single.networkInformation.externalLink.makeExternalLink === true) {
      this.$nextTick(() => {
        window.location.replace(
          this.single.networkInformation.externalLink.externalLinkUrl
        );
      });
    }
  },

  async asyncData({ $axios, $Req, store, params }) {
    const query = Item(params.node) + " " + Network100;

    try {
      const res = await $axios($Req(query));

      const single = res.data.data.network;
      const networks = res.data.data.networks.edges.map((n) => n.node);

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "Network", route: "/network" },
        { title: single.title, route: "/network/" + params.node },
      ]);

      return {
        single,
        networks,
      };
    } catch (e) {
      return { error: e };
    }
  },
};
</script>
