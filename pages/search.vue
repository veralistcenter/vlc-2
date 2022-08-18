<template>
	<main class="page pt--7 search_page">
		
		<header class="grid mb--2">
			<section class="col col--1_4 mcol--full mb--1">
				<p class="genath title">Results for:</p>
			</section>
			<section class="col col--1_2 mcol--full mb--1 col--end">
				<form class="grid grid--sans" @submit="resubmitSearch">
					<input 
						class="genath title search_field col col--5_6" 
						type="text" 
						v-model="term"
						placeholder="Search..." 
					/>	
					<div class="col col--1_6 m_right col--end">
						<button
							class="search_icon">
							<img src="/search.svg" />
						</button>	
					</div>
				</form>
			</section>
		</header>

		<section class="grid mb--2" v-if="$Check(results.events) && $CheckA(results.events.edges)">
			<h2 class="fs--large">{{results.events.edges.length}} Event{{results.events.edges.length > 1 ? 's' : ''}}</h2>
			<GridThumbs class="grid--sans" size="Quarter" :posts="results.events.edges.map(e => e.node)" />	
		</section>

		<section class="grid mb--2" v-if="$Check(results.exhibitions) && $CheckA(results.exhibitions.edges)">
			<h2 class="fs--large">{{results.exhibitions.edges.length}} Exhibition{{results.exhibitions.edges.length > 1 ? 's' : ''}}</h2>
			<GridThumbs class="grid--sans" size="Half" :posts="results.exhibitions.edges.map(e => e.node)" />	
		</section>

		<section class="grid mb--2" v-if="$Check(results.publications) && $CheckA(results.publications.edges)">
			<h2 class="fs--large">{{results.publications.edges.length}} Publication{{results.publications.edges.length > 1 ? 's' : ''}}</h2>
			<GridThumbs class="grid--sans" size="Quarter" :posts="results.publications.edges.map(e => e.node)" />	
		</section>

		<section class="grid mb--2" v-if="$Check(results.announcements) && $CheckA(results.announcements.edges)">
			<h2 class="fs--large">{{results.announcements.edges.length}} Announcement{{results.announcements.edges.length > 1 ? 's' : ''}}</h2>
			<GridThumbs class="grid--sans" size="Quarter" :posts="results.announcements.edges.map(e => e.node)" />	
		</section>
		

	</main>
</template>

<script>

	import { SearchIds } from '@/services/Search'
	
	export default{
		head(){
			return this.$metatags({title: 'Search'})
		},


		watch: {
			'$route.query.search': function(newSearch){
				if(newSearch !== undefined){
					this.$fetch()
				}
			}
		},

		methods: {
			resubmitSearch(e){
				e.preventDefault()


				if(this.$Check(this.term)){

					console.log(this.term)

					const searchQuery = this.term
					this.$router.push({ path: '/search', query: { search: searchQuery } })
				}
				
			}
		},

		data(){
			return {
				term: '',
				results: false
			}
		},
		async fetch(){

			const searchQuery = this.$route.query.search

			if(!this.$Check(searchQuery)){
				this.results = false

				this.$store.commit('updatePath', [
	      	{title: 'Home', route: '/'},
	      	{title: 'Search', route: '/search'}
	      ])

				return
			}

			this.term = searchQuery


			this.$store.commit('updatePath', [
      	{title: 'Home', route: '/'},
      	{title: 'Search', route: '/search'},
      	{title: searchQuery, route: '/search?search=' + searchQuery }
      ])

			try{
				const res = await this.$axios(this.$ReqWREST('/search?search=' + searchQuery + '&per_page=100' ))

				const ids = res.data.map(r => r.id)
				const s = SearchIds(ids)
				const qlRes = await this.$axios(this.$Req(s))


				this.results = qlRes.data.data


			}catch(e){
				console.log(e)
			}

		}
	}

</script>


<style>

	.search_page{
		min-height: 80vh;
	}
	
	.search_field{
		border-bottom: var(--border);
		transform: translateY(-.45rem);
	}

	.search_icon{
		margin-top: .5rem;
		width: var(--margin_x2);
		height: var(--fs-g);
	}
	.search_icon img{
		width: 100%;
	}

	button.search_icon:focus-visible{
		background: gray !important;
	}

</style>
