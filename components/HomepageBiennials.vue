<template>
	<section class="section mt--2">
		<h1 class="genath title section_heading mb--1" v-html="biennialTitle"></h1>
				
		<BiennialList :biennials="sorted" />

	</section>
</template>

<script>
	
	export default{
		props: {
			biennialTitle: String,
			biennials: Array
		},
		computed: {
			sorted(){
				return []
				.concat(this.biennials)
				.sort((a, b) => {
					const aY = a.biennialInfo.dateRange.startingYear
					const bY = b.biennialInfo.dateRange.startingYear

					return parseInt(bY) - parseInt(aY)

				})
			}
		}
	}

</script>