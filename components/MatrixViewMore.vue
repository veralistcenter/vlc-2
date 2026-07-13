<template>
  <section class="matrix_block mb--4 matrix_view_more no-print">
    <p class="fs--regular center caps">
      <button class="btn--full" @click="viewMore()">
        {{ block.title || "View More" }}
      </button>
    </p>
  </section>
</template>

<script>
export default {
  props: {
    block: Object,
  },
  methods: {
    viewMore() {
      this.$emit("viewMore");
    },
  },
};
</script>

<style>
.matrix_view_more {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: var(--max_width);
}

@media screen and (max-width: 768px) {
  .matrix_view_more {
    width: calc(100% - var(--margin_x2));
  }
}
</style>
