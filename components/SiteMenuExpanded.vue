<template>
  <header class="site_menu_expanded grid grid--sans">
    <section class="col col--1_2 col--inset mcol--full menu_col">
      <nuxt-link class="menu_logo pt--1" to="/">
        <img src="/tns-vlc-logo-2.svg" />
      </nuxt-link>

      <aside class="menu_info grid grid--sans fs--small">
        <section class="col col--1_2" v-html="menu.address"></section>
        <section class="col col--1_2 col--end">
          <ul>
            <li v-for="(social, i) in menu.menuSocialLinks" :key="'social' + i">
              <a :href="social.link" v-html="social.text"></a>
            </li>
          </ul>
        </section>
      </aside>
    </section>
    <section
      class="col col--1_2 mcol--full col--end col--inset menu_list menu_col grid grid--sansr genath title"
    >
      <ul class="col col--1_2 mt--1">
        <li
          v-for="(r, i) in menu.pLeftColumn"
          :key="'left_' + i"
          class="menu_link"
        >
          <nuxt-link
            v-if="r.linkToggle"
            :to="calcLink(r.internalLink)"
            v-html="r.text"
          ></nuxt-link>
          <a v-else :href="r.link" target="_blank" v-html="r.text"></a>
        </li>
      </ul>
      <ul class="col col--1_2 mt--1 col--end">
        <li
          v-for="(r, i) in menu.pRightColumn"
          :key="'left_' + i"
          class="menu_link"
        >
          <nuxt-link
            v-if="r.linkToggle"
            :to="calcLink(r.internalLink)"
            v-html="r.text"
          ></nuxt-link>
          <a
            v-else
            :href="r.link"
            :target="
              r.link.includes('veralistcenter.org') ||
              r.link.includes('localhost:3000')
                ? ''
                : '_blank'
            "
            v-html="r.text"
          ></a>
        </li>
      </ul>
    </section>
    <footer class="banner col col--full pt--1 pb--1">
      <SiteMarquee v-if="menu.marquee.displayMarquee" :marquee="menu.marquee" />
      <p v-else></p>
    </footer>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    menu() {
      return this.settings.acfOptions.menu;
    },
    calcLink: (state) => (iL) => {
      if (
        state.$Check(iL) &&
        state.$Check(iL.slug) &&
        iL.__typename == "About"
      ) {
        return `/about/${iL.slug}`;
      }

      if (
        state.$Check(iL) &&
        state.$Check(iL.slug) &&
        iL.__typename.includes("Event")
      ) {
        return `/events/${iL.slug}`;
      }

      if (
        state.$Check(iL) &&
        state.$Check(iL.slug) &&
        iL.__typename.includes("Announcement")
      ) {
        return `/announcement/${iL.slug}`;
      }

      if (
        state.$Check(iL) &&
        state.$Check(iL.slug) &&
        iL.__typename.includes("Exhibition")
      ) {
        return `/exhibitions/${iL.slug}`;
      }

      if (
        state.$Check(iL) &&
        state.$Check(iL.slug) &&
        iL.__typename.includes("Publication")
      ) {
        return `/publications/${iL.slug}`;
      }

      return state.$Check(iL) && state.$Check(iL.slug) ? "/" + iL.slug : "/";
    },
    ...mapGetters({
      settings: "getSettings",
    }),
  },
};
</script>

<style>
.menu_info {
  position: absolute;
  bottom: var(--margin);
}

.menu_logo {
  display: block;
  height: 5rem;
  text-align: left;
}

.menu_logo img {
  display: block;
  height: 100%;
}

.menu_col {
  min-height: 30rem;
}

.site_menu_expanded {
  width: 100%;
  border-bottom: var(--border);
}

.menu_list {
  border-left: var(--border);
}

.banner {
  width: 100%;
  overflow: hidden;
  border-top: var(--border);
}

@media screen and (any-hover: hover) {
  .menu_link a {
    position: relative;
    display: inline-block;
    transition: transform 0.1s ease-in;
  }
  .menu_link a:hover {
    transform: translateX(var(--margin));
  }
}

@media screen and (max-width: 768px) {
  .menu_col {
    min-height: unset;
  }

  .menu_info {
    margin-top: var(--margin);
    position: relative;
    bottom: unset;
  }

  .menu_list {
    margin-top: var(--margin);
    border-top: var(--border);
    border-left: 0px;
    margin-bottom: var(--margin);
  }
}
</style>
