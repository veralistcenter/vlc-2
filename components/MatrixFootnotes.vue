<template>
	<section class="matrix_block section_inset mt--2 mb--2">
		<section class="footnotes fs--small" v-html="block.text"></section>
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
	
	.footnotes{
		margin-left: auto;
		margin-right: auto;
		max-width: 800px;
	}

	.footnotes ol{
		box-sizing: border-box;
		display: block;
		width: 100%;
		padding-left: var(--margin);
		margin-top: calc(var(--fs-s) * var(--lh-s));
		margin-bottom: calc(var(--fs-s) * var(--lh-s));
	}

	.footnotes ol li{
		list-style: decimal;
		padding-left: var(--margin);
	}

	.footnotes ul li{
		list-style: initial;
		padding-left: var(--margin);
	}

	.footnotes ol li + li,
	.footnotes ul li + li{
		margin-top: calc(var(--fs-s) * var(--lh-s));
	}

	.footnotes p + p{
		margin-top: calc(var(--fs-s) * var(--lh-s));
	}

</style>