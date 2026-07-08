<template>
  <main class="page pt--8">
    <SiteSubnav :pages="pages" />

    <template v-if="$CheckA(current)">
      <h1 class="section_heading genath title mb--1">
        {{
          page.exhibitionPageCurrentSubsections.ongoingExhibitions || "Ongoing"
        }}
      </h1>
      <GridThumbs :posts="current" :size="'Half'" />
    </template>

    <template v-if="$CheckA(upcoming)">
      <h1 class="section_heading genath title mb--1">
        {{
          page.exhibitionPageCurrentSubsections.upcomingExhibitions ||
          "Upcoming"
        }}
      </h1>
      <GridThumbs :posts="upcoming" :size="'Half'" />
    </template>

    <template v-if="$CheckA(recent)">
      <h1 class="section_heading genath title mb--1">
        {{ page.exhibitionPageCurrentSubsections.recently || "Recent" }}
      </h1>
      <GridThumbs
        :posts="recent"
        :size="$CheckA(upcoming) || $CheckA(current) ? 'Quarter' : 'Half'"
      />

      <div class="section_inset mb--2 mt--1 fs--regular caps">
        <NuxtLink to="/exhibitions/past" aria-label="More" class="btn--full">
          View More
        </NuxtLink>
      </div>
    </template>
  </main>
</template>

<script>
import { ExhibitionsPages, RecentExhibitions } from "@/services/Exhibitions.js";

export default {
  head() {
    return this.$metatags({ title: "Exhibitions" });
  },
  computed: {
    current() {
      return this.exhibitions.filter((e) => {
        if (this.$Check(e.pageInfo.endDate)) {
          return this.$moment().isAfter(this.$moment(e.pageInfo.date)) &&
            (this.$moment().isBefore(this.$moment(e.pageInfo.endDate)) ||
              this.$moment(e.pageInfo.endDate).isSame(this.$moment(), "day"))
            ? true
            : false;
        } else {
          return this.$moment(e.pageInfo.date).isSame(this.$moment(), "day")
            ? true
            : false;
        }
      });
    },
    upcoming() {
      return this.exhibitions.filter((e) =>
        this.$moment().isBefore(this.$moment(e.pageInfo.date))
      );
    },
    recent() {
      const c = []
        .concat(this.current)
        .concat(this.upcoming)
        .map((e) => e.slug);
      let remaining = this.exhibitions.filter((e) => !c.includes(e.slug));
      remaining.length = remaining.length > 4 ? 4 : remaining.length;
      return remaining;
    },
  },
  async asyncData({ $axios, $Req, store, redirect }) {
    const query = ExhibitionsPages + RecentExhibitions;

    try {
      const res = await $axios($Req(query));

      const pageList = res.data.data.exhibitionsPages.edges.map((e) => e.node);
      const page = pageList?.find((p) => p.slug === "exhibitions");

      if (page?.exhibitionPageCurrentSubsections?.disableCurrent) {
        return redirect("/exhibitions/past");
      }

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "Exhibitions", route: "/exhibitions" },
        { title: "Current", route: "/exhibitions" },
      ]);

      const pages = page?.exhibitionPageCurrentSubsections?.disableCurrent
        ? []
        : [
            { title: "Current", path: "/exhibitions" },
            { title: "Past", path: "/exhibitions/past" },
          ];

      const exhibitions = res.data.data.recentExhibitions.edges
        .map((e) => e.node)
        .sort((a, b) => {
          const bDate =
            b.pageInfo.date !== null ? b.pageInfo.date : "2000-01-01";
          const aDate =
            a.pageInfo.date !== null ? a.pageInfo.date : "2000-01-01";
          return bDate.localeCompare(aDate);
        });

      return {
        page,
        pages,
        exhibitions,
      };
    } catch (e) {
      return { error: e };
    }
  },
};
</script>
