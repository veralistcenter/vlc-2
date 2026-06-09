<template>
  <article class="prize_item">
    <header class="grid grid--margin caps fs--large pt--1 pb--1">
      <h2 class="col col--2_3">
        <button
          class="caps block"
          @click="togglePreview"
          v-html="p.prizeInfo.title || p.title"
        ></button>
      </h2>
      <h3 @click="togglePreview" class="col col--1_3 col--end right point">
        <span v-html="p.prizeInfo.dateRange.startingYear"></span>–<span
          v-html="p.prizeInfo.dateRange.endingYear"
        ></span>
      </h3>
    </header>

    <section
      class="prize_preview grid grid--margin"
      :class="{ open: showPreview }"
    >
      <figure class="col col--1_3 mcol--full pb--1">
        <img
          class="prize_list_img"
          v-if="$Check(p.featImage) && $Check(p.featImage.featuredImage)"
          :src="p.featImage.featuredImage.sourceUrl"
          :srcset="p.featImage.featuredImage.srcSet"
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
          :alt="p.featImage.featuredImage.altText"
          :title="p.featImage.featuredImage.title"
        />
      </figure>
      <aside class="col col--2_3 mcol--full col--end pb--1">
        <section
          class="fs--regular"
          v-html="p.prizeInfo.prizeDescriptionPreview"
        ></section>

        <nuxt-link
          class="fs--regular caps btn--full"
          :to="'/prize/' + p.slug"
          :tab-index="!showPreview ? '-1' : '0'"
        >
          Read More
        </nuxt-link>
      </aside>
    </section>
  </article>
</template>

<script>
export default {
  props: {
    p: Object,
  },
  data() {
    return {
      showPreview: false,
    };
  },
  methods: {
    togglePreview() {
      this.showPreview = !this.showPreview;
    },
  },
};
</script>
