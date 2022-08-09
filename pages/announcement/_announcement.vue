<template>
	<main class="page pt--7">
		<SingleHeader :post="announcement" v-if="announcement.pageFormat.pageLength" />
		<header class="section_heading mb--4" v-else>
			<h1 class="fs--small caps">Announcement</h1>
			<h2 class="genath title" v-html="announcement.title"></h2>
			<h3 class="genath title" v-html="$Dated({start: announcement.pageInfo.date, end: null })"></h3>
			<p 
				class="mt--1_2 max--500" 
				v-if="$Check(announcement.pageInfo.previewInfo.description)" 
				v-html="announcement.pageInfo.previewInfo.description"></p>
		</header>

		<MatrixBody class="mb--4" v-if="announcement.pageFormat.pageLength && $CheckA(announcement.pageFormat.body)" :matrix="announcement.pageFormat.body" />
		<section 
			v-if="!announcement.pageFormat.pageLength" 
			class="short_body richtext fs--regular" 
			v-html="announcement.pageFormat.shortBody"></section>


		<section class="mt--2" v-if="$CheckA(announcement.related.relatedPages)">
			<h2 
				class="fs--large section_heading" 
				v-html="announcement.related.relatedPagesTitle"
			></h2>
			<GridThumbs 
				:size="announcement.related.relatedPagesSize" 
				:posts="announcement.related.relatedPages" 
			/>
		</section>

		<NetworkList
			v-if="$CheckA(announcement.networkRelation.associatedNetwork)"
			:network="{}"
			interiorTitle="Network"
			:networkNodes="announcement.networkRelation.associatedNetwork"
		/>

	</main>
</template>

<script>

	import { Announcement } from '@/services/Announcements'
	
	export default{

		async asyncData({$axios, $Req, store, params}){

			const query = Announcement(params.announcement)

			try{
				const res = await $axios($Req(query))

				const announcement = res.data.data.announcement

				store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Announcements', route: '/'},
        	{title: announcement.title, route: '/announcements/' + params.announcement }
        ])


				return {
					announcement
				}
			}catch(e){
				return {error: e}
			}
		}

	}

</script>
