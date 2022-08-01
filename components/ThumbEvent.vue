<template>
	<nuxt-link class="thumb event_thumb pt--1_2 pl--1 pr--1" :to="'/events/' + event.slug">
		<h2 class="fs--small caps" v-html="eventTypes"></h2>
		<h3 class="fs--regular mb--1_2" v-html="event.title"></h3>
		<img
			v-if="$Check(event.featImage) && $Check(event.featImage.featuredImage)"
			:src="event.featImage.featuredImage.sourceUrl"
			:srcset="event.featImage.featuredImage.srcSet"
			:alt="event.featImage.featuredImage.altText"
			sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
		/>

		<h4 
			class="thumb_time pl--1 pr--1 pb--1_2 pt--1_2 mt--1 caps fs--small" 
			:class="$IsCurrent({start: event.pageInfo.date, end: event.pageInfo.endDate }) ? 'current_event' : 'past_event'" 
			v-html="$Check(event.pageInfo.timeOverride) ? event.pageInfo.timeOverride : $Dated({start: event.pageInfo.date, end: event.pageInfo.endDate })"
		></h4>
	</nuxt-link>
</template>

<script>
	
	export default{
		props: {
			event: Object
		},
		computed: {
			eventTypes(){
				return this.event.eventTypes.edges.length > 0 ? this.event.eventTypes.edges.map(e => e.node.name).join(', ') : ''
			}
		}
	}

</script>

<style>
	
	.event_thumb{
		box-sizing: border-box;
		border: var(--border);
		overflow: hidden;
	}

</style>