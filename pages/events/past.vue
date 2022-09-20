<template>
	<main class="page pt--8">
		
		<SiteSubnav 
			:statement="'Events statement'"
			:pages="pages"
		/>

		<nav class="section_inset mb--2">
			<ul class="ul--inline">
				<li v-for="(y, i) in allEvents" :key="'yearnav_' + y.year">
					<button 
						class="jump_to_link btn--grey mb--1_2 mr--1_2 pr--1_2 pl--1_2 pb--1_8 pt--1_8" 
						@click="jumpTo('#year_' + y.year)" v-html="y.year"></button>
				</li>
			</ul>	
		</nav>
		
		<section v-for="(y, i) in allEvents" :key="'year_' + y.year" :id="'year_' + y.year">
			<h1 class="section_heading title fs--large" v-html="y.year"></h1>
			<GridThumbs :posts="y.events" :size="'Quarter'" />
		</section>

	</main>
</template>

<script>

		import { PastEvents, PastEventsNextQuery, EventTabs } from '@/services/Events.js'

	
	export default{
		head(){
			return this.$metatags({title: 'Past Events'})
		},

		data(){
			return {
				additionalEvents: []
			}
		},
		computed: {
			allEvents(){
				let events = [].concat(this.events).concat(this.additionalEvents).sort((a, b) => {
					const bDate = b.pageInfo.date !== null ? b.pageInfo.date : '2000-01-01'
					const aDate = a.pageInfo.date !== null ? a.pageInfo.date : '2000-01-01'
					return bDate.localeCompare(aDate)
				})

				let byYears = []

				events.forEach(e => {
					const year = this.$moment(e.pageInfo.date).format('YYYY')
					const iO = byYears.map(y => y.year).indexOf(year)
					if(iO >= 0){
						byYears[iO].events.push(e)
					}else{
						byYears.push({
							year,
							events: [e]
						})
					}
				})

				return byYears
			}
		},
		mounted(){
			if(this.pageInfo.hasNextPage){
				this.fetchMoreEvents(this.pageInfo.endCursor)
			}
		},
		methods:{
			jumpTo(target){
				this.$scrollToTarget({t: target})
			},
			async fetchMoreEvents(cursor){
				try{
					const res = await this.$axios(this.$Req(PastEventsNextQuery(cursor)))

					const newEvents = res.data.data.pastEvents.edges.map(e => e.node)
					this.additionalEvents = [].concat(this.additionalEvents).concat(newEvents)

					if(res.data.data.pastEvents.pageInfo.hasNextPage){
						this.fetchMoreEvents(res.data.data.pastEvents.pageInfo.endCursor)
					}else{
						console.log('no more events')
					}

				}catch(e){
					console.log(e)
				}
			}
		},
		async asyncData({$axios, $Req, store, $moment}){

			const query = PastEvents + ' ' + EventTabs

			try{
				const res = await $axios($Req(query))

				store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Events', route: '/events'},
        	{title: 'Past', route: '/events/past'}
        ])

        let pages = [
					{ title: 'Current', path: '/events' }, 
					{ title: 'Past', path: '/events/past' },
				]

				const tabs = res.data.data.eventTabs.edges.map(e => {
					return {
						title: e.node.title,
						path: `/events/tab/${e.node.slug}`,
					}
				})

				pages = pages.concat(tabs)

				const events = res.data.data.pastEvents.edges
				.map(e => e.node)
				.filter(e => $moment().isAfter($moment(e.pageInfo.date)) && (e.pageInfo.endDate === null || $moment().isAfter($moment(e.pageInfo.endDate))))
				.sort((a, b) => a.valueOf(a.pageInfo.date) - b.valueOf(a.pageInfo.date))

				return { 
					pages,
					events,
					pageInfo: res.data.data.pastEvents.pageInfo
				}

			}catch(e){
				return { test: e }
			}

		}
	}

</script>
