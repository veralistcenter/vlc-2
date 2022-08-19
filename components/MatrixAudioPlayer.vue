<template>
	<section class="matrix_audio_player">
		<div class="custom_player">
			<audio ref="audioPlayer" class="video-js"></audio>
		</div>		

		<p class="mt--1_2 fs--small center" v-html="block.audioFile.title"></p>
	</section>
</template>

<script>

	import videojs from 'video.js';
	
	export default{
		head(){
			return {
				link: [
					{ rel: 'stylesheet', type:"text/css", href: 'https://unpkg.com/video.js@7/dist/video-js.min.css' }
				]
			}
		},
		props: {
			block: Object
		},
		mounted(){
			this.player = videojs(this.$refs.audioPlayer, this.options, () => {
	      this.player.log('onPlayerReady', this);
	    });
		},
		beforeDestroy() {
	    if (this.player) {
	      this.player.dispose();
	    }
	  },
	  data(){
	  	return {
	  		player: null
	  	}
	  },
		computed: {
			source(){
				return this.block.audioFile.mediaItemUrl
			},
			options(){
				return {
					autoplay: false,
        	controls: true,
        	loop: true,
        	fluid: true,
        	fullscreen: { options: {navigationUI: 'hide'}},
        	audioOnlyMode: true,
        	// poster: true,
        	preload: 'metadata',
        	sources: [
	          {
	            src: this.source,
              type: 'audio/mp3'
	          }
	        ]
				}
			}
		},
	}

</script>

<style>
	
	.matrix_audio_player{
		margin-left: auto;
		margin-right: auto;
		width: calc(100% - var(--margin_x2));
		max-width: var(--max_width);
	}



	.custom_player .video-js .vjs-control-bar{
		background: black;
		height: 3rem;
	}

	.custom_player .video-js .vjs-time-control{
		line-height: 3rem;
		font-family: var(--sans);
	}

	.custom_player .vjs-button > .vjs-icon-placeholder:before{
		line-height: 3rem;
	}
	.custom_player .video-js .vjs-volume-bar{
		margin: 1.5rem 0.45em;
	}

	.custom_player .video-js .vjs-progress-holder,
	.custom_player .video-js .vjs-volume-bar.vjs-slider-horizontal,
	.custom_player .video-js .vjs-slider-horizontal .vjs-volume-level{
		height: 2px;
		background-color: white;
	}

	.vjs-control:focus, 
	.vjs-control:focus:before, 
	.vjs-control:hover:before{
		text-shadow: none;
	}

	.custom_player .video-js .vjs-time-tooltip,
	.custom_player .video-js .vjs-volume-tooltip{
		border-radius:0px;
		font-family: var(--sans);
	}

</style>

