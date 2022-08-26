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

				function shuffle(array) {
				  let currentIndex = array.length,  randomIndex;

				  // While there remain elements to shuffle.
				  while (currentIndex != 0) {

				    // Pick a remaining element.
				    randomIndex = Math.floor(Math.random() * currentIndex);
				    currentIndex--;

				    // And swap it with the current element.
				    [array[currentIndex], array[randomIndex]] = [
				      array[randomIndex], array[currentIndex]];
				  }

				  return array;
				}

				if(show == 'All'){
					return shuffle(this.networkNodes)
				}else if(show == 'Individuals'){
					return shuffle(this.networkNodes.filter(n => n.networkInformation.type == 'Individual')) 
				}else if(show == 'Organizations'){
					return shuffle(this.networkNodes.filter(n => n.networkInformation.type == 'Organization'))
				}else{
					return shuffle(this.networkNodes)
				}
			}
		}
	}

</script>
