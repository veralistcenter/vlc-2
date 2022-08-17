<template>
	<section class="pub_carousel">
	
		<nav class="pub_nav grid">
			<section class="col col--2_3 pc_nav_buttons mb--1_2">
				
				<button 
	    		v-for="(b, i) in slides"
	    		:key="'dot_' + i"
	    		@click="$refs.myVueperSlides.goToSlide(i)"
	    		:class="{filled: i === activeIndex}"
	    		class="pc_nav_button_dots mr--1_2"></button>

			</section>
			<section class="col col--1_3 col--end right">
				<p>
    			<button 
    				@click="$refs.myVueperSlides.previous()" 
    				class="pc_nav_buttons mr--1_2"><img src="/previous-inline.svg" 
    			/></button>
    			<button 
    				@click="$refs.myVueperSlides.next()" 
    				class="pc_nav_buttons"><img src="/next-inline.svg" 
    			/></button>	
    		</p>
			</section>
		</nav>

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
				v-for="(s, i) in slides" 
	    		:key="'pub_'+ i"
	    	>
    		<template #content>
    			<div class="pub_feat_slide">
    				<figure v-if="$Check(s.slideImage.sourceUrl)">
    					<img
    						:src="s.slideImage.sourceUrl"
    						:srcset="s.slideImage.srcSet"
    						:alt="s.slideImage.altText"
    					/>
    					<figcaption v-if="$Check(s.slideImage.caption)" v-html="s.slideImage.caption"></figcaption>
    				</figure>
    			</div>
    		</template>
    	</vueper-slide>

		</vueper-slides>

		
	</section>
</template>

<script>

	import { VueperSlides, VueperSlide } from 'vueperslides'
	import 'vueperslides/dist/vueperslides.css'
	
	export default{
		components: { VueperSlides, VueperSlide },
		props: {
			slides: Array
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
	
	.pub_carousel{
		position: relative;
		--slideshow_height: 46.875vw;
	}

	.pub_carousel .vueperslides, 
	.pub_carousel .vueperslide, 
	.pub_carousel .vueperslides__track, 
	.pub_carousel .vueperslides__track-inner{
		height: var(--slideshow_height);
	}
	.pub_carousel .vueperslides--fixed-height {
		height: var(--slideshow_height);
	}

	.pub_feat_slide img{
		display: block;
		max-width: 100%;
		max-height: calc(var(--slideshow_height) - var(--margin));
		margin: 0 auto;
	}


	.pub_nav{
		margin-top: calc(-1 * var(--margin_half));
	}

	.pc_nav_button_dots{
		--diameter:  calc(var(--margin) * 1.125);
		width: var(--diameter);
		height: var(--diameter);
		margin-top: calc(var(--margin) * 0.4375);
		box-sizing: border-box;
		border: var(--border);
		border-radius: 100%;
	}

	.pc_nav_button_dots.filled{
		background: black;
	}

	.pc_nav_buttons{
		height: var(--margin_x2);
	}

	.pc_nav_buttons img{
		display: block;
		height: 100%;
	}

	@media screen and (max-width: 768px){
		.pub_carousel{
			--slideshow_height: 55vw;
		}
	}

</style>