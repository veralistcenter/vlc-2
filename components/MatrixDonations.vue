<template>
  <section class="matrix_block mt--4 mb--4 matrix_donations">
    <div class="matrix_donations_inner pt--1 pl--1 pr--1">
      <h2 class="caps fs--large">
        {{ block.title || donationPopup.title || "Donate to the site" }}
      </h2>

      <div
        v-if="$Check(block.text) || $Check(donationPopup.text)"
        class="mt--1"
      >
        <div v-html="block.text || donationPopup.text"></div>
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
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    block: Object,
  },
  computed: {
    donationPopup() {
      return this.settings?.acfOptions?.donationsPopup;
    },
    ...mapGetters({
      settings: "getSettings",
    }),
  },
};
</script>

<style>
.matrix_donations {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--max_width);
  border: dashed 2px black;
}

.matrix_donations_inner {
  color: white;
  background-color: black;
  overflow: hidden;
}

.richtext u,
.richtext a {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

.richtext ul {
  list-style: none;
}

.richtext ul:not(:first-child) {
  margin-top: 1em;
  margin-bottom: 1em;
}

.richtext ul li {
  position: relative;
  box-sizing: border-box;
  padding-left: 1.25em;
}

.richtext ul li:before {
  content: "";
  position: absolute;
  left: 0;
  width: 0.5em;
  height: 0.5em;
  background: black;
  top: 0.5em;
  border-radius: 100%;
}

.richtext u a,
.richtext a u {
  text-decoration: none;
}

@media screen and (any-hover: hover) {
  .richtext a:hover {
    opacity: 0.6;
  }
}

.richtext p + p {
  margin-top: calc(var(--fs-r) * var(--lh-r));
}
</style>
