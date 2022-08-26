<template>
	<div class="site_marquee fs--regular" :style="speed">
		<div class="track">
			<div class="marquee_content" v-html="$Check(marquee.content) ? marquee.content : marquee.marqueeContent"></div>
		</div>
	</div>
</template>

<script>
	
	export default {
		props: {
			marquee: Object
		},
		computed:{
			speed(){
				return `--animation_speed: marquee ${this.$Check(this.marquee.speedOfMarquee) ? this.marquee.speedOfMarquee : this.marquee.homepageMarqueeSpeed}s linear infinite;`
			}
		}
	}

</script>


<style>

	.matrix_block.site_marquee{
		border-top: var(--border);
		border-bottom: var(--border);
		padding-top: var(--margin);
		padding-bottom: var(--margin);
	}

	#homepage_menu + .matrix_block.site_marquee,
	.homepage_carousel + .matrix_block.site_marquee{
		border-top: 0px;
	}
	
	.site_marquee{
		overflow-x: hidden;
		max-width: 100%;
		overflow: hidden;
		height: calc(var(--fs-r) * var(--lh-r));

		--animation_speed: marquee 20s linear infinite;
	}

	.track{
		position: absolute;
	  white-space: nowrap;
	  will-change: transform;
	  animation: var(--animation_speed);
	}

	@keyframes marquee {
	  from { transform: translateX(100vw); }
	  to { transform: translateX(-100%); }
	}

	.marquee_content{
		padding-left: var(--edge);
	}

	.marquee_content *{
		display: inline;
	}

	.marquee_content a{
		text-decoration: underline;
	}



</style>