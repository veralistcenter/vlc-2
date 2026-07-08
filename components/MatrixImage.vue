<template>
  <section class="matrix_block matrix_image" :class="imageSize">
    <figure>
      <img
        :src="block.image.sourceUrl"
        :alt="block.image.altText"
        :srcset="block.image.srcSet"
        sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
      />
      <figcaption
        class="mt--1 fs--small"
        v-if="block.image.caption"
        v-html="block.image.caption"
      ></figcaption>
    </figure>
  </section>
</template>

<script>
export default {
  props: {
    block: Object,
  },
  computed: {
    imageSize() {
      if (this.block.imageSize === "Small") {
        return "img--small";
      } else if (this.block.imageSize === "Large") {
        return "img--large";
      } else if (this.block.imageSize === "Fullbleed") {
        return "img--fullbleed";
      }
    },
  },
};
</script>

<style>
.matrix_image figure {
  padding: 0;
  margin: 0;
}

.matrix_image figure img {
  display: block;
  width: auto;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  max-height: calc(100vh - var(--margin_x4));
}

.matrix_image {
  box-sizing: border-box;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.matrix_image.img--fullbleed {
  width: 100%;
}

.matrix_image.img--large {
  width: calc(100% - (2 * var(--edge)));
}

.matrix_image.img--small {
  width: calc(100% - (2 * var(--edge)));
  max-width: var(--max_width);
}

@media print {
  .matrix_image.img--small {
    max-width: 100%;
  }
}
</style>
