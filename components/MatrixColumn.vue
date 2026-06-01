<template>
  <aside
    class="matrix_related_column"
    :class="{
      left_col: block.columnSide == 'Left',
      right_col: block.columnSide == 'Right',
    }"
  >
    <h3 class="fs--regular mb--1_2" v-html="block.title"></h3>
    <GridThumbs
      style="--fs-g-s: 1.3rem"
      class="grid--sans"
      :posts="block.relatedPages"
      :size="'Full'"
    />
  </aside>
</template>

<script>
export default {
  props: {
    block: Object,
  },
};
</script>

<style>
.matrix_related_column {
  position: absolute;
  width: calc(((100vw - var(--max_width)) / 2) - var(--margin_x4));
}

.matrix_related_column.right_col {
  right: var(--edge);
}

.matrix_related_column.left_col {
  left: var(--edge);
}

@media screen and (max-width: 850px) {
  .matrix_related_column {
    position: relative;

    width: calc(100% - (2 * var(--edge)));
    max-width: var(--max_width);
    margin: 0 auto;
  }
  .matrix_related_column.left_col {
    left: unset;
  }
  .matrix_related_column.right_col {
    right: unset;
  }
}
</style>
