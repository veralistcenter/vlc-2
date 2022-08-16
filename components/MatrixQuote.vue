<template>
	<aside class="matrix_quote" :class="{in_column: block.quotePosition, main_column: !block.quotePosition}">
		<h3 class="fs--small" :class="{'mb--1_2': block.quotePosition, 'mb--2': !block.quotePosition}" v-html="block.quoteTitle"></h3>

		<section class="matrix_quote_text" :class="{'fs--small': block.quotePosition, 'genath title': !block.quotePosition}" v-html="block.quoteText"></section>

	</aside>
</template>

<script>
		
		export default{
			props: {
				block: Object
			}
		}

</script>

<style>
	
	.matrix_quote.in_column{
		position: absolute;
		width: calc(((100vw - var(--max_width))/2) - var(--margin_x4));
		left: var(--edge);
	}

	.matrix_quote.main_column{
		position: relative;
		width: calc( var(--max_width) + ((100vw - var(--max_width))/2) - (var(--edge)));
		margin-left: auto;
		margin-right: var(--edge);
		margin-top: var(--margin_x4);
		margin-bottom: var(--margin_x4);
	}


	.matrix_quote_text p + p{
		margin-top: var(--return);
	}

	@media screen and (max-width: 850px){
		.in_column.matrix_quote{
			position: relative;
			width: calc(100% - ( 2 * var(--edge)));
			max-width: var(--max_width);
			margin: 0 auto;
			left: unset;
		}

		.matrix_quote.main_column{
			width: calc(100% - ( 2 * var(--edge)));
			margin-left: auto;
			margin-right: auto;
		}
	}

</style>