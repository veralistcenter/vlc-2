<template>
  <main class="page pt--8">
    <h1 class="genath section_heading title mb--1 prize_heading">
      <span v-html="p.prizeInfo.title || p.title"></span><br />
      <span v-html="p.prizeInfo.dateRange.startingYear"></span>–<span
        v-html="p.prizeInfo.dateRange.endingYear"
      ></span>
    </h1>

    <section class="grid">
      <aside class="col col--1_4 mcol--full">
        <figure>
          <img
            class="prize_img"
            v-if="$Check(p.featImage) && $Check(p.featImage.featuredImage)"
            :src="p.featImage.featuredImage.sourceUrl"
            :srcset="p.featImage.featuredImage.srcSet"
            sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
            :alt="p.featImage.featuredImage.altText"
            :title="p.featImage.featuredImage.title"
          />

          <figcaption
            class="fs--small mt--1_4"
            v-if="$Check(p.featImage.imageCaption)"
            v-html="p.featImage.imageCaption"
          ></figcaption>
          <figcaption
            class="fs--small mt--1_4"
            v-else-if="
              $Check(p.featImage) && $Check(p.featImage.featuredImage.caption)
            "
            v-html="p.featImage.featuredImage.caption"
          ></figcaption>
        </figure>
      </aside>
      <section class="col col--1_2 mcol--full mmt--1">
        <section
          class="fs--regular"
          v-html="p.prizeInfo.fullDescription"
        ></section>

        <ProjectLink
          class="mt--2"
          v-if="$CheckA(p.prizeInfo.associatedProject)"
          :projects="p.prizeInfo.associatedProject"
        />
      </section>
    </section>

    <section
      v-if="$CheckA(taxonomy.networks)"
      class="section_inset mt--2 mb--2 pt--1 pb--1 border--top border--btm"
    >
      <h2 class="fs--large">Network</h2>

      <ul class="ul--inline fs--regular mt--1">
        <li
          class="node_item mr--1_2 mb--1"
          v-for="(n, i) in taxonomy.networks"
          v-if="(!showAllNetworks && i < 15) || showAllNetworks"
          :key="'network' + i"
        >
          <nuxt-link
            :to="'/network/' + n.slug"
            class="block caps pb--1_2 pt--1_2 pr--1 pl--1_2"
          >
            <span class="node_indicator">⁕</span>
            <span v-html="n.title"></span>
          </nuxt-link>
        </li>

        <li
          v-if="!showAllNetworks"
          class="mr--1_2 mb--1_2"
          @click="showAllNetworks = true"
        >
          <button class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2">
            View All
          </button>
        </li>
      </ul>
    </section>

    <section class="mt--1 mb--4">
      <GridThumbs
        :posts="relatedPosts"
        :size="'Quarter'"
        :enable-show-all="true"
      />
    </section>

    <PrizeList :prizes="prizes" />
  </main>
</template>

<script>
import { Prizes } from "@/services/Home";
import { Prize } from "@/services/Prize";

export default {
  head() {
    const description = `${this.p.prizeInfo.dateRange.startingYear}–${this.p.prizeInfo.dateRange.endingYear}`;

    const image =
      this.$Check(this.p.featImage) &&
      this.$Check(this.p.featImage.featuredImage)
        ? this.p.featImage.featuredImage.sourceUrl
        : undefined;

    return this.$metatags({
      title: this.p.title,
      description,
      image,
    });
  },
  data() {
    return {
      showAllNetworks: false,
    };
  },
  computed: {
    relatedPosts() {
      let posts = []
        .concat(this.taxonomy.events)
        .concat(this.taxonomy.exhibitions)
        .concat(this.taxonomy.announcements)
        .concat(this.taxonomy.publications);

      const sortedPosts = posts.sort(
        (a, b) => new Date(b.pageInfo.date) - new Date(a.pageInfo.date)
      );

      return sortedPosts;
    },
    taxonomy() {
      if (this.$Check(this.focus.prizeTaxonomy)) {
        const t = this.focus.prizeTaxonomy;

        return {
          networks: [].concat(t.networks.edges.map((n) => n.node)),
          events: [].concat(t.events.edges.map((n) => n.node)),
          exhibitions: [].concat(t.exhibitions.edges.map((n) => n.node)),
          announcements: [].concat(t.announcements.edges.map((n) => n.node)),
          publications: [].concat(t.publications.edges.map((n) => n.node)),
        };
      } else {
        return {
          networks: [],
          events: [],
          exhibitions: [],
          announcements: [],
          publications: [],
        };
      }
    },
    p() {
      return this.focus.prize;
    },
    prizes() {
      return [].concat(
        this.focus.prizes.edges.reduce((acc, e) => {
          if (e.node.slug !== this.p.slug) {
            return [e.node, ...acc];
          }
          return acc;
        }, [])
      );
    },
  },
  async asyncData({ $axios, $Req, store, params }) {
    const query = Prize(params.prize) + Prizes;

    try {
      const res = await $axios($Req(query));

      const title = res.data.data.prize ? res.data.data.prize.title : "Prize";
      const slug = res.data.data.prize ? res.data.data.prize.slug : "";

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "Prize", route: "/prize" },
        { title: title, route: "/prize/" + slug },
      ]);

      return { focus: res.data.data };
    } catch (e) {
      return { focus: e };
    }
  },
};
</script>

<style>
img.prize_img {
  display: block;
  width: 100%;
}
</style>
