<template>
	<section class="matrix_block">
		<h1 class="section_heading fs--large mt--1" v-html="block.title"></h1>
		<GridThumbs 
			:posts='block.network'
			:size="'Half'"
		/>	

	</section>	
</template>

<script>
	
	export default{
		props:{
			block: Object
		}
	}

</script>