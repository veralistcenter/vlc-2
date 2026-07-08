<template>
  <div class="site_popup_donate no-print" :class="{ active: showDonate }">
    <div class="site_popup_donate_content pt--1 pl--1 pr--1">
      <h2 class="caps fs--large">
        {{ donationPopup?.title || "Donate to the site" }}
      </h2>

      <button
        aria-label="Close donation popup"
        tabindex="1"
        class="site_popup_donate_cross_container cross_container"
        @click="closeDonate()"
      >
        <div
          class="site_popup_donate_cross cross cross--black cross--vert"
        ></div>
        <div
          class="site_popup_donate_cross cross cross--black cross--hor"
        ></div>
      </button>

      <div v-if="$Check(donationPopup.text)" class="mt--1">
        <div v-html="donationPopup.text"></div>
      </div>

      <div class="center caps">
        <a
          class="btn--full btn--black"
          target="_blank"
          href="https://www.givecampus.com/campaigns/23255/donations/new?amt=25.00"
          @click="closeDonate()"
        >
          Donate
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const DONATE_DISMISS_COOKIE = "vlc_donate_popup_dismissed";
const DONATE_DISMISS_MAX_AGE = 60 * 60 * 24 * 7;

export default {
  name: "SitePopupDonate",
  computed: {
    donationPopup() {
      return this.settings?.acfOptions?.donationsPopup;
    },
    ...mapGetters({
      settings: "getSettings",
      showDonate: "getShowDonate",
    }),
  },
  methods: {
    closeDonate() {
      this.$cookies.set(DONATE_DISMISS_COOKIE, "1", {
        maxAge: DONATE_DISMISS_MAX_AGE,
        path: "/",
      });
      this.$store.commit("closeDonate");
    },
  },
  mounted() {
    if (!this.$cookies.get(DONATE_DISMISS_COOKIE)) {
      this.$store.commit("openDonate");
    }
  },
};
</script>

<style>
.site_popup_donate {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(50% - var(--edge) - var(--margin) / 2);
  height: auto;
  color: white;
  background-color: black;
  z-index: 101;
  transition: opacity 0.2s ease-in, visibility 0.2s ease-in;
  opacity: 0;
  visibility: hidden;
}

@media screen and (max-width: 768px) {
  .site_popup_donate {
    width: calc(100% - var(--edge) * 2);
  }
}

.site_popup_donate.active {
  opacity: 1;
  visibility: visible;
}

.site_popup_donate_cross_container {
  position: absolute;
  top: var(--margin);
  right: var(--margin);
  width: var(--margin_x2);
  height: var(--margin_x2);
}

.site_popup_donate_cross.cross--vert {
  height: var(--margin_x2);
  margin-left: var(--margin);
}

.site_popup_donate_cross.cross--hor {
  width: var(--margin_x2);
  transform: translateY(calc(-1 * var(--margin) - 0.5px));
}

@media screen and (max-width: 768px) {
  .site_popup_donate_cross_container {
    width: 1.5rem;
    height: 1.5rem;
  }

  .site_popup_donate_cross.cross--vert {
    height: 1.5rem;
    margin-left: 0.75rem;
  }

  .site_popup_donate_cross.cross--hor {
    width: 1.5rem;
    transform: translateY(calc(-1 * 0.75rem - 0.5px));
  }
}
</style>
