<template>
  <section class="matrix_block matrix_iframe mt--4 mb--4 no-print">
    <div class="matrix_iframe_inner pt--1 pb--1">
      <div v-if="block.embedCode" v-html="block.embedCode"></div>
    </div>
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
.matrix_iframe {
  border-top: var(--border);
  border-bottom: var(--border);
}

.matrix_iframe_inner {
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - (2 * var(--edge)));
}

.matrix_iframe_inner div {
  aspect-ratio: 16/9;
  position: relative;
}

.matrix_iframe div iframe {
  width: 100%;
  height: 100%;
}
</style>
