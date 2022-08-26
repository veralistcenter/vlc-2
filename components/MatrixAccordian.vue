<template>
	<section class="matrix_block matrix_accordian">

		<MatrixAccordianFold 
			v-for="(fold, i) in block.section" :key="i + '_accordian'"
			:fold="fold"
		/>
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
	
	.matrix_accordian{
		margin-left: auto;
		margin-right: auto;
		max-width: var(--max_width);
	}

</style>