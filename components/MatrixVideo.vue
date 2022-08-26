<template>
	<section class="matrix_video section_inset mt--2 mb--2">
		<figure>
			
			<client-only>
			  <vimeo-player ref="player" :video-id="block.vimeoUrl" :options="options" />
			</client-only>	

			<figcaption class="mt--1_2 fs--small center" v-html="block.caption"></figcaption>
		</figure>	
	</section>
</template>

<script>
	
	export default{
		props: {
			block: Object
		},
		data(){
			return {
				options: {
					background: false,
					responsive: true
				}
			}
		}
	}

</script>

<style>
	
	.matrix_video figure{
		margin-left: auto;
		margin-right: auto;
		width: 100%;
		max-width: var(--max_width);
	}

	.matrix_video figure div,
	.matrix_video figure iframe{
		position: relative;
		width: 100%;
		max-width: unset;
		display: block;
		margin: 0 auto;
	}

</style>