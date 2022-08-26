<template>
	<section class="section mt--2">
		<h1 class="genath title section_heading mb--1" v-html="biennialTitle"></h1>
				
		<BiennialList :biennials="biennials" />

	</section>
</template>

<script>
	
	export default{
		props: {
			biennialTitle: String,
			biennials: Array
		}
	}

</script>