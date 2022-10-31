<template>
	<div class="matrix_carouse_video">
		
		<template v-if="youtubeId">
				<client-only>
					<youtube :video-id="youtubeId" ref="youtube"></youtube>
				</client-only>	
			</template>
		<template v-else-if="video.includes('vimeo')">
			<client-only>
			  <vimeo-player ref="player" :video-id="video" :options="options" />
			</client-only>		
		</template>
	</div>
</template>

<script>

	import { getIdFromUrl } from 'vue-youtube'
	
	export default{
		props: {
			video: String
		},
		mounted(){ this.getId() },
		methods: {
			getId () {
	      this.youtubeId = getIdFromUrl(this.video)
	    }
		},
		data(){
			return {
				youtubeId: null,
				options: {
					background: false,
					responsive: true
				}
			}
		}
	}

</script>