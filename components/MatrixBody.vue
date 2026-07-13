<template>
  <section class="matrix_body">
    <nav class="section_inset mb--4 no-print">
      <ul class="ul--inline">
        <li v-if="showInNav(b, i)" v-for="(b, i) in matrix" :key="'nav_' + i">
          <button
            class="btn--grey mr--1_2 pr--1_2 pl--1_2 pb--1_8 pt--1_8 mb--1_2"
            @click="jumpTo('#block_' + i)"
            v-html="b.title"
          ></button>
        </li>
      </ul>
    </nav>

    <component
      v-for="(block, i) in matrix"
      v-if="$Check(block) && isBlockVisible(i)"
      :id="'block_' + i"
      :key="block.__typename + '__' + i"
      :is="type(block.__typename)"
      :block="block"
      @viewMore="showMore = true"
    />
  </section>
</template>

<script>
const NAV_EXCLUDED_TYPES = ["_Bodyfield_Body_List", "Body_ViewMore"];

export default {
  props: {
    matrix: Array,
  },
  data() {
    return {
      showMore: false,
    };
  },
  watch: {
    matrix() {
      this.showMore = false;
    },
  },
  methods: {
    jumpTo(target) {
      this.$scrollToTarget({ t: target });
    },
    isBlockVisible(index) {
      if (this.viewMoreIndex < 0) {
        return true;
      }

      if (!this.showMore) {
        return index <= this.viewMoreIndex;
      }

      return index !== this.viewMoreIndex;
    },
    isNavBlock(block) {
      return !NAV_EXCLUDED_TYPES.some((type) =>
        block.__typename.includes(type)
      );
    },
    showInNav(block, index) {
      return (
        block.title && this.isNavBlock(block) && this.isBlockVisible(index)
      );
    },
  },
  computed: {
    viewMoreIndex() {
      return this.matrix.findIndex((block) =>
        block?.__typename?.includes("Body_ViewMore")
      );
    },
    type: (state) => (t) => {
      if (t.includes("Body_Richtext")) {
        return "MatrixRichtext";
      } else if (t.includes("Fellowship_Bodyfield_Body_RelatedNetwork")) {
        return "MatrixRelatedFellows";
      } else if (t.includes("Body_RelatedNetwork")) {
        return "MatrixNetwork";
      } else if (t.includes("Body_Footnotes")) {
        return "MatrixFootnotes";
      } else if (t.includes("Body_Button")) {
        return "MatrixButton";
      } else if (
        t.includes("Body_RelatedPages") ||
        t.includes("Body_RelatedAnnouncements")
      ) {
        return "MatrixGrid";
      } else if (t.includes("Body_SingleImage")) {
        return "MatrixImage";
      } else if (t.includes("Body_Gallery")) {
        return "MatrixCarousel";
      } else if (t.includes("Body_Accordian")) {
        return "MatrixAccordian";
      } else if (t.includes("Body_VideoPlayer")) {
        return "MatrixVideo";
      } else if (t.includes("Body_Pullquote")) {
        return "MatrixQuote";
      } else if (t.includes("Body_RelatedColumn")) {
        return "MatrixColumn";
      } else if (t.includes("Body_AudioPlayer")) {
        return "MatrixAudioPlayer";
      } else if (t.includes("Body_Donations")) {
        return "MatrixDonations";
      } else if (t.includes("Body_List")) {
        return "MatrixList";
      } else if (t.includes("Body_ViewMore")) {
        return "MatrixViewMore";
      } else if (t.includes("Body_Iframe")) {
        return "MatrixIframe";
      } else {
        return "MatrixPre";
      }
    },
  },
};
</script>

<style>
@media print {
  .matrix_body {
    margin-top: var(--margin_x2);
  }
}
</style>
