<template>
	<main class="page pt--8">
		
		<SiteSubnav 
			:statement="'Exhibitions Statement statement'"
			:pages="pages"
		/>

		<nav class="section_inset mb--2">
			<ul class="ul--inline">
				<li v-for="(y, i) in allExhibitions" :key="'yearnav_' + y.year">
					<button 
						class="jump_to_link btn--grey mr--1_2 pr--1_2 pl--1_2 pb--1_8 pt--1_8" 
						@click="jumpTo('#year_' + y.year)" v-html="y.year"></button>
				</li>
			</ul>	
		</nav>		

		<section v-for="(y, i) in allExhibitions" :key="'year_' + y.year" :id="'year_' + y.year">
			<h1 class="section_heading title fs--large" v-html="y.year"></h1>
			<GridThumbs :posts="y.exhibitions" :size="'Half'" />
		</section>


	</main>
</template>

<script>
	
	import { Exhibitions } from '@/services/Exhibitions.js'

	export default{

		head(){
			return this.$metatags({title: 'Past Exhibitions'})
		},

		computed: {
			allExhibitions(){
				let exhibitions = [].concat(this.exhibitions)

				let byYears = []

				exhibitions.forEach(e => {
					const year = this.$moment(e.pageInfo.date).format('YYYY')
					const iO = byYears.map(y => y.year).indexOf(year)
					if(iO >= 0){
						byYears[iO].exhibitions.push(e)
					}else{
						byYears.push({
							year,
							exhibitions: [e]
						})
					}
				})

				byYears = [].concat(byYears).sort((a, b) => {
					const bDate = (this.$Check(b) && b.year !== null) ? b.year : '1900'
					const aDate = (this.$Check(a) && a.year !== null) ? a.year : '1900'
					return bDate.valueOf() - aDate.valueOf()
				})

				return byYears
			}
		},
		methods: {
			jumpTo(target){
				this.$scrollToTarget({t: target})
			},
		},
		async asyncData({$axios, $Req, store, $moment}){

			const query = Exhibitions

			try{
				const res = await $axios($Req(query))

				store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Exhibitions', route: '/exhibitions'},
        	{title: 'Past', route: '/exhibitions/past'}
        ])

        let pages = [
					{ title: 'Current', path: '/exhibitions' }, 
					{ title: 'Past', path: '/exhibitions/past' }
				]

				const exhibitions = res.data.data.exhibitions.edges
				.map(e => e.node)
				.filter(e => $moment().isAfter($moment(e.pageInfo.date)) && (e.pageInfo.endDate === null || $moment().isAfter($moment(e.pageInfo.endDate))))
				.sort((a, b) => a.valueOf(a.pageInfo.date) - b.valueOf(a.pageInfo.date))


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
