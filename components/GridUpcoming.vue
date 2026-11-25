<template>
  <section class="section mt--2" v-if="$CheckA(upcomingEvents)">
    <h1 class="genath title section_heading" v-html="upcoming.title"></h1>
    <GridThumbs :posts="upcomingEvents" :size="size" />
  </section>
</template>

<script>
export default {
  props: {
    upcoming: Object,
    size: String,
    recentPosts: Array,
    upcoming: Object,
  },
  computed: {
    upcomingEvents() {
      const m = this.$moment();

      const isUpcoming = (pageInfo) => {
        return m.isBefore(this.$moment(pageInfo.date), "day") ? true : false;
      };

      let posts = this.$CheckA(this.upcoming.manualAddition)
        ? [].concat(this.upcoming.manualAddition)
        : [];

      if (this.$CheckA(this.upcoming.manualAddition)) {
        return posts;
      }

      return this.recentPosts.filter((e) => isUpcoming(e.pageInfo));
    },
  },
};
</script>
