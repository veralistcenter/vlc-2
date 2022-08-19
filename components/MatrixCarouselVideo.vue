<template>
	<div class="matrix_carouse_video">
		<client-only>
		  <vimeo-player ref="player" :video-id="video" :options="options" />
		</client-only>		
	</div>
</template>

<script>
	
	export default{
		props: {
			video: String
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