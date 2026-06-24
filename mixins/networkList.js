import {
  AdditionalNetwork,
  buildNetworkByNames,
  NETWORK_LETTER_LIST,
} from "@/services/Network";

export default {
  data() {
    return {
      additional: [],
      showAllTags: false,
      list: NETWORK_LETTER_LIST,
      networkTypeFilter: null,
    };
  },
  computed: {
    byNames() {
      const nodes = this.networks.concat(this.additional);
      return buildNetworkByNames(nodes, {
        activeFilters: this.activeFilters,
        type: this.networkTypeFilter,
      });
    },
    activeFilters() {
      const tags = this.$route.query.tags;
      return this.$Check(tags) ? tags.split(",") : [];
    },
    rootTags() {
      if (!this.$CheckA(this.taxonomy)) {
        return [];
      }

      return this.taxonomy.filter(
        (tag) => !tag.parentDatabaseId || tag.parentDatabaseId === 0
      );
    },
    activeChildTags() {
      if (!this.$CheckA(this.taxonomy) || !this.activeFilters.length) {
        return [];
      }

      const parentIds = new Set();

      this.taxonomy
        .filter((tag) => this.activeFilters.includes(tag.slug))
        .forEach((tag) => {
          if (tag.databaseId) {
            parentIds.add(tag.databaseId);
          }
          if (tag.parentDatabaseId) {
            parentIds.add(tag.parentDatabaseId);
          }
        });

      if (!parentIds.size) {
        return [];
      }

      return this.taxonomy.filter((tag) => parentIds.has(tag.parentDatabaseId));
    },
  },
  mounted() {
    if (this.pageInfo?.hasNextPage) {
      this.fetchMore(this.pageInfo.endCursor);
    }
  },
  methods: {
    setTag(slug) {
      const existing = this.$Check(this.$route.query.tags)
        ? this.$route.query.tags.split(",")
        : [];
      const i = existing.indexOf(slug);

      if (i > -1) {
        existing.splice(i, 1);
      } else {
        existing.push(slug);
      }

      const query = { ...this.$route.query };
      if (existing.length) {
        query.tags = existing.join(",");
      } else {
        delete query.tags;
      }

      this.$router.replace({ query });
    },
    async fetchMore(cursor) {
      try {
        const res = await this.$axios(this.$Req(AdditionalNetwork(cursor)));
        const { moreNetwork } = res.data.data;

        this.additional = this.additional.concat(
          moreNetwork.edges.map((e) => e.node)
        );

        if (moreNetwork.pageInfo.hasNextPage) {
          this.fetchMore(moreNetwork.pageInfo.endCursor);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
