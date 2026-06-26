<template>
  <nav class="section_inset mt--2 mb--2">
    <h2 class="genath g--small mb--1_2">
      Filter by
      <span v-for="(filterType, i) in filterTypes" :key="'filterType_' + i">
        <button
          class="underline"
          :class="{
            grey_text: potential !== filterType.name && potential !== false,
          }"
          @click="setPotential(filterType.name)"
        >
          {{ filterType.title }}</button
        ><template v-if="i === filterTypes.length - 1 - 1">, or </template
        ><template v-else-if="i < filterTypes.length - 1">, </template>
      </span>
    </h2>

    <section class="potential_filters mt--1" v-if="potential">
      <ul class="ul--inline">
        <li
          v-for="(p, i) in visibleList"
          :key="'potential_' + p.slug + '_' + i"
          class="node_item mr--1_2 mb--1_2"
          :class="{ active: condensedFilters.includes(p.slug) }"
        >
          <button
            @click="setFilter(p)"
            class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2"
            v-html="p.name"
          ></button>
        </li>

        <li
          v-if="!showAll && list.length > 15"
          class="mr--1_2 mb--1_2"
          @click="expandList"
        >
          <button class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2">
            View All
          </button>
        </li>
      </ul>
    </section>

    <section class="active_filters mt--1" v-if="$CheckA(filters)">
      <ul class="ul--inline">
        <li class="genath g--small mr--1_2">{{ count }} Results for</li>
        <li
          v-for="(p, i) in filters"
          :key="'active_' + i"
          class="node_item mr--1_2 mb--1_2"
        >
          <button
            @click="setFilter(p)"
            class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2 open"
          >
            <span v-html="p.name"></span>
            <div class="cross_container">
              <div class="cross cross--vert"></div>
              <div class="cross cross--hor"></div>
            </div>
          </button>
        </li>
      </ul>
    </section>
  </nav>
</template>

<script>
export default {
  props: {
    filterTypes: Array,
    count: Number,
  },
  data() {
    return {
      potential: false,
      filters: [],
      showAllByType: {},
    };
  },
  computed: {
    list() {
      const type = this.filterTypes.find((ft) => ft.name === this.potential);
      return type?.list || [];
    },
    showAll() {
      return !!this.showAllByType[this.potential];
    },
    visibleList() {
      if (this.showAll || this.list.length <= 15) {
        return this.list;
      }

      return this.list.slice(0, 15);
    },
    condensedFilters() {
      return [].concat(this.filters).map((f) => f.slug);
    },
  },
  watch: {
    filters(newFilters) {
      this.$emit("newFilters", newFilters);
    },
  },
  methods: {
    setFilter(filter) {
      const i = this.condensedFilters.indexOf(filter.slug);
      if (i > -1) {
        // exists, remove
        this.filters.splice(i, 1);
      } else {
        this.filters.push(filter);
      }
    },
    setPotential(string) {
      this.potential = this.potential === string ? false : string;
    },
    expandList() {
      this.$set(this.showAllByType, this.potential, true);
    },
  },
};
</script>
