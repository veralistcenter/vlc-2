<template>
  <section class="matrix_video section_inset mt--2 mb--2">
    <figure>
      <template v-if="youtubeId">
        <client-only>
          <youtube :video-id="youtubeId" ref="youtube"></youtube>
        </client-only>
      </template>

      <template v-else-if="block.vimeoUrl.includes('vimeo')">
        <client-only>
          <vimeo-player
            ref="player"
            :video-id="block.vimeoUrl"
            :options="options"
          />
        </client-only>
      </template>

      <figcaption
        class="mt--1_2 fs--small center"
        v-html="block.caption"
      ></figcaption>
    </figure>
  </section>
</template>

<script>
import { getIdFromUrl } from "vue-youtube";

export default {
  props: {
    block: Object,
  },
  mounted() {
    this.getId();
  },
  methods: {
    getId() {
      this.youtubeId = getIdFromUrl(this.block.vimeoUrl);
    },
  },
  data() {
    return {
      youtubeId: null,
      options: {
        background: false,
        responsive: true,
      },
    };
  },
};
</script>

<style>
.matrix_video figure {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: var(--max_width);
}

.matrix_video figure div,
.matrix_video figure iframe {
  position: relative;
  width: 100%;
  max-width: unset;
  display: block;
  margin: 0 auto;
}
</style>
