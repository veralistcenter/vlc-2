<template>
  <section class="matrix_list section_inset mt--2 mb--1_2">
    <h2
      class="matrix_list_heading caps fs--large mt--1 mb--1"
      v-html="block.title"
    ></h2>

    <section class="matrix_list_grid grid grid--sans pb--1">
      <div
        v-for="(item, i) in block.item"
        :key="i"
        class="fs--regular col col--1_3 mcol--1_2 mcol--tile col--tile mb--1_2"
      >
        <span v-html="item.text"></span>
      </div>
    </section>
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
.matrix_list + .matrix_list {
  margin-top: 0;
}

.matrix_list_heading,
.matrix_list_grid {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--max_width);
}

@media print {
  .matrix_list_heading,
  .matrix_list_grid {
    max-width: 100%;
  }
}
</style>
