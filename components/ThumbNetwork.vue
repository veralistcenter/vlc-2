<template>
	<nuxt-link class="thumb event_thumb pt--1 pl--1 pr--1 pb--1" :to="'/network/' + network.slug">
		<h2 class="caps fs--small mb--1_4" v-html="type"></h2>
		<h3 class="fs--regular mb--1_2" v-html="network.title"></h3>
		<img
			v-if="$Check(network.featImage) && $Check(network.featImage.featuredImage)"
			:src="network.featImage.featuredImage.sourceUrl"
			:srcset="network.featImage.featuredImage.srcSet"
			:alt="network.featImage.featuredImage.altText"
			sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
		/>
		<h4 
			v-if="$Check(network.featImage) && $Check(network.featImage.subtitle)"
			class="fs--small mt--1_2" 
			v-html="network.featImage.subtitle"></h4>


		
	</nuxt-link>
</template>

<script>
	
	export default{
		props: {
			network: Object
		},
		computed:{
			type(){
				return this.network.networkTypes.edges.map(e => e.node.name).join(', ')
			}
		}
	}

</script>

<style>
	
	.event_thumb{
		border: var(--border);
	}

	.event_thumb img{
		display: block;
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 20rem;
	}

</style>