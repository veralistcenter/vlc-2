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
			@slide="changeActive"
		>
    	<vueper-slide 
    		v-for="(s, i) in gallerySlides" 
    		:key="i"
    	>
    		<template #content>
    			<div class="grid grid--sans">
    				<section class="col col--3_5 mcol--full carousel_image mmt--4">
    					<img
    						v-if="$Check(s.featImage) && $Check(s.featImage.slideshowImage) && $Check(s.featImage.slideshowImage.sourceUrl)" 
    						:src="$SourceUrl(s.featImage.slideshowImage, 'large')"
    						:alt="s.featImage.slideshowImage.altText"
    						:srcset="s.featImage.slideshowImage.srcSet"
    						sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
    					>
    					<img 
    						v-else-if="$Check(s.featImage) && $Check(s.featImage.featuredImage) && $Check(s.featImage.featuredImage.sourceUrl)"
    						:src="$SourceUrl(s.featImage.featuredImage, 'large')"
    						:alt="s.featImage.featuredImage.altText"
    						:srcset="s.featImage.featuredImage.srcSet"
    						sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
    					>
    				</section>
    				<section 
    					class="carousel_text_content col col--2_5 mcol--full col--end"
    					:class="{'pt--1': gallerySlides.length == 1, 'pt--4 mpt--2': gallerySlides.length > 1}"
    				>
    					<nuxt-link :to="generatePath(s)">
    					<h1 class="fs--small caps mb--1_2" v-html="generateType(s)"></h1>
    					<h2 class="genath title" v-html="s.title"></h2>
    					<h3 class="genath title" v-html="$Check(s.pageInfo) && $Check(s.pageInfo.timeOverride) ? s.pageInfo.timeOverride : $Dated({start: s.pageInfo.date, end: s.pageInfo.endDate})"></h3>
    					</nuxt-link>

    					<p
								class="mt--1 fs--small carousel_text_description"
								v-if="$Check(s.pageInfo.previewInfo) && $Check(s.pageInfo.previewInfo.primaryDescription)"
								v-html="s.pageInfo.previewInfo.primaryDescription"
							></p>
    				</section>
    			</div>
    		</template>
    	</vueper-slide>
    </vueper-slides>

    <nav v-if="$CheckA(gallerySlides) && gallerySlides.length > 1" class="homepage_carousel_nav grid grid--sans">
    	<aside class="col col--2_3 mcol--1_2">
    		<button 
    		v-for="(b, i) in gallerySlides"
    		:key="'dot_' + i"
    		@click="$refs.myVueperSlides.goToSlide(i)"
    		:class="{filled: i === activeIndex}"
    		class="hc_nav_button_dots mr--1_2"></button>
    	</aside>
    	<section class="col col--1_3 mcol--1_2 mcol--end col--end right">
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
			},
			generateType:state => s => {
				if(s.__typename === 'Announcement'){
					return 'Announcement'
				}else if(s.__typename == 'Exhibition'){
					return 'Exhibition'
				}else if(s.__typename == 'Publication'){
					return 'Publication'
				}else if(s.__typename == 'Event'){
					return 'Event'
				}else{
					return 'Post'
				}
			},
			generatePath: state => s => {

				let root = ''
				if(s.__typename === 'Announcement'){
					root = 'announcement'
				}else if(s.__typename == 'Exhibition'){
					root = 'exhibitions'
				}else if(s.__typename == 'Publication'){
					root = 'publications'
				}else if(s.__typename == 'Event'){
					root = 'events'
				}

				return `/${root}/${s.slug}`
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
		/*--slideshow_height: calc(48vw - var(--margin));*/
		--slideshow_height: calc(46vw - var(--margin));
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

	@media screen and (max-width: 768px){
		.homepage_carousel_nav{
			width: calc(100% - var(--margin_x2));
		}
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
		width: 100%;
		height: auto;
	}

	.carousel_text_description{
		box-sizing: border-box;
		padding-right: var(--margin_x2);
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

	@media screen and (any-hover: hover){
		.carousel_text_content a *{
			transition: color 0.1s ease-in-out;
		}
		.carousel_text_content a:hover *{
			color: var(--lg_text);
		}
	}

	


</style>