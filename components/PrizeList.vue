<template>
  <section class="prize_list section_inset">
    <PrizeLineItem v-for="(p, i) in sortedPrizes" :key="'prize_' + i" :p="p" />
  </section>
</template>

<script>
import { sortPrizesByStartingYear } from "@/services/Home";

export default {
  props: {
    prizes: Array,
  },
  computed: {
    sortedPrizes() {
      return sortPrizesByStartingYear(this.prizes);
    },
  },
};
</script>

<style>
.prize_item {
  border-top: var(--biennial_border);
  border-left: var(--biennial_border);
  border-right: var(--biennial_border);
}

.prize_item:last-of-type {
  border-bottom: var(--biennial_border);
}

img.prize_list_img {
  display: block;
  max-width: 100%;
  max-height: 30rem;
}
</style>
