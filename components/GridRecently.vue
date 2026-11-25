<template>
  <section class="section mt--2">
    <h1 class="genath title section_heading" v-html="recently.title"></h1>
    <GridThumbs :posts="recentlyEvents" :size="size" />
  </section>
</template>

<script>
export default {
  props: {
    size: String,
    recently: Object,
    recentPosts: Array,
  },
  computed: {
    recentlyEvents() {
      const isRecent = (pageInfo) => {
        if (this.$Check(pageInfo.endDate)) {
          return this.$moment().isAfter(this.$moment(pageInfo.endDate))
            ? true
            : false;
        } else if (this.$Check(pageInfo.date)) {
          return this.$moment().isAfter(this.$moment(pageInfo.date))
            ? true
            : false;
        } else {
          return false;
        }
      };

      let posts = [].concat(
        this.recentPosts
          .filter((e) => isRecent(e.pageInfo))
          .sort((a, b) => {
            const bDate =
              this.$Check(b) && b.pageInfo && this.$Check(b.pageInfo.date)
                ? b.pageInfo.date
                : "2000-01-01";
            const aDate =
              this.$Check(a) && a.pageInfo && this.$Check(a.pageInfo.date)
                ? a.pageInfo.date
                : "2000-01-01";
            return bDate.localeCompare(aDate);
          })
      );
      if (posts.length > 8) {
        posts.length = 8;
      }
      return posts;
    },
  },
};
</script>
