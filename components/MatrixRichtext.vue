<template>
	<section class="matrix_block section_inset">
		<h1 class="richtext fs--large mt--1 mb--1" v-if="$Check(block.title)" v-html="block.title"></h1>		
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
		max-width: 700px;
	}

	.richtext p + p{
		margin-top: calc(var(--fs-r) * var(--lh-r));
	}

	.richtext figure{
		width: 100%;
		display: block;
	}

	.richtext figure img,
	.richtext img{
		display: block;
		width: 100%;
		height: auto;
	}

	.richtext hr{
		width: 100%;
		border: 0px;
		height: 0px;
		border-bottom: var(--border);
	}

</style>