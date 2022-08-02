<template>
	<main class="page pt--8">
		
		<SiteSubnav  :pages="pages" />

		<NetworkNav :keyprefix="'all_'" :list="list" />

		<section class="section_inset" v-for="l in byNames" :key="'letter_' + l.letter">
			<h2 
				:id="'node_' + l.letter"
				class="caps fs--large mt--1 mb--1" v-html="l.letter"></h2>

			<section class="grid grid--sans network_section pb--1">
				<nuxt-link 
					v-for="node in l.nodes" 
					:key="l.letter + node.slug"
					class="col col--1_4 col--tile mb--1_2"
					:to="'/network/' + node.slug">
					<span class="node_indicator">⁕</span>
					<span v-html="node.title"></span>
				</nuxt-link>
			</section>

		</section>

	</main>
</template>

<script>

	import { Network, AdditionalNetwork } from '@/services/Network'
	
	export default{
		data(){
			return{
				additional: [],
				list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z' ]
			}
		},
		computed: {
			byNames(){
				let nodes = [].concat(this.networks).concat(this.additional)

				let byNames = []

				nodes = nodes.filter(n => n.networkInformation.type == 'Individual')
				.sort((a,b) => {
		      const artistNamesA = a.title.split(' '),
		            artistLastNameA = artistNamesA[artistNamesA.length - 1],
		            artistAlphaA = (a.networkInformation.nameToBeAlphabetized !== null && a.networkInformation.nameToBeAlphabetized !== undefined && a.networkInformation.nameToBeAlphabetized !== '') ? a.networkInformation.nameToBeAlphabetized : artistLastNameA

		      const artistNamesB = b.title.split(' '),
		            artistLastNameB = artistNamesB[artistNamesB.length - 1],
		            artistAlphaB = (b.networkInformation.nameToBeAlphabetized !== null && b.networkInformation.nameToBeAlphabetized !== undefined && b.networkInformation.nameToBeAlphabetized !== '') ? b.networkInformation.nameToBeAlphabetized : artistLastNameB

		      return artistAlphaA.localeCompare(artistAlphaB)
			   })

				nodes.forEach(e => {
					
					const artistNamesA = e.title.split(' '),
		            artistLastNameA = artistNamesA[artistNamesA.length - 1]

					const letter = this.$Check(e.networkInformation.nameToBeAlphabetized) ? e.networkInformation.nameToBeAlphabetized[0].toUpperCase() : artistLastNameA[0].toUpperCase()
					const iO = byNames.map(y => y.letter).indexOf(letter)
					if(iO >= 0){
						byNames[iO].nodes.push(e)
					}else{
						byNames.push({
							letter,
							nodes: [e]
						})
					}
				})

				return byNames



			},
		},
		mounted(){
			if(this.pageInfo.hasNextPage){
				this.fetchMore(this.pageInfo.endCursor)
			}
		},
		methods: {
			async fetchMore(cursor){

				try{
					const res = await this.$axios(this.$Req(AdditionalNetwork(cursor)))

					this.additional = res.data.data.moreNetwork.edges.map(e => e.node)

					if(res.data.data.moreNetwork.pageInfo.hasNextPage){
						this.fetchMore(res.data.data.moreNetwork.pageInfo.endCursor)
					}else{
						console.log('no more network')
					}

				}catch(e){
					console.log(e)
				}

			}
		},
		async asyncData({$axios, $Req, store}){

			try{
				const res = await $axios($Req(Network))

				store.commit('updatePath', [
        	{title: 'Home', route: '/'},
        	{title: 'Network', route: '/network'},
        	{title: 'Individuals', route: '/network/individuals'}
        ])

				let pages = [
					{ title: 'All', path: '/network' },
					{ title: 'Individuals', path: '/network/individuals' },
					{ title: 'Organizations', path: '/network/organizations' },
				]

				const networks = res.data.data.networks.edges
				.map(e => e.node)
				.sort((a,b) => {
		      const artistNamesA = a.title.split(' '),
		            artistLastNameA = artistNamesA[artistNamesA.length - 1],
		            artistAlphaA = (a.networkInformation.nameToBeAlphabetized !== null && a.networkInformation.nameToBeAlphabetized !== undefined && a.networkInformation.nameToBeAlphabetized !== '') ? a.networkInformation.nameToBeAlphabetized : artistLastNameA

		      const artistNamesB = b.title.split(' '),
		            artistLastNameB = artistNamesB[artistNamesB.length - 1],
		            artistAlphaB = (b.networkInformation.nameToBeAlphabetized !== null && b.networkInformation.nameToBeAlphabetized !== undefined && b.networkInformation.nameToBeAlphabetized !== '') ? b.networkInformation.nameToBeAlphabetized : artistLastNameB

		      return artistAlphaA.localeCompare(artistAlphaB)
			   })

				return { 
					pages,
					networks,
					pageInfo: res.data.data.networks.pageInfo
				}


			}catch(e){
				return { error: e }
			}

		}
	}

</script>


<style>
	
	.network_section{
		border-bottom: var(--border);
	}

</style>