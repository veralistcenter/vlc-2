<template>
  <nav class="section_inset mb--1">
    <ul class="ul--inline">
      <li
        class="node_item mr--1_2 mb--1_2"
        v-for="(tag, i) in tags"
        :key="'tag_' + tag.slug"
        v-if="(!showAllTags && i < 15) || showAllTags"
        :class="{ active: activeFilters.includes(tag.slug) }"
      >
        <button
          class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2"
          @click="$emit('toggle-tag', tag.slug)"
        >
          <span v-html="tag.name"></span>
        </button>
      </li>

      <li
        v-if="!showAllTags"
        class="mr--1_2 mb--1_2"
        @click="$emit('show-all-tags')"
      >
        <button class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2">
          View All
        </button>
      </li>
    </ul>

    <ul v-if="childTags.length" class="ul--inline pt--1">
      <li
        class="node_item mr--1_2 mb--1_2"
        v-for="tag in childTags"
        :key="'child_tag_' + tag.slug"
        :class="{ active: activeFilters.includes(tag.slug) }"
      >
        <button
          class="block caps pb--1_2 pt--1_2 pr--1_2 pl--1_2"
          @click="$emit('toggle-tag', tag.slug)"
        >
          <span v-html="tag.name"></span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    tags: Array,
    childTags: Array,
    activeFilters: Array,
    showAllTags: Boolean,
  },
};
</script>
