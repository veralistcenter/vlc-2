<template>
  <main class="page pt--8">
    <SiteSubnav :pages="pages" />

    <Filters
      :filterTypes="filterTypes"
      :count="filteredItems.length"
      @newFilters="setNewFilters"
    />

    <GridThumbs size="Quarter" :posts="filteredItems" />
  </main>
</template>

<script>
import { fetchPublicationOverviewPage } from "@/services/Publications";
import filterList from "@/mixins/filterList";

export default {
  mixins: [filterList],
  head() {
    return this.$metatags({ title: this.paths[this.paths.length - 1].title });
  },
  computed: {
    filterableItems() {
      return this.publications;
    },
    filterTypes() {
      const types = [
        {
          name: "contributors",
          title: "Contributor",
          list: this.contributors,
        },
        {
          name: "years",
          title: "Year Published",
          list: this.years,
        },
        {
          name: "tags",
          title: "Tag",
          list: this.tags,
        },
        {
          name: "themes",
          title: "Focus Theme",
          list: this.themes,
        },
      ];

      if (this.$CheckA(this.formats)) {
        types.splice(2, 0, {
          name: "formats",
          title: "Format",
          list: this.formats,
        });
      }

      return types;
    },
  },
  async asyncData({ $CheckA, ...ctx }) {
    try {
      const res = await fetchPublicationOverviewPage(ctx, {
        typeSlug: ctx.params.type,
      });

      const page = res.pages.find((p) => p.slug === ctx.params.type);
      const paths = [
        { title: "Home", route: "/" },
        { title: "Publications", route: "/publications" },
      ];

      if ($CheckA(page ? [page] : [])) {
        paths.push({
          title: page.title,
          route: `/publications/type/${ctx.params.type}`,
        });
      }

      return {
        ...res,
        paths,
      };
    } catch (e) {
      return { error: e };
    }
  },
};
</script>
