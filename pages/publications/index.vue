<template>
  <main class="page pt--8">
    <SiteSubnav :pages="pages" />

    <!-- featured -->

    <!-- filters -->

    <PublicationFilters
      :formats="formats"
      :contributors="contributors"
      :years="years"
      :themes="themes"
      :tags="tags"
      @newFilters="setNewFilters"
      :count="filteredPublications.length"
    />

    <GridThumbs size="Quarter" :posts="filteredPublications" />
  </main>
</template>

<script>
import { PublicationOverview } from "@/services/Publications";

export default {
  head() {
    return this.$metatags({ title: "Publications" });
  },
  data() {
    return {
      filters: [],
    };
  },
  methods: {
    setNewFilters(filters) {
      this.filters = filters;
    },
  },
  computed: {
    filteredPublications() {
      if (this.$CheckA(this.filters)) {
        const filters = this.filters;
        return [].concat(this.publications).filter((p) => {
          const contains = filters.some((f) => {
            return p.filters.includes(f.slug);
          });
          return contains;
        });
      } else {
        return this.publications;
      }
    },
  },

  async asyncData({ $axios, $Req, store, $Check, $CheckA, $moment }) {
    try {
      const res = await $axios($Req(PublicationOverview));

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "Publications", route: "/publications" },
      ]);

      let pages = [{ title: "All", path: "/publications" }];

      // pages
      const additionaPages = res.data.data.types.edges.map((e) => ({
        title: e.node.name,
        path: "/publications/type/" + e.node.slug,
      }));
      pages = pages.concat(additionaPages);

      let publications = res.data.data.publications.edges.map((e) => {
        let pub = e.node;

        const formats = pub.publicationFormats.edges.map((ee) => ee.node.slug);
        const years = $Check(pub.pageInfo.date)
          ? [$moment(pub.pageInfo.date).format("YYYY")]
          : [];
        const themes = pub.biennialTaxonomies.edges.map((ee) => ee.node.slug);
        const contributors = $CheckA(pub.networkRelation.associatedNetwork)
          ? pub.networkRelation.associatedNetwork.map((n) => n.slug)
          : [];

        const tags = $CheckA(pub.sitewideTags.edges)
          ? pub.sitewideTags.edges.map((ee) => ee.node.slug)
          : [];
        pub.filters = []
          .concat(formats)
          .concat(years)
          .concat(themes)
          .concat(contributors)
          .concat(tags);
        return pub;
      });

      publications = [].concat(publications).sort((a, b) => {
        const bDate =
          $Check(b) && b.pageInfo.date !== null
            ? b.pageInfo.date
            : "1950-01-01";
        const aDate =
          $Check(a) && a.pageInfo.date !== null
            ? a.pageInfo.date
            : "1950-01-01";
        return bDate.valueOf() - aDate.valueOf();
      });

      let formats = [],
        years = [],
        themes = [],
        contributors = [],
        tags = [];

      const constructArray = (pubs, focus, setYearsAndNetwork) => {
        let filters = [];
        pubs.forEach((p) => {
          const f = $CheckA(p[focus].edges)
            ? p[focus].edges.map((e) => e.node)
            : [];
          filters = [].concat(filters).concat(f);

          if (setYearsAndNetwork) {
            if ($Check(p.pageInfo.date)) {
              const y = $moment(p.pageInfo.date).format("YYYY");
              years.push({ name: y, slug: y });
            }

            if ($CheckA(p.networkRelation.associatedNetwork)) {
              const network = p.networkRelation.associatedNetwork.map((n) => ({
                name: n.title,
                nameToBeAlphabetized: n.networkInformation.nameToBeAlphabetized,
                slug: n.slug,
              }));
              contributors = [].concat(contributors).concat(network);
            }
          }
        });
        const ids = filters.map((o) => o.slug);
        const filtered = filters.filter(
          ({ slug }, index) => ids.indexOf(slug) === index
        );

        if (setYearsAndNetwork) {
          const yearIds = years.map((o) => o.slug);
          years = years.filter(
            ({ slug }, index) => yearIds.indexOf(slug) === index
          );

          const contributorIds = contributors.map((o) => o.slug);
          contributors = contributors.filter(
            ({ slug }, index) => contributorIds.indexOf(slug) === index
          );
        }

        return filtered;
      };

      themes = constructArray(publications, "biennialTaxonomies");
      tags = constructArray(publications, "sitewideTags");
      formats = constructArray(publications, "publicationFormats", true);

      years = [].concat(years).sort((a, b) => {
        const bDate = $Check(b) && b.slug !== null ? b.slug : "2000";
        const aDate = $Check(a) && a.slug !== null ? a.slug : "2000";
        return bDate.valueOf() - aDate.valueOf();
      });

      contributors = [].concat(contributors).sort((a, b) => {
        const artistNamesA = a.name.split(" "),
          artistLastNameA = artistNamesA[artistNamesA.length - 1],
          artistAlphaA =
            a.nameToBeAlphabetized !== null &&
            a.nameToBeAlphabetized !== undefined &&
            a.nameToBeAlphabetized !== ""
              ? a.nameToBeAlphabetized
              : artistLastNameA;

        const artistNamesB = b.name.split(" "),
          artistLastNameB = artistNamesB[artistNamesB.length - 1],
          artistAlphaB =
            b.nameToBeAlphabetized !== null &&
            b.nameToBeAlphabetized !== undefined &&
            b.nameToBeAlphabetized !== ""
              ? b.nameToBeAlphabetized
              : artistLastNameB;

        return artistAlphaA.localeCompare(artistAlphaB);
      });

      return {
        pages,
        publications,
        themes,
        tags,
        formats,
        years,
        contributors,
      };
    } catch (e) {
      return { error: e };
    }
  },
};
</script>
