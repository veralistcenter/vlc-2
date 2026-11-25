<template>
  <section class="matrix_block mt--4 mb--4">
    <h2 class="section_heading fs--large" v-html="block.relatedPagesTitle"></h2>

    <GridThumbs :size="block.relatedPagesSize" :posts="posts" />
  </section>
</template>

<script>
export default {
  props: {
    block: Object,
  },
  computed: {
    posts() {
      if (this.block.__typename.includes("Announcement")) {
        return this.block.relatedAnnouncements;
      } else {
        return this.block.relatedPages;
      }
    },
  },
};
</script>
