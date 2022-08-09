<template>
	<section class="section mt--2">
		<h1 v-if="$Check(network.title)" class="genath title section_heading" v-html="network.title"></h1>
		<h1 v-if="$Check(interiorTitle)" class="fs--large section_heading" v-html="interiorTitle"></h1>
		<ul class="ul--inline fs--regular section_inset mt--1">
			<li 
				class="node_item mr--1_2 mb--1" v-for="(n, i) in networkMembers" 
				:key="'network' + i"
				v-if="i < 20"
			>
				<nuxt-link 
					:to="'/network/' + n.slug"
					class="block caps pb--1_2 pt--1_2 pr--1 pl--1_2"
				>
					<span class="node_indicator">⁕</span>
					<span v-html="n.title"></span>
				</nuxt-link>
			</li>

			<li>
				<nuxt-link to="/network">View All</nuxt-link>
			</li>
		</ul>

	</section>
</template>

<script>
	
	export default{
		props:{
			network: Object,
			interiorTitle: String,
			networkNodes: Array
		},
		computed:{
			networkMembers(){
				const show = this.network.show

				if(show == 'All'){
					return this.networkNodes.sort(() => (Math.random() > .5) ? 1 : -1)
				}else if(show == 'Individuals'){
					return this.networkNodes.filter(n => n.networkInformation.type == 'Individual').sort(() => (Math.random() > .5) ? 1 : -1)
				}else if(show == 'Organizations'){
					return this.networkNodes.filter(n => n.networkInformation.type == 'Organization').sort(() => (Math.random() > .5) ? 1 : -1)
				}else{
					return this.networkNodes.sort(() => (Math.random() > .5) ? 1 : -1)
				}
			}
		}
	}

</script>
