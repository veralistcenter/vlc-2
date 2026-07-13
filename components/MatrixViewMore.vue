<template>
  <section class="matrix_block mb--4 matrix_button no-print">
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
