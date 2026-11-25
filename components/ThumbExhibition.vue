<template>
  <nuxt-link
    class="thumb exhibition_thumb"
    :to="'/exhibitions/' + exhibition.slug"
  >
    <h1 class="fs--small caps mb--1_2">Exhibition</h1>

    <img
      v-if="
        $Check(exhibition.featImage) &&
        $Check(exhibition.featImage.featuredImage)
      "
      :src="$SourceUrl(exhibition.featImage.featuredImage)"
      :srcset="exhibition.featImage.featuredImage.srcSet"
      :alt="exhibition.featImage.featuredImage.altText"
      sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
    />

    <h2 class="fs--regular mt--1_4" v-html="exhibition.title"></h2>
    <h3
      class="grey_text fs--small mt--1_4"
      v-html="
        $Dated({
          start: exhibition.pageInfo.date,
          end: exhibition.pageInfo.endDate,
        })
      "
    ></h3>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    exhibition: Object,
  },
};
</script>
