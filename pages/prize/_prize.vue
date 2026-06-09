<template>
  <main></main>
</template>

<script>
export default {
  async asyncData({ redirect, params }) {
    return redirect(`/prize/${params.prize}`);
  },
};
</script>
