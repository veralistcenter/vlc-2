<template>
  <main class="page pt--7">
    <SingleHeader :post="exhibit" />
    <MatrixBody
      v-if="$CheckA(exhibit.bodyField.body)"
      :matrix="exhibit.bodyField.body"
    />

    <!-- 		<details><pre>{{exhibit}}</pre></details> -->

    <section class="mt--4" v-if="$CheckA(exhibit.related.relatedPages)">
      <h2
        class="fs--large section_heading"
        v-html="exhibit.related.relatedPagesTitle"
      ></h2>

      <GridThumbs
        :size="exhibit.related.relatedPagesSize"
        :posts="exhibit.related.relatedPages"
      />
    </section>
  </main>
</template>

<script>
import { Exhibition } from "@/services/Exhibitions";

export default {
  async asyncData({ $axios, $Req, store, params }) {
    const query = Exhibition(params.exhibit);

    try {
      const res = await $axios($Req(query));

      const exhibit = res.data.data.exhibition;

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "Exhibitions", route: "/exhibitions" },
        { title: exhibit.title, route: "/exhibitions/" + params.exhibit },
      ]);

      return {
        exhibit,
      };
    } catch (e) {
      return { error: e };
    }
  },
};
</script>
