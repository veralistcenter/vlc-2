<template>
	<nuxt-link class="col thumb thumb_pub mb--4" :to="'/publications/' + pub.slug">

		<figure class="thumb_fig">
			<img
				v-if="$Check(pub.featImage) && $Check(pub.featImage.featuredImage)"
				:src="pub.featImage.featuredImage.sourceUrl"
				:srcset="pub.featImage.featuredImage.srcSet"
				:alt="pub.featImage.featuredImage.altText"
				sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
			/>
		</figure>		

		<h1 class="mt--1_2 mb--1_2 fs--small caps" v-html="format"></h1>
		<h2 class="genath g--small" v-html="pub.title"></h2>
		<aside class="mt--1_2 fs--small" v-if="description" ref="description" v-html="description"></aside>
	</nuxt-link>
</template>

<script>

	import clamp from 'clamp-js'
	
	export default{
		props: {
			pub: Object
		},
		mounted(){
			this.$nextTick(() => {
				if(this.description){
					clamp(this.$refs.description, {clamp: 3})
				}
			})
		},
		computed: {
			format(){
				return this.$CheckA(this.pub.publicationFormats.edges) ? this.pub.publicationFormats.edges.map(e => e.node.name).join(', ') : 'Publication'
			},
			description(){
				return this.$Check(this.pub.pageInfo.previewInfo.primaryDescription) ? this.pub.pageInfo.previewInfo.primaryDescription : false 
			}
		}
	}


</script>

<style>
	
	.thumb_fig{
		width: 100%;
		display: block;
	}

	.col--1_4 .thumb_fig{
		height: calc(25vw - var(--margin_x2));
	}

	.col--1_2 .thumb_fig{
		height: calc(50vw - var(--margin_x2));
	}

	.col--1_6 .thumb_fig{
		height: calc(16.66vw - var(--margin_x4));
	}

	@media screen and (max-width: 768px){
		.col--1_4 .thumb_fig{
			height: calc(50vw - var(--margin_x2));		
		}
	}

	.thumb_fig img{
		display: block;
		width: unset;
		max-width: 100%;
		max-height: 100%;
	}

</style>