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
    isDisabled() {
      return this.node.networkInformation?.externalLink?.disableLink === true;
    },
    isExternal() {
      return (
        this.node.networkInformation?.externalLink?.makeExternalLink === true
      );
    },
    linkComponent() {
      if (this.isDisabled) {
        return "span";
      } else if (this.isExternal) {
        return "a";
      } else {
        return "nuxt-link";
      }
    },
    linkProps() {
      if (this.isDisabled) {
        return {};
      } else if (this.isExternal) {
        return {
          href: this.node.networkInformation.externalLink.externalLinkUrl,
          target: "_blank",
          rel: "noopener",
        };
      } else {
        return {
          to: "/network/" + this.node.slug,
        };
      }
    },
  },
};
</script>
