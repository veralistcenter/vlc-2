import { filterByGroups } from "@/services/Filters";

export default {
  data() {
    return {
      filters: [],
    };
  },
  computed: {
    filteredItems() {
      return filterByGroups(
        this.filterableItems,
        this.filters,
        this.filterTypes
      );
    },
  },
  methods: {
    setNewFilters(filters) {
      this.filters = filters;
    },
  },
};
