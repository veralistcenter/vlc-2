<template>
  <header class="site_header no-print">
    <nav class="menu_header grid grid--sans">
      <button
        @click="showMenu = !showMenu"
        class="menu_toggle"
        :class="{ showing_menu: showMenu }"
      >
        <div class="row row_one"></div>
        <transition>
          <div v-if="!showMenu" class="row row_two"></div>
        </transition>
        <div class="row row_three"></div>
      </button>
      <SearchInput />
      <transition name="fade">
        <nuxt-link v-if="!showMenu" to="/" class="site_header_home_link">
          <img data-device="desktop" src="/tns-vlc-logo-1.svg" />
          <img data-device="mobile" src="/tns-vlc-logo-3.svg" />
        </nuxt-link>
      </transition>

      <button @click="$store.commit('toggleContrast')" class="contrast_toggle">
        <div></div>
      </button>
    </nav>
    <RoutePath />

    <transition name="fade">
      <SiteMenuExpanded v-if="showMenu" />
    </transition>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showMenu: false,
    };
  },
  watch: {
    "$route.path": function (newPath) {
      if (newPath) {
        this.showMenu = false;
      }
    },
  },
  computed: {
    menu() {
      return this.settings.acfOptions.menu;
    },
    ...mapGetters({
      settings: "getSettings",
    }),
  },
};
</script>

<style>
.site_header {
  position: fixed;
  z-index: 100;
  width: 100%;
  --menu_height: calc(var(--margin) * 3.5);
}

.menu_header {
  border-bottom: var(--border);
}

.page_path {
  box-sizing: border-box;
  border-bottom: var(--border);
}

.path_item + .path_item:before {
  content: " / ";
}

.site_header_home_link img {
  display: block;
  height: var(--menu_height);
}

@media screen and (max-width: 768px) {
  .show_search + .site_header_home_link {
    display: none;
  }
}

.row {
  position: absolute;
  width: calc(100% - var(--margin));
  height: 0px;
  border-bottom: var(--border);
  left: var(--margin_half);
  transition: transform 0.2s ease-in-out;
}

.row.row_one {
  top: var(--margin);
  transform-origin: left top;
}
.row.row_two {
  top: 50%;
}
.row.row_three {
  bottom: calc(var(--margin) - 2px);
  transform-origin: left bottom;
}

.showing_menu .row_one {
  transform: rotate(32deg) scaleX(1.2);
}

.showing_menu .row_three {
  transform: rotate(-32deg) scaleX(1.2);
}

.menu_toggle,
.search_toggle {
  position: relative;
  box-sizing: border-box;
  margin-right: 0;
  width: var(--menu_height);
  height: var(--menu_height);
  background: transparent;
  border-right: var(--border);
}

.search_toggle img {
  display: block;
  margin: 0 auto;
  transform: scale(0.7);
}

@media screen and (max-width: 768px) {
  .search_toggle img {
    transform: scale(0.6);
  }
}

.contrast_toggle {
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  margin-right: 0;
  width: var(--menu_height);
  height: var(--menu_height);
}

.contrast_toggle div {
  position: absolute;
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--margin);
  height: var(--margin);
  border: var(--border);
  border-radius: var(--margin);
  overflow: hidden;
}

.contrast_toggle div:before {
  display: block;
  position: relative;
  content: "";
  transform: translate(-1px, -1px);
  width: calc(var(--margin) / 2 + 2px);
  height: calc(var(--margin) + 2px);
  background: black;
}

.is_contrasted .contrast_toggle div:before {
  margin-left: calc(var(--margin) / 2);
}
</style>
