<template>
  <section class="biennial_list section_inset">
    <BiennialLineItem
      v-for="(b, i) in biennials"
      :key="'biennial_' + i"
      :b="b"
    />
  </section>
</template>

<script>
export default {
  props: {
    biennials: Array,
  },
};
</script>

<style>
.biennial_item {
  border-top: var(--biennial_border);
  border-left: var(--biennial_border);
  border-right: var(--biennial_border);
}

.biennial_item:last-of-type {
  border-bottom: var(--biennial_border);
}

img.biennial_list_img {
  display: block;
  max-width: 100%;
  max-height: 30rem;
}
</style>
