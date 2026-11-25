<template>
  <nav class="section_inset mb--2">
    <ul class="ul--inline">
      <li v-for="(y, i) in list" :key="keyprefix + y">
        <button
          class="jump_to_link btn--grey mr--1_2 pr--1_2 pl--1_2 pb--1_8 pt--1_8 mb--1_2"
          @click="jumpTo('#node_' + y)"
          v-html="y"
        ></button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    list: Array,
    keyprefix: String,
  },
  methods: {
    jumpTo(target) {
      this.$scrollToTarget({ t: target });
    },
  },
};
</script>
