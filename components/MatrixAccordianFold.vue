<template>
	<section class="fold mb--1" :class="{open: isOpen}">
			<header class="pb--1">
				<h1 class="fs--regular caps" v-html="fold.sectionTitle"></h1>
				<h2 class="fs--regular" v-html="fold.sectionSubtitle"></h2>	

				<button class="fold_toggle" @click="toggle">
					<div class="cross cross--vert"></div>
					<div class="cross cross--hor"></div>
				</button>
			</header>
			<section class="fold_content grid grid--sans">
				<figure class="fold_fig col col--1_4 mcol--full pb--1">
					<img
						v-if="$Check(fold.sectionImage)"
						:src="fold.sectionImage.sourceUrl"
						:srcset="fold.sectionImage.srcSet"
						:alt="fold.sectionImage.altText"
						sizes="(max-width: 768px) 100vw, (min-width: 769px) 80vw, 100vw"
					/>
				</figure>
				<div class="col col--3_4 col--end mcol--full pb--1" v-html="fold.sectionText"></div>
			</section>

		</section>
</template>

<script>
	
	export default{
		props: {
			fold: Object
		},
		data(){
			return {
				isOpen: false
			}
		},
		methods: {
			toggle(){
				this.isOpen = !this.isOpen
			}
		}
	}

</script>

<style>

	.fold{
		position: relative;
		border-bottom: var(--border);
	}

	.fold_content{
		height: 0px;
		overflow: hidden;
		max-height: 0px;
		transition: all .7s ease-in;
	}

	.open .fold_content{
		height: 100%;
		max-height: 2000px;
		transition: all .4s ease-in;
	}

	.fold_content p + p{
		margin-top: var(--return);
	}


	.fold_fig img{
		display: block;
		width: 100%;
		max-width: 200px;
	}

</style>