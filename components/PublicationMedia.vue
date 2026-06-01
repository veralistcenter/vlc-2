<template>
  <section class="publication_media mb--1">
    <PublicationCarousel
      v-if="hasSlides"
      :slides="info.featuredMedia.featuredSlides20220816"
    />

    <div
      class="pub_iframe mb--2"
      v-if="hasIssuu"
      v-html="info.featuredMedia.featIssuuIframe"
    ></div>

    <div class="pub_video_player" v-if="hasVideo">
      <template v-if="youtubeId">
        <client-only>
          <youtube :video-id="youtubeId" ref="youtube"></youtube>
        </client-only>
      </template>
      <template v-else-if="info.featuredMedia.featVideoFile.includes('vimeo')">
        <client-only>
          <vimeo-player
            ref="player"
            :video-id="info.featuredMedia.featVideoFile"
            :options="options"
          />
        </client-only>
      </template>
    </div>

    <div v-if="hasAudio" class="pub_audio_player">
      <MatrixAudioPlayer
        :block="{ audioFile: info.featuredMedia.featAudioFile }"
      />
    </div>

    <figure
      class="pub_header_fig pt--2"
      v-if="$Check(feat) && !hasVideo && !hasIssuu && !hasSlides"
    >
      <img
        :src="feat.sourceUrl"
        :alt="feat.altText"
        :srcset="feat.srcSet"
        sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
      />
      <figcaption
        class="mt--1_2 center fs--small"
        v-html="feat.caption"
      ></figcaption>
    </figure>
  </section>
</template>

<script>
import { getIdFromUrl } from "vue-youtube";

export default {
  props: {
    info: Object,
    feat: Object,
  },
  computed: {
    hasSlides() {
      return this.$CheckA(this.info.featuredMedia.featuredSlides20220816);
    },
    hasVideo() {
      return this.$Check(this.info.featuredMedia.featVideoFile);
    },
    hasIssuu() {
      return this.$Check(this.info.featuredMedia.featIssuuIframe);
    },
    hasAudio() {
      return this.$Check(this.info.featuredMedia.featAudioFile);
    },
  },
  mounted() {
    this.getId();
  },
  methods: {
    getId() {
      if (this.hasVideo) {
        this.youtubeId = getIdFromUrl(this.info.featuredMedia.featVideoFile);
      }
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
.pub_video_player {
  width: 100%;
  margin-top: calc(-1 * var(--return));
}

.pub_video_player iframe {
  position: relative;
  width: 100%;
  max-width: unset;
  display: block;
  margin: 0 auto;
  /*max-height: calc(100vh - (2.5 * var(--margin_x4)));*/
}

.pub_iframe {
  width: 100%;
  height: 80vh;
  margin-top: calc(-1 * var(--return));
}

.pub_audio_player {
  width: 100%;
  height: 20rem;
  position: relative;
}

.pub_audio_player .matrix_audio_player {
  padding-top: 8rem;
}

.pub_header_fig {
  width: calc(100% - (2 * var(--edge)));
  display: block;
  margin: 0 auto;
}

.pub_header_fig img {
  display: block;
  max-width: 100%;
  max-height: 60vh;
  margin: 0 auto;
}
</style>
