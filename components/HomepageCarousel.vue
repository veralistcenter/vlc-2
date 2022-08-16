<template>
	<section class="homepage_carousel" v-if="$CheckA(gallery)">

		<vueper-slides 
			ref="myVueperSlides"
			class="no-shadow" 
			:bullets="false" 
			:arrows="false"
			:touchable="false"
			:transitionSpeed="300"
			:fixedHeight="true"
			:breakpoints="breakpoints"
			@slide="changeActive"
		>
    	<vueper-slide 
    		v-for="(s, i) in gallerySlides" 
    		:key="i"
    	>
    		<template #content>
    			<div class="grid grid--sans">
    				<section class="col col--3_5 mcol--full carousel_image">
    					<img
    						v-if="$Check(s.featImage) && $Check(s.featImage.slideshowImage.sourceUrl)" 
    						:src="s.featImage.slideshowImage.sourceUrl"
    						:alt="s.featImage.slideshowImage.altText"
    						:srcset="s.featImage.slideshowImage.srcSet"
    						sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
    					>
    					<img 
    						v-else-if="$Check(s.featImage) && $Check(s.featImage.featuredImage.sourceUrl)"
    						:src="s.featImage.featuredImage.sourceUrl"
    						:alt="s.featImage.featuredImage.altText"
    						:srcset="s.featImage.featuredImage.srcSet"
    						sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
    					>
    				</section>
    				<section 
    					class="carousel_text_content col col--2_5 mcol--full col--end"
    					:class="{'pt--1': gallerySlides.length == 1, 'pt--4': gallerySlides.length > 1}"
    				>
    					<h1></h1>
    					<h2 class="genath title" v-html="s.title"></h2>
    					<h3 class="genath title" v-html="$Check(s.pageInfo) && $Check(s.pageInfo.timeOverride) ? s.pageInfo.timeOverride : $Dated({start: s.pageInfo.date, end: s.pageInfo.endDate})"></h3>

    					<p
								class="mt--1 fs--small"
								v-if="$Check(s.pageInfo.previewInfo.primaryDescription)"
								v-html="s.pageInfo.previewInfo.primaryDescription"
							></p>

    				</section>
    			</div>
    		</template>
    	</vueper-slide>
    </vueper-slides>

    <nav v-if="$CheckA(gallerySlides) && gallerySlides.length > 1" class="homepage_carousel_nav grid grid--sans">
    	<aside class="col col--2_3">
    		<button 
    		v-for="(b, i) in gallerySlides"
    		:key="'dot_' + i"
    		@click="$refs.myVueperSlides.goToSlide(i)"
    		:class="{filled: i === activeIndex}"
    		class="hc_nav_button_dots mr--1_2"></button>
    	</aside>
    	<section class="col col--1_3 col--end right">
    		<p>
    			<button 
    				@click="$refs.myVueperSlides.previous()" 
    				class="hc_nav_buttons mr--1_2"><img src="/previous-inline.svg" 
    			/></button>
    			<button 
    				@click="$refs.myVueperSlides.next()" 
    				class="hc_nav_buttons"><img src="/next-inline.svg" 
    			/></button>	
    		</p>
    	</section>
    	
    </nav>

	</section>
</template>

<script>

	import { VueperSlides, VueperSlide } from 'vueperslides'
	import 'vueperslides/dist/vueperslides.css'
	
	export default{
		components: { VueperSlides, VueperSlide },

		props: {
			gallery: Array
		},
		computed:{
			gallerySlides(){
				return [].concat(this.gallery.filter( g => this.$Check(g) && this.$Check(g.pageInfo)))
			}
		},
		data(){
			return {
				activeIndex: 0
			}
		},
		methods:{
			changeActive(e){
				this.activeIndex = e.currentSlide.index
			},
		}
	}

</script>


<style>

	.homepage_carousel{
		position: relative;
		--slideshow_height: 46.875vw;
		border-top: var(--border);
		border-bottom: var(--border);
	}

	#homepage_menu + .homepage_carousel,
	.homepage_carousel.primary_carousel,
	.matrix_block.site_marquee + .homepage_carousel{
		border-top: 0px;
	}



	.hc_nav_button_dots{
		--diameter:  calc(var(--margin) * 1.125);
		width: var(--diameter);
		height: var(--diameter);
		margin-top: calc(var(--margin) * 0.4375);
		box-sizing: border-box;
		border: var(--border);
		border-radius: 100%;
	}

	.hc_nav_button_dots.filled{
		background: black;
	}

	.hc_nav_buttons{
		height: calc(var(--margin) * 2);
	}

	.hc_nav_buttons img{
		display: block;
		height: 100%;
	}

	.homepage_carousel_nav{
		position: absolute;
		z-index: 10;
		top: var(--margin);
		right: var(--margin);
		width: calc(40% - (var(--margin) * 2));
		height: calc(var(--margin) * 2);
	}
	
	.homepage_carousel .vueperslides, 
	.homepage_carousel .vueperslide, 
	.homepage_carousel .vueperslides__track, 
	.homepage_carousel .vueperslides__track-inner{
		height: var(--slideshow_height);
	}
	.homepage_carousel .vueperslides--fixed-height {
		height: var(--slideshow_height);
	}

	.carousel_image{
		position: relative;
		overflow: hidden;
		height: var(--slideshow_height);
	}

	.carousel_image img{
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		display: block;
		width: auto;
		height: auto;
		min-height: 100%;
		min-width: 100%;
	}

	@media screen and (max-width: 768px){
		.homepage_carousel{
			--slideshow_height: 100vh;
		}

		.carousel_image{
			height: auto;
		}

		.carousel_image img{
			position: relative;
			top: unset;
			left: unset;
			transform: unset;
			display: block;
			width: 100%;
		}

		.carousel_text_content{
			box-sizing: border-box;
			padding-left: var(--edge);
			padding-right: var(--edge);
		}
	}


</style>