<template>
	<nuxt-link class="thumb announcement_thumb pt--1_2 pl--1 pr--1" :to="'/announcements' + announcement.slug">
		<h1 class="fs--small caps mb--1_2">Announcement</h1>
		<h3 class="fs--regular mb--1_2" v-html="announcement.title"></h3>
		<img
			v-if="$Check(announcement.featImage) && $Check(announcement.featImage.featuredImage)"
			:src="announcement.featImage.featuredImage.sourceUrl"
			:srcset="announcement.featImage.featuredImage.srcSet"
			:alt="announcement.featImage.featuredImage.altText"
			sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
		/>

		
		<h3 
			class="thumb_time pl--1 pr--1 pb--1_2 pt--1_2 mt--1 caps fs--small" 
			:class="$IsCurrent({start: announcement.pageInfo.date, end: announcement.pageInfo.endDate }) ? 'current_event' : 'past_event'" 
			v-html="$Check(announcement.pageInfo.timeOverride) ? announcement.pageInfo.timeOverride : $Dated({start: announcement.pageInfo.date, end: announcement.pageInfo.endDate })"
		></h3>

	</nuxt-link>
</template>

<script>
	
	export default{
		props: {
			announcement: Object
		}
	}

</script>

<style>
	
	.announcement_thumb{
		box-sizing: border-box;
		border: var(--border);
		overflow: hidden;
	}

</style>