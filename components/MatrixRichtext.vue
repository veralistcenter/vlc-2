<template>
	<section class="matrix_block section_inset">
		<h1 class="fs--large mt--1 mb--1" v-if="$Check(block.title)" v-html="block.title"></h1>		
		<section class="richtext fs--regular" v-html="block.text"></section>
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
	
	.richtext{
		margin-left: auto;
		margin-right: auto;
		max-width: 800px;
	}

	.richtext p + p{
		margin-top: calc(var(--fs-r) * var(--lh-r));
	}

</style>