<template>
	<header class="pb--2">
		<div class="grid">
			<section class="col col--1_2 pb--1" v-if="single.pageFormat.pageLength">
				<figure 
					class="header_image"
					v-if="$Check(single.featImage.featuredImage)"
				>
					<img 
						:src="single.featImage.featuredImage.sourceUrl"
						:alt="single.featImage.featuredImage.altText"
						:srcset="single.featImage.featuredImage.srcSet"
						sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
					>
					<figcaption style="visibility: hidden; overflow: hidden; height: 0px;" class="mt--1_2 fs--small" v-html="single.featImage.featuredImage.caption"></figcaption>
				</figure>
			</section>
			<section 
				class="col col--end pb--1"
				:class="{'col--1_2': single.pageFormat.pageLength}"
			>
				<h1 class="fs--small caps" v-html="types"></h1>
				<h2 class="genath title" v-html="single.title"></h2>
				<h3 class="genath title" v-html="single.networkPreview.subtitle"></h3>
			</section>
		</div>
		<template v-if="single.pageFormat.pageLength">
			<div class="border--btm"></div>
			<aside 
				role="caption" 
				v-if="$Check(single.featImage.featuredImage)" class="section_inset mt--1_2 fs--small">
				<p v-html="single.featImage.featuredImage.caption"></p>
			</aside>
		</template>
	</header>
</template>

<script>
	
	export default{
		head(){

			let description = undefined

			if(this.$Check(this.single.networkPreview.subtitle)){
				description = this.single.networkPreview.subtitle
			}

			return this.$metatags({
				title: this.single.title,
				image: this.$Check(this.single.featImage.featuredImage) ? this.single.featImage.featuredImage.sourceUrl : undefined,
				description: description
			})
		},

		props: {
			single: Object
		},
		computed:{
			types(){
				return this.single.networkTypes.edges.map(e => e.node.name).join(', ')
			}
		}
	}


</script>
