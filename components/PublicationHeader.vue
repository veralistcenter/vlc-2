<template>
	<header class="pub_header mb--1">

		<PublicationMedia 
			v-if="pub.pageInfo.showFeatured" 
			:info="pub.pageInfo" 
			:feat="pub.featImage.featuredImage"
		/>

		<section class="grid">
			<section class="col col--1_2 mcol--full mb--1">
				<h1 class="mb--1_2 fs--small caps" v-html="format"></h1>
				<h2 class="genath title" v-html="pub.title"></h2>

				<ul class="ul--inline mt--1 mb--1" v-if="$CheckA(tags)">
					<li 
						v-for="(tag, i) in tags" 
						:key="'tag_'+ i"
						class="mr--1_2 fs--small" 
					><nuxt-link 
							class="btn--inline--grey caps"
							:to="'/archive?tags=' +tag.slug" 
							v-html="tag.name"></nuxt-link>
					</li>
				</ul>

			</section>
			<aside class="col col--1_2 mcol--full col--end pub_info mb--1">
				<section 
					class="mt--1 max--500 fs--regular" 
					v-if="previewInfo.author"
					v-html="previewInfo.author"
				></section>
				<section 
					class="mt--1 max--500 fs--regular" 
					v-if="$Check(previewInfo.primaryDescription)" 
					v-html="previewInfo.primaryDescription"></section>

				<section class="mt--1" v-if="$Check(previewInfo.button.buttonLink)">
					<a 
						class="fs--regular btn--full"
						target="_blank" 
						:href="previewInfo.button.buttonLink" 
						v-html="previewInfo.button.buttonName"></a>
				</section>

				<BiennialLink 
					class="mt--1"	
					v-if="$CheckA(previewInfo.associatedBiennial)" 
					:biennials="previewInfo.associatedBiennial" 
				/>

				<section 
					class="mt--1 max--500 fs--small" 
					v-if="$Check(previewInfo.secondaryDescription)" 
					v-html="previewInfo.secondaryDescription"></section>
			</aside>
		</section>

	</header>
</template>

<script>
	
	export default{

		head(){


			const image = (this.pub.featImage.featuredImage) ?  this.pub.featImage.featuredImage.sourceUrl : undefined

			const description = this.$Check(this.previewInfo.primaryDescription) ? this.previewInfo.primaryDescription : undefined

			return this.$metatags({
				title: this.pub.title,
				description: description,
				image: image
			})
		},

		props: {
			pub: Object
		},
		computed: {
			previewInfo(){
				return this.pub.pageInfo.previewInfo
			},
			format(){
				return this.$CheckA(this.pub.publicationFormats.edges) ? this.pub.publicationFormats.edges.map(e => e.node.name).join(', ') : 'Publication'
			},
			tags(){
				if(this.$Check(this.pub.sitewideTags) && this.$CheckA(this.pub.sitewideTags.edges)){
					return this.pub.sitewideTags.edges.map(e => e.node)
				}
			},
		}
	}

</script>

<style>
	
	.pub_header{
		border-bottom: var(--border);
	}

	.pub_info{
		margin-top: calc(var(--fs-g) - var(--fs-r) + .15rem);
	}

</style>