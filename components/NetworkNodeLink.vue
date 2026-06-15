<template>
  <component :is="linkComponent" v-bind="linkProps">
    <span class="node_name" v-html="node.title"></span>
  </component>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isExternal() {
      return (
        this.node.networkInformation?.externalLink?.makeExternalLink === true
      );
    },
    linkComponent() {
      return this.isExternal ? "a" : "nuxt-link";
    },
    linkProps() {
      if (this.isExternal) {
        return {
          href: this.node.networkInformation.externalLink.externalLinkUrl,
          target: "_blank",
          rel: "noopener",
        };
      }

      return {
        to: "/network/" + this.node.slug,
      };
    },
  },
};
</script>
