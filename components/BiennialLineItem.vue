<template>
	<article class="biennial_item">
			<header class="grid grid--margin caps fs--large pt--1 pb--1">
				<h2 class="col col--2_3">
					<button class="caps block" @click="togglePreview" v-html="b.title"></button>
				</h2>
				<h3  @click="togglePreview" class="col col--1_3 col--end right point">
					<span v-html="b.biennialInfo.dateRange.startingYear"></span>–<span v-html="b.biennialInfo.dateRange.endingYear"></span>
				</h3>
			</header>

			<section class="biennial_preview grid grid--margin" :class="{open: showPreview}">
				<figure class="col col--1_3 pb--1">
					<img
						class="biennial_list_img"
						v-if="$Check(b.featImage) && $Check(b.featImage.featuredImage)"
						:src="b.featImage.featuredImage.sourceUrl"
						:srcset="b.featImage.featuredImage.srcSet"
						sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
						:alt="b.featImage.featuredImage.altText"
						:title="b.featImage.featuredImage.title"
					/>
				</figure>
				<aside class="col col--2_3 col--end pb--1">
					<section class="fs--regular" v-html="b.biennialInfo.biennialDescriptionPreview"></section>

					<nuxt-link 
						class="fs--regular caps btn--full" 
						:to="'/focus-theme/' + b.slug"
						:tab-index="(!showPreview) ? '-1' : '0'"
					>
						Read More
					</nuxt-link>

				</aside>
			</section>

		</article>	
</template>

<script>
	
	export default{
		props: {
			b: Object
		},
		data(){
			return {
				showPreview: false
			}
		},
		methods: {
			togglePreview(){
				this.showPreview = !this.showPreview
			}
		}
	}

</script>