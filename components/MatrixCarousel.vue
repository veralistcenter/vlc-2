<template>
  <section class="matrix_carousel mt--4 mb--4">
    <vueper-slides
      ref="myVueperSlides"
      class="no-shadow"
      :bullets="false"
      :arrows="false"
      :touchable="false"
      :transitionSpeed="300"
      :fixedHeight="true"
      @slide="changeActive"
    >
      <vueper-slide v-for="(s, i) in block.slide" :key="i">
        <template #content>
          <div class="matrix_slide pt--1">
            <section class="matrix_carousel_image">
              <img
                v-if="$Check(s) && $Check(s.image)"
                :src="s.image.sourceUrl"
                :alt="s.image.altText"
                :srcset="s.image.srcSet"
                sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
              />
              <MatrixCarouselVideo
                v-else-if="$Check(s.video)"
                :video="s.video"
              />
              <MatrixAudioPlayer
                v-else-if="
                  $Check(s.audioFile) && $Check(s.audioFile.mediaItemUrl)
                "
                :block="s"
              />
            </section>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>

    <button
      @click="$refs.myVueperSlides.previous()"
      class="mc_nav_buttons mc_nav_previous"
    >
      <img src="/previous-inline.svg" />
    </button>

    <button
      @click="$refs.myVueperSlides.next()"
      class="mc_nav_buttons mc_nav_next"
    >
      <img src="/next-inline.svg" />
    </button>

    <footer class="grid mt--1">
      <section class="col col--3_4 mcol--full m_order--2">
        <p
          class="mt--1_2 fs--small"
          v-html="block.slide[activeIndex].caption"
        ></p>
      </section>
      <nav class="col col--1_4 mcol--full m_order--1 right m_left col--end">
        <button
          v-for="(b, i) in block.slide"
          :key="'dot_' + i"
          @click="$refs.myVueperSlides.goToSlide(i)"
          :class="{ filled: i === activeIndex }"
          class="mc_nav_button_dots ml--1_2"
        ></button>
      </nav>
    </footer>
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: { VueperSlides, VueperSlide },
  props: {
    block: Object,
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    changeActive(e) {
      this.activeIndex = e.currentSlide.index;
    },
  },
};
</script>

<style>
.matrix_carousel {
  position: relative;
  --slideshow_height: 46.875vw;
  border-top: var(--border);
}

.matrix_carousel footer {
  border-top: var(--border);
}

.matrix_slide {
  height: var(--slideshow_height);
}

.matrix_carousel_image {
  display: block;
}

.matrix_carousel_image .matrix_audio_player {
  margin-top: 22%;
}

.matrix_carousel_image .matrix_carouse_video > div {
  display: block;
  margin: 0 auto;
  max-width: 80vw;
  height: var(--slideshow_height);
}

.matrix_carousel_image img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: var(--slideshow_height);
}

.mc_nav_button_dots {
  --diameter: calc(var(--margin) * 1.125);
  width: var(--diameter);
  height: var(--diameter);
  margin-top: calc(var(--margin) * 0.4375);
  box-sizing: border-box;
  border: var(--border);
  border-radius: 100%;
}

.mc_nav_button_dots.filled {
  background: black;
}

.mc_nav_buttons {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  height: calc(var(--margin) * 3);
  width: calc(var(--margin) * 3);
  background: white;
  box-sizing: border-box;
  border-top: var(--border);
  border-bottom: var(--border);
}

.mc_nav_previous {
  left: 0;
  border-right: var(--border);
}

.mc_nav_next {
  right: 0;
  border-left: var(--border);
}

.mc_nav_buttons img {
  display: block;
  height: calc(var(--margin) * 2);
  margin: 0 auto;
}

.matrix_carousel_nav {
  position: absolute;
  z-index: 10;
  top: 50%;
  right: var(--margin);
  width: calc(40% - (var(--margin) * 2));
  height: calc(var(--margin) * 2);
}

.matrix_carousel .vueperslides,
.matrix_carousel .vueperslide,
.matrix_carousel .vueperslides__track,
.matrix_carousel .vueperslides__track-inner {
  height: var(--slideshow_height);
}
.matrix_carousel .vueperslides--fixed-height {
  height: var(--slideshow_height);
}
</style>
