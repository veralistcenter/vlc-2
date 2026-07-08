<template>
  <section class="matrix_block section_inset mt--2 mb--2 no-print">
    <h2
      v-if="$Check(block.title)"
      class="fs--large mb--1"
      v-html="block.title"
    ></h2>

    <ul class="ul--inline">
      <li
        class="node_item mr--1_2 mb--1"
        v-for="(n, i) in block.network"
        :key="'network' + i"
      >
        <nuxt-link
          :to="'/network/' + n.slug"
          class="block caps pb--1_2 pt--1_2 pr--1 pl--1_2"
        >
          <span class="node_indicator">⁕</span>
          <span v-html="n.title"></span>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    block: Object,
  },
};
</script>
