<template>
  <main class="page pt--7">
    <div
      v-if="$Check(event) && event.livestreamIframe.displayLivestreamIframe"
      class="iframe_wrapper mb--1"
      v-html="event.livestreamIframe.iframeCode"
    ></div>

    <SingleHeader :post="event" />
    <MatrixBody
      v-if="$CheckA(event.bodyField.body)"
      :matrix="event.bodyField.body"
    />

    <section class="mt--4" v-if="$CheckA(event.related.relatedPages)">
      <h2
        class="fs--large section_heading"
        v-html="event.related.relatedPagesTitle"
      ></h2>

      <GridThumbs
        :size="event.related.relatedPagesSize"
        :posts="event.related.relatedPages"
      />
    </section>
  </main>
</template>

<script>
import { Event } from "@/services/Events";

export default {
  async asyncData({ $axios, $Req, $Check, store, params, query }) {
    // const preview = $Check(query.preview) ? ', isPreview: true' : ''

    const q = Event(params.event, "");

    try {
      const res = await $axios($Req(q));

      const event = res.data.data.event;

      store.commit("updatePath", [
        { title: "Home", route: "/" },
        { title: "Events", route: "/events" },
        { title: event.title, route: "/events/" + params.event },
      ]);

      return {
        event,
      };
    } catch (e) {
      return { error: e };
    }
  },
};
</script>
