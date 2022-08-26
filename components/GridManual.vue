<template>
	<section class="section mt--2">
		<h1 class="genath title section_heading" v-html="manual.title"></h1>
		<GridThumbs :posts="manual.manualAddition" :size="size" />
	</section>
</template>


<script>
	
	export default{
		props: {
			size: String,
			manual: Object
		}
	}

</script>