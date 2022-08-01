<template>
	<section class="matrix_block matrix_button">
		<p class="fs--regular center caps">
			<a 
				class="btn--full" 
				target="_blank" 
				:href="$Check(block.buttonFile) ? block.buttonFile : block.buttonLink" 
				v-html="block.buttonName"></a>
		</p>

	</section>
</template>

<script>
	
	export default{
		props: {
			block: Object
		}
	}

</script>

<style>
	
	.matrix_button{
		position: relative;
		margin-left: auto;
		margin-right: auto;
		max-width: 800px;
	}

</style>