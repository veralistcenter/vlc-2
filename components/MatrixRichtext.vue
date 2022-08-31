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
		max-width: var(--max_width);
	}

	.richtext u,
	.richtext a{
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
	}

	.richtext u a,
	.richtext a u{
		text-decoration: none;
	}

	@media screen and (any-hover: hover){
		.richtext a:hover{
			opacity: .6;
		}
	}

	.richtext p + p{
		margin-top: calc(var(--fs-r) * var(--lh-r));
	}

	.richtext input{
		border-bottom: var(--border);
		margin-bottom: var(--margin_half);
	}


	.richtext input[type=email],
	.richtext input[type=text]{
		display: block;
		width: 20rem;

	}

	.richtext input[type=submit]{
		border: var(--border);
		padding-left: var(--margin_half);
		padding-right: var(--margin_half);

		padding-top: var(--margin_quarter);
		padding-bottom: var(--margin_quarter);
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