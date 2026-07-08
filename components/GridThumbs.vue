<template>
  <section class="mt--1">
    <div class="stagger-items" :class="{ 'stagger-items--visible': visible }">
      <div ref="observeTarget" class="stagger-sentinel" aria-hidden="true" />
      <div class="grid">
        <component
          v-for="(post, i) in posts"
          v-if="$Check(post) && ((!showAll && i < 8) || showAll)"
          :key="post.__typename + '__' + i"
          class="stagger-item col col--tile mb--2"
          :class="colWidth"
          :style="{ '--stagger': i * 0.06 + 's' }"
          :is="postType(post.__typename)"
          :event="post"
          :exhibition="post"
          :announcement="post"
          :network="post"
          :pub="post"
        />
      </div>
    </div>

    <div
      v-if="!showAll"
      class="section_inset mb--2 mt--1 fs--regular center caps"
      @click="showAll = true"
    >
      <button class="btn--full">View All</button>
    </div>
  </section>
</template>

<script>
import { createIntersectionObserverMixin } from "@/mixins/intersectionObserver";

export default {
  mixins: [
    createIntersectionObserverMixin({ ref: "observeTarget", key: "visible" }),
  ],
  props: {
    size: String,
    posts: Array,
    enableShowAll: Boolean,
  },
  data() {
    return {
      showAll: true,
    };
  },
  created() {
    if (this.enableShowAll) {
      this.showAll = false;
    }
  },
  watch: {
    posts() {
      if (!this.visible) {
        this.$observeWhenVisible();
      }
    },
  },
  computed: {
    colWidth() {
      if (this.size == "Half") {
        return "col--1_2 mcol--full thumb_half";
      } else if (this.size == "Quarter") {
        return "col--1_4 mcol--1_2 mcol--tile thumb_quarter";
      } else if (this.size == "Sixth" || this.size == "Eighth") {
        return "col--1_6 mcol--1_2 mcol--tile thumb_sixth";
      } else if (this.size == "Full") {
        return "col--full mcol--1_2 mcol--tile";
      }
    },
    postType: (state) => (type) => {
      if (type == "Event") {
        return "ThumbEvent";
      } else if (type == "Exhibition") {
        return "ThumbExhibition";
      } else if (type == "Publication") {
        return "ThumbPublication";
      } else if (type == "Announcement") {
        return "ThumbAnnouncement";
      } else if (type == "Network") {
        return "ThumbNetwork";
      }
    },
  },
};
</script>

<style>
@media screen and (any-hover) {
  .thumb img {
    transition: filter 0.1s ease-in-out;
  }
  .thumb:hover img {
    filter: grayscale(100%);
  }

  .thumb p,
  .thumb h1,
  .thumb h2,
  .thumb h3,
  .thumb h4,
  .thumb h5 {
    transition: color 0.1s ease-in-out;
  }

  .thumb:hover p,
  .thumb:hover h1,
  .thumb:hover h2,
  .thumb:hover h3,
  .thumb:hover h4:not(.thumb_time),
  .thumb:hover h5 {
    color: var(--lg_text);
  }
}

.thumb img {
  display: block;
  width: 100%;
}

.thumb_time {
  width: calc(100% + var(--margin) + var(--margin) + 1px);
  transform: translateX(calc(-1 * var(--margin) - 1px)) translateY(1px);
  box-sizing: border-box;
}

.thumb_time.current_event {
  color: black;
}

.thumb_time.past_event {
  color: var(--lg_text);
}

.thumb_sixth *:not(.genath) {
  font-family: var(--sans);
  font-size: var(--fs-s);
  line-height: var(--lh-s);
  letter-spacing: var(--ls-s);
}
</style>
