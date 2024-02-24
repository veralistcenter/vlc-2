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

		<section v-if="!results && isSearching" class="grid"><p class="fs--large">Searching...</p></section>
		<section v-else-if="!results && !isSearching" class="grid"><p class="fs--large">No results were returned for this search.</p></section>

		<section class="grid mb--2" v-if="$Check(results.networks) && $CheckA(results.networks.edges)">
			
			<h2 class="fs--large">Network</h2>
			<section class="grid grid--sans mt--1">
				<nuxt-link 
					v-for="(node, j) in results.networks.edges.map(e => e.node)" 
					:key="node.slug + j"
					class="fs--regular col col--1_4 mcol--1_2 mcol--tile col--tile mb--1_2"
					:to="'/network/' + node.slug">
					<span class="node_name" v-html="node.title"></span>
				</nuxt-link>
			</section>
		</section>

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
				results: false,
				isSearching: false,
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
				
				this.results = false // clear results
				this.isSearching = true

				const res = await this.$axios(this.$ReqWREST('/search?search=' + searchQuery + '&per_page=100' ))

				console.log(res.data)

				const ids = res.data.map(r => r.id)
				const s = SearchIds(ids)
				
				if(ids.length == 0){
					this.results = false
					this.isSearching = false
					return
				}

				const qlRes = await this.$axios(this.$Req(s))

				this.results = qlRes.data.data
				this.isSearching = false


			}catch(e){
				console.log(e)
				this.isSearching = false
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
