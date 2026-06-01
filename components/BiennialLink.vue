<template>
  <nav>
    <nuxt-link
      v-for="(b, i) in biennials"
      :key="b.slug"
      :to="'/focus-theme/' + b.slug"
      v-html="b.title"
      class="center caps fs--regular btn--full btn--biennial"
    ></nuxt-link>
  </nav>
</template>

<script>
export default {
  props: {
    biennials: Array,
  },
};
</script>
