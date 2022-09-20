<template>
	<main class="page pt--8">
		
		<SiteSubnav :pages="pages" />
		
		<template v-if="$CheckA(current)">
			<h1 class="section_heading genath title mb--1">Current</h1>
			<GridThumbs :posts="current" :size="'Half'" />	
		</template>
		
		<template v-if="$CheckA(upcoming)">
			<h1 class="section_heading genath title mb--1">Upcoming</h1>
			<GridThumbs :posts="upcoming" :size="'Quarter'" />	
		</template>
		

		<template v-if="$CheckA(recent)">
			<h1 class="section_heading genath title mb--1">Recent</h1>
			<GridThumbs :posts="recent" :size="'Quarter'" />
		</template>

		<template v-if="$CheckA(series)">			
			<section v-for="(serie, i) in series" :key="serie.slug + i">
				<h1 class="section_heading genath title mb--1" v-html="serie.name"></h1>
				<GridThumbs :posts="serie.events" :size="'Sixth'" />	
			</section>
		</template>
		

	</main>
</template>

<script>

	import { Events, EventTabs } from '@/services/Events.js'

	
	export default{
		head(){
			return this.$metatags({title: 'Events'})
		},

		computed: {
			current(){
				return this.events.filter(e => {
					if(this.$Check(e.pageInfo.endDate)){
						return this.$moment().isAfter(this.$moment(e.pageInfo.date)) && (this.$moment().isBefore(this.$moment(e.pageInfo.endDate)) || this.$moment(e.pageInfo.endDate).isSame(this.$moment(), 'day')) ? true : false

					}else{
						
						return this.$moment(e.pageInfo.date).isSame(this.$moment(), 'day') ? true : false
					}
				})
			},
			upcoming(){
				return this.events.filter(e => (this.$moment().isBefore(this.$moment(e.pageInfo.date))))
			},
			recent(){
				const c = [].concat(this.current).concat(this.upcoming).map(e => e.slug)
				let recent = [].concat(this.events.filter(e => !c.includes(e.slug)))
				recent.length = 16
				return recent
			},
		},

		async asyncData({$axios, $Req, store}){

			const query = Events + ' ' + EventTabs

			try{
				const res = await $axios($Req(query))

				store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Events', route: '/events'},
        	{title: 'Current', route: '/events'}
        ])


        let pages = [
					{ title: 'Current', path: '/events' }, 
					{ title: 'Past', path: '/events/past' }
				]

				const tabs = res.data.data.eventTabs.edges.map(e => {
					return {
						title: e.node.title,
						path: `/events/tab/${e.node.slug}`,
					}
				})

				pages = pages.concat(tabs)

				const events = res.data.data.currentEvents.edges.map(e => e.node).sort((a, b) => {
					const bDate = b.pageInfo.date !== null ? b.pageInfo.date : '2000-01-01'
					const aDate = a.pageInfo.date !== null ? a.pageInfo.date : '2000-01-01'
					return bDate.localeCompare(aDate)
				})

				let series = res.data.data.series.edges.map(e => e.node).filter(e => e.ongoingSeries.pinSeries)

				series.forEach(s => {
					s.events = s.events.edges.map(e => e.node).sort((a, b) => {
						const bDate = b.pageInfo.date !== null ? b.pageInfo.date : '2000-01-01'
						const aDate = a.pageInfo.date !== null ? a.pageInfo.date : '2000-01-01'
						return bDate.localeCompare(aDate)
					})
				})

				return { 
					pages,
					events,
					series
				}

			}catch(e){
				return { test: e }
			}

		}
	}

</script>
