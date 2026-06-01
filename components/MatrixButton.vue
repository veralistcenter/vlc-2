<template>
  <section class="matrix_block mt--4 mb--4 matrix_button">
    <p class="fs--regular center caps">
      <a
        class="btn--full"
        target="_blank"
        :href="
          $Check(block.buttonFile)
            ? block.buttonFile.sourceUrl
            : block.buttonLink
        "
        v-html="block.buttonName"
      ></a>
    </p>
  </section>
</template>

<script>
export default {
  props: {
    block: Object,
  },
};
</script>

<style>
.matrix_button {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: var(--max_width);
}

@media screen and (max-width: 768px) {
  .matrix_button {
    width: calc(100% - var(--margin_x2));
  }
}
</style>
