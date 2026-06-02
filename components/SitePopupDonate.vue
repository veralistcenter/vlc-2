<template>
  <div class="site_popup_donate" :class="{ active: showDonate }">
    <div class="site_popup_donate_content pt--1 pl--1 pr--1">
      <h2 class="caps fs--large">Donate to the site</h2>

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

      <div class="mt--1">
        <p>
          The New School’s Vera List Center for Art and Politics is an
          artist-focused forum that imagines and supports politically-engaged
          art, public scholarship, research, and community around the world.
          Named in honor of our founder, Vera’s List is a dynamic group of
          individuals who support the VLC with annual gifts of any amount up to
          $999. Monthly gifts of $5 or $10 make a big difference!
        </p>
      </div>

      <div class="center caps">
        <a
          class="btn--full btn--black"
          target="_blank"
          href="https://www.givecampus.com/campaigns/23255/donations/new?amt=25.00"
        >
          Donate
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const IDLE_TIME = 5000;

export default {
  name: "SitePopupDonate",
  data() {
    return {
      idleTimer: null,
      dismissed: false,
      activityEvents: [
        "mousemove",
        "mousedown",
        "keydown",
        "scroll",
        "touchstart",
      ],
    };
  },
  computed: {
    ...mapGetters({
      showDonate: "getShowDonate",
    }),
  },
  methods: {
    resetIdleTimer() {
      if (this.dismissed) {
        return;
      }

      clearTimeout(this.idleTimer);

      this.idleTimer = setTimeout(() => {
        this.$store.commit("openDonate");
      }, IDLE_TIME);
    },
    setActivityListeners() {
      this.activityEvents.forEach((eventName) => {
        window.addEventListener(eventName, this.resetIdleTimer, {
          passive: true,
        });
      });
    },
    removeActivityListeners() {
      this.activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, this.resetIdleTimer);
      });
    },
    closeDonate() {
      this.dismissed = true;
      clearTimeout(this.idleTimer);
      this.removeActivityListeners();
      this.$store.commit("closeDonate");
    },
  },
  mounted() {
    this.setActivityListeners();
    this.resetIdleTimer();
  },
  beforeDestroy() {
    clearTimeout(this.idleTimer);
    this.removeActivityListeners();
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
