<template>
  <main class="page pt--8">
    <SiteSubnav :pages="pages" />

    <MatrixBody :matrix="page.bodyField.body" />
  </main>
</template>

<script>
import { AboutPages } from "@/services/About";

export default {
  head() {
    return this.$metatags({ title: this.page.title });
  },
  async asyncData({ $axios, $Req, store, params, $CheckA }) {
    const query = AboutPages;

    try {
      const res = await $axios($Req(query));

      const pageList = res.data.data.aboutPages.edges.map((e) => e.node);
      const pageListReduced = pageList.filter((p) => p.slug == params.about);
      const page = $CheckA(pageListReduced) ? pageListReduced[0] : {};

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "About", route: "/about" },
        { title: page.title, route: `/about/${page.slug}` },
      ]);

      let pages = [].concat(pageList).map((p, i) => {
        return {
          title: p.title,
          path: i === 0 ? "/about" : `/about/${p.slug}`,
        };
      });

      return {
        pages,
        page,
      };
    } catch (e) {
      return { error: e };
    }
  },
};
</script>
