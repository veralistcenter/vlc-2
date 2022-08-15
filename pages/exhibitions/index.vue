<template>
	<main class="page pt--8">
		
		<SiteSubnav 
			:statement="'Exhibitions Statement statement'"
			:pages="pages"
		/>

		<template v-if="$CheckA(current)">
			<h1 class="section_heading genath title mb--1">Ongoing</h1>
			<GridThumbs :posts="current" :size="'Half'" />	
		</template>
		
		<template v-if="$CheckA(upcoming)">
			<h1 class="section_heading genath title mb--1">Upcoming</h1>
			<GridThumbs :posts="upcoming" :size="'Half'" />	
		</template>
		
		<template v-if="$CheckA(recent)">
			<h1 class="section_heading genath title mb--1">Recent</h1>
			<GridThumbs :posts="recent" :size="'Quarter'" />
		</template>

	</main>
</template>

<script>
	
	import { RecentExhibitions } from '@/services/Exhibitions.js'

	export default{
		head(){
			return this.$metatags({title: 'Exhibitions'})
		},

		computed: {
			current(){
				return this.exhibitions.filter(e => {
					if(this.$Check(e.pageInfo.endDate)){
						return this.$moment().isAfter(this.$moment(e.pageInfo.date)) && (this.$moment().isBefore(this.$moment(e.pageInfo.endDate)) || this.$moment(e.pageInfo.endDate).isSame(this.$moment(), 'day')) ? true : false

					}else{
						
						return this.$moment().isAfter(this.$moment(e.pageInfo.date)) || this.$moment(e.pageInfo.date).isSame(this.$moment(), 'day') ? true : false
					}
				})
			},
			upcoming(){
				return this.exhibitions.filter(e => (this.$moment().isBefore(this.$moment(e.pageInfo.date))))
			},
			recent(){
				const c = [].concat(this.current).concat(this.upcoming).map(e => e.slug)
				let remaining = this.exhibitions.filter(e => !c.includes(e.slug))
				remaining.length = (remaining.length > 4) ? 4 : remaining.length
				return remaining
			}
		},

		async asyncData({$axios, $Req, store}){

			const query = RecentExhibitions

			try{
				const res = await $axios($Req(query))

				store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Exhibitions', route: '/exhibitions'},
        	{title: 'Current', route: '/exhibitions'}
        ])


        let pages = [
					{ title: 'Current', path: '/exhibitions' }, 
					{ title: 'Past', path: '/exhibitions/past' }
				]

				const exhibitions = res.data.data.recentExhibitions.edges.map(e => e.node).sort((a, b) => a.valueOf(a.pageInfo.date) - b.valueOf(a.pageInfo.date))

				return { 
					pages,
					exhibitions
				}

			}catch(e){
				return { test: e }
			}
		}
	}

</script>
